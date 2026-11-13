import { CmsElement } from "@/components/cms/Content";
import { getSiteContent } from "@/lib/cms/server";
import { ContentProvider } from "@/components/cms/Content";
import { CmsText } from "@/components/cms/Content";
import { ComplianceBar } from "@/components/layout/ComplianceBar";
import "./globals.css";
import { sitePresentation } from "@/lib/presentation";
import { siteBodyFont, siteDisplayFont } from "@/lib/fonts";
import { CmsLink as Link } from "@/components/cms/Content";
import { business } from "@/lib/content";
import { siteUrl } from "@/lib/site";
import { entriesFor } from "@/lib/publication";
export const metadata = { title: "Page not found | Vantage Movers", metadataBase: new URL(siteUrl), robots: { index: false, follow: false } };
export default async function GlobalNotFound() {
  const content = await getSiteContent();
  return <html lang="en" data-presentation={sitePresentation.id} className={`${siteDisplayFont.variable} ${siteBodyFont.variable}`}><body><ContentProvider values={content.values} fields={content.fields} locale="en"><ComplianceBar /><main style={{ maxWidth: 760, margin: "8vh auto", padding: 24 }}>
    <p style={{ fontWeight: 800 }}><CmsText scope="app/global-not-found.tsx">{"Vantage Movers · 404"}</CmsText></p><h1><CmsText scope="app/global-not-found.tsx">{"This page could not be found."}</CmsText></h1><p><CmsText scope="app/global-not-found.tsx">{"Return home to start a quote or browse the available moving guides."}</CmsText></p><p><Link scope="app/global-not-found.tsx" href="/"><CmsText scope="app/global-not-found.tsx">{"Return home"}</CmsText></Link><CmsText scope="app/global-not-found.tsx">{entriesFor("en").length > 0 && <><CmsText scope="app/global-not-found.tsx">{" · "}</CmsText><Link scope="app/global-not-found.tsx" href="/services"><CmsText scope="app/global-not-found.tsx">{"Moving services"}</CmsText></Link><CmsText scope="app/global-not-found.tsx">{" · "}</CmsText><Link scope="app/global-not-found.tsx" href="/resources"><CmsText scope="app/global-not-found.tsx">{"Moving guides"}</CmsText></Link></>}</CmsText></p>
    <section lang="es" style={{ marginTop: 40 }}><h2><CmsText scope="app/global-not-found.tsx">{"No encontramos esta página."}</CmsText></h2><p><CmsText scope="app/global-not-found.tsx">{"Vuelva al inicio para solicitar una cotización o consultar las guías disponibles."}</CmsText></p><p><Link scope="app/global-not-found.tsx" href={entriesFor("es").length ? "/es" : "/"}><CmsText scope="app/global-not-found.tsx">{"Volver al inicio"}</CmsText></Link></p></section>
    <p style={{ marginTop: 40 }}><CmsElement element="a" scope="app/global-not-found.tsx" href={business.phoneHref}><CmsText scope="app/global-not-found.tsx">{business.phoneDisplay}</CmsText></CmsElement><CmsText scope="app/global-not-found.tsx">{" · "}</CmsText><CmsElement element="a" scope="app/global-not-found.tsx" href={`mailto:${business.email}`}><CmsText scope="app/global-not-found.tsx">{business.email}</CmsText></CmsElement></p>
  </main></ContentProvider></body></html>;
}
