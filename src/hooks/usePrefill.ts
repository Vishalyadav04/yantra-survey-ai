import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface PrefillData {
  [key: string]: any;
}

interface UsePrefillReturn {
  prefillData: PrefillData | null;
  loading: boolean;
  error: string | null;
  getPrefillData: (surveyKey: string, identifierType: 'aadhaar' | 'phone', identifierValue: string) => Promise<void>;
  clearPrefillData: () => void;
}

export const usePrefill = (): UsePrefillReturn => {
  const [prefillData, setPrefillData] = useState<PrefillData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getPrefillData = useCallback(async (
    surveyKey: string,
    identifierType: 'aadhaar' | 'phone',
    identifierValue: string
  ) => {
    if (!surveyKey || !identifierType || !identifierValue) {
      setError('Missing required parameters');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data, error: functionError } = await supabase.functions.invoke('get-prefill-data', {
        body: {
          surveyKey,
          identifierType,
          identifierValue
        }
      });

      if (functionError) {
        throw new Error(functionError.message || 'Failed to fetch prefill data');
      }

      if (data?.found) {
        setPrefillData(data.prefillData);
      } else {
        setPrefillData(null);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error('Prefill data fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearPrefillData = useCallback(() => {
    setPrefillData(null);
    setError(null);
  }, []);

  return {
    prefillData,
    loading,
    error,
    getPrefillData,
    clearPrefillData,
  };
};