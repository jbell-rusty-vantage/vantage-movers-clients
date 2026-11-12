import Link from "next/link";
import { business } from "@/lib/content";
import { heroHeadingFont } from "@/lib/fonts";
import { directoryPaths, entriesFor, navigationFor } from "@/lib/publication";
import type { EditorialLocale } from "@/content/editorial/types";
import { Container } from "@/components/ui/Container";
import { BrowseNavigation } from "./BrowseNavigation";
import { FloatingCall } from "./FloatingCall";
import { Logo } from "./Logo";

export function Header({ locale = "en", alternatePath, quoteHref }: {
  locale?: EditorialLocale; alternatePath?: string; quoteHref?: string;
}) {
  const es = locale === "es";
  const alternate = alternatePath ?? (entriesFor(es ? "en" : "es").length ? (es ? "/" : "/es") : undefined);
  return (
    <><header className="site-header sticky top-0 z-[60] border-b border-cream-border-2 bg-white shadow-[0_2px_12px_rgba(2,71,153,.05)]">
      <a className="skip-link" href="#main-content">{es ? "Ir al contenido" : "Skip to content"}</a>
      <Container className="px-4 sm:px-7">
        <div className={`${heroHeadingFont.className} flex min-h-[66px] flex-wrap items-center justify-between gap-2 py-2 font-semibold text-brand-blue`}>
          <Logo href={directoryPaths[locale].home} />
          <BrowseNavigation locale={locale} links={navigationFor(locale)} services={entriesFor(locale).filter(e => e.kind === "service").map(e => ({ href: e.path, label: e.navLabel }))} locations={entriesFor(locale).filter(e => e.kind === "state" || e.kind === "route").map(e => ({ href: e.path, label: e.navLabel, description: e.kind === "route" ? (es ? "Prepare la salida y la llegada juntas." : "Plan departure and arrival together.") : (es ? "Acceso, servicios y preparación local." : "Access, services and local preparation.") }))} alternatePath={alternate} alternateIsHome={!alternatePath} />
          <div className="flex items-center gap-2">
            <a href={business.phoneHref} className="rounded-md2 bg-brand-yellow-soft px-3 py-2.5 text-sm no-underline" data-analytics-location="header"><span className="hidden xl:inline">{business.phoneDisplay}</span><span className="xl:hidden">{es ? "Llamar" : "Call"}</span></a>
            <Link href={quoteHref ?? `${directoryPaths[locale].home}#quote`} className="rounded-md2 bg-brand-blue-bright px-3 py-2.5 text-sm text-white no-underline" data-analytics-event="cta_clicked" data-analytics-cta-location="header">{es ? "Cotización" : "Free Quote"}</Link>
          </div>
        </div>
      </Container>
    </header><FloatingCall locale={locale} /></>
  );
}
