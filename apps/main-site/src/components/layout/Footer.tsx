import Link from "next/link";
import { business, footerLegalLinks, footerServiceLinks } from "@/lib/content";
import { directoryPaths, entriesFor, entryById } from "@/lib/publication";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";

type FooterLink = { href: string; label: string };
function LinkColumn({ title, links }: { title: string; links: FooterLink[] }) {
  return <nav aria-label={title}><h2 className="mb-5 font-display text-lg font-extrabold text-brand-blue">{title}</h2><ul className="space-y-3">{links.map(link => <li key={`${link.href}-${link.label}`}><Link href={link.href} className="text-sm leading-relaxed text-ink-soft no-underline hover:text-brand-blue hover:underline">{link.label}</Link></li>)}</ul></nav>;
}

export function Footer({ locale = "en" }: { locale?: "en" | "es" }) {
  const es = locale === "es";
  const paths = directoryPaths[locale];
  const entries = entriesFor(locale);
  const services = entries.filter(e => e.kind === "service").map(e => ({ href: e.path, label: e.navLabel }));
  const resources = entries.filter(e => e.kind === "resource").map(e => ({ href: e.path, label: e.navLabel }));
  const guides = [
    ...resources,
    { href: "https://www.fmcsa.dot.gov/protect-your-move/moving-checklist", label: es ? "Lista de mudanza de FMCSA (inglés)" : "FMCSA moving checklist" },
    { href: "/ready-to-move", label: es ? "Prepárese para mudarse (inglés)" : "Ready to move checklist" },
    { href: "/your-rights", label: es ? "Derechos y responsabilidades (inglés)" : "Your rights & responsibilities" },
    { href: "/#faq", label: es ? "Preguntas frecuentes (inglés)" : "Frequently asked questions" },
    { href: "/#testimonials", label: es ? "Opiniones de clientes (inglés)" : "Customer reviews" },
  ];
  const helpful = [
    { href: "/#about", label: es ? "Sobre Vantage (inglés)" : "About Vantage" },
    ...(entryById("military-moving", locale) ? [{ href: `${paths.home}#military-appreciation`, label: es ? "Homenaje a militares y veteranos" : "Honoring military & veterans" }] : []),
    { href: `${paths.home}#quote`, label: es ? "Solicitar una cotización" : "Get a moving quote" },
    { href: entries.some(e => e.kind === "state") ? paths.location : "/#map", label: es ? "Explore destinos" : "Explore destinations" },
    { href: "/consumer-information", label: es ? "Información al consumidor (inglés)" : "Consumer information" },
    { href: "/carrier-contacts", label: es ? "Red de transportistas (inglés)" : "Join our carrier network" },
    { href: "/accessibility", label: es ? "Accesibilidad (inglés)" : "Accessibility" },
  ];
  const legalLabels = ["Privacidad", "Términos y condiciones", "Privacidad de SMS", "Términos de SMS", "Cancelaciones", "Derechos y responsabilidades", "Prepárese para mudarse", "No vender mi información"];
  return <footer className="border-t border-cream-border bg-cream">
    <Container className="py-12 sm:py-16">
      <div className="mb-12 flex flex-wrap items-center justify-between gap-6 border-b border-cream-border pb-8"><div><Logo href={paths.home} /><p className="mt-4 max-w-md text-sm leading-relaxed text-ink-soft">{es ? "Su próximo capítulo comienza con un plan. Hablemos de los detalles." : "Your next chapter starts with a plan. Let’s talk through the details."}</p></div><a href={business.phoneHref} className="rounded-full bg-brand-blue px-7 py-4 font-display text-xl font-bold text-white no-underline">{business.phoneDisplay}</a></div>
      <div className="grid gap-10 sm:grid-cols-2 xl:grid-cols-[1fr_1.2fr_1fr_1.1fr]">
        <LinkColumn title={es ? "Servicios" : "Services"} links={services.length ? services : footerServiceLinks} />
        <LinkColumn title={es ? "Guías y recursos" : "Guides & resources"} links={guides} />
        <LinkColumn title={es ? "Enlaces útiles" : "Helpful links"} links={helpful} />
        <section><h2 className="mb-5 font-display text-lg font-extrabold text-brand-blue"><Link href={paths.contact}>{es ? "Contáctenos" : "Contact us"}</Link></h2><address className="space-y-4 text-sm leading-relaxed text-ink-soft not-italic"><p>{es ? "Lun–Dom · 8 a. m.–12 a. m." : "Mon–Sun · 8am–12am"}</p><p>{business.address[0]}<br />{business.address[1]}</p><a className="block break-all" href={`mailto:${business.email}`}>{business.email}</a></address><div className="mt-6 space-y-3 text-sm"><Link className="block" href={paths.contact}>{es ? "Atención al cliente" : "Customer support"}</Link><a className="block" href={`mailto:${business.email}?subject=Moving%20concern`}>{es ? "Comparta una inquietud" : "Share a moving concern"}</a></div></section>
      </div>
      <div className="mt-12 border-y border-cream-border py-7"><h2 className="mb-4 font-display font-bold text-brand-blue">{es ? "Políticas y documentos (en inglés)" : "Policies & documents"}</h2><nav aria-label={es ? "Políticas" : "Policies"} className="flex flex-wrap gap-x-6 gap-y-3">{footerLegalLinks.map((link, i) => <Link key={link.href} href={link.href} className="text-xs text-ink-soft hover:underline">{es ? legalLabels[i] : link.label}</Link>)}</nav></div>
      <div className="pt-7 text-xs leading-relaxed text-ink-soft"><p className="mb-3 font-bold text-brand-blue">{es ? "Intermediario de mudanzas" : business.brokerLine} · USDOT {business.dot} · MC {business.mc}</p><p>{es ? "Vantage Movers es un intermediario de mudanzas interestatales, no un transportista. Organiza el transporte de bienes del hogar con transportistas autorizados por FMCSA. El transportista realiza la recogida, el transporte y la entrega. Los cargos finales dependen de la tarifa del transportista, el inventario, los servicios, la ruta y las condiciones de la mudanza. Solicite al transportista su tarifa para revisarla." : business.brokerDisclaimer}</p><p className="mt-5">{es ? "© 2026 Vantage Movers. Todos los derechos reservados." : business.copyright}</p></div>
    </Container>
  </footer>;
}
