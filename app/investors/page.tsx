import { SectionLayout,StatCards,DataTable } from "@/app/components/section-layout";
import { getInvestorDirectory } from "@/lib/market-data";
export const dynamic="force-dynamic";
export default async function InvestorsPage(){
 const data=await getInvestorDirectory();
 const rows=data.investors.map(person=>[person.displayName,person.investorType.replaceAll("_"," "),person.institution?.legalName??"Individual / other",String(person.ownershipEvents.length),String(person.insiderDisclosures.length)]);
 return <SectionLayout title="Investors" description="Explore people and entities identified in attributable public filings.">
 <StatCards items={[{label:"Investor profiles",value:data.databaseAvailable?String(data.totalCount):"Unavailable",note:"Profiles in the database"},{label:"Verified ownership events",value:data.databaseAvailable?String(data.investors.reduce((n,p)=>n+p.ownershipEvents.length,0)):"—",note:"Events linked to listed issuers"},{label:"Verified insider disclosures",value:data.databaseAvailable?String(data.investors.reduce((n,p)=>n+p.insiderDisclosures.length,0)):"—",note:"Publicly disclosed records"}]}/>
 {rows.length?<DataTable columns={["Investor","Classification","Institution","Ownership events","Insider disclosures"]} rows={rows}/>:<div className="rounded-xl border border-line bg-panel p-6"><h2 className="text-sm font-medium text-white">{data.databaseAvailable?"No investor profiles imported":"Database unavailable"}</h2><p className="mt-2 text-xs leading-6 text-slate-500">{data.databaseAvailable?"Investor profiles will appear after attributable public filings have been captured and reviewed. No identities are inferred from aggregate market volume.":"Check the Neon connection and applied database schema."}</p></div>}
 <p className="mt-5 rounded-xl border border-line bg-panel p-5 text-xs leading-6 text-slate-500">Only public identities supported by a source document are displayed. A name match alone is not sufficient to establish that two records refer to the same person.</p>
 </SectionLayout>;
}