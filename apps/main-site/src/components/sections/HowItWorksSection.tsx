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
    <section className="planning-section relative overflow-hidden" style={{ backgroundColor: `var(--planning-bg, ${colors.sectionBg})` }}>
      <div
        className="planning-backdrop absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,.04) 1px,transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      <Container className="relative">
        <div
          className="planning-intro flex flex-wrap items-center justify-between gap-4 border-b py-5"
          style={{ borderColor: `var(--planning-line, ${colors.topBarBorder})` }}
        >
          <p
            className={`${bodyClass} font-medium`}
            style={{ fontSize: "15px", color: `var(--planning-muted, ${colors.taglineColor})` }}
          >
            <CmsText scope="components/sections/HowItWorksSection.tsx">{es ? "Revise el inventario, los servicios y las condiciones escritas antes de decidir." : howItWorksSection.tagline}</CmsText>
          </p>
          <CmsElement element="a" scope="components/sections/HowItWorksSection.tsx"
            href={business.phoneHref}
            className={`planning-call ${accentClass} inline-flex items-center gap-2.5 px-5 py-2.5 font-bold no-underline shadow-cta-yellow transition hover:-translate-y-0.5 ${radiusClasses[PHONE_BUTTON_RADIUS]}`}
            style={{
              fontSize: "15px",
              backgroundColor: `var(--planning-call-bg, ${colors.phoneBtnBg})`,
              color: `var(--planning-call-text, ${colors.phoneBtnText})`,
            }}
          >
            <Phone size={16} strokeWidth={2.25} aria-hidden />
            <CmsText scope="components/sections/HowItWorksSection.tsx">{business.phoneDisplay}</CmsText>
          </CmsElement>
        </div>

        <div
          style={{
            paddingTop: `var(--planning-top, ${SPACING.py * 4 + 28}px)`,
            paddingBottom: `var(--planning-bottom, ${SPACING.py * 4 + 36}px)`,
          }}
        >
          <div className="planning-heading mx-auto mb-14 max-w-[640px] text-center">
            <div
              className={`planning-eyebrow ${accentClass} mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[12px] font-bold tracking-[.12em] uppercase ${radiusClasses.full}`}
              style={{
                borderColor: `var(--planning-eyebrow-line, ${colors.eyebrowBorder})`,
                backgroundColor: `var(--planning-eyebrow-bg, ${colors.eyebrowBg})`,
                color: `var(--planning-accent, ${colors.eyebrowText})`,
              }}
            >
              <span
                className="inline-block size-[7px] rounded-full"
                style={{ backgroundColor: `var(--planning-accent, ${colors.stepNumberColor})` }}
                aria-hidden
              />
              <CmsText scope="components/sections/HowItWorksSection.tsx">{es ? "Cómo funciona" : howItWorksSection.eyebrow}</CmsText>
            </div>
            <h2
              className={`${accentClass} leading-[1.1] font-extrabold -tracking-[.02em]`}
              style={{
                fontSize: `clamp(32px, 3.8vw, ${HEADING_FONT_SIZE}px)`,
                color: `var(--planning-heading, ${colors.titleColor})`,
              }}
            >
              <CmsText scope="components/sections/HowItWorksSection.tsx">{es ? "Su mudanza en" : howItWorksSection.titleLead}</CmsText>
              <br />
              <span style={{ color: `var(--planning-accent, ${colors.titleAccent})`, fontStyle: "var(--planning-heading-accent-style, italic)" }}>
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
