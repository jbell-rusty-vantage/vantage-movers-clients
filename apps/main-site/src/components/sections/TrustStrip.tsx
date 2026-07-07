import Image from "next/image";
import { trustStrip } from "@/lib/content";
import { Container } from "@/components/ui/Container";

function LogoRow({ keyPrefix }: { keyPrefix: string }) {
  return (
    <>
      {trustStrip.logos.map((logo) => (
        <span
          key={`${keyPrefix}-${logo.src}`}
          className={`${logo.imgClass === "getmovers" ? "h-[34px] w-[146px] justify-center opacity-100" : "opacity-70"} inline-flex shrink-0 items-center transition-opacity hover:opacity-100`}
        >
          <Image
            src={logo.src}
            alt={logo.alt}
            width={logo.width}
            height={logo.height}
            className={
              logo.imgClass === "getmovers"
                ? "h-auto max-h-[34px] w-full object-contain object-center contrast-110"
                : "h-[42px] w-auto"
            }
          />
        </span>
      ))}
    </>
  );
}

export function TrustStrip() {
  return (
    <section className="border-b border-cream-border-2 bg-white">
      <Container className="flex flex-col items-center gap-6 py-8">
        <p className="font-display text-[15px] font-bold tracking-[0.14em] uppercase text-brand-blue-bright">
          {trustStrip.label}
        </p>
        <div className="trust-marquee w-full">
          {/* Track rendered 3× for a seamless loop. */}
          <div className="trust-marquee-track">
            <LogoRow keyPrefix="a" />
            <LogoRow keyPrefix="b" />
            <LogoRow keyPrefix="c" />
          </div>
        </div>
      </Container>
    </section>
  );
}
