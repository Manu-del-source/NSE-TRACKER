import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return <main className="flex min-h-screen items-center justify-center bg-ink px-4 py-10"><div className="w-full max-w-md"><div className="mb-6 text-center"><p className="text-sm font-semibold tracking-wide text-white">NSE <span className="text-gold">TRACKER</span></p><p className="mt-2 text-xs text-slate-500">Create your research workspace account</p></div><SignUp /></div></main>;
}
