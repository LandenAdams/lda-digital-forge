import { supabaseAdmin } from "./supabaseAdmin";

export async function provisionTenant(opts: {
  email: string;
  businessName?: string;
  logoUrl?: string;
}) {
  const email = opts.email.toLowerCase();

  // Upsert tenant
  const { data: tenant, error } = await supabaseAdmin
    .from("tenants")
    .upsert(
      { email, business_name: opts.businessName ?? null, logo_url: opts.logoUrl ?? null, is_active: true },
      { onConflict: "email" }
    )
    .select()
    .single();
  if (error) throw error;

  // Optional: trigger a separate customer deployment
  if (process.env.VERCEL_DEPLOY_HOOK_URL) {
    try {
      const r = await fetch(process.env.VERCEL_DEPLOY_HOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // You can pass per-customer env or metadata here if your template uses it
          tenantEmail: email,
          businessName: opts.businessName ?? email.split("@")[0],
        }),
      });
      // You could store r.json().job?.id etc. in tenant_deploys
    } catch (e) {
      console.warn("Deploy hook failed (continuing):", (e as Error).message);
    }
  }

  return tenant;
}
