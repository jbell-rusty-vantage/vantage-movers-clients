import { Phone } from "lucide-react";
import { business, navLinks } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { ServicesDropdown } from "@/components/interactive/ServicesDropdown";
import { Logo } from "./Logo";

export function Header() {
  return (
    <header className="sticky top-0 z-[60] border-b border-cream-border-2 bg-white shadow-[0_2px_12px_rgba(2,71,153,.05)]">
      <Container className="flex items-center justify-between gap-6 py-3.5">
        <Logo />

        <nav className="hidden items-center gap-1 font-display text-[15.5px] font-semibold text-brand-blue lg:flex">
          <ServicesDropdown />
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg2 px-3.5 py-2.5 no-underline transition hover:bg-cream"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href={business.phoneHref}
            className="hidden items-center gap-2.5 no-underline sm:flex"
          >
            <span className="grid size-[38px] flex-none place-items-center rounded-full bg-brand-yellow-soft">
              <Phone className="size-[17px] text-brand-blue" strokeWidth={2} aria-hidden />
            </span>
            <span className="flex flex-col leading-[1.15]">
              <span className="text-[11px] font-semibold text-[#64748B]">Free Quote</span>
              <span className="font-display text-[15px] font-extrabold text-brand-blue">
                {business.phoneDisplay}
              </span>
            </span>
          </a>
          <a
            href="#quote"
            className="rounded-lg2 bg-brand-blue-bright px-[22px] py-3.5 font-display text-[15px] font-bold tracking-[.04em] text-white uppercase no-underline shadow-cta transition hover:-translate-y-0.5 hover:bg-brand-blue"
          >
            Get Quote
          </a>
        </div>
      </Container>
    </header>
  );
}
