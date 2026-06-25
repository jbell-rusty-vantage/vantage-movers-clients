import type { Testimonial } from "@vantage/api-client";
import { testimonials as fallbackTestimonials } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Stars } from "@/components/ui/Stars";

const MAX_TEXT = 320;

function truncate(text: string): string {
  if (text.length <= MAX_TEXT) return text;
  return `${text.slice(0, MAX_TEXT).trimEnd()}…`;
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return `${parts[0]![0]}${parts[parts.length - 1]![0]}`.toUpperCase();
}

interface CardData {
  key: string;
  quote: string;
  name: string;
  sublabel: string;
  rating: number;
}

function toCardData(items: Testimonial[]): CardData[] {
  return items.map((t) => ({
    key: t.id,
    quote: truncate(t.review_text),
    name: t.reviewer_name || "Verified customer",
    sublabel: t.source ? `Verified review via ${t.source}` : "Verified review",
    rating: t.rating || 5,
  }));
}

function fallbackCards(): CardData[] {
  return fallbackTestimonials.map((t) => ({
    key: t.name,
    quote: t.quote,
    name: t.name,
    sublabel: t.route,
    rating: 5,
  }));
}

function fillMarquee(cards: CardData[]): CardData[] {
  const target = 12;
  if (cards.length === 0) return [];
  return Array.from({ length: target }, (_, index) => ({
    ...cards[index % cards.length]!,
    key: `${cards[index % cards.length]!.key}-${index}`,
  }));
}

function TestimonialCard({ data }: { data: CardData }) {
  return (
    <figure className="testi-card flex-none">
      <Stars size={17} value={data.rating} className="mb-3.5" />
      <blockquote className="mb-5 text-[15.5px] leading-[1.65] text-ink-soft italic">
        &ldquo;{data.quote}&rdquo;
      </blockquote>
      <figcaption className="flex items-center gap-3">
        <span className="grid size-11 place-items-center rounded-full bg-gradient-to-br from-[#2E86DE] to-brand-blue-bright font-display text-[15px] font-extrabold text-white">
          {initials(data.name)}
        </span>
        <span>
          <span className="block font-display text-[15px] font-bold text-brand-blue">
            {data.name}
          </span>
          <span className="block text-[13px] text-[#64748B]">{data.sublabel}</span>
        </span>
      </figcaption>
    </figure>
  );
}

interface TestimonialsSectionProps {
  items?: Testimonial[];
}

export function TestimonialsSection({ items = [] }: TestimonialsSectionProps) {
  const sourceCards = items.length > 0 ? toCardData(items) : fallbackCards();
  const cards = fillMarquee(sourceCards);

  return (
    <section className="relative overflow-hidden bg-brand-blue py-24">
      <div className="absolute -top-[100px] -left-[100px] size-[420px] rounded-full bg-[radial-gradient(circle,rgba(46,134,222,.22),transparent_65%)]" />
      <Container className="relative">
        <div className="mx-auto mb-12 max-w-[640px] text-center">
          <Eyebrow onDark className="justify-center">
            Customer Feedback
          </Eyebrow>
          <h2 className="mb-3 text-balance font-display text-[clamp(30px,3.4vw,44px)] leading-[1.08] font-extrabold -tracking-[.02em] text-white">
            Hear From Customers We&apos;ve Helped Coordinate
          </h2>
          <p className="text-[15px] text-on-dark-500">
            Feedback from long-distance relocations coordinated through Vantage.
          </p>
        </div>
      </Container>

      <div
        className="testi-marquee"
        aria-label="Customer testimonials, auto-scrolling. Hover to pause."
      >
        <div className="testi-track">
          {cards.map((t) => (
            <TestimonialCard key={`a-${t.key}`} data={t} />
          ))}
          {cards.map((t) => (
            <TestimonialCard key={`b-${t.key}`} data={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
