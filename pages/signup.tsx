import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getSupabase } from "../lib/supabaseClient";

export default function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // If already logged in, go to dashboard
  useEffect(() => {
    try {
      const supabase = getSupabase();
      supabase.auth.getUser().then(({ data }) => {
        if (data.user) router.replace("/dashboard");
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
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          // ✅ Send verification/magic link to your live domain
          emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
        },
      });
      if (error) return setMsg(error.message);

      setMsg("Check your email for a verification link. After verifying, you'll be redirected here to finish sign-in.");
      // Optional nicer UX:
      // router.push("/check-email");
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
        Already have an account?{" "}
        <a className="underline" href="/login">Log in</a>
      </p>
      <p className="text-xs text-gray-500">
        After you sign up, please verify your email. You’ll be redirected back to finish sign-in.
      </p>
    </form>
  );
}
