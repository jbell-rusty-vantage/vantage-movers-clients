import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ExternalLink, FileText, ShieldCheck } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/Container";
import { business, carrierContactsPage } from "@/lib/content";
import { heroBodyFont, heroHeadingFont } from "@/lib/fonts";

export const metadata: Metadata = {
  title: `${carrierContactsPage.title} | ${business.name}`,
  description: carrierContactsPage.description,
  alternates: {
    canonical: "/carrier-contacts",
  },
};

export default function CarrierContactsPage() {
  const bodyClass = heroBodyFont.className;
  const headingClass = heroHeadingFont.className;

  return (
    <>
      <Header />
      <main className={`bg-cream ${bodyClass}`}>
        <section className="bg-brand-blue py-8 text-white sm:py-10 lg:py-12">
          <Container>
            <div className="grid items-center gap-7 lg:grid-cols-[1fr_430px]">
              <div className="min-w-0">
                <Link
                  href="/"
                  className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-white! no-underline hover:text-white! hover:underline"
                >
                  <ArrowLeft className="size-4" strokeWidth={2.4} aria-hidden />
                  Home
                </Link>
                <p
                  className={`mb-3 text-sm font-extrabold tracking-[.14em] text-brand-yellow uppercase ${headingClass}`}
                >
                  {carrierContactsPage.eyebrow}
                </p>
                <h1
                  className={`mb-4 text-[clamp(34px,5vw,56px)] leading-[1.02] font-extrabold tracking-[-0.02em] ${headingClass}`}
                >
                  {carrierContactsPage.title}
                </h1>
                <p className="max-w-2xl text-[16px] leading-[1.7] text-on-dark-100 sm:text-[17px]">
                  {carrierContactsPage.body}
                </p>
              </div>

              <article className="rounded-panel border border-white/15 bg-white p-6 text-ink shadow-[0_22px_54px_rgba(0,0,0,.22)] sm:p-7">
                <div className="mb-4 grid size-13 place-items-center rounded-card bg-brand-yellow-soft text-brand-blue">
                  <FileText className="size-6" strokeWidth={2.2} aria-hidden />
                </div>
                <h2
                  className={`mb-3 text-[clamp(25px,3vw,34px)] leading-tight font-extrabold text-brand-blue ${headingClass}`}
                >
                  Start Here
                </h2>
                <p className="mb-5 text-[15.5px] leading-[1.7] text-ink-soft">
                  Submit your company details through the carrier request form. Dispatch will
                  review your information and reach out.
                </p>
                <a
                  href={carrierContactsPage.formUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex w-full items-center justify-center gap-2 rounded-lg2 bg-brand-yellow px-5 py-4 text-center text-sm font-extrabold tracking-[.04em] text-black uppercase no-underline shadow-cta-yellow transition hover:-translate-y-0.5 sm:w-auto ${headingClass}`}
                  data-analytics-location="carrier_contacts"
                >
                  {carrierContactsPage.ctaLabel}
                  <ExternalLink className="size-4" strokeWidth={2.3} aria-hidden />
                </a>

                <div className="mt-6 border-t border-cream-border pt-5">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-md2 bg-brand-blue text-brand-yellow">
                      <ShieldCheck className="size-5" strokeWidth={2.2} aria-hidden />
                    </span>
                    <h2 className={`text-lg font-extrabold text-brand-blue ${headingClass}`}>
                      Information Requested
                    </h2>
                  </div>
                  <p className="text-[14px] leading-[1.7] text-ink-soft">
                    Company name, DOT number, MC number, contact details, and licensed service
                    types.
                  </p>
                </div>
              </article>
            </div>
          </Container>
        </section>

        <section className="py-7">
          <Container>
            <div className="rounded-card border border-cream-border bg-white p-5 shadow-card">
              <aside className="h-fit">
                <div className="mb-4 flex items-center gap-3">
                  <span className="grid size-11 place-items-center rounded-md2 bg-brand-blue text-brand-yellow">
                    <ShieldCheck className="size-5" strokeWidth={2.2} aria-hidden />
                  </span>
                  <h2 className={`text-xl font-extrabold text-brand-blue ${headingClass}`}>
                    Carrier Network Note
                  </h2>
                </div>
                <p className="mb-4 text-[15px] leading-[1.7] text-ink-soft">
                  Please do not submit passwords or sensitive credentials through the carrier
                  request form.
                </p>
                <p className="text-[13px] leading-[1.7] text-[#64748B]">
                  {business.brokerLine} - DOT {business.dot} - MC {business.mc}
                </p>
              </aside>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
