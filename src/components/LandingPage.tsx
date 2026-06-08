import type { PartnerConfig } from "@/content/partners";
import type { Testimonial } from "@/lib/vantage/server";
import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Services } from "@/components/sections/Services";
import { PromoBanner } from "@/components/sections/PromoBanner";
import { Testimonials } from "@/components/sections/Testimonials";
import { ExpertiseBanner } from "@/components/sections/ExpertiseBanner";
import { AutoTransport } from "@/components/sections/AutoTransport";
import { Commitment } from "@/components/sections/Commitment";
import { Support } from "@/components/sections/Support";
import { FinalCTA } from "@/components/sections/FinalCTA";

export interface LandingPageProps {
  /** Lead source resolved from the URL segment (partner or canonical site). */
  source: PartnerConfig;
  /** Live testimonials from vantage-main-server (empty -> static fallback). */
  testimonials: Testimonial[];
}

/**
 * The full Vantage Movers landing page, abstracted so it can render at any URL
 * path. The `source` prop carries the partner/lead-source company (driving the
 * quote form's `source_company`) and `testimonials` are server-fetched.
 */
export function LandingPage({ source, testimonials }: LandingPageProps) {
  return (
    <main>
      <Hero source={source} />
      <TrustStrip />
      <Services />
      <PromoBanner />
      <Testimonials items={testimonials} />
      <ExpertiseBanner />
      <AutoTransport />
      <Commitment />
      <Support />
      <FinalCTA />
    </main>
  );
}
