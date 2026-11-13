import { CmsElement } from "@/components/cms/Content";
import { CmsText } from "@/components/cms/Content";
import type { Metadata } from "next";
import { CmsLink as Link } from "@/components/cms/Content";
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
            <Link scope="app/(en)/consumer-information/page.tsx"
              href="/"
              className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-white! no-underline hover:text-white! hover:underline"
            >
              <ArrowLeft className="size-4" strokeWidth={2.4} aria-hidden /><CmsText scope="app/(en)/consumer-information/page.tsx">{"Back to Home"}</CmsText></Link>
            <h1
              className={`text-[clamp(38px,5vw,64px)] leading-[1.02] font-extrabold tracking-[-0.02em] ${heroHeadingFont.className}`}
            ><CmsText scope="app/(en)/consumer-information/page.tsx">{"Consumer Information"}</CmsText></h1>
          </Container>
        </section>
        <Container className="py-10"><section className="rounded-card border border-cream-border bg-white p-6"><h2 className="mb-4 font-display text-2xl font-bold text-brand-blue"><CmsText scope="app/(en)/consumer-information/page.tsx">{"Federal moving information"}</CmsText></h2><p className="mb-4 leading-relaxed"><CmsText scope="app/(en)/consumer-information/page.tsx">{"Use FMCSA’s current consumer pages to check moving guidance and registration. Check the carrier on your own shipment paperwork; a network directory does not establish your assigned carrier."}</CmsText></p><ul className="space-y-3"><li><CmsElement element="a" scope="app/(en)/consumer-information/page.tsx" href="https://www.fmcsa.dot.gov/protect-your-move" target="_blank" rel="noopener noreferrer"><CmsText scope="app/(en)/consumer-information/page.tsx">{"FMCSA Protect Your Move (opens a new tab)"}</CmsText></CmsElement></li><li><CmsElement element="a" scope="app/(en)/consumer-information/page.tsx" href="https://www.fmcsa.dot.gov/protect-your-move/search-mover" target="_blank" rel="noopener noreferrer"><CmsText scope="app/(en)/consumer-information/page.tsx">{"Check federal mover registration (opens a new tab)"}</CmsText></CmsElement></li><li><CmsElement element="a" scope="app/(en)/consumer-information/page.tsx" href="/your-rights" target="_blank" rel="noopener noreferrer"><CmsText scope="app/(en)/consumer-information/page.tsx">{"Your Rights and Responsibilities — stored 2013 edition (PDF, new tab)"}</CmsText></CmsElement></li><li><CmsElement element="a" scope="app/(en)/consumer-information/page.tsx" href="/ready-to-move" target="_blank" rel="noopener noreferrer"><CmsText scope="app/(en)/consumer-information/page.tsx">{"Ready to Move — stored 2006 edition (PDF, new tab)"}</CmsText></CmsElement></li></ul></section></Container>
        <MovingCarriersSection carriers={carriers} />
      </main>
      <SiteFooter />
    </>
  );
}
