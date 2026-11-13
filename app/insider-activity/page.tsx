import { SectionLayout, StatCards, DataTable } from "@/app/components/section-layout";
import { getInsiderLedger } from "@/lib/market-data";

export const dynamic = "force-dynamic";

function formatDate(value: Date | null) {
  return value ? new Intl.DateTimeFormat("en-KE", { dateStyle: "medium", timeZone: "Africa/Nairobi" }).format(value) : "Not stated";
}

export default async function InsiderActivityPage() {
  const ledger = await getInsiderLedger();
  type InsiderEvent = (typeof ledger.events)[number];
  const rows = ledger.events.map((event: InsiderEvent) => [
    event.company.symbol,
    event.person.displayName,
    event.transactionType,
    formatDate(event.transactionDate),
    event.sourceDocument.title,
  ]);

  return <SectionLayout title="Insider activity" description="Review director and other insider dealings only where formally disclosed and publicly attributable.">
    <StatCards items={[
      {label:"Verified disclosures",value:ledger.databaseAvailable ? String(ledger.totalCount) : "Unavailable",note:"Sourced public disclosures"},
      {label:"Issuers represented",value:ledger.databaseAvailable ? String(ledger.issuerCount) : "—",note:"Based on verified notices"},
      {label:"Awaiting review",value:ledger.databaseAvailable ? String(ledger.pendingCount) : "—",note:"Not presented as confirmed activity"},
    ]}/>
    <div className="mb-4"><h2 className="text-sm font-semibold text-white">Disclosed insider dealings</h2><p className="mt-1 text-[10px] text-slate-500">No inferred trades or private account activity is displayed.</p></div>
    {rows.length
      ? <DataTable columns={["Issuer","Disclosed person","Transaction type","Transaction date","Source document"]} rows={rows}/>
      : <div className="rounded-xl border border-line bg-panel p-5"><h3 className="text-sm font-medium text-white">{ledger.databaseAvailable ? "No verified insider disclosures imported" : "Database unavailable"}</h3><p className="mt-2 text-xs leading-6 text-slate-500">{ledger.databaseAvailable ? "Only formally disclosed and verified dealings will appear here. Every published record must link to its supporting public source." : "Configure the PostgreSQL connection and apply the reviewed migration to load disclosure records."}</p></div>}
    <p className="mt-4 text-[10px] leading-5 text-slate-600">The platform will not claim that a director bought or sold shares unless the statement is supported by a relevant public disclosure.</p>
  </SectionLayout>;
}
