/**
 * IPCAChart - Componente especializado para exibir o gráfico do IPCA
 * 
 * Encapsula a configuração específica do IPCA (cor, tipo, altura)
 * e reutiliza o ChartCard e BaseChart.
 */

import ChartCard from './ChartCard';
import BaseChart from './BaseChart';

/**
 * Componente IPCAChart
 * 
 * @param {Array} data - Array de dados do IPCA
 * 
 * @example
 * <IPCAChart data={indicators.ipca.chartData} />
 */

const IPCAChart = ({ data }) => {
  return (
    <ChartCard title="Evolução do IPCA">
      <BaseChart
        data={data}
        type="percentage"
        color="#001f3f"
        strokeWidth={2.5}
        height={300}
      />
    </ChartCard>
  );
};

export default IPCAChart;
