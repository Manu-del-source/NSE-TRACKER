import { SectionLayout, StatCards, DataTable } from "@/app/components/section-layout";
import { getMarketOverview } from "@/lib/market-data";

export const dynamic = "force-dynamic";

function formatDate(value: Date | null) {
  return value ? new Intl.DateTimeFormat("en-KE", { dateStyle: "medium", timeZone: "Africa/Nairobi" }).format(value) : "—";
}

function formatNumber(value: string | null, maximumFractionDigits = 2) {
  return value === null ? "—" : Number(value).toLocaleString("en-KE", { maximumFractionDigits });
}

export default async function MarketPage() {
  const market = await getMarketOverview();
  const rows = market.indices.map((index) => [
    index.code,
    index.name,
    index.value === null ? "No observation" : formatNumber(index.value),
    index.changePercent === null ? "—" : `${formatNumber(index.changePercent, 3)}%`,
    formatDate(index.observationDate),
  ]);

  return <SectionLayout title="Market" description="A broader view of market performance, liquidity and trading activity.">
    <StatCards items={[
      {label:"Latest trading date",value:formatDate(market.tradingDate),note:"Based on imported quote records"},
      {label:"Quote records",value:market.databaseAvailable ? String(market.quoteCount) : "Unavailable",note:"Records for the latest available trading date"},
      {label:"Market turnover",value:market.turnover === null ? "Not available" : `KSh ${formatNumber(market.turnover)}`,note:"Sum of imported quote turnover values"},
    ]}/>
    <div className="mb-4 flex items-center justify-between"><h2 className="text-sm font-semibold text-white">Market indices</h2><span className="text-[10px] text-slate-500">Latest stored observations</span></div>
    {rows.length
      ? <DataTable columns={["Code","Index","Level","Change","Observation date"]} rows={rows}/>
      : <div className="rounded-xl border border-line bg-panel p-5"><h3 className="text-sm font-medium text-white">{market.databaseAvailable ? "No index observations available" : "Database unavailable"}</h3><p className="mt-2 text-xs leading-6 text-slate-500">{market.databaseAvailable ? "Add market index definitions and import dated observations from an approved source. The page will display them automatically." : "Configure DATABASE_URL and apply the reviewed Prisma migration to load stored market records."}</p></div>}
    <div className="mt-6 rounded-xl border border-line bg-panel p-5"><h2 className="text-sm font-semibold text-white">Market data status</h2><p className="mt-2 text-xs leading-6 text-slate-500">No live or licensed end-of-day feed is connected yet. Market aggregates on this page are calculated only from stored quote records; the source and trading date must be retained during each import. Aggregate volume does not identify individual buyers or sellers.</p></div>
  </SectionLayout>;
}
