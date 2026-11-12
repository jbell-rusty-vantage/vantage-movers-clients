import Link from "next/link";
import type { EditorialEntry, EditorialLocale } from "@/content/editorial/types";
import { resourceTypes } from "@/content/editorial/resource-center";
import { EditorialCards } from "./EditorialCards";
import { MovingAssistant } from "@/components/resources/MovingAssistant";

export function ResourceCenter({ entries, locale }: { entries: EditorialEntry[]; locale: EditorialLocale }) {
  const es = locale === "es";
  const types = resourceTypes(locale);
  const authorities = [
    { title: "FMCSA · Protect Your Move", href: "https://www.fmcsa.dot.gov/protect-your-move", text: es ? "Derechos y preparación para mudanzas interestatales." : "Interstate moving rights and preparation, before and after your move." },
    { title: es ? "FMCSA · Busque una empresa" : "FMCSA · Search a Mover", href: "https://www.fmcsa.dot.gov/protect-your-move/search-mover", text: es ? "Consulte el registro federal y el tipo de empresa." : "Look up federal registration and whether a company is a broker or carrier." },
    { title: "USA.gov · Consumer Protection", href: "https://www.usa.gov/state-consumer", text: es ? "Encuentre oficinas de protección al consumidor por estado o territorio." : "Find consumer protection offices by state or territory." },
  ];
  return <>
    <nav aria-label={es ? "Tipos de recursos" : "Resource types"} className="mb-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{types.map(type => <Link key={type.id} href={type.href} className="rounded-2xl border border-cream-border bg-white p-5 no-underline hover:border-brand-blue"><span className="font-display text-lg font-bold text-brand-blue">{type.label} ↗</span><p className="mt-2 text-sm leading-relaxed text-ink-soft">{type.description}</p></Link>)}</nav>
    <section id="moving-authorities" className="mb-16 scroll-mt-36 rounded-3xl bg-brand-blue p-6 text-white sm:p-10"><p className="mb-3 text-xs font-bold tracking-widest uppercase">{es ? "Empiece con fuentes oficiales" : "Start with official sources"}</p><h2 className="mb-6 font-display text-3xl font-extrabold">{types[3].label}</h2><div className="grid gap-4 lg:grid-cols-3">{authorities.map(a => <a key={a.href} href={a.href} target="_blank" rel="noopener noreferrer" className="rounded-2xl border border-white/30 p-5 text-white no-underline hover:bg-white/10"><h3 className="font-bold">{a.title} ↗</h3><p className="mt-3 text-sm leading-relaxed">{a.text}</p><p className="mt-4 text-xs">{es ? "Fuente oficial en inglés · nueva pestaña" : "Official source · opens a new tab"}</p></a>)}</div></section>
    <section id="articles" className="mb-16 scroll-mt-36"><p className="mb-3 text-xs font-bold tracking-widest text-brand-blue uppercase">{es ? "La biblioteca de Vantage" : "The Vantage library"}</p><h2 className="mb-3 font-display text-3xl font-extrabold text-brand-blue">{es ? "Artículos para una mudanza informada" : "Articles for a better-informed move"}</h2><p className="mb-8 max-w-3xl leading-relaxed text-ink-soft">{es ? "Explore nuestros borradores de guías. Las fechas indican la revisión del borrador; todavía no son fechas de publicación." : "Explore our draft guides. Dates identify draft updates; publication dates will appear after editorial approval."}</p><EditorialCards entries={entries} /></section>
    <section id="moving-guides" className="mb-16 scroll-mt-36"><h2 className="mb-6 font-display text-3xl font-extrabold text-brand-blue">{es ? "Explore las guías esenciales" : "Explore the essential guides"}</h2><div className="grid gap-4 sm:grid-cols-3">{[
      { id: "moving-cost-guide", label: es ? "Presupuesto y costos" : "Budget & moving costs" },
      { id: "items-to-check-before-packing", label: es ? "Embalaje y preparación" : "Packing & preparation" },
      { id: "moving-paperwork-guide", label: es ? "Documentos y responsabilidades" : "Paperwork & responsibilities" },
    ].map(topic => { const entry = entries.find(e => e.id === topic.id); return entry && <Link key={topic.id} href={entry.path} className="rounded-2xl border border-cream-border bg-white p-6 font-bold no-underline">{topic.label} →<p className="mt-3 text-sm leading-relaxed font-normal text-ink-soft">{entry.description}</p></Link>; })}</div></section>
    <section id="checklists" className="mb-16 scroll-mt-36"><h2 className="mb-3 font-display text-3xl font-extrabold text-brand-blue">{types[2].label}</h2><p className="mb-6 text-ink-soft">{es ? "Hojas imprimibles para preparar su conversación y comparar propuestas por escrito." : "Printable worksheets to prepare for your call and compare written estimates."}</p><EditorialCards entries={entries.filter(e => Boolean(e.worksheet))} /></section>
    <MovingAssistant locale={locale} />
    <div className="mt-10 flex flex-wrap gap-6 text-sm"><Link href="/carrier-contacts">{es ? "Contactos de transportistas (inglés)" : "Carrier contacts"}</Link><Link href="/consumer-information">{es ? "Información al consumidor (inglés)" : "Consumer information"}</Link></div>
  </>;
}
