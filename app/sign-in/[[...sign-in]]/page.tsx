import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return <main className="flex min-h-screen items-center justify-center bg-ink px-4 py-10"><div className="w-full max-w-md"><div className="mb-6 text-center"><p className="text-sm font-semibold tracking-wide text-white">NSE <span className="text-gold">TRACKER</span></p><p className="mt-2 text-xs text-slate-500">Sign in to your research workspace</p></div><SignIn /></div></main>;
}
