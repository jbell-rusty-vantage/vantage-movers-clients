import { Suspense, type CSSProperties } from "react";
import { cn } from "@vantage/utils";
import { hero } from "@/content/hero";
import { resolveSiteImage, SITE_IMAGES } from "@/content/images";
import type { PartnerConfig } from "@/content/partners";
import { Stars } from "@/components/ui/Stars";
import { Icon } from "@/components/ui/Icon";
import { ImageFill } from "@/components/ui/ImageFill";
import { QuoteForm } from "@/components/quote-form/QuoteForm";
import { QuoteFormSkeleton } from "@/components/quote-form/QuoteFormSkeleton";
import { RollingNumber } from "@/components/ui/RollingNumber";
import type { StatItem } from "@/types";

function StatCard({ stat }: { stat: StatItem }) {
  return (
    <div className="stat">
      <span className="stat__ico">
        <Icon name={stat.icon} />
      </span>
      <div>
        <div className="stat__big">
          {stat.animatedRange ? (
            <RollingNumber
              fallback={stat.big}
              min={stat.animatedRange.min}
              max={stat.animatedRange.max}
              suffix={stat.animatedRange.suffix}
            />
          ) : (
            stat.big
          )}
        </div>
        <div className="stat__small">{stat.small}</div>
      </div>
    </div>
  );
}

function HeroCopy({ centered }: { centered: boolean }) {
  return (
    <div className={cn("hero__copy reveal in", centered && "is-center")}>
      <span className="hero__rating">
        <Stars size={18} /> <b className="hero__rating-score">{hero.ratingScore}</b>{" "}
        <span className="hero__rating-count">{hero.ratingCount}</span>
      </span>
      <h1 className="hero__headline">
        <span className="hero__headline-part">{hero.headline[0]}</span>
        <span className="hero__headline-sep" aria-hidden="true">
          .{" "}
        </span>
        <span className="hero__headline-part">{hero.headline[1]}</span>
      </h1>
      <p className="hero__sub">{hero.subcopy}</p>
      <div className={cn("hero__trust", centered && "is-center")}>
        {hero.statsHeading ? (
          <p className="hero__stats-heading">{hero.statsHeading}</p>
        ) : null}
        <div className={cn("hero__stats", centered && "is-center")}>
          {hero.stats.map((stat) => (
            <StatCard key={stat.small} stat={stat} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function Hero({
  source,
  phone,
  backgroundImage,
  overlayOpacity,
  imageBrightness,
  imagePosition,
  imagePositionLg,
}: {
  source?: PartnerConfig;
  phone?: string;
  /** Registry key (e.g. `"enhancedTwo"`, `"hero"`) or public path/filename for the quote-form backdrop. */
  backgroundImage?: string;
  /** Dark gradient strength (0–1). Lower = brighter hero. Defaults to `hero.overlayOpacity`. */
  overlayOpacity?: number;
  /** Photo brightness multiplier (1 = normal). Defaults to `hero.imageBrightness`. */
  imageBrightness?: number;
  /** CSS object-position. Defaults to `hero.imagePosition`. */
  imagePosition?: string;
  /** object-position at ≥1550px. Defaults to `hero.imagePositionLg`. */
  imagePositionLg?: string;
}) {
  const centered = hero.variant === "centered";
  const bg = resolveSiteImage(backgroundImage ?? hero.image ?? SITE_IMAGES.hero);
  const heroStyle = {
    "--hero-overlay": overlayOpacity ?? hero.overlayOpacity ?? 0.62,
    "--hero-brightness": imageBrightness ?? hero.imageBrightness ?? 1,
    "--hero-image-position": imagePosition ?? hero.imagePosition ?? "center",
    "--hero-image-position-lg": imagePositionLg ?? hero.imagePositionLg ?? "center 30%",
  } as CSSProperties;

  return (
    <section className={cn("hero", `hero--${hero.variant}`)} id="quote" style={heroStyle}>
      <ImageFill
        scene="hero"
        src={bg}
        alt=""
        className="hero__bg"
        showLabel={false}
        sizes="100vw"
        preload
      />
      <div className="hero__overlay" />
      <div className="wrap hero__in">
        <HeroCopy centered={centered} />
        <div className="hero__form reveal in" data-d="1">
          <Suspense fallback={<QuoteFormSkeleton compact={centered} />}>
            <QuoteForm
              compact={centered}
              sourceCompany={source?.sourceCompany}
              sourceCompanySite={source?.sourceCompanySite}
              phone={phone}
            />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
