import type { PartnerConfig } from "@/content/partners";
import { SITE_IMAGES, type SiteImageKey } from "@/content/images";
import type { Testimonial } from "@vantage/api-client";
import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Services } from "@/components/sections/Services";
import { PromoBanner } from "@/components/sections/PromoBanner";
import { Testimonials } from "@/components/sections/Testimonials";
import { ExpertiseBanner } from "@/components/sections/ExpertiseBanner";
import { Support } from "@/components/sections/Support";
import { FinalCTA } from "@/components/sections/FinalCTA";

export interface LandingPageProps {
  /** Lead source resolved from the URL segment (partner or canonical site). */
  source: PartnerConfig;
  /** Live testimonials from vantage-main-server (empty -> static fallback). */
  testimonials: Testimonial[];
  /** Source-specific phone number for visible call CTAs. */
  phone?: string;
  /** Override section photos by registry key or public path/filename. */
  images?: Partial<Record<SiteImageKey, string>>;
  /** Dark gradient over hero photo (0–1). Lower = brighter. Defaults to `hero.overlayOpacity`. */
  heroOverlayOpacity?: number;
  /** Hero photo brightness (1 = normal). Defaults to `hero.imageBrightness`. */
  heroImageBrightness?: number;
  /** Hero photo object-position. Defaults to `hero.imagePosition`. */
  heroImagePosition?: string;
  /** Hero object-position at ≥1550px. Defaults to `hero.imagePositionLg`. */
  heroImagePositionLg?: string;
}

/**
 * The full Vantage Movers landing page, abstracted so it can render at any URL
 * path. The `source` prop carries the partner/lead-source company (driving the
 * quote form's `source_company`) and `testimonials` are server-fetched.
 */
export function LandingPage({
  source,
  testimonials,
  phone,
  images,
  heroOverlayOpacity,
  heroImageBrightness,
  heroImagePosition,
  heroImagePositionLg,
}: LandingPageProps) {
  const resolved = { ...SITE_IMAGES, ...images };
  const phoneNumber = phone ?? source.phone;

  return (
    <main>
      <Hero
        source={source}
        phone={phoneNumber}
        backgroundImage={resolved.hero}
        overlayOpacity={heroOverlayOpacity}
        imageBrightness={heroImageBrightness}
        imagePosition={heroImagePosition}
        imagePositionLg={heroImagePositionLg}
      />
      <TrustStrip />
      <Services
        images={{
          longDistanceMoves: resolved.longDistanceMoves,
          packingStorage: resolved.packingStorage,
          officeMoves: resolved.officeMoves,
          militaryMoves: resolved.militaryMoves,
        }}
      />
      <PromoBanner />
      <Testimonials items={testimonials} />
      <ExpertiseBanner image={resolved.expertiseBanner} phone={phoneNumber} />
      <Support image={resolved.coordinationSupport} phone={phoneNumber} />
      <FinalCTA phone={phoneNumber} />
    </main>
  );
}
