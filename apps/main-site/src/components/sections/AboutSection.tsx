import { ArrowRight, Check } from "lucide-react";
import { aboutSection } from "@/lib/content";
import { heroBodyFont, heroHeadingFont } from "@/lib/fonts";
import { SITE_IMAGES } from "@/lib/images";
import { Container } from "@/components/ui/Container";
import { ImageTile } from "@/components/ui/ImageTile";

/** Playground args promoted to production — see AboutSection.stories.tsx Playground. */
const HEADING_FONT_SIZE = 40;
const BODY_FONT_SIZE = 16.5;

export function AboutSection() {
  return (
    <section id="about" className="bg-white py-24">
      <Container className="grid items-center gap-14 md:grid-cols-2">
        <div>
          <div
            className={`mb-4 inline-flex items-center gap-2 text-[13px] font-bold tracking-[0.14em] uppercase text-brand-blue-bright ${heroHeadingFont.className}`}
          >
            <Check className="size-3.5 text-brand-yellow" strokeWidth={3} aria-hidden />
            {aboutSection.eyebrow}
          </div>
          <h2
            className={`mb-[18px] text-balance leading-[1.1] font-extrabold -tracking-[.02em] text-brand-blue ${heroHeadingFont.className}`}
            style={{ fontSize: `clamp(28px, 3vw, ${HEADING_FONT_SIZE}px)` }}
          >
            {aboutSection.title}
          </h2>
          <p
            className={`mb-7 leading-[1.65] text-[#475569] ${heroBodyFont.className}`}
            style={{ fontSize: `${BODY_FONT_SIZE}px` }}
          >
            {aboutSection.body}
          </p>
          <a
            href="#contact"
            className={`group inline-flex items-center gap-2 rounded-lg2 border-[1.5px] border-brand-blue bg-white px-[26px] py-3.5 text-[15px] font-bold tracking-[.04em] text-brand-blue uppercase no-underline transition hover:bg-brand-blue hover:text-white ${heroHeadingFont.className}`}
          >
            Speak With a Coordinator <ArrowRight size={16} strokeWidth={2.4} aria-hidden />
          </a>
        </div>

        <ImageTile
          src={SITE_IMAGES.aboutCoordinators}
          alt="Vantage moving coordinators reviewing relocation details with a customer"
        />
      </Container>
    </section>
  );
}
