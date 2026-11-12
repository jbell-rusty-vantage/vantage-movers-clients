import { HeroBackdrop } from "./HeroBackdrop";
import { HeroFacts } from "./HeroFacts";
import { Suspense } from "react";
import { Headphones } from "lucide-react";
import { business, hero as englishHero } from "@/lib/content";
import { heroBodyFont, heroHeadingFont } from "@/lib/fonts";
import { SITE_IMAGES } from "@/lib/images";
import { entryById } from "@/lib/publication";
import { Container } from "@/components/ui/Container";
import { QuoteWizardSkeleton } from "@/components/feedback/LoadingSkeletons";
import { QuoteWizard } from "@/components/interactive/QuoteWizard";
import {
  heroBodyTextShadowStyles,
  heroContentColorPresets,
  heroTextShadowStyles,
} from "@/lib/playground/hero-playground";
import {
  resolveHeroPrimaryCtaClasses,
  resolveHeroSecondaryCtaClasses,
  resolveHeroSecondaryIconCircleClasses,
} from "@/lib/playground/hero-icons-playground";

/** Playground args promoted to production — see HeroSection.stories.tsx Playground. */
const HERO_COLORS = heroContentColorPresets.highContrast;
const HERO_HEADLINE_SHADOW = heroTextShadowStyles.strong;
const HERO_BODY_SHADOW = heroBodyTextShadowStyles.strong;
const PRIMARY_CTA_CLASS = resolveHeroPrimaryCtaClasses("yellow");
const SECONDARY_CTA_CLASS = resolveHeroSecondaryCtaClasses("glass");
const SECONDARY_ICON_CIRCLE_CLASS = resolveHeroSecondaryIconCircleClasses("glass");

interface HeroSectionProps {
  bodyPanel?: boolean;
  locale?: "en" | "es";
}

export function HeroSection({ bodyPanel = false, locale = "en" }: HeroSectionProps) {
  const es = locale === "es";
  const genericGuide = entryById("who-handles-my-move", locale)?.path;
  const guideLinks = genericGuide ? { generic: genericGuide, wisconsin: entryById("wisconsin", locale)?.path ?? genericGuide, madison: entryById("madison-wisconsin", locale)?.path ?? genericGuide } : undefined;
  const hero = es ? {
    headline: "Prepare su mudanza de un estado a otro",
    paragraph: "Empiece con los detalles: qué llevará, dónde se muda y cuándo estará listo. Revise el inventario, los accesos y los servicios antes de elegir una propuesta.",
    supportingLine: "Vantage coordina mudanzas como intermediario. El transportista asignado realiza la recogida, el transporte y la entrega.",
    primaryCta: "Solicitar una cotización", secondaryCta: "Hablar con Vantage",
  } : englishHero;
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
      <HeroBackdrop src={SITE_IMAGES.hero} position="65% 20%" mobilePosition="65% 20%" />

      <Container className="relative z-[2] grid items-center gap-14 py-12 pb-16 lg:grid-cols-[1.05fr_.95fr]">
        <div className={`${heroBodyFont.className} pt-44 sm:pt-48 lg:pt-40`}>
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

          <HeroFacts locale={locale} />
        </div>

        <Suspense fallback={<QuoteWizardSkeleton />}>
          <QuoteWizard locale={locale} guideLinks={guideLinks} />
        </Suspense>
      </Container>
    </section>
  );
}
