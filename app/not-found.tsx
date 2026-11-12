import Link from "next/link";

export default function NotFound() {
  return <main className="grid min-h-screen place-items-center bg-ink px-5 text-center text-slate-200">
    <div className="max-w-md">
      <p className="text-xs uppercase tracking-[0.2em] text-gold">NSE Tracker</p>
      <h1 className="mt-4 text-3xl font-semibold text-white">Page not found</h1>
      <p className="mt-3 text-sm leading-6 text-slate-500">That page or stock symbol is not available in this preview.</p>
      <Link href="/" className="mt-6 inline-flex rounded-lg bg-gold px-4 py-2.5 text-xs font-semibold text-ink hover:bg-amber-300">Return to overview</Link>
    </div>
  </main>;
}
