import Link from "next/link";
import { ArrowLeft, Clock, Info } from "lucide-react";
import type { LegalBlock, LegalDoc } from "@/content/legal/docs";
import { business } from "@/lib/content";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";

function Block({ block }: { block: LegalBlock }) {
  if (block.type === "p") {
    return (
      <p
        className="text-[16px] leading-[1.8] text-ink-soft"
        dangerouslySetInnerHTML={{ __html: block.html }}
      />
    );
  }

  if (block.type === "ul") {
    return (
      <ul className="space-y-3 pl-5 text-[16px] leading-[1.75] text-ink-soft marker:text-brand-blue-bright">
        {block.items.map((item, index) => (
          <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
        ))}
      </ul>
    );
  }

  return (
    <div className="flex gap-3 rounded-card border border-brand-blue-bright/20 bg-blue-50 p-5 text-brand-blue">
      <Info className="mt-0.5 size-5 shrink-0" strokeWidth={2.2} aria-hidden />
      <p className="m-0 text-[15.5px] leading-[1.7]" dangerouslySetInnerHTML={{ __html: block.html }} />
    </div>
  );
}

function ActionLink({
  action,
}: {
  action: LegalDoc["contact"]["actions"][number];
}) {
  const cls =
    action.variant === "gold"
      ? "rounded-lg2 bg-brand-yellow px-5 py-3 font-display text-sm font-extrabold tracking-[.04em] text-black uppercase no-underline shadow-cta-yellow transition hover:-translate-y-0.5"
      : "rounded-lg2 border border-cream-border bg-white px-5 py-3 font-display text-sm font-extrabold tracking-[.04em] text-brand-blue uppercase no-underline transition hover:-translate-y-0.5 hover:border-brand-blue-bright";

  if (action.href.startsWith("/") && !action.href.startsWith("//")) {
    return (
      <Link className={cls} href={action.href}>
        {action.label}
      </Link>
    );
  }

  return (
    <a className={cls} href={action.href}>
      {action.label}
    </a>
  );
}

export function PolicyPage({ doc }: { doc: LegalDoc }) {
  return (
    <>
      <Header />
      <main className="policy-copy bg-cream">
        <section className="bg-brand-blue py-16 text-white">
          <Container>
            <div className="max-w-3xl">
              <Link
                href="/"
                className="mb-5 inline-flex items-center gap-2 text-sm font-semibold !text-white no-underline hover:!text-white hover:underline"
              >
                <ArrowLeft className="size-4" strokeWidth={2.4} aria-hidden />
                Home
              </Link>
              <h1 className="mb-5 font-display text-[clamp(38px,5vw,64px)] leading-[1.02] font-extrabold -tracking-[.02em]">
                {doc.title}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-on-dark-100">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold">
                  <Clock className="size-4 text-brand-yellow" aria-hidden />
                  Last updated: {doc.lastUpdated}
                </span>
                <span className="text-sm">{doc.heroNote}</span>
              </div>
            </div>
          </Container>
        </section>

        <Container className="grid gap-8 py-14 lg:grid-cols-[280px_1fr]">
          <aside className="h-fit rounded-card border border-cream-border bg-white p-5 shadow-card lg:sticky lg:top-28">
            <div className="mb-4 font-display text-sm font-extrabold tracking-[.08em] text-brand-blue uppercase">
              On This Page
            </div>
            <ol className="space-y-2 text-sm">
              {doc.sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="block rounded-md2 px-3 py-2 text-[#64748B] no-underline transition hover:bg-cream hover:text-brand-blue"
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </aside>

          <article className="rounded-panel border border-cream-border bg-white p-7 shadow-card md:p-10">
            <p className="mb-10 text-[18px] leading-[1.75] text-ink-soft">{doc.lead}</p>

            <div className="space-y-10">
              {doc.sections.map((section) => (
                <section key={section.id} id={section.id} className="scroll-mt-28">
                  <h2 className="mb-4 flex items-center gap-3 font-display text-[clamp(24px,3vw,34px)] leading-tight font-extrabold text-brand-blue">
                    <span className="text-[15px] text-brand-blue-bright">{section.index}</span>
                    {section.title}
                  </h2>
                  <div className="space-y-4">
                    {section.blocks.map((block, index) => (
                      <Block key={index} block={block} />
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <div className="mt-12 rounded-card bg-brand-blue p-6 text-white md:flex md:items-center md:justify-between md:gap-8">
              <div>
                <h3 className="mb-2 font-display text-[24px] font-extrabold">{doc.contact.heading}</h3>
                <p
                  className="text-on-dark-200"
                  dangerouslySetInnerHTML={{ __html: doc.contact.bodyHtml }}
                />
              </div>
              <div className="mt-5 flex flex-wrap gap-3 md:mt-0">
                {doc.contact.actions.map((action) => (
                  <ActionLink key={action.label} action={action} />
                ))}
              </div>
            </div>
          </article>
        </Container>

        <section className="bg-white py-10">
          <Container>
            <p className="text-center text-[13px] leading-[1.7] text-[#64748B]">
              {business.brokerLine} - DOT {business.dot} - MC {business.mc}
            </p>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
