import { Suspense } from "react";
import { cn } from "@/lib/utils";
import { hero } from "@/content/hero";
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
      <h1>
        {hero.headline.map((line, i) => (
          <span key={line}>
            {i > 0 && <br />}
            {line}
          </span>
        ))}
      </h1>
      <p className="hero__sub">{hero.subcopy}</p>
      <div className={cn("hero__stats", centered && "is-center")}>
        {hero.stats.map((stat) => (
          <StatCard key={stat.small} stat={stat} />
        ))}
      </div>
    </div>
  );
}

export function Hero({ source }: { source?: PartnerConfig }) {
  const centered = hero.variant === "centered";
  return (
    <section className={cn("hero", `hero--${hero.variant}`)} id="quote">
      <ImageFill
        scene="hero"
        src="/sitepictures/Truck%20Loaded.jpeg"
        alt=""
        className="hero__bg"
        showLabel={false}
        priority
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
            />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
