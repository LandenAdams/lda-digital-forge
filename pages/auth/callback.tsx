import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getSupabase } from "../../lib/supabaseClient";

/**
 * Handles Supabase email verification / magic links and OAuth code exchange.
 * After a valid session is present, sends user to /dashboard.
 */
export default function AuthCallback() {
  const router = useRouter();
  const [msg, setMsg] = useState("Finishing sign-in…");

  useEffect(() => {
    async function run() {
      try {
        const supabase = getSupabase();

        // If OAuth uses ?code= in query, exchange for a session.
        const url = new URL(window.location.href);
        const code = url.searchParams.get("code");
        if (code) {
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          if (error) throw error;
          setMsg("Signed in! Redirecting…");
          router.replace("/dashboard");
          return;
        }

        // Magic link / email verification tokens are in the URL hash;
        // getSession() will pick them up and set a session if valid.
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;

        if (data.session) {
          setMsg("Email verified! Redirecting…");
          router.replace("/dashboard");
        } else {
          setMsg("Session not found. Please log in.");
          router.replace("/login");
        }
      } catch (e: any) {
        console.error(e);
        setMsg(e.message || "Something went wrong. Try logging in again.");
        setTimeout(() => router.replace("/login"), 1500);
      }
    }
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="card max-w-md mx-auto mt-10">
      <p>{msg}</p>
    </div>
  );
}
