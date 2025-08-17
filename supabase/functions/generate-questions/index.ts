import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { title, description, language } = await req.json();

    if (!openAIApiKey) {
      return new Response(JSON.stringify({ error: 'Missing OPENAI_API_KEY' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const systemPrompt = `You are an expert survey methodologist for Indian public policy. Generate high-quality, unbiased, concise survey questions.
Return ONLY valid JSON array of question objects with fields: type ("multiple-choice" | "checkbox" | "text-input" | "rating-scale"), title, description (optional), required (boolean), options (for MCQ/checkbox/dropdown), maxRating (for rating-scale), placeholder (for text-input). Use simple language for a general audience. Language: ${language || 'en'}.`;

    const userPrompt = `Survey Title: ${title}\n\nDescription: ${description || ''}\n\nGenerate 8-12 questions relevant to the topic.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        // legacy models use max_tokens
        max_tokens: 1200,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('OpenAI error:', data);
      throw new Error(data.error?.message || 'AI generation failed');
    }

    let suggestions: unknown = [];
    try {
      const text = data.choices?.[0]?.message?.content?.trim() || '[]';
      suggestions = JSON.parse(text);
    } catch (e) {
      // Try to extract JSON from markdown code fences
      const text = data.choices?.[0]?.message?.content || '';
      const match = text.match(/```json[\s\S]*?```/);
      if (match) {
        const json = match[0].replace(/```json|```/g, '');
        suggestions = JSON.parse(json);
      }
    }

    return new Response(JSON.stringify({ suggestions }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Error in generate-questions function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});