import Image from "next/image";
import { Suspense } from "react";
import { Headphones, Package, Users } from "lucide-react";
import { business, hero, heroMetrics } from "@/lib/content";
import { heroBodyFont, heroHeadingFont } from "@/lib/fonts";
import { SITE_IMAGES } from "@/lib/images";
import { Container } from "@/components/ui/Container";
import { QuoteWizardSkeleton } from "@/components/feedback/LoadingSkeletons";
import { RollingNumber } from "@/components/ui/RollingNumber";
import { QuoteWizard } from "@/components/interactive/QuoteWizard";
import {
  heroBodyTextShadowStyles,
  heroContentColorPresets,
  heroTextShadowStyles,
  resolveHeroImageFilter,
  resolveHeroOverlayBackground,
} from "@/lib/playground/hero-playground";
import {
  resolveHeroPrimaryCtaClasses,
  resolveHeroSecondaryCtaClasses,
  resolveHeroSecondaryIconCircleClasses,
} from "@/lib/playground/hero-icons-playground";

/** Playground args promoted to production — see HeroSection.stories.tsx Playground. */
const HERO_IMAGE_FILTER = resolveHeroImageFilter("muted", 70);
const HERO_OVERLAY = resolveHeroOverlayBackground("solidBlue", 20);
const HERO_COLORS = heroContentColorPresets.highContrast;
const HERO_HEADLINE_SHADOW = heroTextShadowStyles.strong;
const HERO_BODY_SHADOW = heroBodyTextShadowStyles.strong;
const PRIMARY_CTA_CLASS = resolveHeroPrimaryCtaClasses("yellow");
const SECONDARY_CTA_CLASS = resolveHeroSecondaryCtaClasses("glass");
const SECONDARY_ICON_CIRCLE_CLASS = resolveHeroSecondaryIconCircleClasses("glass");

interface HeroSectionProps {
  bodyPanel?: boolean;
}

export function HeroSection({ bodyPanel = false }: HeroSectionProps) {
  const bodyCopy = (
    <>
      <p
        className={`${bodyPanel ? "mb-3" : "mb-4"} max-w-[620px] text-[17px] leading-[1.65]`}
        style={{ color: HERO_COLORS.paragraph, textShadow: HERO_BODY_SHADOW }}
      >
        {hero.paragraph}
      </p>

      <p
        className="m-0 max-w-[580px] text-[16px] leading-[1.6] font-semibold"
        style={{ color: HERO_COLORS.supporting, textShadow: HERO_BODY_SHADOW }}
      >
        {hero.supportingLine}
      </p>
    </>
  );

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-[#04122a]"
    >
      <Image
        src={SITE_IMAGES.hero}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-contain object-top xl:object-cover xl:object-center"
        style={HERO_IMAGE_FILTER ? { filter: HERO_IMAGE_FILTER } : undefined}
      />

      {/* Blend the top-anchored image into the brand background below the fold at narrower widths. */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-2/3 bg-gradient-to-t from-[#04122a] via-[#04122a]/70 to-transparent xl:hidden"
        aria-hidden
      />

      {HERO_OVERLAY && (
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{ background: HERO_OVERLAY }}
          aria-hidden
        />
      )}

      <Container className="relative z-[2] grid items-center gap-14 py-12 pb-16 lg:grid-cols-[1.05fr_.95fr]">
        <div className={heroBodyFont.className}>
          <h1
            className={`${heroHeadingFont.className} mb-5 text-balance font-extrabold -tracking-[.02em]`}
            style={{ color: HERO_COLORS.headline, textShadow: HERO_HEADLINE_SHADOW }}
          >
            <span className="block -translate-x-2 text-[clamp(20px,2.2vw,30px)] leading-none font-extrabold tracking-[.03em] text-white">
              Vantage Movers
            </span>
            <span
              className="my-4 block h-px w-full max-w-[420px] bg-gradient-to-r from-brand-yellow via-white/55 to-transparent"
              aria-hidden
            />
            <span className="block max-w-[650px] text-[clamp(28px,3vw,42px)] leading-[1.1] tracking-[.015em] uppercase">
              {hero.headline}
            </span>
          </h1>

          {bodyPanel ? (
            <div className="mb-7 max-w-[660px] rounded-md2 border border-white/20 bg-[rgba(4,18,38,.45)] px-5 py-4 shadow-[0_8px_24px_rgba(0,0,0,.2)] backdrop-blur-md">
              {bodyCopy}
            </div>
          ) : (
            <div className="mb-7">{bodyCopy}</div>
          )}

          <div className="mb-9 flex flex-wrap items-center gap-3.5">
            <a
              href="#quote"
              className={`${heroHeadingFont.className} inline-flex min-w-[285px] items-center justify-center gap-2.5 rounded-md2 px-[22px] py-[13px] text-base font-bold tracking-[.04em] uppercase no-underline transition hover:-translate-y-0.5 ${PRIMARY_CTA_CLASS}`}
              data-analytics-event="cta_clicked"
              data-analytics-cta-location="hero_primary"
            >
              {hero.primaryCta}
            </a>
            <a
              href={business.phoneHref}
              className={`${heroHeadingFont.className} inline-flex min-w-[285px] items-center justify-center gap-2.5 rounded-md2 px-[22px] py-[13px] text-base font-bold tracking-[.04em] uppercase no-underline transition hover:-translate-y-0.5 ${SECONDARY_CTA_CLASS}`}
              data-analytics-location="hero_secondary"
            >
              <span
                className={`grid size-[34px] shrink-0 place-items-center rounded-md2 ${SECONDARY_ICON_CIRCLE_CLASS}`}
              >
                <Headphones className="size-[17px]" strokeWidth={2.25} aria-hidden />
              </span>
              {hero.secondaryCta}
            </a>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="min-w-[190px] flex-1 rounded-md2 border border-white/25 bg-[rgba(4,18,38,.55)] px-[22px] py-[18px] shadow-[0_8px_24px_rgba(0,0,0,.22)] backdrop-blur-md">
              <div className="mb-2 flex items-center gap-2.5">
                <span className="grid size-[34px] place-items-center rounded-md2 bg-[rgba(255,192,46,.22)]">
                  <Users
                    className="size-[18px] text-brand-yellow"
                    strokeWidth={2}
                    aria-hidden
                  />
                </span>
                <span
                  className={`${heroHeadingFont.className} text-[30px] leading-none font-black`}
                  style={{ color: HERO_COLORS.stats, textShadow: HERO_BODY_SHADOW }}
                >
                  <RollingNumber
                    fallback={heroMetrics.familiesMoved.fallback}
                    min={heroMetrics.familiesMoved.min}
                    max={heroMetrics.familiesMoved.max}
                    suffix={heroMetrics.familiesMoved.suffix}
                    className="min-w-[6.5em]"
                  />
                </span>
              </div>
              <div
                className="text-[15px] leading-snug font-semibold"
                style={{ color: HERO_COLORS.statsLabel, textShadow: HERO_BODY_SHADOW }}
              >
                {heroMetrics.familiesMoved.label}
              </div>
            </div>
            <div className="min-w-[190px] flex-1 rounded-md2 border border-white/25 bg-[rgba(4,18,38,.55)] px-[22px] py-[18px] shadow-[0_8px_24px_rgba(0,0,0,.22)] backdrop-blur-md">
              <div className="mb-2 flex items-center gap-2.5">
                <span className="grid size-[34px] place-items-center rounded-md2 bg-[rgba(46,134,222,.28)]">
                  <Package
                    className="size-[18px] text-[#7eb8f5]"
                    strokeWidth={2}
                    aria-hidden
                  />
                </span>
                <span
                  className={`${heroHeadingFont.className} text-[30px] leading-none font-black`}
                  style={{ color: HERO_COLORS.stats, textShadow: HERO_BODY_SHADOW }}
                >
                  <RollingNumber
                    fallback={heroMetrics.recentMoves.fallback}
                    min={heroMetrics.recentMoves.min}
                    max={heroMetrics.recentMoves.max}
                    suffix={heroMetrics.recentMoves.suffix}
                    className="min-w-[2.5ch]"
                  />
                </span>
              </div>
              <div
                className="text-[15px] leading-snug font-semibold"
                style={{ color: HERO_COLORS.statsLabel, textShadow: HERO_BODY_SHADOW }}
              >
                {heroMetrics.recentMoves.label}
              </div>
            </div>
          </div>
        </div>

        <Suspense fallback={<QuoteWizardSkeleton />}>
          <QuoteWizard />
        </Suspense>
      </Container>
    </section>
  );
}
