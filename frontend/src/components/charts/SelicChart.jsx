/**
 * SelicChart - Componente especializado para exibir o gráfico da Taxa Selic
 * 
 * Encapsula a configuração específica da Selic (cor, tipo, altura)
 * e reutiliza o ChartCard e BaseChart.
 */

import ChartCard from './ChartCard';
import BaseChart from './BaseChart';

/**
 * Componente SelicChart
 * 
 * @param {Array} data - Array de dados da Selic
 * 
 * @example
 * <SelicChart data={indicators.selic.chartData} />
 */

const SelicChart = ({ data }) => {
  return (
    <ChartCard title="Evolução da Taxa Selic">
      <BaseChart
        data={data}
        type="percentage"
        color="#5a6c7d"
        strokeWidth={2.5}
        height={300}
      />
    </ChartCard>
  );
};

export default SelicChart;
