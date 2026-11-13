import { SectionLayout, StatCards, DataTable } from "@/app/components/section-layout";
import { getOwnershipLedger } from "@/lib/market-data";

export const dynamic = "force-dynamic";

function formatDate(value: Date | null) {
  return value ? new Intl.DateTimeFormat("en-KE", { dateStyle: "medium", timeZone: "Africa/Nairobi" }).format(value) : "Not stated";
}

export default async function OwnershipPage() {
  const ledger = await getOwnershipLedger();
  const rows = ledger.events.map((event) => [
    event.company.symbol,
    event.investor.displayName,
    event.eventType.replaceAll("_", " "),
    formatDate(event.effectiveDate),
    event.sourceDocument.title,
  ]);

  return <SectionLayout title="Ownership changes" description="A sourced timeline of reported changes in substantial and other disclosed shareholdings.">
    <StatCards items={[
      {label:"Verified ownership events",value:ledger.databaseAvailable ? String(ledger.verifiedCount) : "Unavailable",note:"Publicly sourced and verified records"},
      {label:"Issuers covered",value:ledger.databaseAvailable ? String(ledger.issuerCount) : "—",note:"Issuers with verified disclosures"},
      {label:"Awaiting review",value:ledger.databaseAvailable ? String(ledger.pendingCount) : "—",note:"Not displayed as confirmed activity"},
    ]}/>
    <div className="mb-4"><h2 className="text-sm font-semibold text-white">Ownership event ledger</h2><p className="mt-1 text-[10px] text-slate-500">Only verified disclosures appear below. This is not a live order book or a list of exchange counterparties.</p></div>
    {rows.length
      ? <DataTable columns={["Issuer","Investor","Reported change","Effective date","Source document"]} rows={rows}/>
      : <div className="rounded-xl border border-line bg-panel p-5"><h3 className="text-sm font-medium text-white">{ledger.databaseAvailable ? "No verified ownership events yet" : "Database unavailable"}</h3><p className="mt-2 text-xs leading-6 text-slate-500">{ledger.databaseAvailable ? "No ownership events have been imported and verified. New records must include a source document before they can be published." : "Configure the PostgreSQL connection and apply the reviewed migration to load disclosure records."}</p></div>}
    <div className="mt-5 rounded-xl border border-line bg-panel p-5"><h2 className="text-sm font-semibold text-white">How an event becomes verified</h2><div className="mt-4 grid gap-4 text-xs text-slate-500 sm:grid-cols-3"><div><b className="text-slate-200">01 · Source</b><p className="mt-1 leading-5">Capture the original filing or annual report.</p></div><div><b className="text-slate-200">02 · Review</b><p className="mt-1 leading-5">Check issuer, investor, share class and dates.</p></div><div><b className="text-slate-200">03 · Publish</b><p className="mt-1 leading-5">Publish only after verification, with evidence retained.</p></div></div></div>
  </SectionLayout>;
}
