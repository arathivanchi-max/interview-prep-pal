import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const VALID_QUESTION_IDS = new Set(Array.from({ length: 34 }, (_, i) => i + 1));
const MAX_QUESTIONS = 34;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Authenticate user
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Verify the user's JWT
    const anonClient = createClient(
      supabaseUrl,
      Deno.env.get("SUPABASE_PUBLISHABLE_KEY")!
    );
    const token = authHeader.replace("Bearer ", "");
    const {
      data: { user },
      error: authError,
    } = await anonClient.auth.getUser(token);

    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Invalid token" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Parse and validate body
    const { ratings, categories } = await req.json();

    // Validate ratings: must be an object with valid question IDs and ratings 1-5
    if (!ratings || typeof ratings !== "object" || Array.isArray(ratings)) {
      return new Response(
        JSON.stringify({ error: "ratings must be an object" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const entries = Object.entries(ratings);
    if (entries.length === 0 || entries.length > MAX_QUESTIONS) {
      return new Response(
        JSON.stringify({ error: "Invalid number of ratings" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    for (const [idStr, rating] of entries) {
      const id = Number(idStr);
      if (!VALID_QUESTION_IDS.has(id)) {
        return new Response(
          JSON.stringify({ error: `Invalid question ID: ${idStr}` }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      if (typeof rating !== "number" || rating < 1 || rating > 5 || !Number.isInteger(rating)) {
        return new Response(
          JSON.stringify({ error: `Invalid rating for question ${idStr}` }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
    }

    // Validate categories
    if (!Array.isArray(categories) || categories.some((c: unknown) => typeof c !== "string")) {
      return new Response(
        JSON.stringify({ error: "categories must be a string array" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Compute server-side
    const ratingValues = entries.map(([, r]) => r as number);
    const avg = ratingValues.reduce((a, b) => a + b, 0) / ratingValues.length;
    const avgRounded = Math.round(avg * 100) / 100;

    const { error: insertError } = await supabase
      .from("practice_sessions")
      .insert({
        user_id: user.id,
        avg_rating: avgRounded,
        questions_count: entries.length,
        categories: categories.length > 0 ? categories : ["All"],
      });

    if (insertError) {
      return new Response(
        JSON.stringify({ error: insertError.message }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({ success: true, avg_rating: avgRounded }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (e) {
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
