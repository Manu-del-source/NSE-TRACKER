"use client";

import { useState } from "react";
import { SectionLayout } from "@/app/components/section-layout";

export default function AlertsPage() {
  const [enabled,setEnabled] = useState(true);
  return <SectionLayout title="Alerts" description="A future alert centre for market thresholds and newly published ownership disclosures.">
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="rounded-xl border border-line bg-panel p-5"><div className="flex items-center justify-between"><div><h2 className="text-sm font-semibold text-white">Price movement alert</h2><p className="mt-1 text-[10px] text-slate-500">Example rule · SCOM moves more than 5%</p></div><button onClick={()=>setEnabled(!enabled)} className={`rounded-full px-3 py-1.5 text-[10px] ${enabled?"bg-emerald-400/10 text-emerald-300":"bg-slate-700 text-slate-300"}`}>{enabled?"Enabled":"Paused"}</button></div><div className="mt-5 border-t border-line pt-4 text-[10px] leading-5 text-slate-600">This is a local interface demonstration. Alerts will require a verified price feed and notification service before they can trigger.</div></div>
      <div className="rounded-xl border border-line bg-panel p-5"><h2 className="text-sm font-semibold text-white">Ownership disclosure alert</h2><p className="mt-1 text-[10px] text-slate-500">Example rule · Notify when a new filing is published for a watched issuer.</p><div className="mt-5 border-t border-line pt-4 text-[10px] leading-5 text-slate-600">Disclosure alerts will be generated from source documents after the record has passed verification. A publication timestamp and source link will accompany every alert.</div></div>
    </div>
    <div className="mt-5 rounded-xl border border-line bg-panel p-5"><h2 className="text-sm font-semibold text-white">Notification channels</h2><p className="mt-2 text-xs leading-6 text-slate-500">Email, in-app notifications and optional push notifications can be configured after account authentication and user preferences are implemented.</p></div>
  </SectionLayout>;
}
