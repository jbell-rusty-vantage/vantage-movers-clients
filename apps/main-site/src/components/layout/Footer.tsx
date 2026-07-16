import Link from "next/link";
import {
  business,
  footerChrome,
  footerCompanyLinks,
  footerLegalLinks,
  footerServiceLinks,
} from "@/lib/content";
import { spanishServices } from "@/content/services/registry";
import type { ServiceLocale } from "@/content/services/types";
import { heroBodyFont, heroHeadingFont } from "@/lib/fonts";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";
import {
  footerPaddingScale,
  resolveFooterColors,
} from "@/lib/playground/footer-playground";

/** Playground args promoted to production — see Footer.stories.tsx Playground. */
const BODY_FONT_SIZE = 13;
const COLUMN_HEADING_FONT_SIZE = 14;
const PADDING = footerPaddingScale.default;
const colors = resolveFooterColors("light", {});

const linkClassName =
  "no-underline transition-colors duration-150 hover:[color:var(--footer-link-hover)]";
const emphasizedLinkClassName = `${linkClassName} font-extrabold`;

function companyLinkClassName(label: string) {
  return label === "Join Our Carrier Network" || label === "Consumer Information"
    ? emphasizedLinkClassName
    : linkClassName;
}

function newTabProps(newTab?: boolean) {
  return newTab ? { target: "_blank", rel: "noopener noreferrer" } : {};
}

export function Footer({ locale = "en-US", alternatePath }: { locale?: ServiceLocale; alternatePath?: string }) {
  const accentClass = heroHeadingFont.className;
  const bodyClass = heroBodyFont.className;
  const addressFontSize = Math.max(BODY_FONT_SIZE - 1.5, 12);
  const es = locale === "es-US";
  const serviceLinks = es ? spanishServices.map((service) => ({ label: service.navLabel, href: service.path })) : footerServiceLinks;
  const companyLinks = es ? [
    { label: "Únase a nuestra red de transportistas", href: "/carrier-contacts" },
    { label: "Información para consumidores", href: "/consumer-information" },
    { label: "Nosotros", href: "/#about" }, { label: "Áreas de servicio", href: "/#map" },
    { label: "Preguntas frecuentes", href: "/#faq" }, { label: "Contacto", href: "/#contact" },
  ] : footerCompanyLinks;
  const legalLinks = es ? [
    { label: "Política de privacidad", href: "/privacy" }, { label: "Términos y condiciones", href: "/terms" },
    { label: "Privacidad de SMS", href: "/sms-privacy" }, { label: "Términos de SMS", href: "/sms-terms" },
    { label: "Política de cancelación", href: "/cancellation" },
  ] : footerLegalLinks;

  return (
    <footer
      className={`${bodyClass} px-7`}
      style={{
        backgroundColor: colors.footerBg,
        color: colors.bodyColor,
        paddingTop: `${PADDING.pt}px`,
        paddingBottom: `${PADDING.pb}px`,
        ["--footer-link-hover" as string]: colors.linkHoverColor,
      }}
    >
      <Container className="px-0">
        <div
          className="grid border-b pb-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]"
          style={{ gap: `${PADDING.gridGap}px`, borderColor: colors.borderColor }}
        >
          <div>
            <Logo variant="footer" />
            <div
              className="mt-[18px] leading-[1.8]"
              style={{ fontSize: `${addressFontSize}px`, color: colors.mutedColor }}
            >
              {business.address.map((line) => (
                <div key={line}>{line}</div>
              ))}
              <div
                className={`${accentClass} mt-2 text-lg font-extrabold`}
                style={{ color: colors.phoneColor }}
              >
                {business.phoneDisplay}
              </div>
              <div className="mt-1">{business.hours}</div>
            </div>
          </div>

          <div>
            <h4
              className={`${accentClass} mb-[18px] font-extrabold tracking-[.06em] uppercase`}
              style={{
                fontSize: `${COLUMN_HEADING_FONT_SIZE}px`,
                color: colors.headingColor,
              }}
            >
              {es ? "Servicios" : "Services"}
            </h4>
            <div className="flex flex-col gap-[11px]" style={{ fontSize: `${BODY_FONT_SIZE}px` }}>
              {serviceLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={linkClassName}
                  style={{ color: colors.linkColor }}
                  data-analytics-location="footer_services"
                  data-analytics-move-type={link.label}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4
              className={`${accentClass} mb-[18px] font-extrabold tracking-[.06em] uppercase`}
              style={{
                fontSize: `${COLUMN_HEADING_FONT_SIZE}px`,
                color: colors.headingColor,
              }}
            >
              {es ? "Compañía" : "Company"}
            </h4>
            <div className="flex flex-col gap-[11px]" style={{ fontSize: `${BODY_FONT_SIZE}px` }}>
              {companyLinks.map((link) =>
                link.href.startsWith("/") ? (
                  <Link
                    key={link.label}
                    href={link.href}
                    scroll={link.label === "Consumer Information" ? false : undefined}
                    className={companyLinkClassName(link.label)}
                    style={{ color: colors.linkColor }}
                    data-analytics-location="footer_company"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    className={companyLinkClassName(link.label)}
                    style={{ color: colors.linkColor }}
                    data-analytics-location="footer_company"
                  >
                    {link.label}
                  </a>
                ),
              )}
            </div>
          </div>

          <div>
            <h4
              className={`${accentClass} mb-[18px] font-extrabold tracking-[.06em] uppercase`}
              style={{
                fontSize: `${COLUMN_HEADING_FONT_SIZE}px`,
                color: colors.headingColor,
              }}
            >
              {es ? "Legal" : "Legal"}
            </h4>
            <div className="flex flex-col gap-[11px]" style={{ fontSize: `${BODY_FONT_SIZE}px` }}>
              {legalLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  {...newTabProps("newTab" in link ? link.newTab : false)}
                  className={linkClassName}
                  style={{ color: colors.linkColor }}
                  data-analytics-location="footer_legal"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div
          className="flex flex-wrap items-start gap-8 border-b py-8"
          style={{ borderColor: colors.borderColor }}
        >
          <div className="flex-none">
            <div
              className={`${accentClass} mb-2 font-extrabold`}
              style={{ fontSize: `${COLUMN_HEADING_FONT_SIZE}px`, color: colors.headingColor }}
            >
              {es ? "Corredor de mudanzas autorizado" : footerChrome.brokerBlockTitle}
            </div>
            <div
              className="leading-[1.8]"
              style={{ fontSize: `${addressFontSize}px`, color: colors.mutedColor }}
            >
              DOT: {business.dot}
              <br />
              MC: {business.mc}
            </div>
          </div>
          <p
            className="min-w-[340px] flex-1 leading-[1.7]"
            style={{ fontSize: "12.5px", color: colors.mutedColor }}
          >
            {es
              ? "Vantage Movers es un corredor autorizado de mudanzas interestatales. Vantage no es un transportista y no transporta bienes domésticos. Vantage coordina y organiza el transporte mediante transportistas autorizados por FMCSA. Los cargos finales dependen de la tarifa del transportista, el inventario, los servicios solicitados, la ruta y las condiciones de la mudanza. Esta traducción requiere revisión legal antes del lanzamiento en producción."
              : business.brokerDisclaimer}
          </p>
        </div>

        <div
          className="flex flex-wrap items-center justify-between gap-4 pt-6"
          style={{ fontSize: "13px", color: colors.mutedColor }}
        >
          <span>{es ? "© 2026 Vantage Movers. Todos los derechos reservados." : business.copyright}</span>
          <span className="flex gap-5">
            {alternatePath ? <Link href={alternatePath} hrefLang={es ? "en-US" : "es-US"} className={linkClassName} style={{ color: colors.linkColor }}>{es ? "English" : "Español"}</Link> : null}
            <Link
              href="/sitemap.xml"
              className={linkClassName}
              style={{ color: colors.linkColor }}
              data-analytics-location="footer_utility"
            >
              {es ? "Mapa del sitio" : "Sitemap"}
            </Link>
            <Link
              href="/accessibility"
              className={linkClassName}
              style={{ color: colors.linkColor }}
              data-analytics-location="footer_utility"
            >
              {es ? "Accesibilidad" : "Accessibility"}
            </Link>
          </span>
        </div>
      </Container>
    </footer>
  );
}
