// pages/_app.tsx
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

      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
        <div className="shell h-16 flex items-center justify-between">
          <div className="font-bold text-lg">LDA Digital Forge</div>
          <nav className="flex items-center gap-4 text-sm">
            <a href="/" className="hover:underline">Home</a>
            <a href="/service-description" className="hover:underline">What We Provide</a>
            <a href="/signup" className="hover:underline">Sign Up</a>
            <a href="/login" className="hover:underline">Login</a>
            <a href="/dashboard" className="hover:underline">Dashboard</a>
          </nav>
        </div>
      </header>

      <main className="shell py-10">
        <Component {...pageProps} />
      </main>

      <footer className="shell py-10 text-sm text-gray-500">
        © {new Date().getFullYear()} LDA Digital Forge
      </footer>
    </>
  );
}
