import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2023-08-16" });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const email = (req.query.email as string | undefined)?.toLowerCase();
    if (!email) return res.status(400).json({ error: "Missing email" });

    // Find Stripe customer by email
    const customers = await stripe.customers.list({ email, limit: 1 });
    const customer = customers.data[0];
    if (!customer) return res.status(200).json({ active: false });

    // Check for an active subscription
    const subs = await stripe.subscriptions.list({
      customer: customer.id,
      status: "active",
      limit: 1,
      expand: ["data.plan", "data.items", "data.latest_invoice.payment_intent"],
    });

    const active = subs.data.length > 0;
    return res.status(200).json({ active });
  } catch (e: any) {
    console.error("check-subscription error:", e?.message);
    return res.status(500).json({ error: "Internal error" });
  }
}
