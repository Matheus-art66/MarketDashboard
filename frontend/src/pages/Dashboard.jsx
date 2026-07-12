import { useState, useEffect } from "react";

import IndicatorCard from "../components/cards/IndicatorCard";
import BaseChart from "../components/charts/BaseChart";
import Spinner from "../components/ui/Spinner";

import TrendingUpIcon from "../components/icons/TrendingUpIcon";
import DollarIcon from "../components/icons/DollarIcon";

const Dashboard= () => {
  const [indicators, setIndicators] = useState({
    ipca: { value: '--', change: '--', trend: 'neutral', chartData: [] },
    selic: { value: '--', change: '--', trend: 'neutral', chartData: [] },
    dolar: { value: '--', change: '--', trend: 'neutral', chartData: [] },
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const processarDados = (dados, tipo) => {
    if (!dados || dados.length === 0) {
      return {
        value: '--',
        change: '--',
        trend: 'neutral',
        chartData: [],
      };
    }

    const dadosOrdenados = [...dados].sort((a, b) => {
      const dataA = new Date(a.data.split('/').reverse().join('-'));
      const dataB = new Date(b.data.split('/').reverse().join('-'));
      return dataA - dataB;
    });

    const valorAtual = parseFloat(dadosOrdenados[dadosOrdenados.length - 1].valor);

    let variacao = 0;
    if (dadosOrdenados.length > 1) {
      const valorAnterior = parseFloat(dadosOrdenados[dadosOrdenados.length - 2].valor);
      variacao = valorAtual - valorAnterior;
    }

    let trend = 'neutral';
    if (tipo === 'dolar') {
      trend = variacao < 0 ? 'positive' : variacao > 0 ? 'negative' : 'neutral';
    } else {
      trend = variacao > 0 ? 'positive' : variacao < 0 ? 'negative' : 'neutral';
    }

    let valueFormatted = '';
    let changeFormatted = '';

    if (tipo === 'dolar') {
      valueFormatted = `R$ ${valorAtual.toFixed(2)}`;
      changeFormatted = `${variacao.toFixed(2)}`;
    } else {
      valueFormatted = `${valorAtual.toFixed(2)}%`;
      changeFormatted = `${variacao.toFixed(2)}%`;
    }

    const chartData = dadosOrdenados.map((item) => ({
      data: item.data,
      valor: parseFloat(item.valor),
    }));

    return {
      value: valueFormatted,
      change: changeFormatted,
      trend,
      chartData,
    };
  };

  const fetchIndicators = async () => {
    try {
      setLoading(true);
      setError(null);

      const baseUrl = 'http://127.0.0.1:5000';

      const [ipcaRes, selicRes, dolarRes] = await Promise.all([
        fetch(`${baseUrl}/api/ipca`),
        fetch(`${baseUrl}/api/selic`),
        fetch(`${baseUrl}/api/dolar`),
      ]);

      if (!ipcaRes.ok || !selicRes.ok || !dolarRes.ok) {
        throw new Error('Erro ao buscar dados do servidor');
      }

      const ipcaData = await ipcaRes.json();
      const selicData = await selicRes.json();
      const dolarData = await dolarRes.json();

      setIndicators({
        ipca: processarDados(ipcaData, 'ipca'),
        selic: processarDados(selicData, 'selic'),
        dolar: processarDados(dolarData, 'dolar'),
      });
    } catch (err) {
      setError(err.message);
      console.error('Erro ao buscar indicadores:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIndicators();
    const interval = setInterval(fetchIndicators, 300000);
    return () => clearInterval(interval);
  }, []);

  if (error) {
    return (
      <div className="flex-1 p-6 md:p-8 bg-gray-50 overflow-y-auto">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800 text-sm">
          <p className="font-semibold mb-1">⚠️ Erro ao conectar</p>
          <p>{error}</p>
          <p className="text-xs mt-2 opacity-75">Verifique se o backend está rodando em http://127.0.0.1:5000</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 md:p-8 bg-gray-50 overflow-y-auto">
      {loading && (
        <div className="flex items-center justify-center h-96">
          <div className="spinner"></div>
        </div>
      )}

      {!loading && (
        <>
          {/* Indicadores Principais */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <IndicatorCard
              title="IPCA"
              value={indicators.ipca.value}
              change={indicators.ipca.change}
              icon={<TrendingUpIcon />}
              trend={indicators.ipca.trend}
            />
            <IndicatorCard
              title="TAXA SELIC"
              value={indicators.selic.value}
              change={indicators.selic.change}
              icon={<TrendingUpIcon />}
              trend={indicators.selic.trend}
            />
            <IndicatorCard
              title="COTAÇÃO DÓLAR"
              value={indicators.dolar.value}
              change={indicators.dolar.change}
              icon={<DollarIcon />}
              trend={indicators.dolar.trend}
            />
          </div>

          {/* Gráficos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-200">
              <h3 className="text-base font-semibold text-text-dark mb-4 pb-4 border-b border-gray-200">
                Evolução do IPCA
              </h3>
              <ChartComponent data={indicators.ipca.chartData} title="IPCA" color="#001f3f" />
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-200">
              <h3 className="text-base font-semibold text-text-dark mb-4 pb-4 border-b border-gray-200">
                Evolução da Taxa Selic
              </h3>
              <ChartComponent data={indicators.selic.chartData} title="Selic" color="#5a6c7d" />
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-200 lg:col-span-2">
              <h3 className="text-base font-semibold text-text-dark mb-4 pb-4 border-b border-gray-200">
                Evolução da Cotação do Dólar
              </h3>
              <ChartComponent data={indicators.dolar.chartData} title="Dólar" color="#001f3f" />
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-xs text-gray-400 py-4">
            <p>Dados atualizados automaticamente a cada 5 minutos</p>
          </div>
        </>
      )}
    </div>
  );
};
export default Dashboard;