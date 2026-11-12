"use client";

import { useState } from "react";
import { SectionLayout, DataTable } from "@/app/components/section-layout";

const initial = ["SCOM","EQTY","KCB"];
export default function WatchlistPage() {
  const [symbols,setSymbols] = useState(initial);
  const [value,setValue] = useState("");
  function add() { const symbol=value.trim().toUpperCase(); if(symbol && !symbols.includes(symbol)) setSymbols([...symbols,symbol]); setValue(""); }
  return <SectionLayout title="Watchlist" description="Keep selected NSE symbols together for faster research.">
    <div className="mb-5 rounded-xl border border-line bg-panel p-5"><h2 className="text-sm font-semibold text-white">Add a symbol</h2><div className="mt-3 flex max-w-md gap-2"><input value={value} onChange={e=>setValue(e.target.value)} onKeyDown={e=>e.key==="Enter"&&add()} placeholder="e.g. SCOM" className="h-10 min-w-0 flex-1 rounded-lg border border-line bg-ink px-3 text-xs uppercase text-white outline-none placeholder:normal-case placeholder:text-slate-600 focus:border-gold/50"/><button onClick={add} className="rounded-lg bg-gold px-4 text-xs font-semibold text-ink hover:bg-amber-300">Add</button></div><p className="mt-2 text-[10px] text-slate-600">Preview only: changes are held in this page session and are not saved to an account yet.</p></div>
    <div className="mb-3 flex items-center justify-between"><h2 className="text-sm font-semibold text-white">Your symbols</h2><span className="text-[10px] text-slate-500">{symbols.length} tracked</span></div>
    <DataTable columns={["Symbol","Tracking status","Price feed","Action"]} rows={symbols.map(s=>[s,"On watchlist","Not connected","Tracked locally"])}/>
    {symbols.length===0&&<p className="rounded-xl border border-line bg-panel p-6 text-center text-xs text-slate-500">Your watchlist is empty. Add a symbol above.</p>}
  </SectionLayout>;
}
