import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end("Method Not Allowed");
  const { q, faqs } = req.body as { q: string; faqs: string };

  const prompt = `You are a helpful business assistant. Use ONLY the provided FAQs.\n\nFAQs:\n${faqs}\n\nQuestion: ${q}\nAnswer in 1-3 sentences.`;

  try {
    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You answer strictly from provided FAQs." },
          { role: "user", content: prompt },
        ],
        temperature: 0.3,
      }),
    });
    const data = await r.json();
    const answer = data.choices?.[0]?.message?.content ?? "No answer available.";
    res.status(200).json({ answer });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
}
