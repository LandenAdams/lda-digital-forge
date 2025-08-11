import type { NextApiRequest, NextApiResponse } from "next";
import { supabaseAdmin } from "../../lib/supabaseAdmin";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const email = (req.query.email as string | undefined)?.toLowerCase();
  if (!email) return res.status(400).json({ error: "Missing email" });

  const { data, error } = await supabaseAdmin.from("tenants").select("*").eq("email", email).single();
  if (error && error.code !== "PGRST116") return res.status(500).json({ error: error.message });

  return res.status(200).json({ t: data });
}
