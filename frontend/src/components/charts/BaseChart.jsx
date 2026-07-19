import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import CustomTooltip from './CustomTooltip';

/**
 * BaseChart - Componente base reutilizável para renderizar gráficos com Recharts
 *
 * @component
 * @param {Array} data - Array de dados para o gráfico (deve conter 'data' e 'valor')
 * @param {String} type - Tipo de formatação ('percentage' ou 'currency')
 * @param {String} color - Cor da linha do gráfico (padrão: '#001f3f')
 * @param {Number} strokeWidth - Espessura da linha (padrão: 2.5)
 * @param {Number} height - Altura do gráfico em pixels (padrão: 300)
 *
 * @example
 * <BaseChart
 *   data={chartData}
 *   type="percentage"
 *   color="#001f3f"
 *   strokeWidth={2.5}
 *   height={300}
 * />
 * 
 * @example
 * <BaseChart
 *   data={dolarData}
 *   type="currency"
 *   color="#5a6c7d"
 *   height={300}
 * />
 */

const BaseChart = ({
  data,
  type = 'percentage',
  color = '#001f3f',
  strokeWidth = 2.5,
  height = 300,
}) => {
  // ============================================
  // VALIDAÇÃO DE DADOS
  // ============================================

  if (!data || data.length === 0) {
    return (
      <div
        className="w-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg text-gray-400"
        style={{ height: `${height}px` }}
      >
        <div className="text-center">
          <p className="text-sm">Nenhum dado disponível</p>
        </div>
      </div>
    );
  }

  // ============================================
  // RENDERIZAÇÃO DO GRÁFICO
  // ============================================

  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
      >
        {/* Grid de fundo */}
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#e5e7eb"
          vertical={false}
          opacity={0.5}
        />

        {/* Eixo X (Datas) */}
        <XAxis
          dataKey="data"
          stroke="#9ca3af"
          style={{ fontSize: '12px' }}
          tick={{ fill: '#6b7280' }}
          axisLine={{ stroke: '#e5e7eb' }}
        />

        {/* Eixo Y (Valores) */}
        <YAxis
          stroke="#9ca3af"
          style={{ fontSize: '12px' }}
          tick={{ fill: '#6b7280' }}
          axisLine={{ stroke: '#e5e7eb' }}
        />

        {/* Tooltip customizado */}
        <Tooltip content={<CustomTooltip type={type} />} />

        {/* Linha do gráfico */}
        <Line
          type="monotone"
          dataKey="valor"
          stroke={color}
          strokeWidth={strokeWidth}
          dot={{
            fill: color,
            r: 4,
            strokeWidth: 0,
          }}
          activeDot={{
            r: 6,
            fill: color,
            strokeWidth: 0,
          }}
          isAnimationActive={true}
          animationDuration={800}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default BaseChart;
