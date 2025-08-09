import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="text-center space-y-3">
        <h1 className="text-3xl md:text-4xl font-bold">AI‑Powered Business Website + Chatbot</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">Sign up, pay, and customize FAQs & specials. Your chatbot answers customer questions instantly.</p>
        <div className="flex gap-3 justify-center">
          <Link className="btn" href="/signup">Get Started</Link>
          <Link className="btn" href="/subscribe">Subscribe</Link>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-6">
        <div className="card"><h3 className="font-semibold mb-2">Simple Setup</h3><p>Login with Supabase and customize your profile.</p></div>
        <div className="card"><h3 className="font-semibold mb-2">Take Payments</h3><p>Stripe Checkout handles billing securely.</p></div>
        <div className="card"><h3 className="font-semibold mb-2">Answer FAQs</h3><p>Use AI to answer common customer questions.</p></div>
      </section>
    </div>
  );
}
