import { Phone } from "lucide-react";
import { business, finalCta } from "@/lib/content";
import { heroBodyFont, heroHeadingFont } from "@/lib/fonts";
import { Container } from "@/components/ui/Container";
import { radiusClasses, spacingScale } from "@/lib/playground/layout-playground";
import { resolveFinalCtaColors } from "@/lib/playground/final-cta-playground";

/** Playground args promoted to production — see FinalCTASection.stories.tsx Playground. */
const HEADING_FONT_SIZE = 44;
const BODY_FONT_SIZE = 17;
const BADGE_FONT_SIZE = 12;
const BADGE_RADIUS = "md2" as const;
const PRIMARY_BUTTON_RADIUS = "md2" as const;
const SECONDARY_BUTTON_RADIUS = "md2" as const;
const SPACING = spacingScale.default;
const colors = resolveFinalCtaColors("production", {});

export function FinalCTASection() {
  const accentClass = heroHeadingFont.className;
  const bodyClass = heroBodyFont.className;

  return (
    <section
      id="contact"
      className="relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(115deg, ${colors.gradientStart}, ${colors.gradientEnd})`,
        paddingTop: `${SPACING.py * 4 + 44}px`,
        paddingBottom: `${SPACING.py * 4 + 44}px`,
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,.06) 1px,transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <Container className="relative mx-auto max-w-[1000px] text-center">
        <div
          className={`${accentClass} mb-[22px] inline-flex items-center gap-2 border px-[18px] py-2 font-bold tracking-[.08em] uppercase ${radiusClasses[BADGE_RADIUS]}`}
          style={{
            fontSize: `${BADGE_FONT_SIZE}px`,
            borderColor: colors.badgeBorder,
            backgroundColor: colors.badgeBg,
            color: colors.badgeText,
          }}
        >
          {finalCta.badge}
        </div>
        <h2
          className={`${accentClass} mb-4 text-balance leading-[1.06] font-extrabold -tracking-[.02em]`}
          style={{
            fontSize: `clamp(32px, 4vw, ${HEADING_FONT_SIZE}px)`,
            color: colors.titleColor,
          }}
        >
          {finalCta.title}
        </h2>
        <p
          className={`${bodyClass} mx-auto mb-8 max-w-[680px] leading-[1.6]`}
          style={{ fontSize: `${BODY_FONT_SIZE}px`, color: colors.bodyColor }}
        >
          {finalCta.body}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3.5">
          <a
            href="#quote"
            className={`${accentClass} inline-flex items-center gap-2 px-8 py-[17px] font-bold tracking-[.04em] uppercase no-underline shadow-[0_10px_28px_rgba(255,192,46,.34)] transition hover:-translate-y-0.5 ${radiusClasses[PRIMARY_BUTTON_RADIUS]}`}
            style={{
              fontSize: "16px",
              backgroundColor: colors.primaryBtnBg,
              color: colors.primaryBtnText,
            }}
            data-analytics-event="cta_clicked"
            data-analytics-cta-location="final_cta"
          >
            {finalCta.primaryCta}
          </a>
          <a
            href={business.phoneHref}
            className={`${accentClass} inline-flex items-center gap-2 border-[1.5px] px-[30px] py-4 font-bold tracking-[.04em] uppercase no-underline transition hover:bg-white/10 ${radiusClasses[SECONDARY_BUTTON_RADIUS]}`}
            style={{
              fontSize: "16px",
              borderColor: colors.secondaryBtnBorder,
              color: colors.secondaryBtnText,
            }}
            data-analytics-location="final_cta"
          >
            <Phone size={17} strokeWidth={2} aria-hidden />
            {finalCta.secondaryCta}
          </a>
        </div>
      </Container>
    </section>
  );
}
