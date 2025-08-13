import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getSupabase } from "../lib/supabaseClient";

export default function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // If already logged in: send verified users to dashboard, others to check-email
  useEffect(() => {
    try {
      const supabase = getSupabase();
      supabase.auth.getUser().then(({ data }) => {
        const user = data.user;
        if (!user) return;
        const verified =
          (user as any).email_confirmed_at ||
          (user as any).confirmed_at ||
          (user as any)?.identities?.[0]?.identity_data?.email_verified;
        if (verified) router.replace("/dashboard");
        else router.replace("/check-email");
      });
    } catch (e) {
      console.error(e);
      setMsg("Supabase not configured. Check Vercel env vars + redeploy.");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onSignup(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setLoading(true);
    try {
      const supabase = getSupabase();
      const baseUrl =
        process.env.NEXT_PUBLIC_APP_URL ||
        (typeof window !== "undefined" ? window.location.origin : "");

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          // Send verification/magic link to your live domain
          emailRedirectTo: `${baseUrl}/auth/callback`,
        },
      });
      if (error) return setMsg(error.message);

      // Always show "check your email" after signup
      router.push("/check-email");
    } catch (err: any) {
      setMsg(err.message || "Signup failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSignup} className="card max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Create account</h1>
      {msg && <p className="text-red-600 text-sm">{msg}</p>}

      <input
        className="input"
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        autoComplete="email"
      />

      <input
        className="input"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        autoComplete="new-password"
      />

      <button className="btn w-full" type="submit" disabled={loading}>
        {loading ? "Creating…" : "Create account"}
      </button>

      <p className="text-sm text-gray-600">
        Already have an account? <a className="underline" href="/login">Log in</a>
      </p>

      <p className="text-xs text-gray-500">
        After you sign up, please verify your email. You’ll be redirected back to finish sign-in.
      </p>
    </form>
  );
}
