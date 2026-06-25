import { Phone } from "lucide-react";
import { business, finalCta } from "@/lib/content";
import { Container } from "@/components/ui/Container";

export function FinalCTASection() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden py-20"
      style={{ backgroundImage: "linear-gradient(115deg,#1763CF,#024799)" }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,.06) 1px,transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <Container className="relative mx-auto max-w-[1000px] text-center">
        <div className="mb-[22px] inline-flex items-center gap-2 rounded-full border border-[rgba(255,192,46,.4)] bg-[rgba(255,192,46,.18)] px-[18px] py-2 font-display text-[13px] font-bold tracking-[.08em] text-brand-yellow uppercase">
          {finalCta.badge}
        </div>
        <h2 className="mb-4 text-balance font-display text-[clamp(32px,4vw,52px)] leading-[1.06] font-extrabold -tracking-[.02em] text-white">
          {finalCta.title}
        </h2>
        <p className="mx-auto mb-8 max-w-[680px] text-lg leading-[1.6] text-on-dark-100">
          {finalCta.body}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3.5">
          <a
            href="#quote"
            className="rounded-lg2 bg-brand-yellow px-8 py-[17px] font-display text-base font-bold tracking-[.04em] text-black uppercase no-underline shadow-[0_10px_28px_rgba(255,192,46,.34)] transition hover:-translate-y-0.5"
          >
            {finalCta.primaryCta}
          </a>
          <a
            href={business.phoneHref}
            className="inline-flex items-center gap-2 rounded-lg2 border-[1.5px] border-white/50 px-[30px] py-4 font-display text-base font-bold tracking-[.04em] text-white uppercase no-underline transition hover:bg-white/10"
          >
            <Phone size={17} strokeWidth={2} aria-hidden />
            {finalCta.secondaryCta}
          </a>
        </div>
      </Container>
    </section>
  );
}
