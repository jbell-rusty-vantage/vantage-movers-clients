import { CmsElement, CmsText } from "@/components/cms/Content";
import { CmsLink as Link } from "@/components/cms/Content";
import { business, footerLegalLinks, footerServiceLinks } from "@/lib/content";
import { directoryPaths, entriesFor, entryById } from "@/lib/publication";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";

type FooterLink = { href: string; label: string };
function LinkColumn({ title, links }: { title: string; links: FooterLink[] }) {
  return <CmsElement element="nav" scope="components/layout/Footer.tsx" aria-label={title}><h2 className="mb-5 font-display text-lg font-extrabold text-brand-blue"><CmsText scope="components/layout/Footer.tsx">{title}</CmsText></h2><ul className="space-y-3"><CmsText scope="components/layout/Footer.tsx">{links.map(link => <li key={`${link.href}-${link.label}`}><Link scope="components/layout/Footer.tsx" href={link.href} className="text-sm leading-relaxed text-ink-soft no-underline hover:text-brand-blue hover:underline"><CmsText scope="components/layout/Footer.tsx">{link.label}</CmsText></Link></li>)}</CmsText></ul></CmsElement>;
}

export function Footer({ locale = "en" }: { locale?: "en" | "es" }) {
  const es = locale === "es";
  const paths = directoryPaths[locale];
  const entries = entriesFor(locale);
  const services = entries.filter(e => e.kind === "service").map(e => ({ href: e.path, label: e.navLabel }));
  const resources = entries.filter(e => e.kind === "resource").map(e => ({ href: e.path, label: e.navLabel }));
  const guides = [
    ...(resources.length ? [{ href: paths.resource, label: es ? "Todas las guías de mudanza" : "All moving articles & guides" }] : []),
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
      <div className="mb-12 flex flex-wrap items-center justify-between gap-6 border-b border-cream-border pb-8"><div><Logo href={paths.home} /><p className="mt-4 max-w-md text-sm leading-relaxed text-ink-soft"><CmsText scope="components/layout/Footer.tsx">{es ? "Su próximo capítulo comienza con un plan. Hablemos de los detalles." : "Your next chapter starts with a plan. Let’s talk through the details."}</CmsText></p></div><CmsElement element="a" scope="components/layout/Footer.tsx" href={business.phoneHref} className="rounded-full bg-brand-blue px-7 py-4 font-display text-xl font-bold text-white no-underline"><CmsText scope="components/layout/Footer.tsx">{business.phoneDisplay}</CmsText></CmsElement></div>
      <div className="grid gap-10 sm:grid-cols-2 xl:grid-cols-[1fr_1.2fr_1fr_1.1fr]">
        <LinkColumn title={es ? "Servicios" : "Services"} links={services.length ? services : footerServiceLinks} />
        <LinkColumn title={es ? "Guías y recursos" : "Guides & resources"} links={guides} />
        <LinkColumn title={es ? "Enlaces útiles" : "Helpful links"} links={helpful} />
        <section><h2 className="mb-5 font-display text-lg font-extrabold text-brand-blue"><Link scope="components/layout/Footer.tsx" href={paths.contact}><CmsText scope="components/layout/Footer.tsx">{es ? "Contáctenos" : "Contact us"}</CmsText></Link></h2><address className="space-y-4 text-sm leading-relaxed text-ink-soft not-italic"><p><CmsText scope="components/layout/Footer.tsx">{es ? "Lun–Dom · 8 a. m.–12 a. m." : "Mon–Sun · 8am–12am"}</CmsText></p><p><CmsText scope="components/layout/Footer.tsx">{business.address[0]}</CmsText><br /><CmsText scope="components/layout/Footer.tsx">{business.address[1]}</CmsText></p><CmsElement element="a" scope="components/layout/Footer.tsx" className="block break-all" href={`mailto:${business.email}`}><CmsText scope="components/layout/Footer.tsx">{business.email}</CmsText></CmsElement></address><div className="mt-6 space-y-3 text-sm"><Link scope="components/layout/Footer.tsx" className="block" href={paths.contact}><CmsText scope="components/layout/Footer.tsx">{es ? "Atención al cliente" : "Customer support"}</CmsText></Link><CmsElement element="a" scope="components/layout/Footer.tsx" className="block" href={`mailto:${business.email}?subject=Moving%20concern`}><CmsText scope="components/layout/Footer.tsx">{es ? "Comparta una inquietud" : "Share a moving concern"}</CmsText></CmsElement></div></section>
      </div>
      <div className="mt-12 border-y border-cream-border py-7"><h2 className="mb-4 font-display font-bold text-brand-blue"><CmsText scope="components/layout/Footer.tsx">{es ? "Políticas y documentos (en inglés)" : "Policies & documents"}</CmsText></h2><CmsElement element="nav" scope="components/layout/Footer.tsx" aria-label={es ? "Políticas" : "Policies"} className="flex flex-wrap gap-x-6 gap-y-3"><CmsText scope="components/layout/Footer.tsx">{footerLegalLinks.map((link, i) => <Link scope="components/layout/Footer.tsx" key={link.href} href={link.href} className="text-xs text-ink-soft hover:underline"><CmsText scope="components/layout/Footer.tsx">{es ? legalLabels[i] : link.label}</CmsText></Link>)}</CmsText></CmsElement></div>
      <div className="pt-7 text-xs leading-relaxed text-ink-soft"><p className="mb-3 font-bold text-brand-blue"><CmsText scope="components/layout/Footer.tsx">{es ? "Intermediario de mudanzas" : business.brokerLine}</CmsText><CmsText scope="components/layout/Footer.tsx">{" · USDOT "}</CmsText><CmsText scope="components/layout/Footer.tsx">{business.dot}</CmsText><CmsText scope="components/layout/Footer.tsx">{" · MC "}</CmsText><CmsText scope="components/layout/Footer.tsx">{business.mc}</CmsText></p><p><CmsText scope="components/layout/Footer.tsx">{es ? "Vantage Movers es un intermediario de mudanzas interestatales, no un transportista. Organiza el transporte de bienes del hogar con transportistas autorizados por FMCSA. El transportista realiza la recogida, el transporte y la entrega. Los cargos finales dependen de la tarifa del transportista, el inventario, los servicios, la ruta y las condiciones de la mudanza. Solicite al transportista su tarifa para revisarla." : business.brokerDisclaimer}</CmsText></p><p className="mt-5"><CmsText scope="components/layout/Footer.tsx">{es ? "© 2026 Vantage Movers. Todos los derechos reservados." : business.copyright}</CmsText></p></div>
    </Container>
  </footer>;
}
