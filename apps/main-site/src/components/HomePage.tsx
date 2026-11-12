import type { Testimonial } from "@vantage/api-client";
import { Suspense } from "react";
import { TestimonialsSectionSkeleton } from "@/components/feedback/LoadingSkeletons";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Header } from "@/components/layout/Header";
import { AboutSection } from "@/components/sections/AboutSection";
import { CoverageSection } from "@/components/sections/CoverageSection";
import { GetInTouchSection } from "@/components/sections/GetInTouchSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCTASection } from "@/components/sections/FinalCTASection";
import { HeroSection } from "@/components/sections/HeroSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { TrustBand } from "@/components/sections/TrustBand";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { MilitaryAppreciation } from "@/components/sections/MilitaryAppreciation";
import { WhyVantageSection } from "@/components/sections/WhyVantageSection";
import { HomePageJsonLd } from "@/components/seo/HomePageJsonLd";

interface HomePageProps {
  testimonials?: Testimonial[];
  testimonialsPromise?: Promise<Testimonial[]>;
}

async function TestimonialsStream({
  testimonialsPromise,
}: {
  testimonialsPromise: Promise<Testimonial[]>;
}) {
  const testimonials = await testimonialsPromise;

  return <TestimonialsSection items={testimonials} />;
}

export function HomePage({
  testimonials = [],
  testimonialsPromise = Promise.resolve(testimonials),
}: HomePageProps) {
  const featuredTestimonialPromise = testimonialsPromise.then(
    (items) => items.find((item) => item.published) ?? null,
  );

  return (
    <>
      <HomePageJsonLd />
      <Header />
      <main id="main-content" data-content-id="home">
        <HeroSection />
        <TrustStrip />

        <ServicesSection />
        <TrustBand />
        <HowItWorksSection />
        <CoverageSection />
        <WhyVantageSection />
        <AboutSection />
        <MilitaryAppreciation />
        <Suspense fallback={<TestimonialsSectionSkeleton />}>
          <TestimonialsStream testimonialsPromise={testimonialsPromise} />
        </Suspense>
        <FaqSection />
        <Suspense fallback={<section id="contact" className="bg-cream px-6 py-12"><h2 className="font-display text-2xl font-bold text-brand-blue">Contact Vantage</h2><a href="tel:8884779232">(888) 477-9232</a></section>}>
          <GetInTouchSection featuredTestimonialPromise={featuredTestimonialPromise} />
        </Suspense>
        <FinalCTASection />
      </main>
      <SiteFooter />
    </>
  );
}
