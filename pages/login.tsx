import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const router = useRouter();

  async function onLogin(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return setMsg(error.message);
    router.push("/dashboard");
  }

  return (
    <form onSubmit={onLogin} className="card max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Login</h1>
      {msg && <p className="text-red-600 text-sm">{msg}</p>}
      <input className="input" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
      <input className="input" placeholder="Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
      <button className="btn w-full" type="submit">Login</button>
    </form>
  );
}
