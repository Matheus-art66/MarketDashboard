/**
 * DollarChart - Componente especializado para exibir o gráfico da Cotação do Dólar
 * 
 * Encapsula a configuração específica do Dólar (cor, tipo, altura)
 * e reutiliza o ChartCard e BaseChart.
 * 
 * Nota: Este gráfico ocupa 2 colunas em telas grandes (lg:col-span-2)
 */

import ChartCard from './ChartCard';
import BaseChart from './BaseChart';

/**
 * Componente DollarChart
 * 
 * @param {Array} data - Array de dados do Dólar
 * 
 * @example
 * <DollarChart data={indicators.dolar.chartData} />
 */

const DollarChart = ({ data }) => {
  return (
    <ChartCard title="Evolução da Cotação do Dólar" className="lg:col-span-2">
      <BaseChart
        data={data}
        type="currency"
        color="#001f3f"
        strokeWidth={2.5}
        height={300}
      />
    </ChartCard>
  );
};

export default DollarChart;
