import { useCallback, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface CategoryPrediction {
  label: string;
  confidence: number; // 0..1
}

export interface CodedItem {
  text: string;
  categories: CategoryPrediction[];
}

export const useAutoCoding = () => {
  const [coded, setCoded] = useState<CodedItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const categorize = useCallback(async (texts: string[], taxonomy?: string[], n: number = 2, language?: string) => {
    if (!texts.length) return;
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase.functions.invoke('ai-autocode-responses', {
        body: { texts, taxonomy, n, language }
      });
      if (error) throw error;
      setCoded(data?.coded || []);
    } catch (e) {
      console.error('Auto-coding error', e);
      setError(e instanceof Error ? e.message : 'Auto-coding failed');
    } finally {
      setLoading(false);
    }
  }, []);

  return { coded, loading, error, categorize };
};
