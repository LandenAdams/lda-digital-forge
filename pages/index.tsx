import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container max-w-5xl mx-auto px-4 space-y-10">
      <Head>
        <title>LDA Digital Forge</title>
        <meta
          name="description"
          content="Launch an AI-powered business website with built-in chatbot and Stripe subscriptions in minutes."
        />
      </Head>

      {/* Hero */}
      <section className="hero p-10 md:p-14 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
            Launch your AI-powered business website in minutes
          </h1>
          <p className="text-gray-600">
            LDA Digital Forge gives small businesses a modern website, an AI FAQ chatbot,
            secure accounts with email verification, and paid subscriptions via Stripe —
            all in one place.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link className="btn" href="/signup">Get Started</Link>
            <Link className="btn-accent" href="/subscribe">Subscribe</Link>
            <Link className="btn-secondary" href="/service-description">What We Provide</Link>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="grid md:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="font-semibold mb-2">Website + Branding</h3>
          <p className="text-gray-600">
            Custom name & logo, mobile-friendly pages, specials/announcements and contact.
          </p>
        </div>
        <div className="card">
          <h3 className="font-semibold mb-2">AI Chatbot</h3>
          <p className="text-gray-600">
            Answers customer questions from your FAQs — instant, 24/7 support without extra staff.
          </p>
        </div>
        <div className="card">
          <h3 className="font-semibold mb-2">Subscriptions</h3>
          <p className="text-gray-600">
            Stripe Checkout for recurring billing. Paid users get access to the dashboard automatically.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="card">
        <h3 className="font-semibold mb-3">How it works</h3>
        <ol className="list-decimal pl-5 text-gray-700 space-y-1 text-sm">
          <li>Create an account and verify your email.</li>
          <li>Subscribe securely via Stripe.</li>
          <li>Customize your business name, logo, FAQs, and specials in the dashboard.</li>
          <li>Your AI chatbot answers customer questions on your site instantly.</li>
        </ol>
      </section>

      {/* Account notes */}
      <section className="card">
        <h3 className="font-semibold mb-2">Account notes</h3>
        <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
          <li>After sign up, check your email and click the verification link.</li>
          <li>You’ll be redirected back to finish sign-in.</li>
          <li>A paid plan is required to access dashboard features.</li>
        </ul>
      </section>
    </div>
  );
}
