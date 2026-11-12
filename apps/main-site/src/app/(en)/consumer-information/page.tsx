import type { Metadata } from "next";
import Link from "next/link";
import { getMovingCarriers } from "@vantage/api-client";
import { ArrowLeft } from "lucide-react";
import { ScrollToPageTop } from "@/components/interactive/ScrollToPageTop";
import { Header } from "@/components/layout/Header";
import { MovingCarriersSection } from "@/components/layout/MovingCarriersSection";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Container } from "@/components/ui/Container";
import { heroBodyFont, heroHeadingFont } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Consumer Information",
  description: "View the active moving carriers in the Vantage carrier network.",
  alternates: {
    canonical: "/consumer-information",
  },
};

export default async function ConsumerInformationPage() {
  const carriers = await getMovingCarriers().catch((error) => {
    console.error("[main-site moving-carriers]", error);
    return [];
  });

  return (
    <>
      <ScrollToPageTop />
      <Header />
      <main id="main-content" className={`bg-cream ${heroBodyFont.className}`}>
        <section className="bg-brand-blue py-10 text-white sm:py-12">
          <Container>
            <Link
              href="/"
              className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-white! no-underline hover:text-white! hover:underline"
            >
              <ArrowLeft className="size-4" strokeWidth={2.4} aria-hidden />
              Back to Home
            </Link>
            <h1
              className={`text-[clamp(38px,5vw,64px)] leading-[1.02] font-extrabold tracking-[-0.02em] ${heroHeadingFont.className}`}
            >
              Consumer Information
            </h1>
          </Container>
        </section>
        <Container className="py-10"><section className="rounded-card border border-cream-border bg-white p-6"><h2 className="mb-4 font-display text-2xl font-bold text-brand-blue">Federal moving information</h2><p className="mb-4 leading-relaxed">Use FMCSA’s current consumer pages to check moving guidance and registration. Check the carrier on your own shipment paperwork; a network directory does not establish your assigned carrier.</p><ul className="space-y-3"><li><a href="https://www.fmcsa.dot.gov/protect-your-move" target="_blank" rel="noopener noreferrer">FMCSA Protect Your Move (opens a new tab)</a></li><li><a href="https://www.fmcsa.dot.gov/protect-your-move/search-mover" target="_blank" rel="noopener noreferrer">Check federal mover registration (opens a new tab)</a></li><li><a href="/your-rights" target="_blank" rel="noopener noreferrer">Your Rights and Responsibilities — stored 2013 edition (PDF, new tab)</a></li><li><a href="/ready-to-move" target="_blank" rel="noopener noreferrer">Ready to Move — stored 2006 edition (PDF, new tab)</a></li></ul></section></Container>
        <MovingCarriersSection carriers={carriers} />
      </main>
      <SiteFooter />
    </>
  );
}
