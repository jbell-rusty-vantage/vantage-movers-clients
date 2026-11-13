import { CmsElement, CmsText } from "@/components/cms/Content";
import { CmsImage as Image } from "@/components/cms/Content";
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
import { entryById } from "@/lib/publication";
import { radiusClasses } from "@/lib/playground/layout-playground";
import {
  resolveStarColors,
} from "@/lib/playground/testimonials-playground";

/** Playground args promoted to production — see GetInTouchSection.stories.tsx Playground. */
const HEADING_FONT_SIZE = 36;
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
  value,
  className,
}: {
  size: number;
  value: number;
  className?: string;
}) {
  return (
    <CmsElement element="div" scope="components/sections/GetInTouchSection.tsx"
      className={`flex gap-0.5 ${className ?? ""}`}
      aria-label={`${value} out of 5 stars`}
    >
      <CmsText scope="components/sections/GetInTouchSection.tsx">{Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className="fill-current opacity-35"
          style={{
            color: STAR_COLORS.stroke,
            fill: STAR_COLORS.fill,
            opacity: i < Math.floor(value) ? 1 : 0.25,
          }}
          strokeWidth={1.5}
          aria-hidden
        />
      ))}</CmsText>
      <span className="ml-1 text-xs"><CmsText scope="components/sections/GetInTouchSection.tsx">{value}</CmsText><CmsText scope="components/sections/GetInTouchSection.tsx">{"/5"}</CmsText></span>
    </CmsElement>
  );
}

interface ReviewSnippetProps {
  quote: string;
  name: string;
  source: string;
  rating: number | null;
}

function ReviewSnippet({ quote, name, source, rating }: ReviewSnippetProps) {
  return (
    <figure className="contact-review rounded-card border border-white/12 bg-white/6 px-5 py-4 backdrop-blur-sm">
      <blockquote
        className={`contact-review-quote mb-3.5 text-[14px] leading-[1.6] text-on-dark-100 italic ${heroBodyFont.className}`}
      ><CmsText scope="components/sections/GetInTouchSection.tsx">{"\u201c"}</CmsText>{quote}<CmsText scope="components/sections/GetInTouchSection.tsx">{"\u201d"}</CmsText></blockquote>
      <figcaption className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span
            className={`testimonial-avatar grid size-10 place-items-center rounded-full bg-gradient-to-br from-[#2E86DE] to-brand-blue-bright text-sm font-extrabold text-white ${heroHeadingFont.className}`}
          >
            {initials(name)}
          </span>
          <span>
            <span
              className={`contact-review-name block text-[14px] font-bold text-white ${heroHeadingFont.className}`}
            >
              {name}
            </span>
            <span className={`contact-review-source block text-[12.5px] text-on-dark-500 ${heroBodyFont.className}`}>
              <CmsText scope="components/sections/GetInTouchSection.tsx">{source}</CmsText>
            </span>
          </span>
        </div>
        <CmsText scope="components/sections/GetInTouchSection.tsx">{rating !== null && <SoftStars size={REVIEW_STAR_SIZE} value={rating} className="shrink-0" />}</CmsText>
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
  if (!featuredTestimonial?.published || !featuredTestimonial.review_text) return null;
  const review = {
          quote: featuredTestimonial.review_text,
          name: featuredTestimonial.reviewer_name || "Customer",
          source: featuredTestimonial.source
            ? `Review via ${featuredTestimonial.source}`
            : "Customer feedback",
          rating: Number.isFinite(featuredTestimonial.rating) && featuredTestimonial.rating >= 1 && featuredTestimonial.rating <= 5
            ? featuredTestimonial.rating : null,
        };

  return <ReviewSnippet {...review} />;
}

function CompactTrustLogo({ logo }: { logo: TrustLogo }) {
  return (
    <span className="trust-logo trust-logo--compact">
      <Image scope="components/sections/GetInTouchSection.tsx"
        src={logo.src}
        alt={logo.alt}
        width={logo.width}
        height={logo.height}
        className={`contact-logo trust-logo__img${logo.wide ? " trust-logo__img--wide" : ""} brightness-0 invert`}
      />
    </span>
  );
}

function CompactTrustLogos() {
  const [row1, row2] = [trustStrip.logos.slice(0, 2), trustStrip.logos.slice(2)];

  return (
    <div className="flex flex-col items-center gap-2.5 sm:gap-3">
      <div className="flex items-center justify-center gap-3 sm:gap-4">
        <CmsText scope="components/sections/GetInTouchSection.tsx">{row1.map((logo) => (
          <CompactTrustLogo key={logo.src} logo={logo} />
        ))}</CmsText>
      </div>
      <div className="flex items-center justify-center gap-3 sm:gap-4">
        <CmsText scope="components/sections/GetInTouchSection.tsx">{row2.map((logo) => (
          <CompactTrustLogo key={logo.src} logo={logo} />
        ))}</CmsText>
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
  const genericGuide = entryById("who-handles-my-move", "en")?.path;
  const guideLinks = genericGuide ? {
    generic: genericGuide,
    wisconsin: entryById("wisconsin", "en")?.path ?? genericGuide,
    madison: entryById("madison-wisconsin", "en")?.path ?? genericGuide,
  } : undefined;
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
    <section id="get-quote" className="home-contact bg-cream py-20 lg:py-24">
      <Container className="px-3 min-[360px]:px-4 sm:px-7">
        <div
          className={`contact-frame w-full max-w-full overflow-hidden bg-brand-blue shadow-[0_28px_64px_rgba(2,47,102,.22)] ${radiusClasses.md2}`}
        >
          <div className="contact-layout grid min-w-0 items-start gap-8 p-3 min-[360px]:p-4 sm:p-6 lg:grid-cols-[1fr_1.05fr] lg:gap-12 lg:p-12">
            <div className="min-w-0">
              <div className="mb-5 flex items-center gap-3">
                <span className="contact-rule h-0.5 w-8 rounded-full bg-brand-yellow" aria-hidden />
                <span
                  className={`contact-eyebrow text-[13px] font-bold tracking-[0.14em] text-brand-yellow uppercase ${heroHeadingFont.className}`}
                >
                  <CmsText scope="components/sections/GetInTouchSection.tsx">{quoteSection.eyebrow}</CmsText>
                </span>
              </div>

              <h2
                className={`contact-title mb-4 text-balance leading-[1.1] font-extrabold -tracking-[.02em] text-white ${heroHeadingFont.className}`}
                style={{ fontSize: `var(--contact-title-size, clamp(28px, 3.2vw, ${HEADING_FONT_SIZE}px))` }}
              >
                <CmsText scope="components/sections/GetInTouchSection.tsx">{quoteSection.title}{" "}</CmsText>
                <span className="contact-title-accent text-brand-yellow"><CmsText scope="components/sections/GetInTouchSection.tsx">{quoteSection.titleAccent}</CmsText></span>
              </h2>

              <p
                className={`contact-copy mb-8 max-w-[480px] text-[15.5px] leading-[1.65] text-on-dark-300 ${heroBodyFont.className}`}
              >
                <CmsText scope="components/sections/GetInTouchSection.tsx">{quoteSection.body}</CmsText>
              </p>

              <ul className="mb-8 flex flex-col gap-4">
                <CmsText scope="components/sections/GetInTouchSection.tsx">{contactItems.map((item) => {
                  const Icon = item.icon;
                  const content = (
                    <>
                      <span
                        className={`contact-icon grid size-11 shrink-0 place-items-center bg-white/10 text-brand-yellow ${radiusClasses.md2}`}
                      >
                        <Icon size={18} strokeWidth={2} aria-hidden />
                      </span>
                      <span
                        className={`contact-detail min-w-0 break-all text-[15px] font-semibold text-white ${heroHeadingFont.className}`}
                      >
                        <CmsText scope="components/sections/GetInTouchSection.tsx">{item.label}</CmsText>
                      </span>
                    </>
                  );

                  return (
                    <li key={item.label}>
                      <CmsText scope="components/sections/GetInTouchSection.tsx">{item.href ? (
                        <CmsElement element="a" scope="components/sections/GetInTouchSection.tsx"
                          href={item.href}
                          className="flex items-center gap-3.5 no-underline transition hover:opacity-90"
                          data-analytics-location="get_in_touch"
                        >
                          <CmsText scope="components/sections/GetInTouchSection.tsx">{content}</CmsText>
                        </CmsElement>
                      ) : (
                        <div className="flex items-center gap-3.5"><CmsText scope="components/sections/GetInTouchSection.tsx">{content}</CmsText></div>
                      )}</CmsText>
                    </li>
                  );
                })}</CmsText>
              </ul>

              <div className={`contact-image relative min-w-0 overflow-hidden shadow-tile ${radiusClasses.card}`}>
                <Image scope="components/sections/GetInTouchSection.tsx"
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
                <QuoteWizard variant="panel" formId="quote-bottom" guideLinks={guideLinks} />
              </Suspense>

              <div className="mt-7 flex flex-col gap-5">
                <div>
                  <p
                    className={`contact-partners-label mb-3 text-center text-[11px] font-bold tracking-[0.14em] text-on-dark-500 uppercase ${heroHeadingFont.className}`}
                  >
                    <CmsText scope="components/sections/GetInTouchSection.tsx">{trustStrip.label}</CmsText>
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
