/**
 * Serviço de API para comunicação com o backend
 * 
 * Centraliza todas as requisições HTTP para indicadores econômicos
 * e fornece métodos reutilizáveis para o resto da aplicação.
 */

const BASE_URL = 'http://127.0.0.1:5000';
const API_TIMEOUT = 10000; // 10 segundos

/**
 * Realiza uma requisição HTTP com timeout
 * 
 * @param {String} url - URL da requisição
 * @param {Number} timeout - Timeout em milissegundos
 * @returns {Promise} Resposta da requisição
 * @throws {Error} Se houver erro na requisição ou timeout
 */
const fetchWithTimeout = async (url, timeout = API_TIMEOUT) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error('Tempo de resposta do servidor excedido');
    }
    throw error;
  }
};

/**
 * Busca dados do IPCA
 * 
 * @returns {Promise<Array>} Array com dados históricos do IPCA
 * @throws {Error} Se houver erro na requisição
 * 
 * @example
 * const ipcaData = await getIPCA();
 */
export const getIPCA = async () => {
  try {
    const data = await fetchWithTimeout(`${BASE_URL}/api/ipca`);
    return data;
  } catch (error) {
    console.error('Erro ao buscar IPCA:', error);
    throw new Error(`Erro ao buscar IPCA: ${error.message}`);
  }
};

/**
 * Busca dados da Taxa Selic
 * 
 * @returns {Promise<Array>} Array com dados históricos da Selic
 * @throws {Error} Se houver erro na requisição
 * 
 * @example
 * const selicData = await getSelic();
 */
export const getSelic = async () => {
  try {
    const data = await fetchWithTimeout(`${BASE_URL}/api/selic`);
    return data;
  } catch (error) {
    console.error('Erro ao buscar Selic:', error);
    throw new Error(`Erro ao buscar Selic: ${error.message}`);
  }
};

/**
 * Busca dados da Cotação do Dólar
 * 
 * @returns {Promise<Array>} Array com dados históricos do Dólar
 * @throws {Error} Se houver erro na requisição
 * 
 * @example
 * const dolarData = await getDolar();
 */
export const getDolar = async () => {
  try {
    const data = await fetchWithTimeout(`${BASE_URL}/api/dolar`);
    return data;
  } catch (error) {
    console.error('Erro ao buscar Dólar:', error);
    throw new Error(`Erro ao buscar Dólar: ${error.message}`);
  }
};

/**
 * Busca todos os indicadores em paralelo
 * 
 * @returns {Promise<Object>} Objeto com { ipca, selic, dolar }
 * @throws {Error} Se houver erro em qualquer requisição
 * 
 * @example
 * const { ipca, selic, dolar } = await getIndicators();
 */
export const getIndicators = async () => {
  try {
    const [ipcaData, selicData, dolarData] = await Promise.all([
      getIPCA(),
      getSelic(),
      getDolar(),
    ]);

    return {
      ipca: ipcaData,
      selic: selicData,
      dolar: dolarData,
    };
  } catch (error) {
    console.error('Erro ao buscar indicadores:', error);
    throw error;
  }
};
