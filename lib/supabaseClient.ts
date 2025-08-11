import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let _supabase: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  // Create once, when actually needed (client-side)
  if (_supabase) return _supabase;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // During build or if envs are missing, avoid throwing on the server.
  if (!url || !anon) {
    if (typeof window === "undefined") {
      // harmless mock for build-time so Next can compile pages
      return {
        auth: { getUser: async () => ({ data: { user: null }, error: null }) },
      } as unknown as SupabaseClient;
    }
    // In the browser, we expect envs to exist
    throw new Error("Supabase env vars missing (check Vercel env + redeploy).");
  }

  _supabase = createClient(url, anon);
  return _supabase;
}
