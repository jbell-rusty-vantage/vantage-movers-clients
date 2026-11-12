import Link from "next/link";
import { business } from "@/lib/content";
import { directoryPaths } from "@/lib/publication";
import { Header } from "@/components/layout/Header";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Container } from "@/components/ui/Container";
export function ContactPage({ locale }: { locale: "en" | "es" }) {
  const es = locale === "es";
  return <><Header locale={locale} alternatePath={directoryPaths[es ? "en" : "es"].contact} /><main id="main-content" data-content-id="contact" className="bg-cream py-16"><Container>
    <h1 className="mb-8 font-display text-4xl font-extrabold text-brand-blue">{es ? "Contacte con Vantage" : "Contact Vantage"}</h1>
    <div className="grid gap-6 md:grid-cols-2">
      <section className="rounded-card bg-white p-7"><h2 className="mb-4 text-2xl font-bold text-brand-blue">{es ? "¿Está preparando una mudanza?" : "Planning a move?"}</h2><p className="mb-5 leading-relaxed">{es ? "Comparta los detalles básicos de su mudanza para solicitar una cotización." : "Share the basics of your move to request a quote."}</p><Link className="editorial-cta" href={`${directoryPaths[locale].home}#quote`}>{es ? "Solicitar cotización" : "Request a quote"}</Link></section>
      <section className="rounded-card bg-white p-7"><h2 className="mb-4 text-2xl font-bold text-brand-blue">{es ? "Ayuda con una mudanza o una queja" : "Help with a move or a complaint"}</h2><p className="mb-4 leading-relaxed">{es ? "Tenga a mano la referencia de su mudanza. Para cuestiones de recogida, entrega o daños, consulte también el contacto del transportista en sus documentos." : "Have your move reference ready. For pickup, delivery or shipment condition, also check the carrier contact on your paperwork."}</p><p className="mb-3"><a href={business.phoneHref}>{business.phoneDisplay}</a></p><p><a href={`mailto:${business.email}`}>{business.email}</a></p><Link href="/carrier-contacts" className="mt-5 block">{es ? "Directorio de transportistas (en inglés)" : "Carrier contact directory"}</Link></section>
      <section className="rounded-card bg-white p-7"><h2 className="mb-4 text-2xl font-bold text-brand-blue">{es ? "Empleo y empresas transportistas" : "Careers and carrier partners"}</h2><p className="mb-4 leading-relaxed">{es ? "Para consultar oportunidades laborales o cómo colaborar como transportista, escriba al contacto general de Vantage e indique el motivo. No hay una solicitud dedicada en este sitio." : "For employment inquiries or joining the carrier network, contact Vantage's general inbox and state the purpose. This site does not have a dedicated application workflow."}</p><a href={`mailto:${business.email}`}>{business.email}</a></section>
      <section className="rounded-card bg-white p-7"><h2 className="mb-4 text-2xl font-bold text-brand-blue">{es ? "Documentos y derechos del consumidor" : "Consumer documents and rights"}</h2><Link href="/consumer-information">{es ? "Información al consumidor (en inglés)" : "Consumer information"}</Link><p className="mt-4 leading-relaxed">{es ? "Vantage coordina mudanzas interestatales como intermediario. El transportista asignado realiza el transporte." : "Vantage coordinates interstate moves as a broker. The assigned motor carrier performs transportation."}</p></section>
    </div>
  </Container></main><SiteFooter locale={locale} /></>;
}
