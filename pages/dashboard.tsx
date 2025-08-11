import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getSupabase } from "../lib/supabaseClient";
import Chatbot from "../components/Chatbot";

export default function Dashboard() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [logo, setLogo] = useState("");
  const [faqs, setFaqs] = useState("Hours: 9–5\nLocation: Main St\nPhone: 555-1234");
  const [specials, setSpecials] = useState("10% off this week!");
  const [msg, setMsg] = useState<string | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    async function run() {
      try {
        const supabase = getSupabase();
        const { data } = await supabase.auth.getUser();
        const email = data.user?.email ?? null;
        setUserEmail(email);
        if (!email) { router.replace("/login"); return; }

        // 1) Check Supabase tenant active flag (set by webhook)
        const { data: t } = await fetch("/api/tenant?email=" + encodeURIComponent(email)).then(r => r.json());
        if (t?.is_active) { setChecking(false); return; }

        // 2) Fallback: check Stripe directly (slower)
        const r = await fetch(`/api/check-subscription?email=${encodeURIComponent(email)}`);
        const j = await r.json();
        if (!j.active) {
          setMsg("A paid plan is required. Redirecting to checkout…");
          setTimeout(() => router.replace("/subscribe"), 1200);
          return;
        }
      } catch (e: any) {
        console.error(e);
        setMsg("Could not verify subscription. Please try again.");
      } finally {
        setChecking(false);
      }
    }
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    } catch (e: any) { setMsg(e.message || "Save failed."); }
  }

  if (checking) return <div className="card max-w-md mx-auto">Checking subscription…</div>;
  if (!userEmail) return (
    <div className="card max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-2">Please log in</h2>
      <a className="btn mt-4 inline-block" href="/login">Go to Login</a>
    </div>
  );

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="card space-y-3">
        <h2 className="text-xl font-bold">Your Business Profile</h2>
        {msg && <p className="text-sm text-green-700">{msg}</p>}
        <label className="block text-sm font-medium">Business name</label>
        <input className="input" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Business name" />
        <label className="block text-sm font-medium">Logo URL</label>
        <input className="input" value={logo} onChange={(e)=>setLogo(e.target.value)} placeholder="https://..." />
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
