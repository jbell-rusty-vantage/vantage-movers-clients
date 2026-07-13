import type { Metadata } from "next";
import Link from "next/link";
import { getMovingCarriers } from "@vantage/api-client";
import { ArrowLeft } from "lucide-react";
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
      <Header />
      <main className={`bg-cream ${heroBodyFont.className}`}>
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
        <MovingCarriersSection carriers={carriers} />
      </main>
      <SiteFooter />
    </>
  );
}
