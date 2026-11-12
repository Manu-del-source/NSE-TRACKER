import { SectionLayout, StatCards, DataTable } from "@/app/components/section-layout";

export default function InvestorsPage() {
  return <SectionLayout title="Investors" description="Explore investors identified in public filings and other permitted ownership disclosures.">
    <StatCards items={[{label:"Investor profiles",value:"Pending",note:"Created from sourced disclosures"},{label:"Verified ownership records",value:"0",note:"No records imported yet"},{label:"Last disclosure import",value:"Not available",note:"Data pipeline not configured"}]}/>
    <div className="mb-4"><h2 className="text-sm font-semibold text-white">Investor directory</h2><p className="mt-1 text-[10px] text-slate-500">No investor data is being fabricated for this preview.</p></div>
    <DataTable columns={["Investor","Classification","Associated issuer","Record status"]} rows={[["No investor profiles yet","—","—","Awaiting public filings"]]}/>
    <div className="mt-5 rounded-xl border border-line bg-panel p-5"><h2 className="text-sm font-semibold text-white">Identity and attribution rules</h2><ul className="mt-3 list-disc space-y-2 pl-4 text-xs leading-5 text-slate-500"><li>Only identify investors where a public, attributable source supports the identity.</li><li>Store the source document, publication date and effective date separately.</li><li>Do not infer an individual buyer or seller from aggregate exchange volume.</li></ul></div>
  </SectionLayout>;
}
