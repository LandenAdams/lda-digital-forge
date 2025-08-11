import Head from "next/head";

export default function ServiceDescription() {
  return (
    <div className="space-y-8">
      <Head>
        <title>LDA Digital Forge – Service Description</title>
        <meta name="description" content="What LDA Digital Forge provides: a branded business website with AI chatbot, authentication, and paid subscriptions." />
      </Head>

      <section className="card">
        <h1 className="text-2xl font-bold mb-2">What We Provide</h1>
        <p className="text-gray-700">
          LDA Digital Forge delivers a complete, branded business website powered by an AI chatbot and paid subscriptions. 
          Sign up, verify your email, subscribe, and customize your site from a simple dashboard.
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="font-semibold mb-2">Website + Branding</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-1 text-sm">
            <li>Custom business name & logo</li>
            <li>Mobile-friendly pages (Home, Login, Signup, Dashboard)</li>
            <li>Specials/promotions section you control</li>
            <li>Custom domain support (e.g., yourbusiness.com)</li>
          </ul>
        </div>
        <div className="card">
          <h2 className="font-semibold mb-2">AI Chatbot</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-1 text-sm">
            <li>Answers questions using your own FAQs</li>
            <li>24/7 instant responses to visitors</li>
            <li>Secure server-side API integration</li>
          </ul>
        </div>
        <div className="card">
          <h2 className="font-semibold mb-2">Accounts & Security</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-1 text-sm">
            <li>Email/password login with verification</li>
            <li>Secure sessions (Supabase)</li>
            <li>Optional OAuth add-ons</li>
          </ul>
        </div>
        <div className="card">
          <h2 className="font-semibold mb-2">Payments</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-1 text-sm">
            <li>Stripe Checkout for subscriptions</li>
            <li>Automatic account activation on payment</li>
            <li>Self-serve billing portal (update card, cancel)</li>
          </ul>
        </div>
      </section>

      <section className="card">
        <h2 className="font-semibold mb-2">How it Works</h2>
        <ol className="list-decimal pl-5 text-gray-700 space-y-1 text-sm">
          <li>Create an account and verify your email.</li>
          <li>Subscribe to a plan via Stripe Checkout.</li>
          <li>Your site is activated automatically.</li>
          <li>Use the dashboard to set your name/logo, FAQs, and specials.</li>
        </ol>
      </section>

      <section className="card">
        <h2 className="font-semibold mb-2">What You Can Manage</h2>
        <ul className="list-disc pl-5 text-gray-700 space-y-1 text-sm">
          <li>Business name & logo</li>
          <li>FAQ content used by the chatbot</li>
          <li>Special promotions and announcements</li>
        </ul>
      </section>
    </div>
  );
}
