import Image from "next/image";
import { trustStrip } from "@/content/sections";

function LogoRow({ keyPrefix }: { keyPrefix: string }) {
  return (
    <>
      {trustStrip.logos.map((l) => (
        <span
          key={`${keyPrefix}-${l.src}`}
          className={`trustlogo${l.imgClass ? ` trustlogo--${l.imgClass}` : ""}`}
        >
          <Image
            className={`trustlogo__img${l.imgClass ? ` trustlogo__img--${l.imgClass}` : ""}`}
            src={l.src}
            alt={l.alt}
            width={l.width}
            height={l.height}
          />
        </span>
      ))}
    </>
  );
}

export function TrustStrip() {
  return (
    <div className="truststrip">
      <div className="wrap truststrip__in reveal">
        <span className="truststrip__label">{trustStrip.label}</span>
        <div className="truststrip__viewport">
          {/* Track rendered 3x for a seamless loop. */}
          <div className="truststrip__track">
            <LogoRow keyPrefix="a" />
            <LogoRow keyPrefix="b" />
            <LogoRow keyPrefix="c" />
          </div>
        </div>
      </div>
    </div>
  );
}
