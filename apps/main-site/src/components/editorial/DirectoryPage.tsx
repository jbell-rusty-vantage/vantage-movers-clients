import { notFound } from "next/navigation";
import type { EditorialLocale } from "@/content/editorial/types";
import { directoryPathFor, entriesForDirectory, entryById, type DirectoryKind } from "@/lib/publication";
import { Header } from "@/components/layout/Header";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Container } from "@/components/ui/Container";
import { EditorialCards } from "./EditorialCards";
import { ResourceCenter } from "./ResourceCenter";
import { DestinationPicker } from "./DestinationPicker";

export const directoryTitles = {
  en: { service: "Plan the move you need", resource: "Your moving resource center", location: "Get ready for your destination", route: "Two states. A plan that connects them." },
  es: { service: "Prepare la mudanza que necesita", resource: "Guías prácticas para su mudanza", location: "Prepárese para llegar a su destino", route: "Dos estados. Un plan que los conecta." },
};
export function DirectoryPage({ locale, kind }: { locale: EditorialLocale; kind: DirectoryKind }) {
  const es = locale === "es";
  const entries = entriesForDirectory(locale, kind);
  if (!entries.length) notFound();
  return <><Header locale={locale} alternatePath={directoryPathFor(es ? "en" : "es", kind)} />
    <main id="main-content" data-content-id={`${kind}-index`} className="bg-cream py-14 sm:py-20"><Container>
      <p className="mb-4 text-sm font-bold tracking-widest text-brand-blue uppercase">Vantage Movers</p>
      <h1 className="max-w-3xl font-display text-[clamp(32px,4vw,52px)] leading-tight font-extrabold text-brand-blue">{directoryTitles[locale][kind]}</h1>
      <p className="mt-6 mb-10 max-w-3xl text-lg leading-relaxed text-ink-soft">{kind === "location" ? (es ? "Estas guías describen cómo prepararse para llegar. Su disponibilidad no confirma cobertura ni una oficina local: consulte su ruta y fechas con Vantage." : "These guides help you prepare for arrival. Guide availability does not confirm service coverage or a local office: discuss your route and dates with Vantage.") : es ? "Resuelva las preguntas importantes antes de solicitar una cotización. Consulte el inventario, los servicios incluidos y las responsabilidades de cada empresa." : "Work through the important questions before requesting a quote. Review the inventory, included services and each company's responsibilities."}</p>
      {kind === "location" && <DestinationPicker locale={locale} choices={entries.map(e => ({ label: e.navLabel, path: e.path }))} generic={entryById("who-handles-my-move", locale)?.path ?? directoryPathFor(locale, "service") ?? "/consumer-information"} />}
      {kind === "resource" ? <ResourceCenter entries={entries} locale={locale} /> : <EditorialCards entries={entries} />}
    </Container></main><SiteFooter locale={locale} /></>;
}
