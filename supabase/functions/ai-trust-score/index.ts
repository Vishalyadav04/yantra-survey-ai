import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

type ResponseMeta = {
  questionId: string;
  timing: number; // ms spent on the question
  pauses: number; // number of times respondent paused/switched away
  locationAnomalies: boolean; // simulated flag for suspicious location
};

function clamp(num: number, min: number, max: number) {
  return Math.max(min, Math.min(max, num));
}

function computeTrustScore(responses: ResponseMeta[]): number {
  if (!responses.length) return 100;

  const total = responses.length;
  const fastThresholdMs = 1500;   // < 1.5s considered unusually fast
  const slowThresholdMs = 90_000; // > 90s considered unusually slow

  const fastCount = responses.filter(r => r.timing > 0 && r.timing < fastThresholdMs).length;
  const slowCount = responses.filter(r => r.timing > slowThresholdMs).length;
  const avgPauses = responses.reduce((acc, r) => acc + Math.max(0, r.pauses || 0), 0) / total;
  const anomalyRatio = responses.filter(r => !!r.locationAnomalies).length / total;

  // Deduction weights (tuned for 0-100 scale)
  const fastDeduction   = (fastCount / total) * 40;                // fast answers are a strong signal
  const slowDeduction   = (slowCount / total) * 10;                // slow answers are a weaker negative
  const pauseDeduction  = Math.min(30, avgPauses * 6);             // each average pause costs ~6 points, capped at 30
  const locationPenalty = anomalyRatio * 30;                       // location anomalies are significant

  // Placeholder: Future cross-response consistency checks (duplicate patterns, contradictions, etc.)
  // const consistencyDeduction = ...; // TODO: implement semantic and temporal consistency analysis

  const totalDeduction = fastDeduction + slowDeduction + pauseDeduction + locationPenalty; // + consistencyDeduction
  const score = 100 - totalDeduction;

  return Math.round(clamp(score, 0, 100));
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const responses: ResponseMeta[] = Array.isArray(body) ? body : body?.responses;

    if (!Array.isArray(responses)) {
      return new Response(
        JSON.stringify({ error: "Invalid payload. Expected an array of responses or { responses: [...] }" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Basic validation of objects (best-effort; ignore malformed entries)
    const sanitized: ResponseMeta[] = responses
      .filter((r: any) => r && typeof r === 'object')
      .map((r: any) => ({
        questionId: String(r.questionId ?? ''),
        timing: Number.isFinite(r.timing) ? Number(r.timing) : 0,
        pauses: Number.isFinite(r.pauses) ? Math.max(0, Math.floor(Number(r.pauses))) : 0,
        locationAnomalies: !!r.locationAnomalies,
      }));

    const trustScore = computeTrustScore(sanitized);

    return new Response(
      JSON.stringify({ trustScore }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('ai-trust-score error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to compute trust score' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
