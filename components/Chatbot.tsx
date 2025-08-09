import { useState } from "react";

export default function Chatbot({ faqs }: { faqs: string }) {
  const [q, setQ] = useState("");
  const [a, setA] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function ask() {
    setLoading(true);
    setA(null);
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ q, faqs }),
      });
      const data = await res.json();
      setA(data.answer);
    } catch (e) {
      setA("Sorry, I couldn't answer that right now.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card space-y-3">
      <h3 className="text-lg font-semibold">AI Chatbot</h3>
      <textarea className="input h-24" value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Ask a question..." />
      <button className="btn" onClick={ask} disabled={loading}>{loading?"Thinking...":"Ask"}</button>
      {a && <div className="p-3 rounded-xl bg-gray-100 whitespace-pre-wrap">{a}</div>}
    </div>
  );
}
