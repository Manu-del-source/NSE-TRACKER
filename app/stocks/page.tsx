import Link from "next/link";
import { SectionLayout, StatCards, DataTable } from "@/app/components/section-layout";

export default function StocksPage() {
  return <SectionLayout title="Stocks" description="Browse listed companies and inspect their market and disclosure history.">
    <StatCards items={[{label:"Companies in sample",value:"8",note:"Placeholder directory"},{label:"Watchlist candidates",value:"5",note:"Illustrative saved symbols"},{label:"Data coverage",value:"Not connected",note:"Provider integration pending"}]}/>
    <div className="mb-4 flex items-center justify-between"><h2 className="text-sm font-semibold text-white">Sample listed companies</h2><span className="text-[10px] text-slate-500">Illustrative only</span></div>
    <div className="overflow-hidden rounded-xl border border-line bg-panel"><DataTable columns={["Symbol","Company","Sample price","Sample change","Profile"]} rows={[["SCOM","Safaricom PLC","KSh 28.75","+2.31%", "Open profile →"],["EQTY","Equity Group Holdings","KSh 49.20","+1.86%","Open profile →"],["KCB","KCB Group PLC","KSh 43.10","-0.92%","Open profile →"],["EABL","East African Breweries","KSh 192.00","+0.52%","Open profile →"],["ABSA","Absa Bank Kenya","KSh 18.60","-0.27%","Open profile →"]]}/></div>
    <p className="mt-3 text-[10px] text-slate-600">Stock profiles are planned for individual symbols. These examples are not current quotes.</p>
    <div className="mt-5 flex flex-wrap gap-2"><Link href="/stocks/SCOM" className="rounded-lg border border-gold/30 px-4 py-2 text-xs text-gold hover:bg-gold/10">Preview SCOM profile</Link><Link href="/stocks/EQTY" className="rounded-lg border border-line px-4 py-2 text-xs text-slate-300 hover:bg-white/5">Preview EQTY profile</Link></div>
  </SectionLayout>;
}
