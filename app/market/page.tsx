import { SectionLayout, StatCards, DataTable } from "@/app/components/section-layout";

export default function MarketPage() {
  return <SectionLayout title="Market" description="A broader view of market performance, liquidity and trading activity.">
    <StatCards items={[{label:"Illustrative market turnover",value:"KSh 184.6M",note:"Sample daily traded value"},{label:"Illustrative shares traded",value:"18.42M",note:"Sample aggregate volume"},{label:"Market breadth",value:"18 / 11",note:"Sample advancers versus decliners"}]}/>
    <div className="mb-4 flex items-center justify-between"><h2 className="text-sm font-semibold text-white">Market indices</h2><span className="text-[10px] text-slate-500">Sample snapshot</span></div>
    <DataTable columns={["Index","Illustrative level","Change","Direction"]} rows={[["NSE 20 Share Index","2,846.32","+0.84%","Positive"],["NSE All Share Index","128.41","+0.62%","Positive"],["NSE 25 Share Index","3,912.08","+0.71%","Positive"],["FTSE NSE Kenya 15","184.20","-0.18%","Negative"]]}/>
    <div className="mt-6 rounded-xl border border-line bg-panel p-5"><h2 className="text-sm font-semibold text-white">Market data status</h2><p className="mt-2 max-w-2xl text-xs leading-6 text-slate-500">A licensed end-of-day market data source still needs to be selected and connected. The application will store the provider, market date and retrieval timestamp alongside each imported observation.</p></div>
  </SectionLayout>;
}
