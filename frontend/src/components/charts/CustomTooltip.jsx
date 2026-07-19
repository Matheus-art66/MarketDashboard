/**
 * CustomTooltip - Componente de tooltip customizado para gráficos
 * 
 * Exibe informações formatadas quando o usuário passa o mouse sobre o gráfico
 */

/**
 * Tooltip customizado para Recharts
 * 
 * @param {Boolean} active - Se o tooltip está ativo
 * @param {Array} payload - Array com dados do ponto
 * @param {String} type - Tipo de formatação ('currency' ou 'percentage')
 * @returns {JSX} Elemento do tooltip
 * 
 * @example
 * <Tooltip content={<CustomTooltip type="percentage" />} />
 */
const CustomTooltip = ({ active, payload, type = 'percentage' }) => {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  const value = payload[0].value;
  const date = payload[0].payload.data;

  // Formata o valor de acordo com o tipo
  let formattedValue = '';
  if (type === 'currency') {
    formattedValue = `R$ ${parseFloat(value).toFixed(2)}`;
  } else if (type === 'percentage') {
    formattedValue = `${parseFloat(value).toFixed(2)}%`;
  } else {
    formattedValue = String(value);
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-lg">
      <p className="text-xs text-gray-600 font-medium">{date}</p>
      <p className="text-sm font-bold text-navy mt-1">{formattedValue}</p>
    </div>
  );
};

export default CustomTooltip;
