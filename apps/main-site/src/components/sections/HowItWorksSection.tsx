import { Phone } from "lucide-react";
import { business, howItWorks, howItWorksSection } from "@/lib/content";
import { heroBodyFont, heroHeadingFont } from "@/lib/fonts";
import { Container } from "@/components/ui/Container";
import { radiusClasses, spacingScale } from "@/stories/layout-playground";
import { resolveHowItWorksColors } from "@/stories/how-it-works-playground";

/** Playground args promoted to production — see HowItWorksSection.stories.tsx Playground. */
const HEADING_FONT_SIZE = 44;
const STEP_TITLE_FONT_SIZE = 18;
const STEP_DESC_FONT_SIZE = 14.5;
const STEP_NUMBER_SIZE = 22;
const PHONE_BUTTON_RADIUS = "full" as const;
const SPACING = spacingScale.default;
const colors = resolveHowItWorksColors("production", {});

export function HowItWorksSection() {
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
            {howItWorksSection.tagline}
          </p>
          <a
            href={business.phoneHref}
            className={`${accentClass} inline-flex items-center gap-2.5 px-5 py-2.5 font-bold no-underline shadow-cta-yellow transition hover:-translate-y-0.5 ${radiusClasses[PHONE_BUTTON_RADIUS]}`}
            style={{
              fontSize: "15px",
              backgroundColor: colors.phoneBtnBg,
              color: colors.phoneBtnText,
            }}
          >
            <Phone size={16} strokeWidth={2.25} aria-hidden />
            {business.phoneDisplay}
          </a>
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
              {howItWorksSection.eyebrow}
            </div>
            <h2
              className={`${accentClass} leading-[1.1] font-extrabold -tracking-[.02em]`}
              style={{
                fontSize: `clamp(32px, 3.8vw, ${HEADING_FONT_SIZE}px)`,
                color: colors.titleColor,
              }}
            >
              {howItWorksSection.titleLead}
              <br />
              <span style={{ color: colors.titleAccent, fontStyle: "italic" }}>
                {howItWorksSection.titleAccent}
              </span>
            </h2>
          </div>

          <div className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            <div
              className="pointer-events-none absolute top-7 right-[12.5%] left-[12.5%] hidden h-px lg:block"
              style={{ backgroundColor: colors.connectorLine }}
              aria-hidden
            />

            {howItWorks.map((step) => (
              <div key={step.n} className="relative flex flex-col items-center text-center">
                <div
                  className="relative z-10 mb-5 grid size-14 place-items-center rounded-full border"
                  style={{
                    borderColor: colors.stepCircleBorder,
                    backgroundColor: colors.stepCircleBg,
                  }}
                >
                  <span
                    className={`${accentClass} leading-none font-black`}
                    style={{
                      fontSize: `${STEP_NUMBER_SIZE}px`,
                      color: colors.stepNumberColor,
                    }}
                  >
                    {step.n}
                  </span>
                </div>
                <h3
                  className={`${accentClass} mb-2.5 font-extrabold`}
                  style={{
                    fontSize: `${STEP_TITLE_FONT_SIZE}px`,
                    color: colors.stepTitleColor,
                  }}
                >
                  {step.title}
                </h3>
                <p
                  className={`${bodyClass} max-w-[240px] leading-[1.65]`}
                  style={{
                    fontSize: `${STEP_DESC_FONT_SIZE}px`,
                    color: colors.stepDescColor,
                  }}
                >
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
