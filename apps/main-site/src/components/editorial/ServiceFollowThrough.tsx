import { getTestimonials } from "@vantage/api-client";
import type { EditorialEntry } from "@/content/editorial/types";
import { entriesFor } from "@/lib/publication";
import { Container } from "@/components/ui/Container";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { CoverageSection } from "@/components/sections/CoverageSection";
import { FaqAccordion } from "@/components/interactive/FaqAccordion";
import { EditorialCards } from "./EditorialCards";

export async function ServiceFollowThrough({ entry }: { entry: EditorialEntry }) {
  const es = entry.locale === "es";
  const testimonials = await getTestimonials();
  const questions = entry.sections.filter(section => section.heading.endsWith("?")).map(section => ({ q: section.heading, a: section.paragraphs.join(" ") }));
  return <>
    <TestimonialsSection items={testimonials} locale={entry.locale} />
    <CoverageSection locale={entry.locale} />
    <section className="bg-cream py-16" data-service-grid><Container>
      <h2 className="mb-8 text-balance text-center font-display text-3xl font-extrabold text-brand-blue sm:text-4xl">{es ? "Explore los servicios de mudanza" : "Explore moving services"}</h2>
      <EditorialCards entries={entriesFor(entry.locale).filter(item => item.kind === "service")} />
    </Container></section>
    <section id="faq" className="scroll-mt-36 bg-white py-16"><Container className="grid gap-10 lg:grid-cols-[.7fr_1.3fr]">
      <div><p className="mb-3 text-sm font-semibold text-brand-blue">{entry.navLabel}</p><h2 className="font-display text-3xl font-extrabold text-brand-blue">{es ? "Preguntas antes de mudarse" : "Questions before you move"}</h2></div>
      <FaqAccordion items={questions} />
    </Container></section>
  </>;
}
