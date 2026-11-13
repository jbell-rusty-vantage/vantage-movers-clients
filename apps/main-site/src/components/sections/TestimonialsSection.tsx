"use client";
import { CmsElement, CmsText } from "@/components/cms/Content";


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
  rating: number | null;
}

function toCardData(items: Testimonial[]): CardData[] {
  return items.map((t) => ({
    key: t.id,
    quote: truncate(t.review_text),
    name: t.reviewer_name || "Customer",
    sublabel: t.source ? `Review via ${t.source}` : "Customer feedback",
    rating: Number.isFinite(t.rating) && t.rating >= 1 && t.rating <= 5 ? t.rating : null,
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
  rating,
  className,
}: {
  size: number;
  style: StarStyleId;
  fill: string;
  stroke: string;
  rating: number;
  className?: string;
}) {
  const starProps =
    style === "filled"
      ? { className: "fill-current", strokeWidth: 0 }
      : style === "outline"
        ? { className: "", strokeWidth: 2, fill: "none" }
        : { className: "fill-current opacity-35", strokeWidth: 1.5 };

  return (
    <CmsElement element="div" scope="components/sections/TestimonialsSection.tsx" className={`flex gap-0.5 ${className ?? ""}`} aria-label={`${rating} out of 5 stars`}>
      <CmsText scope="components/sections/TestimonialsSection.tsx">{Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={starProps.className}
          style={{ color: stroke, fill: style === "outline" || i >= Math.floor(rating) ? "none" : fill }}
          strokeWidth={starProps.strokeWidth}
          aria-hidden
        />
      ))}</CmsText>
      <span className="ml-1 text-xs text-brand-blue"><CmsText scope="components/sections/TestimonialsSection.tsx">{rating}</CmsText><CmsText scope="components/sections/TestimonialsSection.tsx">{"/5"}</CmsText></span>
    </CmsElement>
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
      <CmsText scope="components/sections/TestimonialsSection.tsx">{SHOW_STARS && data.rating !== null && (
        <TestimonialStars
          rating={data.rating}
          size={STAR_SIZE}
          style={STAR_STYLE}
          fill={STAR_COLORS.fill}
          stroke={STAR_COLORS.stroke}
          className="mb-3.5"
        />
      )}</CmsText>
      <blockquote
        className={`mb-5 italic text-ink-soft ${testimonialsBodyFont.className}`}
        style={{
          fontSize: `${QUOTE_FONT_SIZE}px`,
          lineHeight: 1.65,
        }}
      ><CmsText scope="components/sections/TestimonialsSection.tsx">{"\u201c"}</CmsText>{data.quote}<CmsText scope="components/sections/TestimonialsSection.tsx">{"\u201d"}</CmsText></blockquote>
      <figcaption className="flex items-center gap-3">
        <span
          className={`grid size-11 place-items-center rounded-full bg-gradient-to-br from-[#2E86DE] to-brand-blue-bright text-[15px] font-extrabold text-white ${heroHeadingFont.className}`}
        >
          <CmsText scope="components/sections/TestimonialsSection.tsx">{initials(data.name)}</CmsText>
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
            <CmsText scope="components/sections/TestimonialsSection.tsx">{data.sublabel}</CmsText>
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
        <CmsElement element="button" scope="components/sections/TestimonialsSection.tsx"
          type="button"
          onClick={goPrev}
          className="grid size-11 shrink-0 place-items-center rounded-full border border-white/25 bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
          aria-label="Show previous testimonial"
        >
          <ChevronLeft size={22} strokeWidth={2.4} aria-hidden />
        </CmsElement>

        <CmsElement element="div" scope="components/sections/TestimonialsSection.tsx"
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
            <CmsText scope="components/sections/TestimonialsSection.tsx">{trackCards.map((card) => (
              <TestimonialCard
                key={card.key}
                data={card}
                fixedWidth={cardWidth > 0 ? cardWidth : undefined}
              />
            ))}</CmsText>
          </div>
        </CmsElement>

        <CmsElement element="button" scope="components/sections/TestimonialsSection.tsx"
          type="button"
          onClick={goNext}
          className="grid size-11 shrink-0 place-items-center rounded-full border border-white/25 bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
          aria-label="Show next testimonial"
        >
          <ChevronRight size={22} strokeWidth={2.4} aria-hidden />
        </CmsElement>
      </div>
    </div>
  );
}

interface TestimonialsSectionProps {
  items?: Testimonial[];
  locale?: "en" | "es";
}

export function TestimonialsSection({ items = [], locale = "en" }: TestimonialsSectionProps) {
  const es = locale === "es";
  const publishedItems = items.filter((item) => item.published);
  if (publishedItems.length === 0) {
    return <section id="testimonials" className="bg-cream py-12"><Container><h2 className="font-display text-2xl font-bold text-brand-blue"><CmsText scope="components/sections/TestimonialsSection.tsx">{es ? "Opiniones de clientes" : "Customer feedback"}</CmsText></h2><p className="mt-3 text-ink-soft"><CmsText scope="components/sections/TestimonialsSection.tsx">{es ? "Actualmente no hay reseñas publicadas para mostrar aquí." : "There are no published reviews to display here right now."}</CmsText></p></Container></section>;
  }

  const carouselTrackCards = fillMarquee(toCardData(publishedItems));

  return (
    <section id="testimonials" className="relative overflow-hidden bg-brand-blue py-24">
      <div
        className="absolute -top-[100px] -left-[100px] size-[420px] rounded-full bg-[radial-gradient(circle,rgba(46,134,222,.22),transparent_65%)]"
        aria-hidden
      />
      <Container className="relative">
        <div className="mx-auto mb-12 max-w-[640px] text-center">
          <Eyebrow onDark className="justify-center">
            <CmsText scope="components/sections/TestimonialsSection.tsx">{es ? "Opiniones de clientes" : "Customer Feedback"}</CmsText>
          </Eyebrow>
          <h2
            className={`mb-3 text-balance leading-[1.08] font-extrabold -tracking-[.02em] text-white ${heroHeadingFont.className}`}
            style={{ fontSize: "clamp(30px, 3.4vw, 44px)" }}
          >
            <CmsText scope="components/sections/TestimonialsSection.tsx">{es ? "Experiencias de clientes" : "Hear from customers we’ve helped move"}</CmsText>
          </h2>
          <p
            className={`text-on-dark-500 ${testimonialsBodyFont.className}`}
            style={{ fontSize: "15px" }}
          >
            <CmsText scope="components/sections/TestimonialsSection.tsx">{es ? "Opiniones sobre la coordinación de mudanzas con Vantage. Las reseñas conservan su idioma original." : "Feedback about coordinating a move with Vantage."}</CmsText>
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
