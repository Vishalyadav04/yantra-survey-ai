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

    const { texts, taxonomy, n, language } = await req.json();

    if (!Array.isArray(texts) || texts.length === 0) {
      return new Response(JSON.stringify({ error: 'texts array required' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const system = `You are an NLP analyst that performs auto-coding of open-ended survey responses.
- Categorize each response with concise category labels.
- If a taxonomy is provided, map to those labels. If not, induce 3-8 stable, human-readable categories.
- For each response, return top ${n ?? 2} categories with confidence (0-1).
- Output STRICT JSON only with { coded: { text, categories: { label, confidence }[] }[], suggestedTaxonomy?: string[] }`;

    const user = { role: 'user', content: JSON.stringify({ texts, taxonomy, n: n ?? 2, language: language || 'en' }) };

    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-2025-04-14',
        max_completion_tokens: 900,
        messages: [
          { role: 'system', content: system },
          user,
        ],
      }),
    });

    const data = await resp.json();
    if (!resp.ok) {
      console.error('OpenAI error:', data);
      return new Response(JSON.stringify({ error: 'AI auto-coding failed' }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const text = data.choices?.[0]?.message?.content || '{}';
    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch (e) {
      console.warn('Parse fallback for auto-coding');
      parsed = { coded: texts.map((t: string) => ({ text: t, categories: [] })) };
    }

    if (!Array.isArray(parsed.coded)) {
      parsed.coded = texts.map((t: string) => ({ text: t, categories: [] }));
    }

    return new Response(JSON.stringify(parsed), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error('ai-autocode-responses error:', error);
    return new Response(JSON.stringify({ error: 'Unexpected server error' }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});