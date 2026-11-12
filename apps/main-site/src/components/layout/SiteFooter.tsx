import { Footer } from "./Footer";
import Link from "next/link";
import { business } from "@/lib/content";
import { directoryPaths, entriesFor, navigationFor } from "@/lib/publication";

export function SiteFooter({ locale = "en" }: { locale?: "en" | "es" }) {
  if (locale === "en") return <Footer />;
  return <footer className="bg-cream px-6 py-12 text-brand-blue"><div className="mx-auto max-w-[1200px]">
    <div className="grid gap-8 sm:grid-cols-3">
      <div><Link href={directoryPaths.es.home} className="font-display text-2xl font-extrabold">Vantage Movers</Link><p className="mt-4 leading-relaxed">Intermediario de mudanzas interestatales. El transportista asignado realiza el transporte.</p><p className="mt-4"><a href={business.phoneHref}>{business.phoneDisplay}</a></p><a href={`mailto:${business.email}`}>{business.email}</a><p className="mt-4">DOT {business.dot} · MC {business.mc}</p></div>
      <nav aria-label="Navegación del pie de página" className="flex flex-col gap-3">{navigationFor("es").map(l => <Link key={l.href} href={l.href}>{l.label}</Link>)}{entriesFor("es").filter(e => e.kind === "service").map(e => <Link key={e.id} href={e.path}>{e.navLabel}</Link>)}</nav>
      <nav aria-label="Documentos en inglés" className="flex flex-col gap-3"><p className="font-bold">Documentos y contactos (en inglés)</p>{[["/consumer-information", "Información al consumidor"], ["/carrier-contacts", "Contactos de transportistas"], ["/privacy", "Privacidad"], ["/terms", "Términos"], ["/sms-privacy", "Privacidad de SMS"], ["/sms-terms", "Términos de SMS"], ["/cancellation", "Cancelaciones"], ["/accessibility", "Accesibilidad"]].map(([href,label]) => <Link key={href} href={href}>{label}</Link>)}</nav>
    </div><p className="mt-8 border-t border-cream-border pt-6 text-sm">© 2026 Vantage Movers.</p>
  </div></footer>;
}
