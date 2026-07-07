import { Phone } from "lucide-react";
import { FaqAccordion } from "@/components/interactive/FaqAccordion";
import { Container } from "@/components/ui/Container";
import { business } from "@/lib/content";
import { heroBodyFont, heroHeadingFont } from "@/lib/fonts";
import { radiusClasses } from "@/lib/playground/layout-playground";

/** Playground args promoted to production — see FaqSection.stories.tsx Playground. */
const HEADING_FONT_SIZE = 44;

export function FaqSection() {
  return (
    <section id="faq" className="bg-cream py-24">
      <Container className="grid items-start gap-14 lg:grid-cols-[.8fr_1.2fr]">
        <div className="lg:sticky lg:top-[120px]">
          <h2
            className={`mb-[18px] text-balance leading-[1.08] font-extrabold -tracking-[.02em] text-brand-blue ${heroHeadingFont.className}`}
            style={{ fontSize: `clamp(30px, 3.4vw, ${HEADING_FONT_SIZE}px)` }}
          >
            Frequently Asked Questions
          </h2>
          <p
            className={`mb-[26px] text-base leading-[1.6] text-[#64748B] ${heroBodyFont.className}`}
          >
            Find answers to common questions and what to expect throughout the relocation
            process.
          </p>
          <a
            href={business.phoneHref}
            className={`inline-flex items-center gap-2.5 border border-cream-border bg-white px-5 py-4 no-underline shadow-card ${radiusClasses.md2}`}
          >
            <span
              className={`grid size-[42px] flex-none place-items-center bg-brand-yellow-soft ${radiusClasses.md2}`}
            >
              <Phone className="size-5 text-brand-blue" strokeWidth={2} aria-hidden />
            </span>
            <span>
              <span className={`block text-[13px] text-[#64748B] ${heroBodyFont.className}`}>
                Still have questions?
              </span>
              <span
                className={`block text-[17px] font-extrabold text-brand-blue ${heroHeadingFont.className}`}
              >
                {business.phoneDisplay}
              </span>
            </span>
          </a>
        </div>

        <FaqAccordion />
      </Container>
    </section>
  );
}
