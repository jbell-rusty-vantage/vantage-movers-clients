import Image from "next/image";
import { trustStrip, type TrustLogo } from "@/lib/content";
import { Container } from "@/components/ui/Container";

function TrustLogoMark({ logo }: { logo: TrustLogo }) {
  return (
    <span className="trust-logo">
      <Image
        src={logo.src}
        alt={logo.alt}
        width={logo.width}
        height={logo.height}
        className={`trust-logo__img${logo.wide ? " trust-logo__img--wide" : ""}`}
      />
    </span>
  );
}

function LogoRow({ keyPrefix }: { keyPrefix: string }) {
  return (
    <>
      {trustStrip.logos.map((logo) => (
        <TrustLogoMark key={`${keyPrefix}-${logo.src}`} logo={logo} />
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
