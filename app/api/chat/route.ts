import { openai } from "../../../src/lib/openai";

export async function POST(req: Request) {
  const { prompt } = await req.json();
  const r = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }],
  });
  return Response.json(r);
}
