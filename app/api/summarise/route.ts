import OpenAI from "openai";
const openai = new OpenAI();
export async function POST(req: Request) {
  const { text } = await req.json();
  const r = await openai.chat.completions.create({ model: "gpt-5-mini", messages: [{ role: "user", content: `Summarise: ${text}` }] });
  return Response.json({ summary: r.choices[0].message.content });
}
