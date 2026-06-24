import { ComplianceBar } from "@/components/layout/ComplianceBar";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { AboutSection } from "@/components/sections/AboutSection";
import { CoverageSection } from "@/components/sections/CoverageSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCTASection } from "@/components/sections/FinalCTASection";
import { HeroSection } from "@/components/sections/HeroSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { TrustBand } from "@/components/sections/TrustBand";
import { WhyVantageSection } from "@/components/sections/WhyVantageSection";

export function HomePage() {
  return (
    <>
      <ComplianceBar />
      <Header />
      <main>
        <HeroSection />
        <TrustBand />
        <ServicesSection />
        <CoverageSection />
        <HowItWorksSection />
        <WhyVantageSection />
        <AboutSection />
        <TestimonialsSection />
        <FaqSection />
        <FinalCTASection />
      </main>
      <Footer />
    </>
  );
}
