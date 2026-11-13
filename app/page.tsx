import Link from "next/link";
import { Activity, ArrowUpRight, Building2, Eye, ShieldCheck, TrendingUp, Users } from "lucide-react";
import { SectionLayout, StatCards, DataTable } from "@/app/components/section-layout";
import { getMarketOverview, getCompanyDirectory, getOwnershipLedger, getInsiderLedger } from "@/lib/market-data";

export const dynamic = "force-dynamic";

function dateLabel(value: Date | null) {
  return value ? new Intl.DateTimeFormat("en-KE", { dateStyle: "medium", timeZone: "Africa/Nairobi" }).format(value) : "No imported data";
}
function numberLabel(value: string | null) {
  return value === null ? "—" : Number(value).toLocaleString("en-KE", { maximumFractionDigits: 2 });
}

export default async function Home() {
  const [market, directory, ownership, insider] = await Promise.all([
    getMarketOverview(), getCompanyDirectory(), getOwnershipLedger(), getInsiderLedger(),
  ]);
  const rows = directory.companies.slice(0, 8).map(company => [
    company.symbol, company.name, company.sector ?? "Unclassified",
    company.latestQuote ? "KES " + numberLabel(company.latestQuote.closePrice) : "No quote imported",
    company.latestQuote ? dateLabel(company.latestQuote.tradingDate) : "—",
  ]);
  return <SectionLayout title="Market overview" description="Nairobi Securities Exchange research, company coverage and attributable public disclosures.">
    <div className="mb-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <div className="rounded-xl border border-line bg-panel p-5"><div className="flex items-center justify-between text-xs text-slate-500">Listed companies <Building2 size={16} className="text-gold"/></div><p className="mt-4 text-2xl font-semibold text-white">{directory.databaseAvailable?directory.companies.length:"—"}</p><p className="mt-2 text-[10px] text-slate-600">Active issuers in the directory</p></div>
      <div className="rounded-xl border border-line bg-panel p-5"><div className="flex items-center justify-between text-xs text-slate-500">Quote records <Activity size={16} className="text-gold"/></div><p className="mt-4 text-2xl font-semibold text-white">{market.databaseAvailable?market.quoteCount:"—"}</p><p className="mt-2 text-[10px] text-slate-600">For latest imported trading date</p></div>
      <div className="rounded-xl border border-line bg-panel p-5"><div className="flex items-center justify-between text-xs text-slate-500">Verified ownership events <Eye size={16} className="text-gold"/></div><p className="mt-4 text-2xl font-semibold text-white">{ownership.databaseAvailable?ownership.verifiedCount:"—"}</p><p className="mt-2 text-[10px] text-slate-600">Linked to source documents</p></div>
      <div className="rounded-xl border border-line bg-panel p-5"><div className="flex items-center justify-between text-xs text-slate-500">Verified insider disclosures <ShieldCheck size={16} className="text-gold"/></div><p className="mt-4 text-2xl font-semibold text-white">{insider.databaseAvailable?insider.totalCount:"—"}</p><p className="mt-2 text-[10px] text-slate-600">Published disclosure records</p></div>
    </div>
    <div className="mb-5 grid gap-4 lg:grid-cols-2">
      <div className="rounded-xl border border-line bg-panel p-5"><div className="flex items-center gap-2"><TrendingUp size={16} className="text-gold"/><h2 className="text-sm font-semibold text-white">Market data status</h2></div><p className="mt-3 text-xs leading-6 text-slate-400">{market.databaseAvailable&&market.tradingDate? "Latest imported market data: "+dateLabel(market.tradingDate)+". Values are derived from records stored with their source and trading date.": "No market quote feed or index observations have been imported yet. This dashboard will not fabricate prices or market movements."}</p><Link href="/market" className="mt-4 inline-flex items-center gap-1 text-xs text-gold">Open market overview <ArrowUpRight size={13}/></Link></div>
      <div className="rounded-xl border border-line bg-panel p-5"><div className="flex items-center gap-2"><Users size={16} className="text-gold"/><h2 className="text-sm font-semibold text-white">Disclosure integrity</h2></div><p className="mt-3 text-xs leading-6 text-slate-400">{ownership.databaseAvailable?ownership.pendingCount+" ownership records await review. Only verified disclosures are published in the public ledger.":"Disclosure records are currently unavailable because the database could not be queried."} Aggregate market activity is never presented as the identity of an individual buyer or seller.</p><Link href="/ownership" className="mt-4 inline-flex items-center gap-1 text-xs text-gold">Review ownership ledger <ArrowUpRight size={13}/></Link></div>
    </div>
    <div className="mb-3 flex items-center justify-between"><h2 className="text-sm font-semibold text-white">Company directory</h2><Link href="/stocks" className="text-[10px] text-gold">View all companies</Link></div>
    {rows.length?<DataTable columns={["Symbol","Company","Sector","Latest close","Quote date"]} rows={rows}/>:<div className="rounded-xl border border-line bg-panel p-6"><h3 className="text-sm font-medium text-white">{directory.databaseAvailable?"Company directory is empty":"Database connection unavailable"}</h3><p className="mt-2 text-xs leading-6 text-slate-500">{directory.databaseAvailable?"Import an approved NSE company directory before showing listings. No illustrative market figures are presented as live data.":"Check the production Neon connection, apply the database migration, then import source-backed company records."}</p></div>}
    <div className="mt-6"><StatCards items={[{label:"Latest market turnover",value:market.turnover===null?"—":"KSh "+numberLabel(market.turnover),note:"Imported values only"},{label:"Verified insider issuers",value:insider.databaseAvailable?String(insider.issuerCount):"—",note:"Companies with verified disclosures"},{label:"Latest market date",value:dateLabel(market.tradingDate),note:"Nairobi local date"}]}/></div>
  </SectionLayout>;
}
