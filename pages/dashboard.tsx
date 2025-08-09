import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import Chatbot from "../components/Chatbot";

export default function Dashboard() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [logo, setLogo] = useState("");
  const [faqs, setFaqs] = useState("Hours: 9–5\nLocation: Main St\nPhone: 555-1234");
  const [specials, setSpecials] = useState("10% off this week!");
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUserEmail(data.user?.email ?? null));
  }, []);

  async function save() {
    try {
      const res = await fetch("/api/save-profile", { method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify({ name, logo, faqs, specials }) });
      const j = await res.json();
      setMsg(j.ok ? "Saved!" : j.error || "Error");
    } catch (e:any) { setMsg(e.message); }
  }

  if (!userEmail) return <p>Please login to access your dashboard.</p>;

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="card space-y-3">
        <h2 className="text-xl font-bold">Your Business Profile</h2>
        {msg && <p className="text-sm text-green-700">{msg}</p>}
        <input className="input" placeholder="Business name" value={name} onChange={(e)=>setName(e.target.value)} />
        <input className="input" placeholder="Logo URL" value={logo} onChange={(e)=>setLogo(e.target.value)} />
        <textarea className="input h-28" placeholder="FAQs (one per line)" value={faqs} onChange={(e)=>setFaqs(e.target.value)} />
        <textarea className="input h-28" placeholder="Special offers" value={specials} onChange={(e)=>setSpecials(e.target.value)} />
        <button className="btn" onClick={save}>Save</button>
      </div>
      <Chatbot faqs={faqs} />
    </div>
  );
}
