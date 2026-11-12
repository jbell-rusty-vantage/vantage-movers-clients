import Link from "next/link";
import { ServiceFollowThrough } from "./ServiceFollowThrough";
import Image from "next/image";
import { guideLinksFor } from "@/lib/editorial-journey";
import { articleDetails } from "@/content/editorial/resource-center";
import { ArticleMetadata } from "./ArticleMetadata";
import { PricingContext } from "./PricingContext";
import { Suspense } from "react";
import type { EditorialEntry } from "@/content/editorial/types";
import { editorialSources } from "@/content/editorial/sources";
import { alternateFor, directoryPaths, entryById } from "@/lib/publication";
import { Header } from "@/components/layout/Header";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { QuoteWizard } from "@/components/interactive/QuoteWizard";
import { Container } from "@/components/ui/Container";
import { PrintButton } from "./PrintButton";
import { EditorialCards } from "./EditorialCards";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl } from "@/lib/site";
import { ServiceHero } from "./ServiceHero";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { MilitaryAppreciation } from "@/components/sections/MilitaryAppreciation";

export function EditorialPage({ entry }: { entry: EditorialEntry }) {
  const es = entry.locale === "es";
  const paths = directoryPaths[entry.locale];
  const directory = entry.kind === "service" ? paths.service : entry.kind === "resource" ? paths.resource : paths.location;
  const directoryName = entry.kind === "service" ? (es ? "Servicios" : "Services") : entry.kind === "resource" ? (es ? "Guías" : "Resources") : (es ? "Destinos" : "Locations");
  const related = entry.relatedIds.flatMap(id => { const e = entryById(id, entry.locale); return e ? [e] : []; });
  const sources = editorialSources.filter(source => entry.sourceIds.includes(source.id));
  return <>
    <JsonLd data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: es ? "Inicio" : "Home", item: absoluteUrl(paths.home) }, { "@type": "ListItem", position: 2, name: directoryName, item: absoluteUrl(directory) }, { "@type": "ListItem", position: 3, name: entry.navLabel, item: absoluteUrl(entry.path) }] }} />
    <Header locale={entry.locale} alternatePath={alternateFor(entry)?.path} quoteHref="#quote" />
    <main id="main-content" data-content-id={entry.id} className="editorial-page">
      {entry.kind === "service" ? <ServiceHero entry={entry} /> : <section className="relative overflow-hidden bg-brand-blue py-10 text-white sm:py-16">
        <Container className="relative">
          <nav aria-label={es ? "Ruta de navegación" : "Breadcrumb"} className="mb-7 flex flex-wrap gap-2 text-sm text-white/85">
            <Link href={paths.home}>{es ? "Inicio" : "Home"}</Link><span aria-hidden>/</span><Link href={directory}>{directoryName}</Link>
            {entry.kind === "city" && entryById("wisconsin", entry.locale) && <><span aria-hidden>/</span><Link href={entryById("wisconsin", entry.locale)!.path}>Wisconsin</Link></>}
          </nav>
          <p className="mb-3 text-sm font-bold tracking-widest text-brand-yellow uppercase">Vantage Movers · {directoryName}</p>
          {entry.kind === "resource" && <div className="mb-5"><ArticleMetadata entry={entry} /></div>}
          <h1 className="max-w-[900px] font-display text-[clamp(30px,4vw,52px)] leading-[1.12] font-extrabold">{entry.title}</h1>
          <p className="mt-6 max-w-[760px] text-lg leading-relaxed">{entry.description}</p>
          <div className="mt-7 flex flex-wrap gap-4"><a className="editorial-cta" href="#quote">{es ? "Solicitar una cotización" : "Request a moving quote"}</a><Link className="self-center text-white" href={paths.resource}>{es ? "Explorar guías" : "Explore moving guides"}</Link></div>
        </Container>
      </section>}
      <Container className="py-10 sm:py-14">
        {entry.kind === "resource" && <figure className="mb-10"><div className="relative mx-auto aspect-[3/2] max-w-4xl overflow-hidden rounded-3xl"><Image src={articleDetails(entry).poster} alt="" fill sizes="(min-width: 1280px) 1200px, 100vw" className="object-cover" /></div><figcaption className="mt-2 text-xs text-ink-soft">{es ? "Imagen ilustrativa · Guía editorial de Vantage" : "Illustrative image · Vantage editorial guide"}</figcaption></figure>}
        {entry.id === "long-distance-moving" && <PricingContext locale={entry.locale} />}
        {entry.review.status === "draft" && <aside className="preview-note mb-8 rounded-lg2 border border-cream-border bg-cream p-4 text-sm" aria-label={es ? "Estado de revisión" : "Review status"}>{es ? "Vista previa editorial. Borrador pendiente de revisión de Vantage y del texto en español." : "Editorial preview. Draft awaiting Vantage review; Spanish approval is tracked separately."}</aside>}
        <div className={entry.kind === "service" ? "" : "grid items-start gap-10 lg:grid-cols-[1.15fr_.85fr]"}>
          <div id="service-details" className="min-w-0 scroll-mt-36">
            {entry.kind === "resource" && <nav aria-label={es ? "En esta guía" : "In this guide"} className="mb-8 rounded-2xl bg-cream p-6"><p className="mb-3 font-bold text-brand-blue">{es ? "En esta guía" : "In this guide"}</p><ul className="space-y-3">{entry.sections.filter(section => entry.kind !== "service" || !section.heading.endsWith("?")).map((section, i) => <li key={section.heading}><a href={`#section-${i}`}>{section.heading}</a></li>)}</ul></nav>}
            {entry.sections.filter(section => entry.kind !== "service" || !section.heading.endsWith("?")).map((section, i) => <section key={section.heading} className={entry.kind === "service" ? "mb-6 rounded-2xl border border-cream-border bg-cream/50 p-6 sm:p-8" : "mb-10"} aria-labelledby={`section-${i}`}>
              {entry.kind === "service" && <p className="mb-3 text-xs font-bold tracking-widest text-brand-blue-bright">{String(i + 1).padStart(2, "0")} / {entry.navLabel}</p>}
              <h2 id={`section-${i}`} className="scroll-mt-36 mb-4 font-display text-2xl font-extrabold text-brand-blue">{section.heading}</h2>
              {section.paragraphs.map(p => <p key={p} className="mb-4 text-base leading-[1.8] text-ink-soft">{p}</p>)}
              {section.bullets && <ul className="list-disc space-y-3 pl-6 leading-[1.75] text-ink-soft">{section.bullets.map(b => <li key={b}>{b}</li>)}</ul>}
            </section>)}
          </div>
          {entry.kind !== "service" && <aside id="quote" tabIndex={-1} className="quote-entry lg:col-start-2">
            <Suspense><QuoteWizard variant="panel" formId={`quote-${entry.id}`} locale={entry.locale} guideLinks={guideLinksFor(entry.locale)} /></Suspense>
            <p className="mt-5 text-sm leading-relaxed text-ink-soft">{es ? "Vantage es un intermediario de mudanzas interestatales. El transportista asignado realiza la recogida, el transporte y la entrega. Solicitar una cotización no reserva un transportista ni una fecha." : "Vantage is an interstate moving broker. The assigned motor carrier performs pickup, transport and delivery. A quote request does not reserve a carrier or a date."}</p>
          </aside>}
        </div>
        {entry.worksheet && <section className="worksheet mb-12">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3"><h2 className="font-display text-2xl font-bold text-brand-blue">{entry.worksheet.rows.length ? (es ? "Ejemplo de comparación" : "Worked comparison") : entry.navLabel}</h2><PrintButton locale={entry.locale} /></div>
          {entry.worksheet.rows.length > 0 && <div className="overflow-x-auto"><table className="w-full border-collapse text-left text-sm"><caption className="mb-4 text-left leading-relaxed">{entry.worksheet.caption}</caption><thead><tr>{entry.worksheet.columns.map(c => <th key={c} scope="col" className="border border-cream-border bg-cream p-4">{c}</th>)}</tr></thead><tbody>{entry.worksheet.rows.map(r => <tr key={r.label}><th scope="row" className="border border-cream-border p-4">{r.label}</th><td className="border border-cream-border p-4 leading-relaxed">{r.a}</td><td className="border border-cream-border p-4 leading-relaxed">{r.b}</td></tr>)}</tbody></table></div>}
          <p className="my-6 leading-relaxed">{entry.worksheet.conclusion}</p>
          <h3 className="mb-4 font-display text-xl font-bold">{entry.worksheet.rows.length ? (es ? "Compare sus propias propuestas" : "Compare your own estimates") : (es ? "Su inventario" : "Your inventory")}</h3>
          <table className="w-full border-collapse text-left text-sm"><thead><tr>{(entry.worksheet.rows.length ? [entry.worksheet.columns[0], es ? "Mi propuesta A" : "My estimate A", es ? "Mi propuesta B" : "My estimate B"] : entry.worksheet.columns).map(c => <th key={c} scope="col" className="border border-cream-border bg-cream p-3">{c}</th>)}</tr></thead><tbody>{entry.worksheet.blankRows.map(r => <tr key={r}><th scope="row" className="w-1/3 border border-cream-border p-3">{r}</th><td className="border border-cream-border p-3"><span className="block min-h-12" /></td><td className="border border-cream-border p-3"><span className="block min-h-12" /></td></tr>)}</tbody></table>
        </section>}
        <section className="border-t border-cream-border pt-8">
          <h2 className="mb-4 font-display text-xl font-bold text-brand-blue">{es ? "Fuentes y revisión" : "Sources and review"}</h2>
          <p className="mb-4 text-sm">{es ? "Preparado por" : "Prepared by"}: {entry.review.author} · {es ? "Fuentes comprobadas" : "Sources checked"}: {entry.review.checkedAt} · {es ? "Revisión" : "Reviewer"}: {entry.review.reviewer ?? (es ? "pendiente" : "pending")}</p>
          <ul className="space-y-3">{sources.map(s => <li key={s.id}><a href={s.url} target="_blank" rel="noopener noreferrer">{s.title} <span className="text-sm">({es ? "abre otra pestaña; fuente en inglés" : "opens a new tab"})</span></a></li>)}</ul>
        </section>
        {related.length > 0 && <section className="mt-12"><h2 className="mb-6 font-display text-2xl font-bold text-brand-blue">{es ? "Siguiente paso" : "Your next step"}</h2><EditorialCards entries={related} /></section>}
      </Container>
      {entry.kind === "service" && <HowItWorksSection locale={entry.locale} />}
      {entry.id === "military-moving" && <MilitaryAppreciation locale={entry.locale} servicePage />}
      {entry.kind === "service" && <Suspense><ServiceFollowThrough entry={entry} /></Suspense>}
      {entry.kind === "service" && <section className="bg-cream py-14"><Container className="flex flex-wrap items-center justify-between gap-6"><h2 className="max-w-2xl font-display text-3xl font-extrabold text-brand-blue">{es ? "Su próximo capítulo empieza con una conversación." : "Your next chapter starts with a conversation."}</h2><a href="#quote" className="editorial-cta">{es ? "Planifique su mudanza →" : "Let’s plan your move →"}</a></Container></section>}
    </main><SiteFooter locale={entry.locale} />
  </>;
}
