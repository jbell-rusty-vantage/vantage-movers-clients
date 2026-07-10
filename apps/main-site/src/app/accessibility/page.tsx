import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Mail, Phone } from "lucide-react";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/Container";
import { business } from "@/lib/content";
import { heroBodyFont, heroHeadingFont } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description:
    "Accessibility statement and contact information for Vantage Movers website support.",
  alternates: {
    canonical: "/accessibility",
  },
};

export default function AccessibilityPage() {
  return (
    <>
      <Header />
      <main className={`bg-cream ${heroBodyFont.className}`}>
        <section className="bg-brand-blue py-16 text-white">
          <Container>
            <div className="max-w-3xl">
              <Link
                href="/"
                className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-white! no-underline hover:text-white! hover:underline"
              >
                <ArrowLeft className="size-4" strokeWidth={2.4} aria-hidden />
                Home
              </Link>
              <h1
                className={`mb-5 text-[clamp(38px,5vw,64px)] leading-[1.02] font-extrabold tracking-[-0.02em] ${heroHeadingFont.className}`}
              >
                Accessibility Statement
              </h1>
              <p className="text-[17px] leading-[1.75] text-on-dark-100">
                Vantage Movers is committed to making our website usable for all visitors,
                including people who rely on assistive technologies.
              </p>
            </div>
          </Container>
        </section>

        <Container className="py-14">
          <article className="rounded-panel border border-cream-border bg-white p-7 shadow-card md:p-10">
            <div className="space-y-8">
              <section>
                <h2
                  className={`mb-3 text-[clamp(24px,3vw,34px)] leading-tight font-extrabold text-brand-blue ${heroHeadingFont.className}`}
                >
                  Our Goal
                </h2>
                <p className="text-[16px] leading-[1.8] text-ink-soft">
                  We aim to follow widely accepted accessibility practices, including clear
                  navigation, readable content, keyboard-friendly interactions, and meaningful text
                  alternatives for important non-text content.
                </p>
              </section>

              <section>
                <h2
                  className={`mb-3 text-[clamp(24px,3vw,34px)] leading-tight font-extrabold text-brand-blue ${heroHeadingFont.className}`}
                >
                  Feedback And Support
                </h2>
                <p className="mb-5 text-[16px] leading-[1.8] text-ink-soft">
                  If you have trouble accessing any part of this website, contact us and describe
                  the page, feature, or content you need help with. We will make reasonable efforts
                  to provide the information in an accessible format.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={business.phoneHref}
                    className="inline-flex items-center gap-2 rounded-lg2 bg-brand-yellow px-5 py-3 font-display text-sm font-extrabold tracking-[.04em] text-black uppercase no-underline shadow-cta-yellow transition hover:-translate-y-0.5"
                    data-analytics-location="accessibility"
                  >
                    <Phone className="size-4" strokeWidth={2.3} aria-hidden />
                    {business.phoneDisplay}
                  </a>
                  <a
                    href={`mailto:${business.email}`}
                    className="inline-flex items-center gap-2 rounded-lg2 border border-cream-border bg-white px-5 py-3 font-display text-sm font-extrabold tracking-[.04em] text-brand-blue uppercase no-underline transition hover:-translate-y-0.5 hover:border-brand-blue-bright"
                    data-analytics-location="accessibility"
                  >
                    <Mail className="size-4" strokeWidth={2.3} aria-hidden />
                    Email Support
                  </a>
                </div>
              </section>

              <section className="rounded-card bg-blue-50 p-5 text-brand-blue">
                <h2 className={`mb-2 text-xl font-extrabold ${heroHeadingFont.className}`}>
                  Ongoing Improvements
                </h2>
                <p className="text-[15.5px] leading-[1.7]">
                  Accessibility is an ongoing effort. We review the site as features and content
                  change, and we welcome feedback that helps us improve the experience.
                </p>
              </section>
            </div>
          </article>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
