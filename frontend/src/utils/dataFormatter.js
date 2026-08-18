/**
 * Utilitário para formatação e processamento de dados de indicadores econômicos
 * 
 * Este arquivo centraliza toda a lógica de transformação de dados brutos
 * do backend em dados formatados para exibição na UI.
 */

/**
 * Processa dados brutos do backend e retorna dados formatados
 * 
 * @param {Array} dados - Array de objetos com 'data' e 'valor'
 * @param {String} tipo - Tipo do indicador ('ipca', 'selic', 'dolar')
 * @returns {Object} Objeto com value, change, trend e chartData formatados
 * 
 * @example
 * const resultado = processarDados(ipcaData, 'ipca');
 * // Retorna: { value: '0.58%', change: '-0.09%', trend: 'negative', chartData: [...] }
 */
export const processarDados = (dados, tipo) => {
  // Validação: retorna estado vazio se não houver dados
  if (!dados || dados.length === 0) {
    return {
      value: '--',
      change: '--',
      trend: 'neutral',
      chartData: [],
    };
  }

  // ============================================
  // ORDENAÇÃO DE DADOS
  // ============================================
  // Ordena os dados por data (mais antigos primeiro)
  const dadosOrdenados = [...dados].sort((a, b) => {
    const dataA = new Date(a.data.split('/').reverse().join('-'));
    const dataB = new Date(b.data.split('/').reverse().join('-'));
    return dataA - dataB;
  });

  // ============================================
  // EXTRAÇÃO DE VALORES
  // ============================================
  // Pega o valor mais recente
  const valorAtual = parseFloat(dadosOrdenados[dadosOrdenados.length - 1].valor);

  // Calcula a variação (valor atual - valor anterior)
  let variacao = 0;
  if (dadosOrdenados.length > 1) {
    const valorAnterior = parseFloat(dadosOrdenados[dadosOrdenados.length - 2].valor);
    variacao = valorAtual - valorAnterior;
  }

  // ============================================
  // DETERMINAÇÃO DE TENDÊNCIA
  // ============================================
  let trend = 'neutral';
  if (tipo === 'dolar') {
    // Para dólar, queda é positiva (bom para o Brasil)
    trend = variacao < 0 ? 'positive' : variacao > 0 ? 'negative' : 'neutral';
  } else {
    // Para IPCA e Selic, subida é positiva
    trend = variacao > 0 ? 'positive' : variacao < 0 ? 'negative' : 'neutral';
  }

  // ============================================
  // FORMATAÇÃO DE VALORES
  // ============================================
  let valueFormatted = '';
  let changeFormatted = '';

  if (tipo === 'dolar') {
    valueFormatted = `R$ ${valorAtual.toFixed(2)}`;
    changeFormatted = `${variacao.toFixed(2)}`;
  } else {
    valueFormatted = `${valorAtual.toFixed(2)}%`;
    changeFormatted = `${variacao.toFixed(2)}%`;
  }

  // ============================================
  // PREPARAÇÃO DE DADOS PARA GRÁFICO
  // ============================================
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

/**
 * Formata um valor numérico de acordo com o tipo
 * 
 * @param {Number} value - Valor a ser formatado
 * @param {String} type - Tipo de formatação ('currency' ou 'percentage')
 * @returns {String} Valor formatado
 * 
 * @example
 * formatValue(5.17, 'currency') // Retorna: 'R$ 5.17'
 * formatValue(0.58, 'percentage') // Retorna: '0.58%'
 */
export const formatValue = (value, type) => {
  if (type === 'currency') {
    return `R$ ${parseFloat(value).toFixed(2)}`;
  }
  if (type === 'percentage') {
    return `${parseFloat(value).toFixed(2)}%`;
  }
  return String(value);
};

/**
 * Determina a classe de tendência baseado no valor
 * 
 * @param {Number} value - Valor da variação
 * @param {String} type - Tipo do indicador ('currency' ou 'percentage')
 * @returns {String} Classe de tendência ('positive', 'negative' ou 'neutral')
 * 
 * @example
 * getTrendClass(0.5, 'percentage') // Retorna: 'positive'
 * getTrendClass(-0.5, 'currency') // Retorna: 'positive' (queda do dólar é boa)
 */
export const getTrendClass = (value, type) => {
  if (value === 0) return 'neutral';
  
  if (type === 'currency') {
    // Para moeda, queda é positiva
    return value < 0 ? 'positive' : 'negative';
  }
  
  // Para percentuais, subida é positiva
  return value > 0 ? 'positive' : 'negative';
};
