"use client";

import { useState, type ChangeEvent } from "react";
import { Search, X } from "lucide-react";
import { CmsText, CmsElement } from "@/components/cms/Content";
import { filterResources, resourceTopics, type ResourceTopic } from "@/content/editorial/resource-center";
import type { EditorialEntry, EditorialLocale } from "@/content/editorial/types";
import { EditorialCards } from "./EditorialCards";

export function ResourceLibrary({ entries, locale }: { entries: EditorialEntry[]; locale: EditorialLocale }) {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState<ResourceTopic>("all");
  const es = locale === "es";
  const results = filterResources(entries, query, topic);
  const active = query.trim() || topic !== "all";
  const reset = () => { setQuery(""); setTopic("all"); };
  return <section id="articles" className="mb-16 scroll-mt-36" aria-labelledby="library-heading">
    <div className="mb-7 flex flex-wrap items-end justify-between gap-5">
      <div><p className="mb-3 text-xs font-bold tracking-widest text-ink-soft uppercase"><CmsText scope="components/editorial/ResourceLibrary.tsx">{es ? "La biblioteca" : "The reading room"}</CmsText></p>
        <h2 id="library-heading" className="font-display text-3xl font-extrabold text-brand-blue"><CmsText scope="components/editorial/ResourceLibrary.tsx">{es ? "Encuentre su próximo paso" : "Find your next step"}</CmsText></h2></div>
      <div className="w-full sm:max-w-sm"><label htmlFor="resource-search" className="mb-2 block text-sm font-semibold text-brand-blue"><CmsText scope="components/editorial/ResourceLibrary.tsx">{es ? "Buscar artículos" : "Search articles"}</CmsText></label>
        <div className="relative"><Search size={19} aria-hidden className="pointer-events-none absolute top-3.5 left-4 text-ink-soft" /><CmsElement element="input" scope="components/editorial/ResourceLibrary.tsx" id="resource-search" type="search" value={query} onChange={(event: ChangeEvent<HTMLInputElement>) => setQuery(event.target.value)} placeholder={es ? "Inventario, costos, documentos…" : "Inventory, costs, paperwork…"} className="min-h-12 w-full rounded-xl border border-cream-border bg-white py-3 pr-4 pl-11 text-base text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue" /></div>
      </div>
    </div>
    <div role="group" aria-label={es ? "Filtrar artículos por tema" : "Filter articles by topic"} className="flex flex-wrap gap-2">
      {resourceTopics.map(item => <button key={item.id} type="button" aria-pressed={topic === item.id} aria-controls="resource-results" onClick={() => setTopic(item.id)} className={`min-h-11 rounded-full border px-4 py-2 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue ${topic === item.id ? "border-brand-blue bg-brand-blue text-white" : "border-cream-border bg-white text-brand-blue hover:border-brand-blue"}`}><CmsText scope="content/editorial/resource-center.ts">{item[locale]}</CmsText></button>)}
    </div>
    <div className="my-5 flex min-h-8 flex-wrap items-center justify-between gap-3 text-sm text-ink-soft">
      <p role="status" aria-live="polite" aria-atomic="true"><CmsText scope="components/editorial/ResourceLibrary.tsx">{es ? `${results.length} de ${entries.length} artículos` : `${results.length} of ${entries.length} articles`}</CmsText></p>
      {active && <button type="button" onClick={reset} className="inline-flex min-h-10 items-center gap-2 font-semibold text-brand-blue underline underline-offset-4"><X size={15} aria-hidden /><CmsText scope="components/editorial/ResourceLibrary.tsx">{es ? "Borrar filtros" : "Clear filters"}</CmsText></button>}
    </div>
    <div id="resource-results">{results.length ? <EditorialCards entries={results} /> : <div className="rounded-2xl border border-dashed border-cream-border bg-white px-6 py-14 text-center"><h3 className="font-display text-2xl font-bold text-brand-blue"><CmsText scope="components/editorial/ResourceLibrary.tsx">{es ? "No encontramos artículos" : "No articles found"}</CmsText></h3><p className="mt-3 text-ink-soft"><CmsText scope="components/editorial/ResourceLibrary.tsx">{es ? "Pruebe otra palabra o borre los filtros para ver todas las guías." : "Try another keyword or clear the filters to see every guide."}</CmsText></p><button type="button" onClick={reset} className="mt-6 min-h-11 rounded-full bg-brand-blue px-6 py-3 font-semibold text-white"><CmsText scope="components/editorial/ResourceLibrary.tsx">{es ? "Ver todos los artículos" : "Show all articles"}</CmsText></button></div>}</div>
  </section>;
}
