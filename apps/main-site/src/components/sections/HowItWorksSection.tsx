import { CmsElement } from "@/components/cms/Content";
import { CmsText } from "@/components/cms/Content";
import { Phone } from "lucide-react";
import { business, howItWorksSection } from "@/lib/content";
import { MovingProcess } from "@/components/interactive/MovingProcess";
import { heroBodyFont, heroHeadingFont } from "@/lib/fonts";
import { Container } from "@/components/ui/Container";
import { radiusClasses, spacingScale } from "@/lib/playground/layout-playground";
import { resolveHowItWorksColors } from "@/lib/playground/how-it-works-playground";

/** Playground args promoted to production — see HowItWorksSection.stories.tsx Playground. */
const HEADING_FONT_SIZE = 44;
const PHONE_BUTTON_RADIUS = "full" as const;
const SPACING = spacingScale.default;
const colors = resolveHowItWorksColors("production", {});

export function HowItWorksSection({ locale = "en" }: { locale?: "en" | "es" }) {
  const es = locale === "es";
  const accentClass = heroHeadingFont.className;
  const bodyClass = heroBodyFont.className;

  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: colors.sectionBg }}>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,.04) 1px,transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      <Container className="relative">
        <div
          className="flex flex-wrap items-center justify-between gap-4 border-b py-5"
          style={{ borderColor: colors.topBarBorder }}
        >
          <p
            className={`${bodyClass} font-medium`}
            style={{ fontSize: "15px", color: colors.taglineColor }}
          >
            <CmsText scope="components/sections/HowItWorksSection.tsx">{es ? "Revise el inventario, los servicios y las condiciones escritas antes de decidir." : howItWorksSection.tagline}</CmsText>
          </p>
          <CmsElement element="a" scope="components/sections/HowItWorksSection.tsx"
            href={business.phoneHref}
            className={`${accentClass} inline-flex items-center gap-2.5 px-5 py-2.5 font-bold no-underline shadow-cta-yellow transition hover:-translate-y-0.5 ${radiusClasses[PHONE_BUTTON_RADIUS]}`}
            style={{
              fontSize: "15px",
              backgroundColor: colors.phoneBtnBg,
              color: colors.phoneBtnText,
            }}
          >
            <Phone size={16} strokeWidth={2.25} aria-hidden />
            <CmsText scope="components/sections/HowItWorksSection.tsx">{business.phoneDisplay}</CmsText>
          </CmsElement>
        </div>

        <div
          style={{
            paddingTop: `${SPACING.py * 4 + 28}px`,
            paddingBottom: `${SPACING.py * 4 + 36}px`,
          }}
        >
          <div className="mx-auto mb-14 max-w-[640px] text-center">
            <div
              className={`${accentClass} mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[12px] font-bold tracking-[.12em] uppercase ${radiusClasses.full}`}
              style={{
                borderColor: colors.eyebrowBorder,
                backgroundColor: colors.eyebrowBg,
                color: colors.eyebrowText,
              }}
            >
              <span
                className="inline-block size-[7px] rounded-full"
                style={{ backgroundColor: colors.stepNumberColor }}
                aria-hidden
              />
              <CmsText scope="components/sections/HowItWorksSection.tsx">{es ? "Cómo funciona" : howItWorksSection.eyebrow}</CmsText>
            </div>
            <h2
              className={`${accentClass} leading-[1.1] font-extrabold -tracking-[.02em]`}
              style={{
                fontSize: `clamp(32px, 3.8vw, ${HEADING_FONT_SIZE}px)`,
                color: colors.titleColor,
              }}
            >
              <CmsText scope="components/sections/HowItWorksSection.tsx">{es ? "Su mudanza en" : howItWorksSection.titleLead}</CmsText>
              <br />
              <span style={{ color: colors.titleAccent, fontStyle: "italic" }}>
                <CmsText scope="components/sections/HowItWorksSection.tsx">{es ? "5 pasos de preparación" : "5 planning steps"}</CmsText>
              </span>
            </h2>
          </div>

          <MovingProcess locale={locale} />
        </div>
      </Container>
    </section>
  );
}
