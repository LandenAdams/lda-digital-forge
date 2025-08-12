import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-8">
      <Head>
        <title>LDA Digital Forge</title>
        <meta
          name="description"
          content="LDA Digital Forge: AI-powered business websites with built-in chatbot, email verification, and subscription management."
        />
      </Head>

      {/* Hero Section */}
      <section className="text-center space-y-3">
        <h1 className="text-3xl md:text-4xl font-bold">
          LDA Digital Forge — AI-Powered Business Website + Chatbot
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Launch your own professional business website with built-in AI chatbot support.
          Sign up, verify your email, subscribe to a plan, and customize your FAQs & specials.
          Our chatbot answers customer questions instantly, 24/7.
        </p>
        <div className="flex gap-3 justify-center">
          <Link className="btn" href="/signup">
            Get Started
          </Link>
          <Link className="btn" href="/subscribe">
            Subscribe
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="font-semibold mb-2">Simple Setup</h3>
          <p>Sign up with secure Supabase authentication and customize your profile in minutes.</p>
        </div>
        <div className="card">
          <h3 className="font-semibold mb-2">Take Payments</h3>
          <p>Stripe Checkout handles all billing securely — you stay focused on your business.</p>
        </div>
        <div className="card">
          <h3 className="font-semibold mb-2">Answer FAQs</h3>
          <p>AI-powered chatbot responds instantly to common customer questions, reducing workload.</p>
        </div>
      </section>

      {/* Notes Section */}
      <section className="card">
        <h3 className="font-semibold mb-2">Important Account Notes</h3>
        <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
          <li>
            After sign up, <strong>check your email</strong> for a verification link. 
            This is required before you can log in.
          </li>
          <li>
            The link will bring you back to our secure site to finish sign-in and reach your dashboard.
          </li>
          <li>
            You must have an <strong>active paid subscription</strong> to unlock all dashboard features.
          </li>
        </ul>
      </section>
    </div>
  );
}
