import type { Testimonial } from "@vantage/api-client";
import { Footer } from "@/components/layout/Footer";
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
import { WhyVantageSection } from "@/components/sections/WhyVantageSection";

interface HomePageProps {
  testimonials?: Testimonial[];
}

export function HomePage({ testimonials = [] }: HomePageProps) {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <TrustStrip />

        <ServicesSection />
        <TrustBand />
        <HowItWorksSection />
        <CoverageSection />
        <WhyVantageSection />
        <AboutSection />
        <TestimonialsSection items={testimonials} />
        <FaqSection />
        <GetInTouchSection
          featuredTestimonial={
            testimonials.find((item) => item.published) ?? null
          }
        />
        <FinalCTASection />
      </main>
      <Footer />
    </>
  );
}
