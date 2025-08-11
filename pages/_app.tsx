// pages/_app.tsx
import type { AppProps } from "next/app";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-screen">
      <header className="border-b bg-white">
        <div className="container py-4 flex items-center justify-between">
          <div className="font-bold text-xl">{/* Add Logo/Name */}</div>
          <nav className="space-x-4 text-sm">
            <a href="/" className="hover:underline">Home</a>
            <a href="/signup" className="hover:underline">Sign Up</a>
            <a href="/login" className="hover:underline">Login</a>
            <a href="/dashboard" className="hover:underline">Dashboard</a>
          </nav>
        </div>
      </header>
      <main className="container py-8">
        <Component {...pageProps} />
      </main>
      <footer className="container py-10 text-sm text-gray-500">© 2025 • Add your business name</footer>
    </div>
  );
}
