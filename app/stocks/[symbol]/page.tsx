import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionLayout, StatCards, DataTable } from "@/app/components/section-layout";
import { getCompanyBySymbol } from "@/lib/market-data";

export const dynamic = "force-dynamic";

function formatPrice(value: { toString(): string } | null, currency: string) {
  return value ? `${currency} ${Number(value.toString()).toLocaleString("en-KE", { maximumFractionDigits: 4 })}` : "No quote imported";
}

function formatDate(value: Date | null) {
  return value ? new Intl.DateTimeFormat("en-KE", { dateStyle: "medium", timeZone: "Africa/Nairobi" }).format(value) : "—";
}

export default async function StockProfile({ params }: { params: Promise<{symbol:string}> }) {
  const { symbol } = await params;
  const stock = await getCompanyBySymbol(symbol);
  if (!stock) notFound();

  const latestQuote = stock.quotes[0] ?? null;
  const ownershipRows = stock.ownershipEvents.map((event) => [
    event.investor.displayName,
    event.eventType.replaceAll("_", " "),
    formatDate(event.effectiveDate),
    event.sourceDocument.title,
  ]);
  const insiderRows = stock.insiderDisclosures.map((event) => [
    event.person.displayName,
    event.transactionType,
    formatDate(event.transactionDate),
    event.sourceDocument.title,
  ]);

  return <SectionLayout title={stock.name} description={`${stock.symbol} · ${stock.sector ?? "Sector not classified"} · Company profile`}>
    <div className="mb-5 flex flex-wrap items-center justify-between gap-3"><div><p className="text-[10px] uppercase tracking-wider text-slate-500">Latest imported close</p><p className="mt-2 text-3xl font-semibold text-white">{formatPrice(latestQuote?.closePrice ?? null, latestQuote?.currency ?? "KES")}</p><p className="mt-1 text-xs text-slate-500">Trading date: {formatDate(latestQuote?.tradingDate ?? null)}</p></div><Link href="/stocks" className="rounded-lg border border-line px-4 py-2 text-xs text-slate-300 hover:bg-white/5">← All stocks</Link></div>
    <StatCards items={[
      {label:"Sector",value:stock.sector ?? "Not classified",note:"Company classification"},
      {label:"Verified ownership events",value:String(stock.ownershipEvents.length),note:"Sourced and verified records only"},
      {label:"Verified insider disclosures",value:String(stock.insiderDisclosures.length),note:"Sourced and verified records only"},
    ]}/>
    <div className="mb-6 rounded-xl border border-line bg-panel p-5"><h2 className="text-sm font-semibold text-white">Company intelligence</h2><p className="mt-2 text-xs leading-6 text-slate-500">This profile displays imported company and market records. Ownership and insider activity is restricted to disclosures marked verified and linked to a source document. Aggregate trading activity is never used to identify individual buyers or sellers.</p></div>
    <div className="mb-6"><h2 className="mb-3 text-sm font-semibold text-white">Verified ownership changes</h2>{ownershipRows.length ? <DataTable columns={["Investor","Event","Effective date","Source document"]} rows={ownershipRows}/> : <div className="rounded-xl border border-line bg-panel p-5 text-xs text-slate-500">No verified ownership events have been imported for this company.</div>}</div>
    <div><h2 className="mb-3 text-sm font-semibold text-white">Verified insider disclosures</h2>{insiderRows.length ? <DataTable columns={["Disclosed person","Transaction","Date","Source document"]} rows={insiderRows}/> : <div className="rounded-xl border border-line bg-panel p-5 text-xs text-slate-500">No verified insider disclosures have been imported for this company.</div>}</div>
  </SectionLayout>;
}
