import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    if (!OPENAI_API_KEY) {
      throw new Error('Missing OPENAI_API_KEY');
    }

    const { survey, answers, locale } = await req.json();

    const system = `You are an expert survey QA assistant. Analyze respondent answers for logical consistency, contradictions, and illogical patterns. 
- Output STRICT JSON only.
- Score overall consistency from 0 to 100.
- Provide specific, actionable issue messages per question when possible.
- Severity: info | warn | error.
Return JSON with fields: { "issues": Issue[], "consistencyScore": number } where Issue = { id: string, questionId?: string, related?: string[], type: string, message: string, severity: 'info'|'warn'|'error', suggestion?: string }`;

    const user = {
      role: 'user',
      content: JSON.stringify({ survey, answers, locale: locale || 'en' })
    };

    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-2025-04-14',
        max_completion_tokens: 700,
        messages: [
          { role: 'system', content: system },
          user,
        ],
      }),
    });

    const data = await resp.json();
    if (!resp.ok) {
      console.error('OpenAI error:', data);
      return new Response(JSON.stringify({ error: 'AI validation failed' }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const text = data.choices?.[0]?.message?.content || '{}';
    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch (e) {
      console.warn('Parse fallback, returning minimal structure');
      parsed = { issues: [], consistencyScore: 100 };
    }

    // Normalize structure
    if (!Array.isArray(parsed.issues)) parsed.issues = [];
    if (typeof parsed.consistencyScore !== 'number') parsed.consistencyScore = 100;

    return new Response(JSON.stringify(parsed), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error('ai-validate-responses error:', error);
    return new Response(JSON.stringify({ error: 'Unexpected server error' }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});