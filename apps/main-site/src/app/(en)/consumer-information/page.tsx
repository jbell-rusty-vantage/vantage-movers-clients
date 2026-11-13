import { FederalMovingResources } from "@/components/editorial/FederalMovingResources";
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
  description: "Find FMCSA moving guidance, federal registration lookup, reference PDFs and the Vantage carrier network directory.",
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
        <Container className="py-10"><FederalMovingResources /><Link href="/resources" className="font-semibold text-brand-blue">Explore Vantage’s moving guides →</Link></Container>
        <MovingCarriersSection carriers={carriers} />
      </main>
      <SiteFooter />
    </>
  );
}
