import { whyVantage, whyVantageSection } from "@/lib/content";
import { heroBodyFont, heroHeadingFont } from "@/lib/fonts";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { radiusClasses } from "@/stories/layout-playground";
import {
  resolveWhyVantageColors,
  whyVantageIcons,
  type WhyVantageIconId,
} from "@/stories/why-vantage-playground";

/** Playground args promoted to production — see WhyVantageSection.stories.tsx Playground. */
const HEADING_FONT_SIZE = 36;
const CARD_TITLE_FONT_SIZE = 19;
const CARD_DESC_FONT_SIZE = 14;
const ICON_SIZE = 24;
const CARD_RADIUS = "md2" as const;
const ICON_WRAPPER_RADIUS = "md2" as const;
const CTA_BUTTON_RADIUS = "md2" as const;
const CARD_ICONS = whyVantageSection.cardIcons;
const colors = resolveWhyVantageColors("navyCta", {});

export function WhyVantageSection() {
  const accentClass = heroHeadingFont.className;
  const bodyClass = heroBodyFont.className;

  return (
    <section className="py-24" style={{ backgroundColor: colors.sectionBg }}>
      <Container>
        <div className="mx-auto mb-[52px] max-w-[640px] text-center">
          <Eyebrow className="justify-center">{whyVantageSection.eyebrow}</Eyebrow>
          <h2
            className={`${accentClass} text-balance leading-[1.08] font-extrabold -tracking-[.02em]`}
            style={{
              fontSize: `clamp(30px, 3.4vw, ${HEADING_FONT_SIZE}px)`,
              color: colors.headingColor,
            }}
          >
            {whyVantageSection.heading}
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {whyVantage.map((item, index) => {
            const iconId = (CARD_ICONS[index] ?? CARD_ICONS[0]) as WhyVantageIconId;
            const Icon = whyVantageIcons[iconId];

            return (
              <div
                key={item.title}
                className={`border p-7 shadow-card ${radiusClasses[CARD_RADIUS]}`}
                style={{
                  backgroundColor: colors.cardBg,
                  borderColor: colors.cardBorder,
                }}
              >
                <span
                  className={`mb-4 grid size-12 place-items-center ${radiusClasses[ICON_WRAPPER_RADIUS]}`}
                  style={{ backgroundColor: colors.iconWrapperBg }}
                >
                  <Icon size={ICON_SIZE} style={{ color: colors.iconColor }} strokeWidth={2} />
                </span>
                <h3
                  className={`${accentClass} mb-2 font-extrabold`}
                  style={{
                    fontSize: `${CARD_TITLE_FONT_SIZE}px`,
                    color: colors.cardTitleColor,
                  }}
                >
                  {item.title}
                </h3>
                <p
                  className={`${bodyClass} leading-[1.55]`}
                  style={{
                    fontSize: `${CARD_DESC_FONT_SIZE}px`,
                    color: colors.cardDescColor,
                  }}
                >
                  {item.desc}
                </p>
              </div>
            );
          })}

          <div
            className={`flex flex-col justify-center p-7 shadow-[0_12px_30px_rgba(2,71,153,.22)] ${radiusClasses[CARD_RADIUS]}`}
            style={{
              backgroundImage: `linear-gradient(140deg, ${colors.ctaGradientStart}, ${colors.ctaGradientEnd})`,
            }}
          >
            <h3
              className={`${accentClass} mb-2 font-extrabold`}
              style={{
                fontSize: "20px",
                color: colors.ctaTitleColor,
              }}
            >
              {whyVantageSection.ctaTitle}
            </h3>
            <p
              className={`${bodyClass} mb-[18px] leading-[1.55]`}
              style={{
                fontSize: `${CARD_DESC_FONT_SIZE}px`,
                color: colors.ctaBodyColor,
              }}
            >
              {whyVantageSection.ctaBody}
            </p>
            <a
              href="#quote"
              className={`${accentClass} self-start px-[22px] py-3 font-bold tracking-[.04em] uppercase no-underline transition hover:-translate-y-0.5 ${radiusClasses[CTA_BUTTON_RADIUS]}`}
              style={{
                fontSize: "14px",
                backgroundColor: colors.ctaButtonBg,
                color: colors.ctaButtonText,
              }}
            >
              {whyVantageSection.ctaLabel}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
