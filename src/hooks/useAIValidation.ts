import { useCallback, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface ValidationIssue {
  id: string;
  questionId?: string;
  related?: string[];
  type: string;
  message: string;
  severity: 'info' | 'warn' | 'error';
  suggestion?: string;
}

export interface SurveySchema {
  id?: string;
  title?: string;
  questions: Array<{
    id: string;
    type: string;
    title: string;
    required?: boolean;
    constraints?: any;
  }>;
}

export const useAIValidation = () => {
  const [issues, setIssues] = useState<ValidationIssue[]>([]);
  const [consistencyScore, setConsistencyScore] = useState<number>(100);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validate = useCallback(async (schema: SurveySchema, answers: Record<string, any>, locale?: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase.functions.invoke('ai-validate-responses', {
        body: { survey: schema, answers, locale }
      });
      if (error) throw error;

      setIssues(data?.issues || []);
      setConsistencyScore(typeof data?.consistencyScore === 'number' ? data.consistencyScore : 100);
    } catch (e) {
      console.error('AI validation error', e);
      setError(e instanceof Error ? e.message : 'Validation failed');
    } finally {
      setLoading(false);
    }
  }, []);

  return { issues, consistencyScore, loading, error, validate };
};
