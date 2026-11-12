import { SectionLayout, StatCards, DataTable } from "@/app/components/section-layout";

export default function InstitutionsPage() {
  return <SectionLayout title="Institutions" description="Track institutional shareholding based on public reports and attributable disclosures.">
    <StatCards items={[{label:"Institution profiles",value:"0",note:"No verified profiles imported"},{label:"Holdings records",value:"0",note:"Awaiting source documents"},{label:"Reporting frequency",value:"Periodic",note:"Depends on issuer disclosures"}]}/>
    <div className="mb-4"><h2 className="text-sm font-semibold text-white">Institutional holdings register</h2><p className="mt-1 text-[10px] text-slate-500">Records will be shown only when supported by a published source.</p></div>
    <DataTable columns={["Institution","Issuer","Reported holding","As at","Source status"]} rows={[["No institutional holdings imported","—","—","—","Awaiting source"]]}/>
  </SectionLayout>;
}
