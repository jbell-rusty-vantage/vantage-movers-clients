import { CmsElement, CmsImage } from "@/components/cms/Content";
import { CmsText } from "@/components/cms/Content";
import { Phone } from "lucide-react";
import { business, finalCta } from "@/lib/content";
import { heroBodyFont, heroHeadingFont } from "@/lib/fonts";
import { SITE_IMAGES } from "@/lib/images";
import { sitePresentation } from "@/lib/presentation";
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
      className="home-closing relative overflow-hidden"
      style={{
        backgroundImage: `var(--closing-background, linear-gradient(115deg, ${colors.gradientStart}, ${colors.gradientEnd}))`,
        paddingTop: `var(--closing-top, ${SPACING.py * 4 + 44}px)`,
        paddingBottom: `var(--closing-bottom, ${SPACING.py * 4 + 44}px)`,
      }}
    >
      <div
        className="closing-pattern absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,.06) 1px,transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <Container className="closing-container relative mx-auto max-w-[1000px] px-4 text-center sm:px-7">
        <div className="closing-card">
          {sitePresentation.id === "canyon" && <div className="closing-image" aria-hidden>
            <CmsImage src={SITE_IMAGES.expertiseBanner} alt="" fill sizes="(min-width: 768px) 48vw, 100vw" className="object-cover" />
          </div>}
          <div className="closing-content">
            <div
              className={`closing-eyebrow ${accentClass} mb-[22px] inline-flex items-center gap-2 border px-[18px] py-2 font-bold tracking-[.08em] uppercase ${radiusClasses[BADGE_RADIUS]}`}
              style={{
                fontSize: `${BADGE_FONT_SIZE}px`,
                borderColor: `var(--closing-badge-line, ${colors.badgeBorder})`,
                backgroundColor: `var(--closing-badge-bg, ${colors.badgeBg})`,
                color: `var(--closing-accent, ${colors.badgeText})`,
              }}
            >
              <CmsText scope="components/sections/FinalCTASection.tsx">{finalCta.badge}</CmsText>
            </div>
            <h2
              className={`${accentClass} mb-4 text-balance leading-[1.06] font-extrabold -tracking-[.02em]`}
              style={{
                fontSize: `var(--closing-title-size, clamp(32px, 4vw, ${HEADING_FONT_SIZE}px))`,
                color: colors.titleColor,
              }}
            >
              <CmsText scope="components/sections/FinalCTASection.tsx">{finalCta.title}</CmsText>
            </h2>
            <p
              className={`${bodyClass} mx-auto mb-8 max-w-[680px] leading-[1.6]`}
              style={{ fontSize: `${BODY_FONT_SIZE}px`, color: `var(--closing-body, ${colors.bodyColor})` }}
            >
              <CmsText scope="components/sections/FinalCTASection.tsx">{finalCta.body}</CmsText>
            </p>
            <div className="closing-actions flex flex-wrap items-center justify-center gap-3.5">
              <CmsElement element="a" scope="components/sections/FinalCTASection.tsx"
                href="#quote"
                className={`closing-primary ${accentClass} inline-flex w-full items-center justify-center gap-2 px-6 py-[17px] text-center font-bold tracking-[.04em] uppercase no-underline shadow-[0_10px_28px_rgba(255,192,46,.34)] transition hover:-translate-y-0.5 min-[420px]:w-auto sm:px-8 ${radiusClasses[PRIMARY_BUTTON_RADIUS]}`}
                style={{
                  fontSize: "16px",
                  backgroundColor: `var(--closing-primary-bg, ${colors.primaryBtnBg})`,
                  color: `var(--closing-primary-text, ${colors.primaryBtnText})`,
                }}
                data-analytics-event="cta_clicked"
                data-analytics-cta-location="final_cta"
              >
                <CmsText scope="components/sections/FinalCTASection.tsx">{finalCta.primaryCta}</CmsText>
              </CmsElement>
              <CmsElement element="a" scope="components/sections/FinalCTASection.tsx"
                href={business.phoneHref}
                className={`closing-secondary ${accentClass} inline-flex w-full items-center justify-center gap-2 border-[1.5px] px-6 py-4 text-center font-bold tracking-[.04em] uppercase no-underline transition hover:bg-white/10 min-[420px]:w-auto sm:px-[30px] ${radiusClasses[SECONDARY_BUTTON_RADIUS]}`}
                style={{
                  fontSize: "16px",
                  borderColor: colors.secondaryBtnBorder,
                  color: colors.secondaryBtnText,
                }}
                data-analytics-location="final_cta"
              >
                <Phone size={17} strokeWidth={2} aria-hidden />
                <CmsText scope="components/sections/FinalCTASection.tsx">{finalCta.secondaryCta}</CmsText>
              </CmsElement>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
