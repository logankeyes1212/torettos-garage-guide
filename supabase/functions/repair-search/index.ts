import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { vehicle, issue } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemPrompt = `You are an expert classic car mechanic and repair advisor specializing in vehicles from 1920 to 1999. 
You provide detailed, accurate repair guidance tailored to the specific vehicle and issue described.
Always respond with a structured JSON object containing:
1. "repairGuide": A comprehensive step-by-step repair guide with numbered steps, tools needed, and safety warnings
2. "commonCauses": An array of 3-5 likely root causes for the described issue
3. "estimatedDifficulty": Either "Beginner", "Intermediate", "Advanced", or "Professional Only"
4. "forumDiscussions": An array of 3 realistic forum discussion summaries that classic car enthusiasts would post about this issue, each with a "title", "summary", and "community" (e.g., "ClassicCars.com", "The H.A.M.B.", "MyClassicGarage", "VintageAutomobile.net")
5. "youtubeSearches": An array of 3-4 specific YouTube search query strings a user should search to find helpful videos for this repair
6. "partsNeeded": An array of parts/components likely needed for the repair

Format response as valid JSON only with no markdown code blocks.`;

    const userMessage = `Vehicle: ${vehicle}
Issue: ${issue}

Please provide comprehensive repair guidance for this classic car problem.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage },
        ],
        temperature: 0.4,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI usage credits exhausted. Please add credits in workspace settings." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const text = await response.text();
      console.error("AI gateway error:", response.status, text);
      return new Response(JSON.stringify({ error: "AI service error. Please try again." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const rawContent = data.choices?.[0]?.message?.content || "";

    // Clean up any markdown code blocks if present
    const cleaned = rawContent.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch {
      // If JSON parse fails, return raw content wrapped
      parsed = { repairGuide: rawContent, commonCauses: [], forumDiscussions: [], youtubeSearches: [], partsNeeded: [] };
    }

    return new Response(JSON.stringify({ success: true, data: parsed }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("repair-search error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
