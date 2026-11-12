import { notFound } from "next/navigation";
import type { EditorialLocale } from "@/content/editorial/types";
import { directoryPaths, entriesFor, entryById } from "@/lib/publication";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Container } from "@/components/ui/Container";
import { EditorialCards } from "./EditorialCards";
import { MovingAssistant } from "@/components/resources/MovingAssistant";
import { DestinationPicker } from "./DestinationPicker";

export type DirectoryKind = "service" | "resource" | "location";
export const directoryTitles = {
  en: { service: "Plan the move you need", resource: "Moving guides you can use", location: "Get ready for your destination" },
  es: { service: "Prepare la mudanza que necesita", resource: "Guías prácticas para su mudanza", location: "Prepárese para llegar a su destino" },
};
export function DirectoryPage({ locale, kind }: { locale: EditorialLocale; kind: DirectoryKind }) {
  const es = locale === "es";
  const entries = entriesFor(locale).filter(e => kind === "location" ? (e.kind === "state" || e.kind === "city") : e.kind === kind);
  if (!entries.length) notFound();
  return <><Header locale={locale} alternatePath={directoryPaths[es ? "en" : "es"][kind]} />
    <main id="main-content" data-content-id={`${kind}-index`} className="bg-cream py-14 sm:py-20"><Container>
      <p className="mb-4 text-sm font-bold tracking-widest text-brand-blue uppercase">Vantage Movers</p>
      <h1 className="max-w-3xl font-display text-[clamp(32px,4vw,52px)] leading-tight font-extrabold text-brand-blue">{directoryTitles[locale][kind]}</h1>
      <p className="mt-6 mb-10 max-w-3xl text-lg leading-relaxed text-ink-soft">{kind === "location" ? (es ? "Estas guías describen cómo prepararse para llegar. Su disponibilidad no confirma cobertura ni una oficina local: consulte su ruta y fechas con Vantage." : "These guides help you prepare for arrival. Guide availability does not confirm service coverage or a local office: discuss your route and dates with Vantage.") : es ? "Resuelva las preguntas importantes antes de solicitar una cotización. Consulte el inventario, los servicios incluidos y las responsabilidades de cada empresa." : "Work through the important questions before requesting a quote. Review the inventory, included services and each company's responsibilities."}</p>
      {kind === "location" && <DestinationPicker locale={locale} choices={entries.map(e => ({ label: e.navLabel, path: e.path }))} generic={entryById("who-handles-my-move", locale)?.path ?? directoryPaths[locale].service} />}
      <EditorialCards entries={entries} />
      {kind === "resource" && <div className="mt-12"><MovingAssistant locale={locale} /></div>}
      {kind === "resource" && <section className="mt-12 rounded-card bg-white p-6"><h2 className="mb-4 font-display text-2xl font-bold text-brand-blue">{es ? "Fuentes oficiales y contactos" : "Official resources and contacts"}</h2><ul className="space-y-3"><li><Link href="/carrier-contacts">{es ? "Directorio de transportistas (en inglés)" : "Carrier contact directory"}</Link></li><li><Link href="/consumer-information">{es ? "Información al consumidor (en inglés)" : "Consumer information"}</Link></li><li><a href="https://www.fmcsa.dot.gov/protect-your-move/search-mover" target="_blank" rel="noopener noreferrer">{es ? "Consulta federal de transportistas (en inglés; nueva pestaña)" : "Federal mover lookup (opens a new tab)"}</a></li></ul></section>}
    </Container></main><SiteFooter locale={locale} /></>;
}
