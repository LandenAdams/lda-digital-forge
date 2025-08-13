import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getSupabase } from "../../lib/supabaseClient";

/**
 * Handles Supabase email verification / magic links and OAuth code exchange.
 * After a valid session is present, we send users to /subscribe first (paywall),
 * then /dashboard is accessible once paid.
 */
export default function AuthCallback() {
  const router = useRouter();
  const [msg, setMsg] = useState("Finishing sign-in…");

  useEffect(() => {
    async function run() {
      try {
        const supabase = getSupabase();

        // 1) OAuth PKCE: exchange ?code= for a session
        const url = new URL(window.location.href);
        const code = url.searchParams.get("code");
        if (code) {
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          if (error) throw error;
          setMsg("Signed in! Redirecting…");
          router.replace("/subscribe");
          return;
        }

        // 2) Magic link / email verification tokens are in the URL hash;
        // getSession() will pick them up and set a session if valid.
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;

        if (data.session) {
          setMsg("Email verified! Redirecting…");
          router.replace("/subscribe");
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
