/**
 * ChartCard - Componente reutilizável para padronizar a moldura dos gráficos
 * 
 * Encapsula o estilo, a sombra, a borda e o título dos gráficos,
 * permitindo que cada gráfico específico foque apenas na renderização do conteúdo.
 */

/**
 * Componente ChartCard
 * 
 * @param {String} title - Título do gráfico
 * @param {React.ReactNode} children - Conteúdo do card (geralmente um BaseChart)
 * @param {String} className - Classes Tailwind adicionais (opcional)
 * 
 * @example
 * <ChartCard title="Evolução do IPCA">
 *   <BaseChart data={data} type="percentage" />
 * </ChartCard>
 */

const ChartCard = ({ title, children, className = '' }) => {
  return (
    <div
      className={`bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-200 ${className}`}
    >
      <h3 className="text-base font-semibold text-text-dark mb-4 pb-4 border-b border-gray-200">
        {title}
      </h3>
      {children}
    </div>
  );
};

export default ChartCard;
