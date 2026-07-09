import Link from "next/link";
import { ArrowLeft, Phone } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/Container";
import { business } from "@/lib/content";
import { heroBodyFont, heroHeadingFont } from "@/lib/fonts";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className={`bg-cream ${heroBodyFont.className}`}>
        <section className="bg-brand-blue py-20 text-white">
          <Container>
            <div className="mx-auto max-w-3xl text-center">
              <p
                className={`mb-4 text-sm font-extrabold tracking-[.16em] text-brand-yellow uppercase ${heroHeadingFont.className}`}
              >
                404 - Page Not Found
              </p>
              <h1
                className={`mb-5 text-[clamp(40px,6vw,72px)] leading-none font-extrabold tracking-[-0.035em] ${heroHeadingFont.className}`}
              >
                This page took a wrong turn.
              </h1>
              <p className="mx-auto mb-8 max-w-2xl text-[17px] leading-[1.75] text-on-dark-100">
                The page you requested could not be found. You can return home or call a moving
                coordinator for help planning your relocation.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  href="/"
                  className={`inline-flex items-center gap-2 rounded-lg2 bg-brand-yellow px-5 py-4 text-sm font-extrabold tracking-[.04em] text-black uppercase no-underline shadow-cta-yellow transition hover:-translate-y-0.5 ${heroHeadingFont.className}`}
                >
                  <ArrowLeft className="size-4" strokeWidth={2.3} aria-hidden />
                  Back Home
                </Link>
                <a
                  href={business.phoneHref}
                  className={`inline-flex items-center gap-2 rounded-lg2 border border-white/25 bg-white/10 px-5 py-4 text-sm font-extrabold tracking-[.04em] text-white uppercase no-underline transition hover:-translate-y-0.5 hover:bg-white/15 ${heroHeadingFont.className}`}
                  data-analytics-location="not_found"
                >
                  <Phone className="size-4" strokeWidth={2.3} aria-hidden />
                  {business.phoneDisplay}
                </a>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
