import Link from "next/link";
import { Suspense } from "react";
import { ArrowRight, Boxes, Building2, CalendarDays, ClipboardCheck, FileCheck2, HeartHandshake, MapPin, PackageCheck, Route, ShieldCheck } from "lucide-react";
import type { EditorialEntry } from "@/content/editorial/types";
import { alternateFor, directoryPaths, entryById } from "@/lib/publication";
import { guideLinksFor } from "@/lib/editorial-journey";
import { absoluteUrl } from "@/lib/site";
import { Header } from "@/components/layout/Header";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Container } from "@/components/ui/Container";
import { QuoteWizard } from "@/components/interactive/QuoteWizard";
import { StateRouteMap } from "@/components/interactive/StateRouteMap";
import { JsonLd } from "@/components/seo/JsonLd";
import { SourcesReview } from "./SourcesReview";

const planningIcons = [ClipboardCheck, Building2, CalendarDays, HeartHandshake];
const serviceIcons = [Route, Building2, Boxes, ShieldCheck, HeartHandshake, PackageCheck, CalendarDays, Route];

export function LocationPage({ entry }: { entry: EditorialEntry }) {
  const content = entry.geography!;
  const es = entry.locale === "es";
  const paths = directoryPaths[entry.locale];
  const route = entry.kind === "route";
  const directory = route ? paths.route : paths.location;
  const directoryName = route ? (es ? "Rutas de mudanza" : "Moving routes") : (es ? "Destinos" : "Locations");
  const services = Object.entries(content.serviceNotes).flatMap(([id, note]) => { const service = entryById(id, entry.locale); return service ? [{ service, note }] : []; });
  const coordinationCards = (content.coordinationCards ?? []).flatMap(card => { const service = entryById(card.serviceId, entry.locale); return service ? [{ ...card, service }] : []; });
  const linkedRoutes = content.relatedRouteIds.flatMap(id => { const related = entryById(id, entry.locale); return related ? [related] : []; });
  const preparationGroups = content.challengesTitle ? [{ title: content.challengesTitle, sections: entry.sections.slice(0, 2) }, { title: content.preparationTitle, sections: entry.sections.slice(2) }] : [{ title: content.preparationTitle, sections: entry.sections }];
  const trust = es ? ["Coordinación interestatal", "Funciones claras", "Plan según su inventario"] : ["Interstate coordination", "Clear broker & carrier roles", "Planning around your inventory"];
  return <>
    <JsonLd data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: es ? "Inicio" : "Home", item: absoluteUrl(paths.home) }, { "@type": "ListItem", position: 2, name: directoryName, item: absoluteUrl(directory) }, { "@type": "ListItem", position: 3, name: entry.navLabel, item: absoluteUrl(entry.path) }] }} />
    <Header locale={entry.locale} alternatePath={alternateFor(entry)?.path} quoteHref="#quote" />
    <main id="main-content" data-content-id={entry.id} className="editorial-page">
      <section className="relative overflow-hidden bg-brand-blue py-10 text-white sm:py-16">
        <div aria-hidden className="pointer-events-none absolute -top-48 -left-24 size-[650px] rounded-full border-[100px] border-white/[.035]" />
        <Container className="relative grid items-start gap-10 lg:grid-cols-[1.1fr_.9fr] lg:gap-14">
          <div className="pt-3">
            <nav className="mb-8 flex flex-wrap gap-2 text-xs text-white/80" aria-label={es ? "Ruta de navegación" : "Breadcrumb"}><Link href={paths.home}>{es ? "Inicio" : "Home"}</Link><span aria-hidden>/</span><Link href={directory}>{directoryName}</Link></nav>
            <p className="mb-5 flex items-center gap-2 text-xs font-bold tracking-[.14em] text-brand-yellow uppercase"><MapPin size={17} aria-hidden />{content.eyebrow}</p>
            <h1 className="max-w-3xl font-display text-[clamp(36px,4.8vw,64px)] leading-[1.06] font-extrabold tracking-tight">{entry.title}</h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/90">{entry.description}</p>
            <a href="#plan" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-brand-yellow">{es ? "Explore su plan" : "Explore your move plan"}<ArrowRight size={17} aria-hidden /></a>
            <p className="mt-8 max-w-lg border-t border-white/20 pt-5 text-sm leading-relaxed text-white/80">{es ? "Vantage es un intermediario de mudanzas interestatales. El transportista asignado realiza la recogida, el transporte y la entrega. Confirme disponibilidad y servicios para su ruta." : "Vantage is an interstate moving broker. The assigned motor carrier performs pickup, transport and delivery. Confirm availability and services for your route."}</p>
          </div>
          <aside id="quote" tabIndex={-1} className="quote-entry rounded-3xl bg-white p-4 text-brand-blue shadow-xl sm:p-6">
            <div className="mb-5 border-b border-cream-border pb-5"><p className="mb-2 text-xs font-bold tracking-widest text-brand-blue-bright uppercase">{route ? "FL → NC" : "FLORIDA"}</p><h2 className="font-display text-2xl leading-tight font-extrabold">{content.quoteTitle}</h2><p className="mt-3 text-sm leading-relaxed text-ink-soft">{content.quoteDescription}</p></div>
            <Suspense><QuoteWizard variant="panel" formId={`quote-${entry.id}`} locale={entry.locale} guideLinks={guideLinksFor(entry.locale)} /></Suspense>
          </aside>
        </Container>
      </section>
      <section className="border-b border-cream-border bg-brand-yellow-soft py-5" aria-label={es ? "Cómo trabajamos" : "How we work"}><Container className="grid gap-4 sm:grid-cols-3">{trust.map((text, i) => { const Icon = [Route, HeartHandshake, ClipboardCheck][i]; return <p key={text} className="flex items-center gap-3 text-sm font-bold text-brand-blue"><Icon size={22} aria-hidden />{text}</p>; })}</Container></section>
      <section id="plan" className="scroll-mt-36 bg-cream py-14 sm:py-20"><Container>
        <p className="mb-3 text-xs font-bold tracking-widest text-brand-blue-bright uppercase">{es ? "Detalles que importan" : "The details that matter"}</p>
        <h2 className="max-w-3xl font-display text-[clamp(28px,3vw,42px)] leading-tight font-extrabold text-brand-blue">{content.planningTitle}</h2>
        <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{content.planningCards.map((card, i) => { const Icon = planningIcons[i % planningIcons.length]; return <article key={card.title} className="rounded-2xl border border-cream-border bg-white p-6 shadow-card"><span className="mb-5 inline-flex rounded-xl bg-brand-yellow-soft p-3 text-brand-blue"><Icon size={25} aria-hidden /></span><h3 className="mb-3 font-display text-xl font-extrabold text-brand-blue">{card.title}</h3><p className="text-sm leading-[1.8] text-ink-soft">{card.body}</p></article>; })}</div>
      </Container></section>
      <section className="py-14 sm:py-20"><Container className="grid items-start gap-10 lg:grid-cols-[.9fr_1.1fr]">
        <StateRouteMap origin={content.origin} destination={content.destination} locale={entry.locale} />
        <div><p className="mb-3 text-xs font-bold tracking-widest text-brand-blue-bright uppercase">{route ? "FL → NC" : "FLORIDA"}</p><h2 className="font-display text-3xl leading-tight font-extrabold text-brand-blue">{content.citiesTitle}</h2><p className="mt-4 text-base leading-relaxed text-ink-soft">{content.citiesDescription}</p><div className="mt-7 grid gap-3 sm:grid-cols-2">{content.cities.map(city => <article key={city.name} className="rounded-xl border border-cream-border bg-cream p-5"><MapPin size={17} className="mb-2 text-brand-blue-bright" aria-hidden /><h3 className="font-bold text-brand-blue">{city.name}</h3><p className="mt-2 text-sm leading-relaxed text-ink-soft">{city.detail}</p></article>)}</div></div>
      </Container></section>
      {services.length > 0 && <section className="bg-brand-blue py-14 text-white sm:py-20"><Container><p className="mb-3 text-xs font-bold tracking-widest text-brand-yellow uppercase">{es ? "Haga espacio para lo que necesita" : "Make room for what you need"}</p><h2 className="max-w-3xl font-display text-3xl leading-tight font-extrabold sm:text-4xl">{content.serviceTitle}</h2><p className="mt-4 max-w-2xl leading-relaxed text-white/80">{content.serviceIntro}</p><div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{services.map(({ service, note }, i) => { const Icon = serviceIcons[i % serviceIcons.length]; return <Link key={service.id} href={service.path} className="group rounded-2xl border border-white/20 bg-white/[.06] p-6 no-underline transition hover:bg-white/[.12]"><Icon size={26} className="mb-5 text-brand-yellow" aria-hidden /><h3 className="font-display text-lg font-extrabold text-white">{service.navLabel}</h3><p className="mt-3 text-sm leading-relaxed text-white/80">{note}</p><span className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-brand-yellow">{es ? "Explorar servicio" : "Explore this service"}<ArrowRight size={15} aria-hidden /></span></Link>; })}</div></Container></section>}
      {coordinationCards.length > 0 && <section className="py-14"><Container><h2 className="font-display text-3xl font-extrabold text-brand-blue">{es ? "Cómo se combinan los servicios en Florida" : "How Florida moving services come together"}</h2><div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{coordinationCards.map(card => { const service = card.service; return <Link href={service.path} key={card.title} className="rounded-2xl border border-cream-border bg-cream p-5 no-underline hover:border-brand-blue"><PackageCheck size={22} className="mb-3 text-brand-blue-bright" aria-hidden /><h3 className="font-display text-lg font-bold text-brand-blue">{card.title}</h3><p className="mt-2 text-sm leading-relaxed text-ink-soft">{card.body}</p><span className="mt-4 inline-block text-xs font-bold text-brand-blue">{service.navLabel} →</span></Link>; })}</div></Container></section>}
      {preparationGroups.map(group => <section key={group.title} className="bg-cream py-14 sm:py-20"><Container><p className="mb-3 text-xs font-bold tracking-widest text-brand-blue-bright uppercase">{es ? "Llegue preparado" : "Arrive prepared"}</p><h2 className="max-w-3xl font-display text-3xl leading-tight font-extrabold text-brand-blue sm:text-4xl">{group.title}</h2><div className="mt-9 grid gap-6 md:grid-cols-2">{group.sections.map((section, i) => <article key={section.heading} className="rounded-2xl border border-cream-border bg-white p-7 sm:p-8"><span className="mb-5 flex size-10 items-center justify-center rounded-full bg-brand-yellow-soft font-display text-lg font-extrabold text-brand-blue">{String(i + 1).padStart(2, "0")}</span><h3 className="mb-4 font-display text-2xl font-extrabold text-brand-blue">{section.heading}</h3>{section.paragraphs.map(p => <p key={p} className="mb-3 text-sm leading-[1.85] text-ink-soft last:mb-0">{p}</p>)}</article>)}</div></Container></section>)}
      {linkedRoutes.length > 0 && <section className="py-14"><Container><div className="grid gap-7 rounded-3xl border border-cream-border bg-white p-7 shadow-card md:grid-cols-2 sm:p-10"><div><Route size={30} className="mb-4 text-brand-blue-bright" aria-hidden /><h2 className="font-display text-3xl font-extrabold text-brand-blue">{content.routeTitle}</h2><p className="mt-4 leading-relaxed text-ink-soft">{content.routeIntro}</p></div><div className="flex flex-col justify-center gap-3">{linkedRoutes.map(linked => <Link key={linked.id} href={linked.path} className="flex items-center justify-between gap-4 rounded-2xl bg-cream p-6 font-display text-xl font-bold text-brand-blue no-underline hover:bg-brand-yellow-soft">{linked.navLabel}<ArrowRight className="shrink-0" aria-hidden /></Link>)}</div></div></Container></section>}
      <Container className="pb-14"><SourcesReview entry={entry} /></Container>
      <section className="bg-brand-yellow-soft py-12"><Container className="flex flex-wrap items-center justify-between gap-6"><div className="max-w-2xl"><FileCheck2 size={24} className="mb-3 text-brand-blue" aria-hidden /><h2 className="font-display text-3xl font-extrabold text-brand-blue">{es ? "Su próximo paso empieza con sus detalles." : "Your next step starts with your details."}</h2><p className="mt-3 leading-relaxed text-ink-soft">{es ? "Solicitar una cotización no reserva un transportista ni una fecha." : "Requesting a quote does not reserve a carrier or a date."}</p></div><a href="#quote" className="editorial-cta">{es ? "Planifique su mudanza" : "Let’s plan your move"}<span aria-hidden> →</span></a></Container></section>
    </main><SiteFooter locale={entry.locale} />
  </>;
}
