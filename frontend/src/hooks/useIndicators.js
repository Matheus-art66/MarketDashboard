/**
 * Hook customizado para gerenciar o estado dos indicadores econômicos
 * 
 * Encapsula toda a lógica de:
 * - Busca de dados do backend
 * - Processamento de dados
 * - Gerenciamento de estado (loading, error)
 * - Atualização automática periódica
 */

import { useState, useEffect } from 'react';
import { getIndicators } from '../services/api';
import { processarDados } from '../utils/dataFormatter';

// Intervalo de atualização em milissegundos (5 minutos)
const UPDATE_INTERVAL = 300000;

/**
 * Hook para gerenciar indicadores econômicos
 * 
 * @returns {Object} Objeto com { indicators, loading, error, refetch }
 * 
 * @example
 * const { indicators, loading, error } = useIndicators();
 * 
 * if (loading) return <Spinner />;
 * if (error) return <ErrorMessage error={error} />;
 * 
 * return (
 *   <div>
 *     <IndicatorCard value={indicators.ipca.value} />
 *   </div>
 * );
 */
export const useIndicators = () => {
  // ============================================
  // ESTADO
  // ============================================

  const [indicators, setIndicators] = useState({
    ipca: { value: '--', change: '--', trend: 'neutral', chartData: [] },
    selic: { value: '--', change: '--', trend: 'neutral', chartData: [] },
    dolar: { value: '--', change: '--', trend: 'neutral', chartData: [] },
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ============================================
  // FUNÇÕES
  // ============================================

  /**
   * Busca e processa indicadores do backend
   */
  const fetchAndProcessIndicators = async () => {
    try {
      setLoading(true);
      setError(null);

      // Busca dados do backend
      const { ipca, selic, dolar } = await getIndicators();

      // Processa os dados
      setIndicators({
        ipca: processarDados(ipca, 'ipca'),
        selic: processarDados(selic, 'selic'),
        dolar: processarDados(dolar, 'dolar'),
      });
    } catch (err) {
      setError(err.message || 'Erro ao buscar indicadores');
      console.error('Erro ao buscar indicadores:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Função para recarregar dados manualmente
   */
  const refetch = async () => {
    await fetchAndProcessIndicators();
  };

  // ============================================
  // EFEITOS
  // ============================================

  useEffect(() => {
    // Busca inicial
    fetchAndProcessIndicators();

    // Configura atualização automática
    const interval = setInterval(fetchAndProcessIndicators, UPDATE_INTERVAL);

    // Cleanup
    return () => clearInterval(interval);
  }, []);

  // ============================================
  // RETORNO
  // ============================================

  return {
    indicators,
    loading,
    error,
    refetch,
  };
};

export default useIndicators;
