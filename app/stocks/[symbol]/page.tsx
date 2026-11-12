import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionLayout, StatCards, DataTable } from "@/app/components/section-layout";

const companies: Record<string,{name:string;sector:string;price:string;change:string}> = {
  SCOM:{name:"Safaricom PLC",sector:"Telecommunications",price:"KSh 28.75",change:"+2.31%"},
  EQTY:{name:"Equity Group Holdings",sector:"Banking",price:"KSh 49.20",change:"+1.86%"},
  KCB:{name:"KCB Group PLC",sector:"Banking",price:"KSh 43.10",change:"-0.92%"},
  EABL:{name:"East African Breweries",sector:"Manufacturing",price:"KSh 192.00",change:"+0.52%"},
  ABSA:{name:"Absa Bank Kenya",sector:"Banking",price:"KSh 18.60",change:"-0.27%"},
};

export default async function StockProfile({ params }: { params: Promise<{symbol:string}> }) {
  const {symbol} = await params;
  const stock = companies[symbol.toUpperCase()];
  if (!stock) notFound();
  return <SectionLayout title={stock.name} description={`${symbol.toUpperCase()} · ${stock.sector} · Company profile preview`}>
    <div className="mb-5 flex flex-wrap items-center justify-between gap-3"><div><p className="text-[10px] uppercase tracking-wider text-slate-500">Illustrative reference price</p><p className="mt-2 text-3xl font-semibold text-white">{stock.price}</p><p className={`mt-1 text-xs ${stock.change.startsWith("+")?"text-emerald-400":"text-rose-400"}`}>{stock.change} sample change</p></div><Link href="/stocks" className="rounded-lg border border-line px-4 py-2 text-xs text-slate-300 hover:bg-white/5">← All stocks</Link></div>
    <StatCards items={[{label:"Sector",value:stock.sector,note:"Sample classification"},{label:"Ownership events",value:"Pending",note:"Requires verified disclosure imports"},{label:"Price history",value:"Unavailable",note:"Market data provider not connected"}]}/>
    <div className="rounded-xl border border-line bg-panel p-5"><h2 className="text-sm font-semibold text-white">Company intelligence</h2><p className="mt-2 text-xs leading-6 text-slate-500">This profile will combine licensed price history, company announcements, annual-report shareholding data and sourced ownership disclosures. No investor identities or transaction activity are inferred from this placeholder.</p></div>
    <div className="mt-5"><h2 className="mb-3 text-sm font-semibold text-white">Recent disclosure records</h2><DataTable columns={["Record","Date","Source","Verification"]} rows={[["No verified records imported","—","—","Awaiting data source"]]}/></div>
  </SectionLayout>;
}
