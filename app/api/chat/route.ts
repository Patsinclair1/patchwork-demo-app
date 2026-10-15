import { openai } from "../../../src/lib/openai";
import { rateLimit } from "../../../lib/rateLimit";

const DAILY_TOKEN_CAP = 50_000; // simple usage cap (demo)
let tokensUsedToday = 0;
let dayKey = new Date().toISOString().slice(0, 10);

function bumpTokens(n: number) {
  const today = new Date().toISOString().slice(0, 10);
  if (today !== dayKey) {
    dayKey = today;
    tokensUsedToday = 0;
  }
  tokensUsedToday += n;
  return tokensUsedToday <= DAILY_TOKEN_CAP;
}

/**
 * Minimal auth: require Authorization: Bearer <token>.
 * In a real app, verify the JWT with Clerk/Supabase/Auth.js session.
 */
function requireAuth(req: Request): { ok: true; userId: string } | { ok: false; response: Response } {
  const header = req.headers.get("authorization") || "";
  const m = /^Bearer\s+(.+)$/i.exec(header);
  if (!m) {
    return {
      ok: false,
      response: new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }),
    };
  }
  // Demo: treat the bearer value as the user id after a length check
  const userId = m[1].trim();
  if (userId.length < 8) {
    return {
      ok: false,
      response: new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }),
    };
  }
  return { ok: true, userId };
}

export async function POST(req: Request) {
  const auth = requireAuth(req);
  if (!auth.ok) return auth.response;

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const rl = rateLimit(`chat:${auth.userId}:${ip}`, 20, 60_000);
  if (!rl.ok) {
    return new Response(JSON.stringify({ error: "Rate limit exceeded" }), {
      status: 429,
      headers: { "Content-Type": "application/json", "X-RateLimit-Remaining": "0" },
    });
  }

  if (!bumpTokens(0)) {
    return new Response(JSON.stringify({ error: "Daily token cap reached" }), { status: 429 });
  }

  const body = await req.json().catch(() => null);
  const prompt = typeof body?.prompt === "string" ? body.prompt.slice(0, 4000) : null;
  if (!prompt) {
    return new Response(JSON.stringify({ error: "prompt required" }), { status: 400 });
  }

  const r = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 512,
  });

  const used = r.usage?.total_tokens ?? 512;
  if (!bumpTokens(used)) {
    return new Response(JSON.stringify({ error: "Daily token cap reached" }), { status: 429 });
  }

  return Response.json(r, {
    headers: { "X-RateLimit-Remaining": String(rl.remaining) },
  });
}
