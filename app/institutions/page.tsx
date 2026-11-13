import { SectionLayout,StatCards,DataTable } from "@/app/components/section-layout";
import { getInstitutionDirectory } from "@/lib/market-data";
export const dynamic="force-dynamic";
export default async function InstitutionsPage(){
 const data=await getInstitutionDirectory();
 const holdings=data.institutions.flatMap(item=>item.investor.shareholdings.map(h=>[item.legalName,h.company.symbol,h.sharesHeld?.toString()??"Not stated",h.ownershipPercent?.toString()??"Not stated",new Intl.DateTimeFormat("en-KE",{dateStyle:"medium",timeZone:"Africa/Nairobi"}).format(h.asOfDate),h.sourceDocument.title]));
 return <SectionLayout title="Institutions" description="Track institutional holdings from published and verified reports.">
 <StatCards items={[{label:"Institution profiles",value:data.databaseAvailable?String(data.totalCount):"Unavailable",note:"Stored institution records"},{label:"Verified holdings",value:data.databaseAvailable?String(holdings.length):"—",note:"Latest records loaded for each institution"},{label:"Data status",value:"Source-backed",note:"No inferred holdings"}]}/>
 {holdings.length?<DataTable columns={["Institution","Issuer","Shares held","Ownership %","As at","Source"]} rows={holdings}/>:<div className="rounded-xl border border-line bg-panel p-6"><h2 className="text-sm font-medium text-white">{data.databaseAvailable?"No verified institutional holdings imported":"Database unavailable"}</h2><p className="mt-2 text-xs leading-6 text-slate-500">{data.databaseAvailable?"Holdings appear only after their source documents and verification status have been recorded.":"Check the Neon connection and applied database schema."}</p></div>}
 </SectionLayout>;
}