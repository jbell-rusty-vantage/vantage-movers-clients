"use client";
import Link from "next/link";
import { useId, useState } from "react";
export function DestinationPicker({ locale, choices, generic }: { locale: "en" | "es"; choices: {label:string;path:string}[]; generic:string }) {
  const id = useId();
  const [path, setPath] = useState(generic);
  const es = locale === "es";
  return <div className="mb-10 rounded-card border border-cream-border bg-white p-6">
    <label htmlFor={id} className="mb-3 block font-bold text-brand-blue">{es ? "¿Qué destino quiere explorar?" : "Which destination would you like to explore?"}</label>
    <div className="flex flex-wrap items-center gap-4"><select id={id} className="max-w-full rounded-lg2 border border-cream-border bg-cream p-3" value={path} onChange={e => setPath(e.target.value)}><option value={generic}>{es ? "Otro destino o todavía no lo sé" : "Another destination or not sure yet"}</option>{choices.map(c => <option key={c.path} value={c.path}>{c.label}</option>)}</select><Link href={path} className="editorial-cta">{es ? "Ver guía" : "Open guide"}</Link></div>
    <p className="mt-3 text-sm text-ink-soft">{es ? "Esta elección solo abre una guía; no cambia el destino de su cotización." : "This choice opens a guide; it does not change your quote's delivery location."}</p>
  </div>;
}
