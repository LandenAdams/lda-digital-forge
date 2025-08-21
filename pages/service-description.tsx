import Head from "next/head";
import Link from "next/link";

export default function ServiceDescription() {
  return (
    <div className="container max-w-5xl mx-auto px-4 space-y-10">
      <Head>
        <title>What We Provide — LDA Digital Forge</title>
        <meta
          name="description"
          content="A clear overview of LDA Digital Forge features: website, AI chatbot, authentication, and Stripe subscriptions."
        />
      </Head>

      <section className="space-y-3 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold">What We Provide</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          LDA Digital Forge delivers a complete business website with an AI chatbot,
          secure user accounts, and subscription billing — ready to launch.
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="font-semibold mb-2">Website + Branding</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-1 text-sm">
            <li>Custom business name & logo</li>
            <li>Modern, mobile-friendly pages (Home, Login, Signup, Dashboard)</li>
            <li>Specials/promotions & Contact sections</li>
            <li>Your custom domain (e.g., yourbusiness.com)</li>
          </ul>
        </div>

        <div className="card">
          <h2 className="font-semibold mb-2">AI Chatbot</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-1 text-sm">
            <li>Answers questions using your FAQs and business details</li>
            <li>Instant, 24/7 responses for visitors</li>
            <li>Secure server-side integration (your API key stays safe)</li>
          </ul>
        </div>

        <div className="card">
          <h2 className="font-semibold mb-2">Accounts & Security</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-1 text-sm">
            <li>Email/password auth with verification (Supabase)</li>
            <li>Session management and secure access control</li>
            <li>Optional OAuth add-ons later (Google, etc.)</li>
          </ul>
        </div>

        <div className="card">
          <h2 className="font-semibold mb-2">Payments</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-1 text-sm">
            <li>Stripe Checkout for subscriptions</li>
            <li>Automatic activation after successful payment</li>
            <li>Optional self-serve billing portal</li>
          </ul>
        </div>
      </section>

      <section className="card">
        <h2 className="font-semibold mb-2">How it Works</h2>
        <ol className="list-decimal pl-5 text-gray-700 space-y-1 text-sm">
          <li>Create an account and verify your email.</li>
          <li>Subscribe to a plan through Stripe Checkout.</li>
          <li>Your site is activated automatically.</li>
          <li>Use the dashboard to set your name/logo, FAQs, and specials.</li>
        </ol>
      </section>

      <section className="flex flex-wrap gap-3 justify-center">
        <Link className="btn" href="/signup">Get Started</Link>
        <Link className="btn-accent" href="/subscribe">Subscribe</Link>
        <Link className="btn-secondary" href="/">Back to Home</Link>
      </section>
    </div>
  );
}
