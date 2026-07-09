import Image from "next/image";
import { Suspense } from "react";
import type { Testimonial } from "@vantage/api-client";
import { Clock, Mail, Phone, Star } from "lucide-react";
import {
  FeaturedReviewSkeleton,
  QuoteWizardSkeleton,
} from "@/components/feedback/LoadingSkeletons";
import { QuoteWizard } from "@/components/interactive/QuoteWizard";
import { Container } from "@/components/ui/Container";
import { business, quoteSection, trustStrip, type TrustLogo } from "@/lib/content";
import { heroBodyFont, heroHeadingFont } from "@/lib/fonts";
import { resolveSiteImage } from "@/lib/images";
import { radiusClasses } from "@/lib/playground/layout-playground";
import {
  resolveStarColors,
} from "@/lib/playground/testimonials-playground";

/** Playground args promoted to production — see GetInTouchSection.stories.tsx Playground. */
const HEADING_FONT_SIZE = 36;
const STAR_SIZE = 18;
const REVIEW_STAR_SIZE = 14;
const STAR_COLORS = resolveStarColors("gold");

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return `${parts[0]![0]}${parts[parts.length - 1]![0]}`.toUpperCase();
}

function SoftStars({
  size,
  value = 5,
  className,
}: {
  size: number;
  value?: number;
  className?: string;
}) {
  return (
    <div
      className={`flex gap-0.5 ${className ?? ""}`}
      aria-label={`${value} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className="fill-current opacity-35"
          style={{
            color: STAR_COLORS.stroke,
            fill: STAR_COLORS.fill,
            opacity: i < value ? 1 : 0.25,
          }}
          strokeWidth={1.5}
          aria-hidden
        />
      ))}
    </div>
  );
}

interface ReviewSnippetProps {
  quote: string;
  name: string;
  source: string;
  rating: number;
}

function ReviewSnippet({ quote, name, source, rating }: ReviewSnippetProps) {
  return (
    <figure className="rounded-card border border-white/12 bg-white/6 px-5 py-4 backdrop-blur-sm">
      <blockquote
        className={`mb-3.5 text-[14px] leading-[1.6] text-on-dark-100 italic ${heroBodyFont.className}`}
      >
        &ldquo;{quote}&rdquo;
      </blockquote>
      <figcaption className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span
            className={`grid size-10 place-items-center rounded-full bg-gradient-to-br from-[#2E86DE] to-brand-blue-bright text-sm font-extrabold text-white ${heroHeadingFont.className}`}
          >
            {initials(name)}
          </span>
          <span>
            <span
              className={`block text-[14px] font-bold text-white ${heroHeadingFont.className}`}
            >
              {name}
            </span>
            <span className={`block text-[12.5px] text-on-dark-500 ${heroBodyFont.className}`}>
              {source}
            </span>
          </span>
        </div>
        <SoftStars size={REVIEW_STAR_SIZE} value={rating} className="shrink-0" />
      </figcaption>
    </figure>
  );
}

async function FeaturedReviewSnippet({
  featuredTestimonialPromise,
}: {
  featuredTestimonialPromise?: Promise<Testimonial | null>;
}) {
  const featuredTestimonial = featuredTestimonialPromise
    ? await featuredTestimonialPromise
    : null;
  const review =
    featuredTestimonial && featuredTestimonial.review_text
      ? {
          quote: featuredTestimonial.review_text,
          name: featuredTestimonial.reviewer_name || "Verified customer",
          source: featuredTestimonial.source
            ? `Verified review via ${featuredTestimonial.source}`
            : "Verified review",
          rating: featuredTestimonial.rating || 5,
        }
      : quoteSection.featuredReview;

  return <ReviewSnippet {...review} />;
}

function CompactTrustLogo({ logo }: { logo: TrustLogo }) {
  return (
    <span className="trust-logo trust-logo--compact">
      <Image
        src={logo.src}
        alt={logo.alt}
        width={logo.width}
        height={logo.height}
        className={`trust-logo__img${logo.wide ? " trust-logo__img--wide" : ""} brightness-0 invert`}
      />
    </span>
  );
}

function CompactTrustLogos() {
  const [row1, row2] = [trustStrip.logos.slice(0, 2), trustStrip.logos.slice(2)];

  return (
    <div className="flex flex-col items-center gap-2.5 sm:gap-3">
      <div className="flex items-center justify-center gap-3 sm:gap-4">
        {row1.map((logo) => (
          <CompactTrustLogo key={logo.src} logo={logo} />
        ))}
      </div>
      <div className="flex items-center justify-center gap-3 sm:gap-4">
        {row2.map((logo) => (
          <CompactTrustLogo key={logo.src} logo={logo} />
        ))}
      </div>
    </div>
  );
}

interface GetInTouchSectionProps {
  featuredTestimonial?: Testimonial | null;
  featuredTestimonialPromise?: Promise<Testimonial | null>;
}

export function GetInTouchSection({
  featuredTestimonial,
  featuredTestimonialPromise,
}: GetInTouchSectionProps) {
  const reviewPromise =
    featuredTestimonialPromise ?? Promise.resolve(featuredTestimonial ?? null);
  const contactItems = [
    {
      icon: Phone,
      label: business.phoneDisplay,
      href: business.phoneHref,
    },
    {
      icon: Mail,
      label: business.email,
      href: `mailto:${business.email}`,
    },
    {
      icon: Clock,
      label: business.hours,
      href: undefined,
    },
  ] as const;

  return (
    <section id="get-quote" className="bg-cream py-20 lg:py-24">
      <Container className="px-3 min-[360px]:px-4 sm:px-7">
        <div
          className={`w-full max-w-full overflow-hidden bg-brand-blue shadow-[0_28px_64px_rgba(2,47,102,.22)] ${radiusClasses.md2}`}
        >
          <div className="grid min-w-0 items-start gap-8 p-3 min-[360px]:p-4 sm:p-6 lg:grid-cols-[1fr_1.05fr] lg:gap-12 lg:p-12">
            <div className="min-w-0">
              <div className="mb-5 flex items-center gap-3">
                <span className="h-0.5 w-8 rounded-full bg-brand-yellow" aria-hidden />
                <span
                  className={`text-[13px] font-bold tracking-[0.14em] text-brand-yellow uppercase ${heroHeadingFont.className}`}
                >
                  {quoteSection.eyebrow}
                </span>
              </div>

              <h2
                className={`mb-4 text-balance leading-[1.1] font-extrabold -tracking-[.02em] text-white ${heroHeadingFont.className}`}
                style={{ fontSize: `clamp(28px, 3.2vw, ${HEADING_FONT_SIZE}px)` }}
              >
                {quoteSection.title}{" "}
                <span className="text-brand-yellow">{quoteSection.titleAccent}</span>
              </h2>

              <p
                className={`mb-8 max-w-[480px] text-[15.5px] leading-[1.65] text-on-dark-300 ${heroBodyFont.className}`}
              >
                {quoteSection.body}
              </p>

              <ul className="mb-8 flex flex-col gap-4">
                {contactItems.map((item) => {
                  const Icon = item.icon;
                  const content = (
                    <>
                      <span
                        className={`grid size-11 shrink-0 place-items-center bg-white/10 text-brand-yellow ${radiusClasses.md2}`}
                      >
                        <Icon size={18} strokeWidth={2} aria-hidden />
                      </span>
                      <span
                        className={`text-[15px] font-semibold text-white ${heroHeadingFont.className}`}
                      >
                        {item.label}
                      </span>
                    </>
                  );

                  return (
                    <li key={item.label}>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="flex items-center gap-3.5 no-underline transition hover:opacity-90"
                          data-analytics-location="get_in_touch"
                        >
                          {content}
                        </a>
                      ) : (
                        <div className="flex items-center gap-3.5">{content}</div>
                      )}
                    </li>
                  );
                })}
              </ul>

              <div className={`relative min-w-0 overflow-hidden shadow-tile ${radiusClasses.card}`}>
                <Image
                  src={resolveSiteImage(quoteSection.image)}
                  alt={quoteSection.imageAlt}
                  width={640}
                  height={420}
                  className="aspect-[5/3] w-full object-cover"
                  sizes="(max-width: 1024px) 100vw, 480px"
                />
              </div>
            </div>

            <div className="min-w-0">
              <Suspense fallback={<QuoteWizardSkeleton variant="panel" />}>
                <QuoteWizard variant="panel" formId="quote-bottom" />
              </Suspense>

              <div className="mt-7 flex flex-col gap-5">
                <div className="flex flex-col items-center gap-2 text-center">
                  <SoftStars size={STAR_SIZE} />
                  <p
                    className={`text-[14px] font-semibold text-white ${heroHeadingFont.className}`}
                  >
                    {quoteSection.rating.label}
                  </p>
                </div>

                <div>
                  <p
                    className={`mb-3 text-center text-[11px] font-bold tracking-[0.14em] text-on-dark-500 uppercase ${heroHeadingFont.className}`}
                  >
                    {trustStrip.label}
                  </p>
                  <CompactTrustLogos />
                </div>

                <Suspense fallback={<FeaturedReviewSkeleton />}>
                  <FeaturedReviewSnippet featuredTestimonialPromise={reviewPromise} />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
