import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>LDA Digital Forge</title>
        <meta
          name="description"
          content="LDA Digital Forge – AI-powered business website, chatbot, and subscription access."
        />
      </Head>

      <header className="border-b bg-white">
        <div className="container py-4 flex items-center justify-between">
          <div className="font-bold text-xl">LDA Digital Forge</div>
          <nav className="space-x-4 text-sm">
            <a href="/" className="hover:underline">Home</a>
            <a href="/service-description" className="hover:underline">What We Provide</a>
            <a href="/signup" className="hover:underline">Sign Up</a>
            <a href="/login" className="hover:underline">Login</a>
            <a href="/dashboard" className="hover:underline">Dashboard</a>
          </nav>
        </div>
      </header>

      <main className="container py-8">
        <Component {...pageProps} />
      </main>
    </>
  );
}
