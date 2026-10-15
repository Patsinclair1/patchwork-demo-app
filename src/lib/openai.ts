import OpenAI from "openai";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is not set");
}

// Callers must apply rate limit / usage cap (see app/api/chat/route.ts + lib/rateLimit.ts)
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
