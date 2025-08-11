import { useEffect, useState } from "react";
import { getSupabase } from "../lib/supabaseClient";
import Chatbot from "../components/Chatbot";

export default function Dashboard() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [logo, setLogo] = useState("");
  const [faqs, setFaqs] = useState("Hours: 9–5\nLocation: Main St\nPhone: 555-1234");
  const [specials, setSpecials] = useState("10% off this week!");
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    // Only runs in the browser; safe to create Supabase here
    try {
      const supabase = getSupabase();
      supabase.auth.getUser().then(({ data }) => {
        setUserEmail(data.user?.email ?? null);
      });
    } catch (e) {
      // If env vars are missing in production, show a helpful message
      console.error(e);
      setMsg("Supabase not configured. Check Vercel env vars + redeploy.");
    }
  }, []);

  async function save() {
    try {
      const res = await fetch("/api/save-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, logo, faqs, specials }),
      });
      const j = await res.json().catch(() => ({}));
      setMsg(j?.ok ? "Saved!" : j?.error || "Saved locally (no API).");
    } catch (e: any) {
      setMsg(e.message || "Save failed.");
    }
  }

  if (!userEmail) {
    return (
      <div className="card max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-2">Please log in</h2>
        <p className="text-gray-600">
          You need to be signed in to access your dashboard.
        </p>
        <a className="btn mt-4 inline-block" href="/login">Go to Login</a>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="card space-y-3">
        <h2 className="text-xl font-bold">Your Business Profile</h2>
        {msg && <p className="text-sm text-green-700">{msg}</p>}

        <label className="block text-sm font-medium">Business name</label>
        <input className="input" placeholder="Business name" value={name} onChange={(e)=>setName(e.target.value)} />

        <label className="block text-sm font-medium">Logo URL</label>
        <input className="input" placeholder="https://..." value={logo} onChange={(e)=>setLogo(e.target.value)} />

        <label className="block text-sm font-medium">FAQs (one per line)</label>
        <textarea className="input h-28" value={faqs} onChange={(e)=>setFaqs(e.target.value)} />

        <label className="block text-sm font-medium">Special offers</label>
        <textarea className="input h-28" value={specials} onChange={(e)=>setSpecials(e.target.value)} />

        <div className="flex gap-3">
          <button className="btn" onClick={save}>Save</button>
          <a className="btn" href="/subscribe">Manage Subscription</a>
        </div>
      </div>

      <Chatbot faqs={faqs} />
    </div>
  );
}
