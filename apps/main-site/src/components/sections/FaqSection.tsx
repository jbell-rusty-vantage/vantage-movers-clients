import { Phone } from "lucide-react";
import { business } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FaqAccordion } from "@/components/interactive/FaqAccordion";

export function FaqSection() {
  return (
    <section id="faq" className="bg-cream py-24">
      <Container className="grid items-start gap-14 lg:grid-cols-[.8fr_1.2fr]">
        <div className="lg:sticky lg:top-[120px]">
          <Eyebrow>FAQs</Eyebrow>
          <h2 className="mb-[18px] text-balance font-display text-[clamp(30px,3.4vw,44px)] leading-[1.08] font-extrabold -tracking-[.02em] text-brand-blue">
            Frequently Asked Questions
          </h2>
          <p className="mb-[26px] text-base leading-[1.6] text-[#64748B]">
            Everything you need to know about working with a licensed moving broker.
          </p>
          <a
            href={business.phoneHref}
            className="inline-flex items-center gap-2.5 rounded-xl border border-cream-border bg-white px-5 py-4 no-underline shadow-card"
          >
            <span className="grid size-[42px] flex-none place-items-center rounded-full bg-brand-yellow-soft">
              <Phone className="size-5 text-brand-blue" strokeWidth={2} aria-hidden />
            </span>
            <span>
              <span className="block text-[13px] text-[#64748B]">Still have questions?</span>
              <span className="font-display text-[17px] font-extrabold text-brand-blue">
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
