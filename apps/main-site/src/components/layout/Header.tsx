import Link from "next/link";
import { Phone } from "lucide-react";
import { business, headerChrome, navLinks } from "@/lib/content";
import { heroBodyFont, heroHeadingFont } from "@/lib/fonts";
import { Container } from "@/components/ui/Container";
import { ServicesDropdown } from "@/components/interactive/ServicesDropdown";
import { Logo } from "./Logo";

/** Default nav spacing — layout-playground spacingScale.default */
const NAV_SPACING = { py: 9, navPadX: 14, navPadY: 10 } as const;

export function Header() {
  return (
    <header className="sticky top-0 z-[60] border-b border-cream-border-2 bg-white shadow-[0_2px_12px_rgba(2,71,153,.05)]">
      <Container>
        <div
          className="flex items-center justify-between gap-6"
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
              triggerStyle={{
                paddingLeft: `${NAV_SPACING.navPadX}px`,
                paddingRight: `${NAV_SPACING.navPadX}px`,
                paddingTop: `${NAV_SPACING.navPadY}px`,
                paddingBottom: `${NAV_SPACING.navPadY}px`,
              }}
            />
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-none no-underline transition hover:bg-cream"
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
          </nav>

          <div className="flex items-center gap-4">
            <a
              href={business.phoneHref}
              className="hidden items-center gap-2.5 no-underline sm:flex"
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
            <Link
              href="/#quote"
              className={`${heroHeadingFont.className} rounded-md2 bg-brand-blue-bright px-[22px] py-3.5 text-[15px] font-bold tracking-[.04em] text-white uppercase no-underline shadow-cta transition hover:-translate-y-0.5 hover:bg-brand-blue`}
            >
              {headerChrome.ctaLabel}
            </Link>
          </div>
        </div>
      </Container>
    </header>
  );
}
