import { CmsText } from "@/components/cms/Content";
import { notFound } from "next/navigation";
import type { EditorialLocale } from "@/content/editorial/types";
import { directoryPathFor, entriesForDirectory, type DirectoryKind } from "@/lib/publication";
import { Header } from "@/components/layout/Header";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Container } from "@/components/ui/Container";
import { EditorialCards } from "./EditorialCards";
import { ResourceCenter } from "./ResourceCenter";
import { LocationsDirectory } from "./LocationsDirectory";

export const directoryTitles = {
  en: { service: "Plan the move you need", resource: "Your moving resource center", location: "Explore all 50 states", route: "Two states. A plan that connects them." },
  es: { service: "Prepare la mudanza que necesita", resource: "Guías prácticas para su mudanza", location: "Explore los 50 estados", route: "Dos estados. Un plan que los conecta." },
};
export function DirectoryPage({ locale, kind }: { locale: EditorialLocale; kind: DirectoryKind }) {
  const es = locale === "es";
  const entries = entriesForDirectory(locale, kind);
  if (!entries.length) notFound();
  if (kind === "location") return <LocationsDirectory locale={locale} guides={entries} />;
  return <><Header locale={locale} alternatePath={directoryPathFor(es ? "en" : "es", kind)} />
    <main id="main-content" data-content-id={`${kind}-index`} className="bg-cream py-14 sm:py-20"><Container>
      <p className="mb-4 text-sm font-bold tracking-widest text-brand-blue uppercase"><CmsText scope="components/editorial/DirectoryPage.tsx">{"Vantage Movers"}</CmsText></p>
      <h1 className="max-w-3xl font-display text-[clamp(32px,4vw,52px)] leading-tight font-extrabold text-brand-blue"><CmsText scope="components/editorial/DirectoryPage.tsx">{directoryTitles[locale][kind]}</CmsText></h1>
      <p className="mt-6 mb-10 max-w-3xl text-lg leading-relaxed text-ink-soft"><CmsText scope="components/editorial/DirectoryPage.tsx">{es ? "Resuelva las preguntas importantes antes de solicitar una cotización. Consulte el inventario, los servicios incluidos y las responsabilidades de cada empresa." : "Work through the important questions before requesting a quote. Review the inventory, included services and each company's responsibilities."}</CmsText></p>
      <CmsText scope="components/editorial/DirectoryPage.tsx">{kind === "resource" ? <ResourceCenter entries={entries} locale={locale} /> : <EditorialCards entries={entries} />}</CmsText>
    </Container></main><SiteFooter locale={locale} /></>;
}
