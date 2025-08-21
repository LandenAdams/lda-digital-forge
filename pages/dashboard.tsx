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

        // Prefer your tenant API active flag; fallback to Stripe check if needed.
        const tenantRes = await fetch("/api/tenant?email=" + encodeURIComponent(email));
        const tenantJson = await tenantRes.json();
        if (!tenantJson?.t?.is_active) {
          const r = await fetch(`/api/check-subscription?email=${encodeURIComponent(email)}`);
          const j = await r.json();
          if (!j.active) {
            setMsg("A paid plan is required. Redirecting to checkout…");
            setTimeout(() => router.replace("/subscribe"), 1200);
            return;
          }
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
    } catch (e: any) {
      setMsg(e.message || "Save failed.");
    }
  }

  if (checking) return <div className="card">Checking subscription…</div>;
  if (!userEmail) return null;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="card space-y-3">
          <h2 className="font-semibold">Your Business Profile</h2>
          {msg && <p className="text-sm text-green-700">{msg}</p>}

          <label>Business name</label>
          <input className="input" placeholder="Business name" value={name} onChange={(e)=>setName(e.target.value)} />

          <label>Logo URL</label>
          <input className="input" placeholder="https://..." value={logo} onChange={(e)=>setLogo(e.target.value)} />

          <label>FAQs (one per line)</label>
          <textarea className="input h-28" value={faqs} onChange={(e)=>setFaqs(e.target.value)} />

          <label>Special offers</label>
          <textarea className="input h-28" value={specials} onChange={(e)=>setSpecials(e.target.value)} />

          <div className="flex flex-wrap gap-3">
            <button className="btn" onClick={save}>Save</button>
            <a className="btn" href="/subscribe">Manage Subscription</a>
            <button
              className="btn-secondary"
              onClick={async () => {
                if (!userEmail) return;
                const r = await fetch(`/api/portal?email=${encodeURIComponent(userEmail)}`);
                const j = await r.json();
                if (j.url) window.location.href = j.url;
              }}
            >
              Open Billing Portal
            </button>
          </div>
        </div>

        <div className="card border-l-4" style={{ borderColor: "hsl(var(--brand))" }}>
          <Chatbot faqs={faqs} />
        </div>
      </div>
    </div>
  );
}
