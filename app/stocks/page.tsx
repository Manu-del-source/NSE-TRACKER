import Link from "next/link";
import { SectionLayout, StatCards, DataTable } from "@/app/components/section-layout";
import { getCompanyDirectory } from "@/lib/market-data";

export const dynamic = "force-dynamic";

function formatPrice(value: string | null, currency: string) {
  if (value === null) return "No quote imported";
  return `${currency} ${Number(value).toLocaleString("en-KE", { maximumFractionDigits: 4 })}`;
}

function formatDate(value: Date) {
  return new Intl.DateTimeFormat("en-KE", { dateStyle: "medium", timeZone: "Africa/Nairobi" }).format(value);
}

export default async function StocksPage() {
  const { companies, databaseAvailable } = await getCompanyDirectory();
  const rows = companies.map((company) => [
    company.symbol,
    company.name,
    company.latestQuote ? formatPrice(company.latestQuote.closePrice, company.latestQuote.currency) : "—",
    company.sector ?? "Not classified",
    company.latestQuote ? formatDate(company.latestQuote.tradingDate) : "No quote",
  ]);

  return <SectionLayout title="Stocks" description="Browse listed companies and inspect their market and disclosure history.">
    <StatCards items={[
      {label:"Active companies",value:databaseAvailable ? String(companies.length) : "Unavailable",note:databaseAvailable ? "Records stored in the NSE Tracker database" : "Database connection unavailable"},
      {label:"Companies with quotes",value:databaseAvailable ? String(companies.filter((item) => item.latestQuote).length) : "—",note:"At least one market quote imported"},
      {label:"Market data",value:"Not connected",note:"No licensed live or end-of-day feed configured"},
    ]}/>
    <div className="mb-4 flex flex-wrap items-center justify-between gap-2"><div><h2 className="text-sm font-semibold text-white">Company directory</h2><p className="mt-1 text-[10px] text-slate-500">Only company records saved in the database appear here.</p></div><span className="text-[10px] text-slate-500">{databaseAvailable ? `${companies.length} records` : "Database unavailable"}</span></div>
    {companies.length > 0
      ? <div className="overflow-hidden rounded-xl border border-line bg-panel"><DataTable columns={["Symbol","Company","Latest close","Sector","Quote date"]} rows={rows}/><div className="border-t border-line px-5 py-3 text-[10px] text-slate-500">Quote values are shown only when imported. A missing quote is not interpreted as a zero price.</div></div>
      : <div className="rounded-xl border border-line bg-panel p-6"><h3 className="text-sm font-medium text-white">{databaseAvailable ? "No companies have been added yet" : "Cannot reach the database"}</h3><p className="mt-2 max-w-2xl text-xs leading-6 text-slate-500">{databaseAvailable ? "The directory is connected, but it has no active company records. Add the initial NSE-listed company universe after confirming the official listing source." : "Set DATABASE_URL to the selected Neon PostgreSQL database, apply the reviewed Prisma migration, and then reload this page. No sample prices or companies are substituted when the database is unavailable."}</p></div>}
    <div className="mt-5 rounded-xl border border-line bg-panel p-5"><h2 className="text-sm font-semibold text-white">Data integrity</h2><p className="mt-2 text-xs leading-6 text-slate-500">A company record is not evidence of a current market price. Quote rows must retain their trading date and source provenance; this page never generates prices from placeholders.</p></div>
  </SectionLayout>;
}
