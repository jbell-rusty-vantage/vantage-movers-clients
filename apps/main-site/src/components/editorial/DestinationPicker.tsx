"use client";
import { CmsText, CmsElement } from "@/components/cms/Content";

import { CmsLink as Link } from "@/components/cms/Content";
import { useId, useState } from "react";
export function DestinationPicker({ locale, choices, generic }: { locale: "en" | "es"; choices: {label:string;path:string}[]; generic:string }) {
  const id = useId();
  const [path, setPath] = useState(generic);
  const es = locale === "es";
  return <div className="mb-10 rounded-card border border-cream-border bg-white p-6">
    <label htmlFor={id} className="mb-3 block font-bold text-brand-blue"><CmsText scope="components/editorial/DestinationPicker.tsx">{es ? "¿Qué destino quiere explorar?" : "Which destination would you like to explore?"}</CmsText></label>
    <div className="flex flex-wrap items-center gap-4"><select id={id} className="max-w-full rounded-lg2 border border-cream-border bg-cream p-3" value={path} onChange={e => setPath(e.target.value)}><CmsElement element="option" scope="components/editorial/DestinationPicker.tsx" value={generic}>{es ? "Otro destino o todavía no lo sé" : "Another destination or not sure yet"}</CmsElement><CmsText scope="components/editorial/DestinationPicker.tsx">{choices.map(c => <CmsElement element="option" scope="components/editorial/DestinationPicker.tsx" key={c.path} value={c.path}>{c.label}</CmsElement>)}</CmsText></select><Link scope="components/editorial/DestinationPicker.tsx" href={path} className="editorial-cta"><CmsText scope="components/editorial/DestinationPicker.tsx">{es ? "Ver guía" : "Open guide"}</CmsText></Link></div>
    <p className="mt-3 text-sm text-ink-soft"><CmsText scope="components/editorial/DestinationPicker.tsx">{es ? "Esta elección solo abre una guía; no cambia el destino de su cotización." : "This choice opens a guide; it does not change your quote's delivery location."}</CmsText></p>
  </div>;
}
