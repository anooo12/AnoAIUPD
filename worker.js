const CLAUDE_KEY = "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";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export default {
  async fetch(request) {
    // Handle preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: CORS });
    }

    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }

    try {
      const body = await request.json();

      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": CLAUDE_KEY,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      return new Response(JSON.stringify(data), {
        headers: { "Content-Type": "application/json", ...CORS },
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...CORS },
      });
    }
  },
};
