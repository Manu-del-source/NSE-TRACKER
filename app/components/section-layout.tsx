import Link from "next/link";
import { UserButton, Show } from "@clerk/nextjs";
import { Activity, Bell, Building2, TrendingUp, Eye, LayoutDashboard, Users, Wallet, ShieldCheck, Bookmark, ArrowLeft, Search } from "lucide-react";
import type { ReactNode } from "react";

const nav = [
  { href: "/", label: "Overview", icon: LayoutDashboard },
  { href: "/market", label: "Market", icon: Activity },
  { href: "/stocks", label: "Stocks", icon: TrendingUp },
  { href: "/investors", label: "Investors", icon: Users },
  { href: "/institutions", label: "Institutions", icon: Building2 },
  { href: "/ownership", label: "Ownership changes", icon: Eye },
  { href: "/insider-activity", label: "Insider activity", icon: ShieldCheck },
  { href: "/watchlist", label: "Watchlist", icon: Bookmark },
  { href: "/alerts", label: "Alerts", icon: Bell },
];

export function SectionLayout({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return <div className="min-h-screen bg-ink text-slate-200">
    <aside className="fixed inset-y-0 left-0 hidden w-[252px] flex-col border-r border-line bg-[#0b1220] lg:flex">
      <Link href="/" className="flex items-center gap-3 px-5 py-6">
        <span className="grid h-10 w-10 place-items-center rounded-xl border border-gold/40 bg-gold/10 text-gold"><Activity size={21}/></span>
        <span><span className="block text-[15px] font-semibold tracking-wide text-white">NSE <b className="text-gold">TRACKER</b></span><span className="mt-0.5 block text-[10px] uppercase tracking-[0.2em] text-slate-500">Investor intelligence</span></span>
      </Link>
      <nav className="flex-1 space-y-1 pt-4">{nav.map(({href,label,icon:Icon})=><Link key={href} href={href} className={`mx-3 flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] transition ${href === "/" + (title.toLowerCase().replaceAll(" ","-")) ? "bg-gold/10 text-gold" : "text-slate-400 hover:bg-white/[0.04] hover:text-white"}`}><Icon size={16}/>{label}</Link>)}</nav>
      <div className="border-t border-line p-5 text-[10px] leading-5 text-slate-600">Independent market research interface<br/>Illustrative preview · Not live data</div>
    </aside>
    <main className="min-h-screen lg:pl-[252px]">
      <header className="sticky top-0 z-20 flex h-[68px] items-center justify-between border-b border-line bg-ink/90 px-4 backdrop-blur sm:px-7">
        <div className="flex items-center gap-2 text-xs text-slate-500"><Link href="/" className="hover:text-gold">Overview</Link><span>/</span><span className="text-slate-200">{title}</span></div>
        <div className="flex items-center gap-3"><div className="hidden items-center gap-2 rounded-lg border border-line bg-panel px-3 py-2 text-[10px] text-slate-500 sm:flex"><Search size={13}/> Search NSE Tracker</div><span className="rounded border border-line px-2 py-1 text-[9px] tracking-wider text-gold">DEMO DATA</span><Show when="signed-out"><Link href="/sign-in" className="text-xs text-slate-300 hover:text-gold">Sign in</Link><Link href="/sign-up" className="rounded-lg bg-gold px-3 py-2 text-xs font-semibold text-ink hover:bg-amber-300">Create account</Link></Show><Show when="signed-in"><UserButton /></Show></div>
      </header>
      <nav className="scrollbar-none flex gap-1 overflow-x-auto border-b border-line px-3 py-2 lg:hidden">{nav.map(({href,label})=><Link key={href} href={href} className="shrink-0 rounded-md px-3 py-2 text-[10px] text-slate-400 hover:bg-white/5 hover:text-gold">{label}</Link>)}</nav>
      <div className="mx-auto max-w-[1500px] px-4 py-6 sm:px-7 sm:py-8">
        <div className="mb-6"><div className="mb-2 text-[10px] uppercase tracking-[0.18em] text-gold">Nairobi Securities Exchange</div><h1 className="text-[26px] font-semibold tracking-tight text-white sm:text-[30px]">{title}</h1><p className="mt-1.5 text-xs text-slate-500">{description}</p></div>
        <div className="mb-5 rounded-lg border border-amber-500/20 bg-amber-500/[0.06] px-4 py-3 text-[11px] leading-5 text-amber-100/70"><strong className="text-amber-200">Illustrative preview.</strong> This page uses sample placeholder information only. It is not live market data, verified ownership information, or a record of actual trades.</div>
        {children}
      </div>
    </main>
  </div>;
}

export function DataTable({ columns, rows }: { columns: string[]; rows: string[][] }) {
  return <div className="overflow-hidden rounded-xl border border-line bg-panel"><div className="overflow-x-auto"><table className="w-full min-w-[620px] text-left"><thead><tr className="border-b border-line text-[9px] uppercase tracking-[0.14em] text-slate-600">{columns.map(c=><th key={c} className="px-5 py-4 font-medium">{c}</th>)}</tr></thead><tbody>{rows.map((row,i)=><tr key={i} className="border-b border-line/70 last:border-0 hover:bg-white/[0.02]">{row.map((cell,j)=><td key={j} className={`px-5 py-4 text-xs ${j===0?"font-semibold text-slate-200":"text-slate-400"}`}>{cell}</td>)}</tr>)}</tbody></table></div></div>;
}

export function StatCards({ items }: { items: { label: string; value: string; note: string }[] }) {
  return <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3">{items.map(item=><div key={item.label} className="rounded-xl border border-line bg-panel p-5"><p className="text-xs text-slate-500">{item.label}</p><p className="mt-3 text-2xl font-semibold text-white">{item.value}</p><p className="mt-2 text-[10px] text-slate-600">{item.note}</p></div>)}</div>;
}
