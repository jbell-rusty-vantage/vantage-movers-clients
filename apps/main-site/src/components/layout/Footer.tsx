import Link from "next/link";
import { Suspense } from "react";
import {
  business,
  footerChrome,
  footerCompanyLinks,
  footerLegalLinks,
  footerServiceLinks,
} from "@/lib/content";
import { heroBodyFont, heroHeadingFont } from "@/lib/fonts";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";
import { MovingCarriersBand } from "./MovingCarriersBand";
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
const carrierNetworkLinkClassName = `${linkClassName} font-extrabold`;

function newTabProps(newTab?: boolean) {
  return newTab ? { target: "_blank", rel: "noopener noreferrer" } : {};
}

export function Footer() {
  const accentClass = heroHeadingFont.className;
  const bodyClass = heroBodyFont.className;
  const addressFontSize = Math.max(BODY_FONT_SIZE - 1.5, 12);

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
              Services
            </h4>
            <div className="flex flex-col gap-[11px]" style={{ fontSize: `${BODY_FONT_SIZE}px` }}>
              {footerServiceLinks.map((label) => (
                <Link
                  key={label}
                  href="/#services"
                  className={linkClassName}
                  style={{ color: colors.linkColor }}
                  data-analytics-location="footer_services"
                  data-analytics-move-type={label}
                >
                  {label}
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
              Company
            </h4>
            <div className="flex flex-col gap-[11px]" style={{ fontSize: `${BODY_FONT_SIZE}px` }}>
              {footerCompanyLinks.map((link) =>
                link.href.startsWith("/") ? (
                  <Link
                    key={link.label}
                    href={link.href}
                    {...newTabProps("newTab" in link ? link.newTab : false)}
                    className={
                      link.label === "Join Our Carrier Network"
                        ? carrierNetworkLinkClassName
                        : linkClassName
                    }
                    style={{ color: colors.linkColor }}
                    data-analytics-location="footer_company"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    {...newTabProps("newTab" in link ? link.newTab : false)}
                    className={
                      link.label === "Join Our Carrier Network"
                        ? carrierNetworkLinkClassName
                        : linkClassName
                    }
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
              Legal
            </h4>
            <div className="flex flex-col gap-[11px]" style={{ fontSize: `${BODY_FONT_SIZE}px` }}>
              {footerLegalLinks.map((link) => (
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
              {footerChrome.brokerBlockTitle}
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
            {business.brokerDisclaimer}
          </p>
        </div>

        <Suspense fallback={null}>
          <MovingCarriersBand displayMode="collapsible" />
        </Suspense>

        <div
          className="flex flex-wrap items-center justify-between gap-4 pt-6"
          style={{ fontSize: "13px", color: colors.mutedColor }}
        >
          <span>{business.copyright}</span>
          <span className="flex gap-5">
            <Link
              href="/sitemap.xml"
              className={linkClassName}
              style={{ color: colors.linkColor }}
              data-analytics-location="footer_utility"
            >
              Sitemap
            </Link>
            <Link
              href="/accessibility"
              className={linkClassName}
              style={{ color: colors.linkColor }}
              data-analytics-location="footer_utility"
            >
              Accessibility
            </Link>
          </span>
        </div>
      </Container>
    </footer>
  );
}
