import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-10">
      <Head>
        <title>LDA Digital Forge</title>
        <meta
          name="description"
          content="LDA Digital Forge: AI-powered business websites with built-in chatbot, email verification, and subscription management."
        />
      </Head>

      {/* Hero */}
      <section className="hero rounded-3xl p-10 md:p-14 text-center ring-1 ring-black/5">
        <div className="max-w-3xl mx-auto space-y-4">
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
            Launch your AI-powered business website in minutes
          </h1>
          <p className="text-gray-600">
            Sign up, verify your email, subscribe, and customize FAQs & specials.
            Your chatbot answers customer questions instantly, 24/7.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link className="btn" href="/signup">Get Started</Link>
            <Link className="btn btn-secondary" href="/service-description">What We Provide</Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="font-semibold mb-2">Simple Setup</h3>
          <p className="text-gray-600">Secure Supabase auth and a clean dashboard to manage your content.</p>
        </div>
        <div className="card">
          <h3 className="font-semibold mb-2">Take Payments</h3>
          <p className="text-gray-600">Stripe Checkout handles billing—no complex PCI burden on you.</p>
        </div>
        <div className="card">
          <h3 className="font-semibold mb-2">Answer FAQs</h3>
          <p className="text-gray-600">AI chatbot responds to common questions using the FAQs you provide.</p>
        </div>
      </section>

      {/* Notes */}
      <section className="card">
        <h3 className="font-semibold mb-2">Account notes</h3>
        <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
          <li>After sign up, check your email and click the verification link.</li>
          <li>You’ll be redirected back to finish sign-in and reach your dashboard.</li>
          <li>A paid plan is required to access dashboard features.</li>
        </ul>
      </section>
    </div>
  );
}
