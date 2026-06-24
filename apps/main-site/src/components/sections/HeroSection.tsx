import { Package, Phone, Users } from "lucide-react";
import { business } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { QuoteWizard } from "@/components/interactive/QuoteWizard";

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-gradient-to-br from-brand-blue-deep via-brand-blue to-brand-blue-mid"
      style={{ backgroundImage: "linear-gradient(115deg,#022F66 0%,#024799 48%,#0A5BC0 100%)" }}
    >
      <div
        className="absolute inset-0 opacity-55"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,.06) 1px,transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <div className="absolute -top-[120px] -right-[120px] size-[520px] rounded-full bg-[radial-gradient(circle,rgba(46,134,222,.28),transparent_65%)]" />

      <Container className="relative z-[2] grid items-center gap-14 py-16 pb-[84px] lg:grid-cols-[1.05fr_.95fr]">
        <div>
          <Eyebrow onDark>Licensed Interstate Moving Broker</Eyebrow>
          <h1 className="mb-[22px] text-balance font-display text-[clamp(40px,4.4vw,64px)] leading-[1.06] font-extrabold -tracking-[.02em] text-white">
            Affordable Long-Distance Moving Coordination
          </h1>
          <p className="mb-[30px] max-w-[540px] text-lg leading-[1.6] text-on-dark-200">
            Plan your interstate move with a licensed moving broker that helps match your route,
            inventory, and service needs with FMCSA-authorized motor carriers.
          </p>

          <div className="mb-7 inline-flex items-center gap-[9px] rounded-full border border-white/16 bg-white/8 px-4 py-2">
            <span className="inline-block size-[9px] animate-vm-pulse rounded-full bg-success" />
            <span className="text-sm font-semibold text-[#dbe7f5]">
              <b className="text-white">20+</b> moves booked in the last hour
            </span>
          </div>

          <div className="mb-9 flex flex-wrap items-center gap-3.5">
            <a
              href="#quote"
              className="rounded-lg2 bg-brand-yellow px-7 py-4 font-display text-base font-bold tracking-[.04em] text-black uppercase no-underline shadow-cta-yellow transition hover:-translate-y-0.5"
            >
              Get a Free Moving Estimate
            </a>
            <a
              href={business.phoneHref}
              className="inline-flex items-center gap-2 rounded-lg2 border-[1.5px] border-white/45 px-[26px] py-[15px] font-display text-base font-bold tracking-[.04em] text-white uppercase no-underline transition hover:border-white hover:bg-white/10"
            >
              <Phone size={17} strokeWidth={2} aria-hidden />
              {business.phoneDisplay}
            </a>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="min-w-[190px] flex-1 rounded-card border border-white/14 bg-white/7 px-[22px] py-[18px] backdrop-blur-[6px]">
              <div className="mb-2 flex items-center gap-2.5">
                <span className="grid size-[34px] place-items-center rounded-md2 bg-[rgba(255,192,46,.18)]">
                  <Users className="size-[18px] text-brand-yellow" strokeWidth={2} aria-hidden />
                </span>
                <span className="font-display text-[30px] leading-none font-black text-white">
                  50,000+
                </span>
              </div>
              <div className="text-sm text-on-dark-300">Families moved nationwide</div>
            </div>
            <div className="min-w-[190px] flex-1 rounded-card border border-white/14 bg-white/7 px-[22px] py-[18px] backdrop-blur-[6px]">
              <div className="mb-2 flex items-center gap-2.5">
                <span className="grid size-[34px] place-items-center rounded-md2 bg-[rgba(46,134,222,.22)]">
                  <Package className="size-[18px] text-[#2E86DE]" strokeWidth={2} aria-hidden />
                </span>
                <span className="font-display text-[30px] leading-none font-black text-white">
                  48 States
                </span>
              </div>
              <div className="text-sm text-on-dark-300">Interstate coverage coordinated</div>
            </div>
          </div>
        </div>

        <QuoteWizard />
      </Container>
    </section>
  );
}
