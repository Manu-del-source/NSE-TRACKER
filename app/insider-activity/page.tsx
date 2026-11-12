import { SectionLayout, StatCards, DataTable } from "@/app/components/section-layout";

export default function InsiderActivityPage() {
  return <SectionLayout title="Insider activity" description="Review director and other insider dealings only where formally disclosed and publicly attributable.">
    <StatCards items={[{label:"Disclosures in register",value:"0",note:"No filings imported"},{label:"Issuers represented",value:"0",note:"Based on public notices"},{label:"Review status",value:"Not started",note:"Disclosure workflow pending"}]}/>
    <div className="mb-4"><h2 className="text-sm font-semibold text-white">Disclosed insider dealings</h2><p className="mt-1 text-[10px] text-slate-500">No inferred trades or private account activity is displayed.</p></div>
    <DataTable columns={["Issuer","Disclosed person","Transaction type","Disclosure date","Source"]} rows={[["No insider disclosures imported","—","—","—","Awaiting filing"]]}/>
    <p className="mt-4 text-[10px] leading-5 text-slate-600">The platform will not claim that a director bought or sold shares unless the statement is supported by a relevant public disclosure.</p>
  </SectionLayout>;
}
