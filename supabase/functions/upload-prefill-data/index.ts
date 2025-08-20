import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { entries, surveyKey } = await req.json();
    
    if (!entries || !Array.isArray(entries) || !surveyKey) {
      return new Response(
        JSON.stringify({ error: 'Invalid request: entries array and surveyKey required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const results = [];
    
    for (const entry of entries) {
      const { identifierType, identifierValue, prefillData } = entry;
      
      if (!identifierType || !identifierValue || !prefillData) {
        results.push({ error: 'Missing required fields', entry });
        continue;
      }

      const { data, error } = await supabase
        .from('survey_prefill_entries')
        .upsert({
          survey_key: surveyKey,
          identifier_type: identifierType,
          identifier_value: identifierValue,
          prefill: prefillData
        });

      if (error) {
        console.error('Database error:', error);
        results.push({ error: error.message, entry });
      } else {
        results.push({ success: true, entry });
      }
    }

    const successCount = results.filter(r => r.success).length;
    const errorCount = results.length - successCount;

    return new Response(
      JSON.stringify({ 
        message: `Processed ${results.length} entries: ${successCount} successful, ${errorCount} failed`,
        results,
        summary: { total: results.length, successful: successCount, failed: errorCount }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Upload error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to process upload' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});