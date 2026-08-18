import useIndicators from "../hooks/useIndicators";

import IndicatorCard from "../components/cards/IndicatorCard";
import IPCAChart from "../components/charts/IPCAChart";
import SelicChart from "../components/charts/SelicChart";
import DollarChart from "../components/charts/DollarChart";
import Spinner from "../components/ui/Spinner";

import TrendingUpIcon from "../components/icons/TrendingUpIcon";
import DollarIcon from "../components/icons/DollarIcon";

/**
 * 
 * Responsabilidade única: Orquestrar o layout e renderizar componentes
 * 
 * Toda a lógica foi extraída para:
 * - hooks/useIndicators.js (estado)
 * - services/api.js (requisições)
 * - utils/dataFormatter.js (processamento)
 * - components/charts/* (gráficos especializados)
 */

const Dashboard = () => {
  const { indicators, loading, error } = useIndicators();

  if (error) {
    return (
      <div className="flex-1 p-6 md:p-8 bg-gray-50 overflow-y-auto">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800 text-sm">
          <p className="font-semibold mb-1">⚠️ Erro ao conectar</p>
          <p>{error}</p>
          <p className="text-xs mt-2 opacity-75">
            Verifique se o backend está rodando em http://127.0.0.1:5000
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex-1 p-6 md:p-8 bg-gray-50 overflow-y-auto flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 md:p-8 bg-gray-50 overflow-y-auto">
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
        <IPCAChart data={indicators.ipca.chartData} />
        <SelicChart data={indicators.selic.chartData} />
        <DollarChart data={indicators.dolar.chartData} />
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-gray-400 py-4">
        <p>Dados atualizados automaticamente a cada 5 minutos</p>
      </div>
    </div>
  );
};

export default Dashboard;
