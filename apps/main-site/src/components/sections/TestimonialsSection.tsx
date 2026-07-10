"use client";

import { useEffect, useRef, useState } from "react";
import type { Testimonial } from "@vantage/api-client";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { heroHeadingFont, testimonialsBodyFont } from "@/lib/fonts";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { radiusClasses } from "@/lib/playground/layout-playground";
import {
  cardSizeWidths,
  resolveStarColors,
  type StarStyleId,
} from "@/lib/playground/testimonials-playground";

const MAX_TEXT = 320;
const CAROUSEL_GAP = 24;
/** Smallest a card is allowed to get before we drop to fewer visible cards. */
const MIN_CARD_WIDTH = 300;

/** Playground args promoted to production — see TestimonialsSection.stories.tsx Playground. */
const CAROUSEL_VISIBLE_COUNT = 3;
const QUOTE_FONT_SIZE = 14;
const NAME_FONT_SIZE = 15;
const SUBLABEL_FONT_SIZE = 13;
const CARD_SIZE = "default" as const;
const CARD_RADIUS = "card" as const;
const CARD_PADDING = 28;
const STAR_SIZE = 14;
const STAR_STYLE: StarStyleId = "filled";
const STAR_COLORS = resolveStarColors("amber");
const SHOW_STARS = true;

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

function fillMarquee(cards: CardData[]): CardData[] {
  const target = 12;
  if (cards.length === 0) return [];
  if (cards.length >= target) return cards;
  return Array.from({ length: target }, (_, index) => ({
    ...cards[index % cards.length]!,
    key: `${cards[index % cards.length]!.key}-${index}`,
  }));
}

function TestimonialStars({
  size,
  style,
  fill,
  stroke,
  className,
}: {
  size: number;
  style: StarStyleId;
  fill: string;
  stroke: string;
  className?: string;
}) {
  const starProps =
    style === "filled"
      ? { className: "fill-current", strokeWidth: 0 }
      : style === "outline"
        ? { className: "", strokeWidth: 2, fill: "none" }
        : { className: "fill-current opacity-35", strokeWidth: 1.5 };

  return (
    <div className={`flex gap-0.5 ${className ?? ""}`} aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={starProps.className}
          style={{ color: stroke, fill: style === "outline" ? "none" : fill }}
          strokeWidth={starProps.strokeWidth}
          aria-hidden
        />
      ))}
    </div>
  );
}

function TestimonialCard({
  data,
  fixedWidth,
}: {
  data: CardData;
  fixedWidth?: number;
}) {
  return (
    <figure
      className={`flex-none bg-white shadow-[0_14px_36px_rgba(4,18,38,0.3)] transition duration-250 hover:-translate-y-1 hover:shadow-[0_20px_44px_rgba(4,18,38,0.36)] ${radiusClasses[CARD_RADIUS]}`}
      style={{
        width: fixedWidth !== undefined ? `${fixedWidth}px` : cardSizeWidths[CARD_SIZE],
        padding: `${CARD_PADDING}px`,
      }}
    >
      {SHOW_STARS && (
        <TestimonialStars
          size={STAR_SIZE}
          style={STAR_STYLE}
          fill={STAR_COLORS.fill}
          stroke={STAR_COLORS.stroke}
          className="mb-3.5"
        />
      )}
      <blockquote
        className={`mb-5 italic text-ink-soft ${testimonialsBodyFont.className}`}
        style={{
          fontSize: `${QUOTE_FONT_SIZE}px`,
          lineHeight: 1.65,
        }}
      >
        &ldquo;{data.quote}&rdquo;
      </blockquote>
      <figcaption className="flex items-center gap-3">
        <span
          className={`grid size-11 place-items-center rounded-full bg-gradient-to-br from-[#2E86DE] to-brand-blue-bright text-[15px] font-extrabold text-white ${heroHeadingFont.className}`}
        >
          {initials(data.name)}
        </span>
        <span>
          <span
            className={`block font-bold text-brand-blue ${heroHeadingFont.className}`}
            style={{ fontSize: `${NAME_FONT_SIZE}px` }}
          >
            {data.name}
          </span>
          <span
            className={`block text-[#64748B] ${testimonialsBodyFont.className}`}
            style={{ fontSize: `${SUBLABEL_FONT_SIZE}px` }}
          >
            {data.sublabel}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

function TestimonialsCarousel({
  trackCards,
  maxVisibleCount,
}: {
  trackCards: CardData[];
  maxVisibleCount: number;
}) {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(0);
  const [visibleCount, setVisibleCount] = useState(maxVisibleCount);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const updateWidth = () => {
      const viewportWidth = viewport.clientWidth;
      if (viewportWidth <= 0) return;
      // How many cards fit while keeping each at least MIN_CARD_WIDTH wide.
      const fits = Math.floor((viewportWidth + CAROUSEL_GAP) / (MIN_CARD_WIDTH + CAROUSEL_GAP));
      const nextVisible = Math.max(1, Math.min(maxVisibleCount, fits));
      const width = (viewportWidth - (nextVisible - 1) * CAROUSEL_GAP) / nextVisible;
      setVisibleCount(nextVisible);
      setCardWidth(width);
    };

    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, [maxVisibleCount]);

  const slideStep = cardWidth > 0 ? cardWidth + CAROUSEL_GAP : 0;
  const maxStartIndex = Math.max(0, trackCards.length - visibleCount);

  if (carouselIndex > maxStartIndex) {
    setCarouselIndex(maxStartIndex);
  }

  const goNext = () =>
    setCarouselIndex((index) => (index >= maxStartIndex ? 0 : index + 1));
  const goPrev = () =>
    setCarouselIndex((index) => (index <= 0 ? maxStartIndex : index - 1));

  return (
    <div className="relative mx-auto max-w-[1400px] px-4">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={goPrev}
          className="grid size-11 shrink-0 place-items-center rounded-full border border-white/25 bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
          aria-label="Show previous testimonial"
        >
          <ChevronLeft size={22} strokeWidth={2.4} aria-hidden />
        </button>

        <div
          ref={viewportRef}
          className="min-w-0 flex-1 overflow-hidden py-2.5 [mask-image:linear-gradient(90deg,transparent,#000_3%,#000_97%,transparent)]"
          aria-label={`Customer testimonials carousel, ${visibleCount} visible`}
        >
          <div
            className="flex transition-transform duration-350 ease-out"
            style={{
              gap: `${CAROUSEL_GAP}px`,
              transform:
                slideStep > 0 ? `translateX(-${carouselIndex * slideStep}px)` : undefined,
            }}
          >
            {trackCards.map((card) => (
              <TestimonialCard
                key={card.key}
                data={card}
                fixedWidth={cardWidth > 0 ? cardWidth : undefined}
              />
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={goNext}
          className="grid size-11 shrink-0 place-items-center rounded-full border border-white/25 bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
          aria-label="Show next testimonial"
        >
          <ChevronRight size={22} strokeWidth={2.4} aria-hidden />
        </button>
      </div>
    </div>
  );
}

interface TestimonialsSectionProps {
  items?: Testimonial[];
}

export function TestimonialsSection({ items = [] }: TestimonialsSectionProps) {
  const publishedItems = items.filter((item) => item.published);
  if (publishedItems.length === 0) {
    return null;
  }

  const carouselTrackCards = fillMarquee(toCardData(publishedItems));

  return (
    <section className="relative overflow-hidden bg-brand-blue py-24">
      <div
        className="absolute -top-[100px] -left-[100px] size-[420px] rounded-full bg-[radial-gradient(circle,rgba(46,134,222,.22),transparent_65%)]"
        aria-hidden
      />
      <Container className="relative">
        <div className="mx-auto mb-12 max-w-[640px] text-center">
          <Eyebrow onDark className="justify-center">
            Customer Feedback
          </Eyebrow>
          <h2
            className={`mb-3 text-balance leading-[1.08] font-extrabold -tracking-[.02em] text-white ${heroHeadingFont.className}`}
            style={{ fontSize: "clamp(30px, 3.4vw, 44px)" }}
          >
            Hear From Customers
            <br />
            We&apos;ve Helped Move
          </h2>
          <p
            className={`text-on-dark-500 ${testimonialsBodyFont.className}`}
            style={{ fontSize: "15px" }}
          >
            Real feedback from customers who trusted Vantage to help coordinate their
            long-distance relocations.
          </p>
        </div>
      </Container>

      <TestimonialsCarousel
        trackCards={carouselTrackCards}
        maxVisibleCount={CAROUSEL_VISIBLE_COUNT}
      />
    </section>
  );
}
