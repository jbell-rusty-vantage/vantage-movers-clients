import { ArrowRight } from "lucide-react";
import { SITE_IMAGES } from "@/lib/images";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ImageTile } from "@/components/ui/ImageTile";

export function AboutSection() {
  return (
    <section id="about" className="bg-white py-24">
      <Container className="grid items-center gap-14 md:grid-cols-2">
        <ImageTile
          src={SITE_IMAGES.aboutCoordinators}
          alt="Vantage moving coordinators helping a family plan their move"
        />

        <div>
          <Eyebrow>Who We Are</Eyebrow>
          <h2 className="mb-[18px] text-balance font-display text-[clamp(28px,3vw,40px)] leading-[1.1] font-extrabold -tracking-[.02em] text-brand-blue">
            Helping Families &amp; Businesses Move With Confidence
          </h2>
          <p className="mb-4 text-[16.5px] leading-[1.65] text-[#475569]">
            Vantage Movers is a licensed interstate moving broker. We don&apos;t drive the trucks
            — we do something just as important: we help you plan, match, and coordinate your
            long-distance move with FMCSA-authorized motor carriers you can trust.
          </p>
          <p className="mb-7 text-[16.5px] leading-[1.65] text-[#475569]">
            From your first estimate to delivery day, our coordinators help simplify the process
            — clearer pricing, practical guidance, and a single point of contact for families,
            military, and businesses relocating across state lines.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-lg2 border-[1.5px] border-brand-blue bg-white px-[26px] py-3.5 font-display text-[15px] font-bold tracking-[.04em] text-brand-blue uppercase no-underline transition hover:bg-brand-blue hover:text-white"
          >
            Learn More About Vantage <ArrowRight size={16} strokeWidth={2.4} aria-hidden />
          </a>
        </div>
      </Container>
    </section>
  );
}
