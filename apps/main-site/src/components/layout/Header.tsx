import Link from "next/link";
import { Globe2, Phone } from "lucide-react";
import { business, headerChrome, navLinks } from "@/lib/content";
import { heroBodyFont, heroHeadingFont } from "@/lib/fonts";
import { Container } from "@/components/ui/Container";
import { ServicesDropdown } from "@/components/interactive/ServicesDropdown";
import { Logo } from "./Logo";
import type { ServiceLocale } from "@/content/services/types";
import { englishServices, spanishServices } from "@/content/services/registry";

/** Default nav spacing — layout-playground spacingScale.default */
const NAV_SPACING = { py: 9, navPadX: 14, navPadY: 10 } as const;

export function Header({ locale = "en-US", alternatePath, quoteHref = "/#quote", showLocaleEntry = false }: { locale?: ServiceLocale; alternatePath?: string; quoteHref?: string; showLocaleEntry?: boolean }) {
  const es = locale === "es-US";
  const localizedNav = es
    ? [
        { label: "Cobertura", href: "/#map" }, { label: "Nosotros", href: "/#about" },
        { label: "Preguntas", href: "/#faq" }, { label: "Contacto", href: "/#contact" },
      ]
    : navLinks;
  const mobileServices = es ? spanishServices : englishServices;
  const localeHref = alternatePath ?? (showLocaleEntry ? spanishServices[0].path : undefined);
  const localeAriaLabel = alternatePath
    ? es ? "View this page in English" : "Ver esta página en español"
    : "Explorar servicios en español";
  return (
    <header className="sticky top-0 z-[60] border-b border-cream-border-2 bg-white shadow-[0_2px_12px_rgba(2,71,153,.05)]">
      <Container className="px-4 sm:px-7">
        <div
          className="flex items-center justify-between gap-3 sm:gap-6"
          style={{
            paddingTop: `${NAV_SPACING.py}px`,
            paddingBottom: `${NAV_SPACING.py}px`,
          }}
        >
          <Logo />

          <nav
            className={`${heroHeadingFont.className} hidden items-center gap-1 text-[15.5px] font-semibold text-brand-blue lg:flex`}
          >
            <ServicesDropdown
              locale={locale}
              triggerStyle={{
                paddingLeft: `${NAV_SPACING.navPadX}px`,
                paddingRight: `${NAV_SPACING.navPadX}px`,
                paddingTop: `${NAV_SPACING.navPadY}px`,
                paddingBottom: `${NAV_SPACING.navPadY}px`,
              }}
            />
            {localizedNav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-none no-underline transition hover:bg-cream"
                data-analytics-location="header_nav"
                style={{
                  paddingLeft: `${NAV_SPACING.navPadX}px`,
                  paddingRight: `${NAV_SPACING.navPadX}px`,
                  paddingTop: `${NAV_SPACING.navPadY}px`,
                  paddingBottom: `${NAV_SPACING.navPadY}px`,
                }}
              >
                {link.label}
              </Link>
            ))}
            {localeHref ? (
              <Link href={localeHref} hrefLang={es ? "en-US" : "es-US"} className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm no-underline hover:bg-cream" aria-label={localeAriaLabel}>
                <Globe2 className="size-4" aria-hidden /> {es ? "EN" : "ES"}
              </Link>
            ) : null}
          </nav>

          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href={business.phoneHref}
              className="hidden items-center gap-2.5 no-underline sm:flex"
              data-analytics-location="header"
            >
              <span className="grid size-[38px] flex-none place-items-center rounded-md2 bg-brand-yellow-soft">
                <Phone className="size-[17px] text-brand-blue" strokeWidth={2} aria-hidden />
              </span>
              <span className={`${heroBodyFont.className} flex flex-col leading-[1.15]`}>
                <span className="text-[11px] font-semibold text-[#64748B]">
                  {headerChrome.phoneLabel}
                </span>
                <span className={`${heroHeadingFont.className} text-[15px] font-extrabold text-brand-blue`}>
                  {business.phoneDisplay}
                </span>
              </span>
            </a>
            <a
              href={business.phoneHref}
              className={`${heroHeadingFont.className} flex h-10 flex-none items-center justify-center rounded-md2 bg-brand-yellow-soft px-3 text-[13px] leading-none font-extrabold tracking-[.03em] whitespace-nowrap text-brand-blue uppercase no-underline shadow-card sm:hidden`}
              aria-label={`Call ${business.name} at ${business.phoneDisplay}`}
              data-analytics-location="header_mobile"
            >
              {es ? "Llamar" : "Call"}
            </a>
            <Link
              href={quoteHref}
              className={`${heroHeadingFont.className} flex h-10 flex-none items-center justify-center rounded-md2 bg-brand-blue-bright px-3 text-[13px] leading-none font-bold tracking-[.03em] whitespace-nowrap text-white uppercase no-underline shadow-cta transition hover:-translate-y-0.5 hover:bg-brand-blue sm:h-auto sm:px-[22px] sm:py-3.5 sm:text-[15px] sm:tracking-[.04em]`}
              data-analytics-event="cta_clicked"
              data-analytics-cta-location="header"
            >
              {es ? "Cotización" : headerChrome.ctaLabel}
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-4 border-t border-cream-border-2 py-2 lg:hidden">
          <details className={`${heroHeadingFont.className} group relative flex-1`}>
            <summary className="cursor-pointer list-none py-2 text-sm font-bold text-brand-blue">{es ? "Explorar servicios" : "Explore services"}</summary>
            <div className="absolute top-full left-0 z-50 grid w-[min(92vw,520px)] grid-cols-1 gap-1 rounded-xl border border-cream-border bg-white p-3 shadow-menu sm:grid-cols-2">
              {mobileServices.map((service) => <Link key={service.id} href={service.path} className="rounded-lg px-3 py-2.5 text-sm font-semibold text-brand-blue no-underline hover:bg-cream">{service.navLabel}</Link>)}
            </div>
          </details>
          {localeHref ? <Link href={localeHref} hrefLang={es ? "en-US" : "es-US"} className="inline-flex items-center gap-1 py-2 text-sm font-bold text-brand-blue no-underline"><Globe2 className="size-4" aria-hidden />{es ? "English" : "Español"}</Link> : null}
        </div>
      </Container>
    </header>
  );
}
