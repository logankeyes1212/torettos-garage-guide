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

    const systemPrompt = `You are an expert auto mechanic and repair advisor. You provide detailed, accurate repair guidance tailored to the specific vehicle and issue described.
Always respond with a structured JSON object containing:
1. "repairGuide": A comprehensive step-by-step repair guide object with fields: "steps" (array of numbered strings), "toolsNeeded" (array), "safetyWarnings" (array)
2. "commonCauses": An array of 3-5 likely root causes for the described issue
3. "estimatedDifficulty": Either "Beginner", "Intermediate", "Advanced", or "Professional Only"
4. "forumDiscussions": An array of 3 realistic forum discussion summaries, each with "title", "summary", and "community" (e.g., "ClassicCars.com", "The H.A.M.B.", "MyClassicGarage", "VintageAutomobile.net")
5. "youtubeSearches": An array of 3-4 specific YouTube search query strings useful for this repair
6. "partsNeeded": An array of part name strings (simple list)
7. "parts": An array of part objects with detailed sourcing. Each part object has:
    - "name": part name string
    - "listings": array of retailer listing objects, each with:
      - "retailer": store name (e.g. "RockAuto", "AutoZone", "O'Reilly Auto Parts", "NAPA Auto Parts", "eBay Motors", "Advance Auto Parts", "Dealership/OEM", "Amazon", "CarParts.com", "PartsGeek")
      - "type": either "OEM" or "Aftermarket"
      - "brand": brand name string (e.g. "ACDelco", "Dorman", "Gates", "Bosch", "Genuine OEM", "Moog", "Delphi", "Standard Motor Products")
      - "price": realistic estimated price string with $ sign (e.g. "$24.99", "$89–$140")
      - "url": deep search URL for that retailer. Use these URL patterns:
        * RockAuto: "https://www.rockauto.com/en/catalog/[make],[model],[year]" (use actual make/model/year lowercased, no spaces, use commas)
        * AutoZone: "https://www.autozone.com/searchresult?searchText=[part+name+vehicle]"
        * O'Reilly: "https://www.oreillyauto.com/detail/b/[part-name-slugified]"
        * NAPA: "https://www.napaonline.com/en/search#query=[part+name+vehicle]"
        * eBay Motors: "https://www.ebay.com/sch/i.html?_nkw=[part+name+vehicle]&_sacat=6030"
        * Advance Auto: "https://shop.advanceautoparts.com/find/[part-name-vehicle]"
        * Amazon: "https://www.amazon.com/s?k=[part+name+vehicle]"
        * CarParts.com: "https://www.carparts.com/search?q=[part+name+vehicle]"
        * PartsGeek: "https://www.partsgeek.com/catalog/search/?query=[part+name+vehicle]"
        * Dealership: "https://www.google.com/search?q=[year]+[make]+[model]+OEM+[part]+dealer"
    Include 2-3 OEM listings and AT LEAST 4 aftermarket listings per part from different retailers/brands. Provide realistic price estimates based on typical market prices for the vehicle era and part type. Always try to include RockAuto, AutoZone, O'Reilly, NAPA, eBay, Advance Auto, Amazon among aftermarket options.

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
