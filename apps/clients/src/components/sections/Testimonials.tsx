import { reviews, reviewsIntro } from "@/content/reviews";
import type { Testimonial } from "@vantage/api-client";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { Stars } from "@/components/ui/Stars";

interface CardData {
  name: string;
  text: string;
  sublabel: string;
  rating: number;
}

const MAX_TEXT = 320;

function truncate(text: string): string {
  if (text.length <= MAX_TEXT) {
    return text;
  }
  return `${text.slice(0, MAX_TEXT).trimEnd()}…`;
}

function TestimonialCard({ data, idx }: { data: CardData; idx: string }) {
  return (
    <figure className="tcard" key={idx}>
      <span className="tcard__quote">
        <Icon name="quote" fill="currentColor" stroke="none" />
      </span>
      <Stars size={18} value={data.rating} />
      <blockquote>{data.text}</blockquote>
      <figcaption>
        <span className="tcard__avatar">{data.name[0]}</span>
        <span>
          <b>{data.name}</b>
          <br />
          <span className="tcard__loc">{data.sublabel}</span>
        </span>
      </figcaption>
    </figure>
  );
}

function toCardData(items: Testimonial[]): CardData[] {
  return items.map((t) => ({
    name: t.reviewer_name || "Verified customer",
    text: truncate(t.review_text),
    sublabel: t.source ? `Verified review via ${t.source}` : "Verified review",
    rating: t.rating || 5,
  }));
}

export function Testimonials({ items = [] }: { items?: Testimonial[] }) {
  // Live testimonials from vantage-main-server, with a graceful static fallback.
  const cards: CardData[] =
    items.length > 0
      ? toCardData(items)
      : reviews.map((r) => ({ name: r.name, text: r.text, sublabel: r.location, rating: 5 }));

  return (
    <section className="section testi" id="reviews">
      <div className="wrap">
        <div className="section__head reveal">
          <Eyebrow center>{reviewsIntro.eyebrow}</Eyebrow>
          <h2>{reviewsIntro.title}</h2>
          <p>{reviewsIntro.body}</p>
        </div>
      </div>
      <div
        className="testi__marquee reveal"
        aria-label="Customer testimonials, auto-scrolling. Hover to pause."
      >
        {/* Track rendered 2x for a seamless loop. */}
        <div className="testi__track">
          {cards.map((c, i) => (
            <TestimonialCard key={`a-${i}`} data={c} idx={`a-${i}`} />
          ))}
          {cards.map((c, i) => (
            <TestimonialCard key={`b-${i}`} data={c} idx={`b-${i}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
