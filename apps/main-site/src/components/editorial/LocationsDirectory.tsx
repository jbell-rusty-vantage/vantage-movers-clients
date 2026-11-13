import { ArrowRight, MapPin, Route } from "lucide-react";
import { CmsLink as Link, CmsText } from "@/components/cms/Content";
import { Header } from "@/components/layout/Header";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Container } from "@/components/ui/Container";
import { EditorialCards } from "./EditorialCards";
import type { EditorialEntry, EditorialLocale } from "@/content/editorial/types";
import usa from "@/content/geography/usa-map.json";
import { directoryStateCodes, stateRegions } from "@/content/geography/state-regions";
import { stateNames } from "@/lib/content";
import { directoryPaths, entriesForDirectory } from "@/lib/publication";

const scope = "components/editorial/LocationsDirectory.tsx";

export function LocationsDirectory({ locale, guides }: { locale: EditorialLocale; guides: EditorialEntry[] }) {
  const es = locale === "es";
  const paths = directoryPaths[locale];
  const quoteHref = `${paths.home}#quote`;
  const routes = entriesForDirectory(locale, "route");
  const services = entriesForDirectory(locale, "service");

  return <>
    <Header locale={locale} alternatePath={directoryPaths[es ? "en" : "es"].location} quoteHref={quoteHref} />
    <main id="main-content" data-content-id="location-index">
      <section className="bg-brand-blue py-12 text-white sm:py-20">
        <Container>
          <nav aria-label={es ? "Ruta de navegación" : "Breadcrumb"} className="mb-9 flex gap-3 text-sm text-white/80">
            <Link href={paths.home}><CmsText scope={scope}>{es ? "Inicio" : "Home"}</CmsText></Link><span aria-hidden>/</span>
            <span><CmsText scope={scope}>{es ? "Todos los destinos" : "All locations"}</CmsText></span>
          </nav>
          <p className="mb-4 flex items-center gap-2 text-xs font-bold tracking-widest text-brand-yellow uppercase"><MapPin size={18} aria-hidden /><CmsText scope={scope}>{es ? "Su próximo destino" : "Your next destination"}</CmsText></p>
          <h1 className="max-w-4xl font-display text-[clamp(36px,5vw,68px)] leading-[1.08] font-extrabold tracking-tight"><CmsText scope={scope}>{es ? "50 estados. Un nuevo comienzo." : "50 states. A fresh start."}</CmsText></h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85"><CmsText scope={scope}>{es ? "Elija un destino y empiece a preparar su mudanza interestatal. Vantage le ayuda a coordinar los detalles con un transportista autorizado según su ruta, inventario y fechas." : "Choose a destination and start planning your interstate move. Vantage helps coordinate the details with an authorized carrier around your route, inventory and dates."}</CmsText></p>
          <a href="#states" className="editorial-cta mt-8"><CmsText scope={scope}>{es ? "Encuentre su estado" : "Find your state"}</CmsText><ArrowRight size={18} aria-hidden /></a>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-white/75"><CmsText scope={scope}>{es ? "Vantage es un intermediario de mudanzas interestatales. Confirme disponibilidad y servicios para su ruta al solicitar la cotización." : "Vantage is an interstate moving broker. Confirm carrier availability and services for your route when requesting your quote."}</CmsText></p>
        </Container>
      </section>

      <section className="bg-cream py-14 sm:py-20" aria-labelledby="locations-map-title">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-xs font-bold tracking-widest text-brand-blue-bright uppercase"><CmsText scope={scope}>{es ? "Explore el mapa" : "Explore the map"}</CmsText></p>
            <h2 id="locations-map-title" className="font-display text-3xl font-extrabold text-brand-blue sm:text-4xl"><CmsText scope={scope}>{es ? "¿Adónde se muda?" : "Where are you headed?"}</CmsText></h2>
            <p className="mt-4 leading-relaxed text-ink-soft"><CmsText scope={scope}>{es ? "Seleccione un estado en el mapa o use las regiones para encontrar su tarjeta." : "Select a state on the map, or browse the regions to find your state below."}</CmsText></p>
          </div>
          <div className="mx-auto mt-9 max-w-5xl rounded-3xl border border-cream-border bg-white p-3 shadow-card sm:p-7">
            <svg viewBox={usa.viewBox} className="block h-auto w-full" role="group" aria-label={es ? "Mapa de los 50 estados" : "Map of all 50 states"}>
              {usa.locations.filter(state => directoryStateCodes.has(state.id.toUpperCase())).map(state => <a key={state.id} href={`#state-${state.id}`} aria-label={state.name} className="group outline-none">
                <title>{state.name}</title>
                <path d={state.path} stroke="white" strokeWidth="1.5" className="fill-brand-blue transition-colors group-hover:fill-brand-yellow group-focus:fill-brand-yellow motion-reduce:transition-none" />
              </a>)}
            </svg>
          </div>
          <nav aria-label={es ? "Regiones" : "Regions"} className="mt-7 flex flex-wrap justify-center gap-3">
            {stateRegions.map(region => <a key={region.id} href={`#${region.id}`} className="rounded-full border border-cream-border bg-white px-5 py-3 text-sm font-bold text-brand-blue no-underline hover:bg-brand-yellow-soft"><CmsText scope={scope}>{region[locale]}</CmsText></a>)}
          </nav>
        </Container>
      </section>

      <section id="states" className="scroll-mt-36 py-14 sm:py-20">
        <Container>
          <p className="mb-3 text-xs font-bold tracking-widest text-brand-blue-bright uppercase"><CmsText scope={scope}>{es ? "Los 50 estados" : "All 50 states"}</CmsText></p>
          <h2 className="font-display text-3xl font-extrabold text-brand-blue sm:text-4xl"><CmsText scope={scope}>{es ? "Empiece por su estado" : "Start with your state"}</CmsText></h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-ink-soft"><CmsText scope={scope}>{es ? "Solicite una cotización con sus códigos postales, inventario y fechas preferidas." : "Request a quote with your pickup and delivery ZIPs, inventory and preferred dates."}</CmsText></p>
          {stateRegions.map(region => <section key={region.id} id={region.id} className="mt-10 scroll-mt-36" aria-labelledby={`${region.id}-title`}>
            <h3 id={`${region.id}-title`} className="mb-5 border-b border-cream-border pb-4 font-display text-2xl font-extrabold text-brand-blue"><CmsText scope={scope}>{region[locale]}</CmsText></h3>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {region.states.map(code => <Link key={code} id={`state-${code.toLowerCase()}`} href={quoteHref} aria-label={`${es ? "Solicitar cotización" : "Get a quote"}: ${stateNames[code]}`} className="group flex scroll-mt-40 items-center gap-4 rounded-2xl border border-cream-border bg-cream p-5 no-underline transition hover:border-brand-blue hover:bg-brand-yellow-soft focus:bg-brand-yellow-soft">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white font-display text-lg font-extrabold text-brand-blue">{code}</span>
                <span className="min-w-0"><span className="block font-bold text-brand-blue">{stateNames[code]}</span><span className="mt-1 flex items-center gap-2 text-xs font-semibold text-brand-blue-bright"><CmsText scope={scope}>{es ? "Solicitar cotización" : "Get a Quote"}</CmsText><ArrowRight size={14} aria-hidden /></span></span>
              </Link>)}
            </div>
          </section>)}
        </Container>
      </section>

      {routes.length > 0 && <section className="bg-brand-yellow-soft py-14"><Container>
        <Route size={28} className="mb-4 text-brand-blue" aria-hidden />
        <h2 className="mb-7 font-display text-3xl font-extrabold text-brand-blue"><CmsText scope={scope}>{es ? "Prepare su ruta" : "Plan the route ahead"}</CmsText></h2>
        <EditorialCards entries={routes} />
      </Container></section>}
      {services.length > 0 && <section className="bg-cream py-14 sm:py-20"><Container>
        <h2 className="mb-7 font-display text-3xl font-extrabold text-brand-blue"><CmsText scope={scope}>{es ? "Servicios para su mudanza" : "Make room for the services you need"}</CmsText></h2>
        <EditorialCards entries={services} />
      </Container></section>}
      <section className="py-14 sm:py-20"><Container>
        <h2 className="mb-4 font-display text-3xl font-extrabold text-brand-blue"><CmsText scope={scope}>{es ? "Conozca su destino" : "Get to know your destination"}</CmsText></h2>
        <p className="mb-7 max-w-2xl leading-relaxed text-ink-soft"><CmsText scope={scope}>{es ? "Explore nuestras guías para preparar su llegada." : "Explore our destination guides as you get ready for arrival."}</CmsText></p>
        <EditorialCards entries={guides} />
      </Container></section>
      <section className="bg-brand-blue py-12 text-white"><Container className="flex flex-wrap items-center justify-between gap-6">
        <h2 className="max-w-xl font-display text-3xl font-extrabold"><CmsText scope={scope}>{es ? "El próximo capítulo empieza con un plan." : "Your next chapter starts with a plan."}</CmsText></h2>
        <Link href={quoteHref} className="editorial-cta"><CmsText scope={scope}>{es ? "Solicitar cotización" : "Get your moving quote"}</CmsText><ArrowRight size={18} aria-hidden /></Link>
      </Container></section>
    </main>
    <SiteFooter locale={locale} />
  </>;
}
