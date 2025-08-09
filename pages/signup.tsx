import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/router";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const router = useRouter();

  async function onSignup(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) return setMsg(error.message);
    router.push("/subscribe");
  }

  return (
    <form onSubmit={onSignup} className="card max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Create account</h1>
      {msg && <p className="text-red-600 text-sm">{msg}</p>}
      <input className="input" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
      <input className="input" placeholder="Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
      <button className="btn w-full" type="submit">Continue</button>
    </form>
  );
}
