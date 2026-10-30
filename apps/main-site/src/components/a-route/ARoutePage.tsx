import type { Testimonial } from "@vantage/api-client";
import { HomePageJsonLd } from "@/components/seo/HomePageJsonLd";
import "./a-route.css";
import { RouteHeader } from "./RouteHeader";
import { RouteHero } from "./RouteHero";
import { RouteTrustStrip } from "./RouteTrustStrip";
import { RouteServices } from "./RouteServices";
import { RouteLicensing } from "./RouteLicensing";
import { RouteHowItWorks } from "./RouteHowItWorks";
import { RouteCoverage } from "./RouteCoverage";
import { RouteWhyVantage } from "./RouteWhyVantage";
import { RouteCoordination } from "./RouteCoordination";
import { RouteReviewsSection } from "./RouteReviewsSection";
import { RouteFaqSection } from "./RouteFaqSection";
import { RouteContact } from "./RouteContact";
import { RouteClosing } from "./RouteClosing";
import { RouteFooter } from "./RouteFooter";

export function ARoutePage({
  testimonialsPromise,
}: {
  testimonialsPromise: Promise<Testimonial[]>;
}) {
  return (
    <div className="a-route" id="top">
      <HomePageJsonLd />
      <RouteHeader />
      <main>
        <RouteHero />
        <RouteTrustStrip />
        <RouteServices />
        <RouteLicensing />
        <RouteHowItWorks />
        <RouteCoverage />
        <RouteWhyVantage />
        <RouteCoordination />
        <RouteReviewsSection testimonialsPromise={testimonialsPromise} />
        <RouteFaqSection />
        <RouteContact />
        <RouteClosing />
      </main>
      <RouteFooter />
    </div>
  );
}
