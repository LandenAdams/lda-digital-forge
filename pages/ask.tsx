// pages/ask.tsx
import { useState } from "react";

export default function AskPage() {
  const [q, setQ] = useState("");
  const [a, setA] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErr(null);
    setA(null);
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Provide some FAQs or pull from your dashboard later:
        body: JSON.stringify({ q, faqs: "Hours: 9–5\nPhone: 555-1234\nLocation: Main St" }),
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      const data = await res.json();
      setA(data.answer ?? "No answer available.");
    } catch (e: any) {
      setErr(e.message || "Sorry, something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card max-w-2xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Ask the Chatbot</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <textarea
          className="input h-28"
          placeholder="Type your question…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          required
        />
        <button className="btn" type="submit" disabled={loading}>
          {loading ? "Thinking…" : "Ask"}
        </button>
      </form>
      {err && <p className="text-red-600 text-sm">{err}</p>}
      {a && <div className="p-3 rounded-xl bg-gray-100 whitespace-pre-wrap">{a}</div>}
    </div>
  );
}
