import Image from "next/image";
import { Suspense } from "react";
import { Package, Phone, Users } from "lucide-react";
import { business, heroMetrics } from "@/lib/content";
import { SITE_IMAGES } from "@/lib/images";
import { Container } from "@/components/ui/Container";
import { RollingNumber } from "@/components/ui/RollingNumber";
import { QuoteWizard } from "@/components/interactive/QuoteWizard";

function QuoteWizardFallback() {
  return (
    <div
      id="quote"
      className="rounded-panel bg-white px-[30px] pt-[30px] pb-[26px] shadow-form-card"
      aria-hidden
    >
      <div className="mb-6 h-[420px] animate-pulse rounded-lg2 bg-cream" />
    </div>
  );
}

export function HeroSection() {
  return (
    <section id="top" className="relative overflow-hidden">
      <Image
        src={SITE_IMAGES.hero}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_30%]"
      />

      <Container className="relative z-[2] grid items-center gap-14 py-16 pb-[84px] lg:grid-cols-[1.05fr_.95fr]">
        <div>
          <h1 className="mb-7 text-balance font-display text-[clamp(40px,4.4vw,64px)] leading-[1.06] font-extrabold -tracking-[.02em] text-white [text-shadow:0_2px_18px_rgba(0,0,0,.45)]">
            Affordable Long-Distance Moving Coordination
          </h1>

          <div className="mb-7 inline-flex items-center gap-[9px] rounded-full border border-white/16 bg-white/8 px-4 py-2">
            <span className="inline-block size-[9px] animate-vm-pulse rounded-full bg-success" />
            <span className="text-sm font-semibold text-white [text-shadow:0_1px_8px_rgba(0,0,0,.4)]">
              <b className="font-bold">
                <RollingNumber
                  fallback={heroMetrics.recentMoves.fallback}
                  min={heroMetrics.recentMoves.min}
                  max={heroMetrics.recentMoves.max}
                  suffix={heroMetrics.recentMoves.suffix}
                  className="min-w-[2.5ch]"
                />
              </b>{" "}
              {heroMetrics.recentMoves.label}
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
              className="inline-flex items-center gap-2.5 rounded-lg2 border-[1.5px] border-white/70 bg-[rgba(4,18,38,.58)] px-[22px] py-[13px] font-display text-base font-bold tracking-[.04em] text-white uppercase no-underline shadow-[0_6px_20px_rgba(0,0,0,.28)] backdrop-blur-sm transition hover:border-white hover:bg-[rgba(4,18,38,.72)]"
            >
              <span className="grid size-[34px] shrink-0 place-items-center rounded-full bg-brand-yellow">
                <Phone className="size-[17px] text-brand-blue" strokeWidth={2.25} aria-hidden />
              </span>
              {business.phoneDisplay}
            </a>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="min-w-[190px] flex-1 rounded-card border border-white/25 bg-[rgba(4,18,38,.55)] px-[22px] py-[18px] shadow-[0_8px_24px_rgba(0,0,0,.22)] backdrop-blur-md">
              <div className="mb-2 flex items-center gap-2.5">
                <span className="grid size-[34px] place-items-center rounded-md2 bg-[rgba(255,192,46,.22)]">
                  <Users
                    className="size-[18px] text-brand-yellow"
                    strokeWidth={2}
                    aria-hidden
                  />
                </span>
                <span className="font-display text-[30px] leading-none font-black text-white">
                  <RollingNumber
                    fallback={heroMetrics.familiesMoved.fallback}
                    min={heroMetrics.familiesMoved.min}
                    max={heroMetrics.familiesMoved.max}
                    suffix={heroMetrics.familiesMoved.suffix}
                    className="min-w-[6.5em]"
                  />
                </span>
              </div>
              <div className="text-[15px] leading-snug font-semibold text-white">
                {heroMetrics.familiesMoved.label}
              </div>
            </div>
            <div className="min-w-[190px] flex-1 rounded-card border border-white/25 bg-[rgba(4,18,38,.55)] px-[22px] py-[18px] shadow-[0_8px_24px_rgba(0,0,0,.22)] backdrop-blur-md">
              <div className="mb-2 flex items-center gap-2.5">
                <span className="grid size-[34px] place-items-center rounded-md2 bg-[rgba(46,134,222,.28)]">
                  <Package
                    className="size-[18px] text-[#7eb8f5]"
                    strokeWidth={2}
                    aria-hidden
                  />
                </span>
                <span className="font-display text-[30px] leading-none font-black text-white">
                  48 States
                </span>
              </div>
              <div className="text-[15px] leading-snug font-semibold text-white">
                Interstate coverage coordinated
              </div>
            </div>
          </div>
        </div>

        <Suspense fallback={<QuoteWizardFallback />}>
          <QuoteWizard />
        </Suspense>
      </Container>
    </section>
  );
}
