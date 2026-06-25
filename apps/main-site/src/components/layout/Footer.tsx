import Link from "next/link";
import {
  business,
  footerCompanyLinks,
  footerLegalLinks,
  footerServiceLinks,
} from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-footer px-7 pt-16 pb-8 text-on-dark-500">
      <Container className="px-0">
        <div className="grid gap-10 border-b border-white/10 pb-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo variant="footer" />
            <p className="mt-[18px] max-w-xs text-[14.5px] leading-[1.6] text-on-dark-500">
              A licensed interstate household goods moving broker helping families and businesses
              coordinate long-distance relocations through authorized motor carriers.
            </p>
            <div className="mt-[18px] text-[13px] leading-[1.8] text-on-dark-600">
              {business.address.map((line) => (
                <div key={line}>{line}</div>
              ))}
              <div className="mt-2 font-display text-lg font-extrabold text-white">
                {business.phoneDisplay}
              </div>
              <div className="mt-1">{business.hours}</div>
            </div>
          </div>

          <div>
            <h4 className="mb-[18px] font-display text-sm font-extrabold tracking-[.06em] text-white uppercase">
              Services
            </h4>
            <div className="flex flex-col gap-[11px] text-[14.5px]">
              {footerServiceLinks.map((label) => (
                <Link
                  key={label}
                  href="/#services"
                  className="text-on-dark-500 no-underline transition hover:text-white"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-[18px] font-display text-sm font-extrabold tracking-[.06em] text-white uppercase">
              Company
            </h4>
            <div className="flex flex-col gap-[11px] text-[14.5px]">
              {footerCompanyLinks.map((link) => (
                link.href.startsWith("/") ? (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-on-dark-500 no-underline transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-on-dark-500 no-underline transition hover:text-white"
                  >
                    {link.label}
                  </a>
                )
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-[18px] font-display text-sm font-extrabold tracking-[.06em] text-white uppercase">
              Legal
            </h4>
            <div className="flex flex-col gap-[11px] text-[14.5px]">
              {footerLegalLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-on-dark-500 no-underline transition hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-start gap-8 border-b border-white/10 py-8">
          <div className="flex-none">
            <div className="mb-2 font-display text-sm font-extrabold text-white">
              Trusted Moving Broker
            </div>
            <div className="text-[13px] leading-[1.8] text-on-dark-600">
              DOT: {business.dot}
              <br />
              MC: {business.mc}
            </div>
          </div>
          <p className="min-w-[340px] flex-1 text-[12.5px] leading-[1.7] text-on-dark-700">
            {business.brokerDisclaimer}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 text-[13px] text-on-dark-700">
          <span>{business.copyright}</span>
          <span className="flex gap-5">
            <a href="#" className="text-on-dark-700 no-underline transition hover:text-white">
              Sitemap
            </a>
            <a href="#" className="text-on-dark-700 no-underline transition hover:text-white">
              Accessibility
            </a>
          </span>
        </div>
      </Container>
    </footer>
  );
}
