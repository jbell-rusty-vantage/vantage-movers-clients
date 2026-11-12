import Link from "next/link";
import { business } from "@/lib/content";
import { siteUrl } from "@/lib/site";
import { entriesFor } from "@/lib/publication";
export const metadata = { title: "Page not found | Vantage Movers", metadataBase: new URL(siteUrl), robots: { index: false, follow: false } };
export default function GlobalNotFound() {
  return <html lang="en"><body style={{ margin: 0, background: "#f6f1e8", color: "#024799", fontFamily: "system-ui, sans-serif" }}><main style={{ maxWidth: 760, margin: "8vh auto", padding: 24 }}>
    <p style={{ fontWeight: 800 }}>Vantage Movers · 404</p><h1>This page could not be found.</h1><p>Return home to start a quote or browse the available moving guides.</p><p><Link href="/">Return home</Link>{entriesFor("en").length > 0 && <> · <Link href="/services">Moving services</Link> · <Link href="/resources">Moving guides</Link></>}</p>
    <section lang="es" style={{ marginTop: 40 }}><h2>No encontramos esta página.</h2><p>Vuelva al inicio para solicitar una cotización o consultar las guías disponibles.</p><p><Link href={entriesFor("es").length ? "/es" : "/"}>Volver al inicio</Link></p></section>
    <p style={{ marginTop: 40 }}><a href={business.phoneHref}>{business.phoneDisplay}</a> · <a href={`mailto:${business.email}`}>{business.email}</a></p>
  </main></body></html>;
}
