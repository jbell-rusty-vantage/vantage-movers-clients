import { ArrowRight } from "lucide-react";
import { aboutSection } from "@/lib/content";
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
          alt="Vantage moving coordinators reviewing relocation details with a customer"
        />

        <div>
          <Eyebrow>{aboutSection.eyebrow}</Eyebrow>
          <h2 className="mb-[18px] text-balance font-display text-[clamp(28px,3vw,40px)] leading-[1.1] font-extrabold -tracking-[.02em] text-brand-blue">
            {aboutSection.title}
          </h2>
          <p className="mb-7 text-[16.5px] leading-[1.65] text-[#475569]">{aboutSection.body}</p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-lg2 border-[1.5px] border-brand-blue bg-white px-[26px] py-3.5 font-display text-[15px] font-bold tracking-[.04em] text-brand-blue uppercase no-underline transition hover:bg-brand-blue hover:text-white"
          >
            Speak With a Coordinator <ArrowRight size={16} strokeWidth={2.4} aria-hidden />
          </a>
        </div>
      </Container>
    </section>
  );
}
