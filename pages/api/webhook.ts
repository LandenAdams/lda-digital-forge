import { buffer } from "micro";
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { supabaseAdmin } from "../../lib/supabaseAdmin";
import { provisionTenant } from "../../lib/provision";

export const config = { api: { bodyParser: false } };
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2023-08-16" });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }

  const sig = req.headers["stripe-signature"];
  const buf = await buffer(req);

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(buf.toString(), sig as string, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    console.error("Webhook verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const email =
        session.customer_details?.email ||
        (typeof session.customer === "string"
          ? (await stripe.customers.retrieve(session.customer)).email
          : session.customer?.email) ||
        null;

      if (email) {
        // Mark active + create (or update) tenant record
        await supabaseAdmin
          .from("tenants")
          .upsert({ email: email.toLowerCase(), is_active: true }, { onConflict: "email" });

        // Run any provisioning (per-customer deploy, etc.)
        await provisionTenant({ email });
        console.log("✅ Tenant provisioned:", email);
      }
    }

    // (Optional) handle subscription updates, cancellations, etc. here

    return res.status(200).json({ received: true });
  } catch (e: any) {
    console.error("Webhook handler error:", e.message);
    return res.status(500).json({ error: "Internal webhook error" });
  }
}

