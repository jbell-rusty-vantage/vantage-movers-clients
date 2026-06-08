import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { IconName, SceneName } from "@/types";
import { Icon } from "./Icon";

type Motif = "boxes" | "truck" | "route" | "office" | "shield" | "car" | "headset";

interface SceneDef {
  g: [string, string];
  motif: Motif;
  label: string;
}

/**
 * Branded gradient illustration placeholders. Replace with real licensed
 * photography at the captioned slots before launch.
 */
const SCENES: Record<SceneName, SceneDef> = {
  hero: { g: ["#0a3a6e", "#062B55"], motif: "boxes", label: "family-moving-day.jpg" },
  longdist: { g: ["#1a5fa3", "#0c2f59"], motif: "route", label: "long-distance.jpg" },
  storage: { g: ["#2E86DE", "#145DA0"], motif: "boxes", label: "packing-storage.jpg" },
  office: { g: ["#3b6fa8", "#13325c"], motif: "office", label: "office-move.jpg" },
  military: { g: ["#0d3b52", "#062B55"], motif: "shield", label: "military-move.jpg" },
  promo: { g: ["#0b3666", "#04203f"], motif: "truck", label: "loading-truck.jpg" },
  expertise: { g: ["#103e72", "#05182e"], motif: "route", label: "movers-carrying.jpg" },
  auto: { g: ["#2E86DE", "#0f4a86"], motif: "car", label: "auto-carrier.jpg" },
  support: { g: ["#1b5ea0", "#0a2c54"], motif: "headset", label: "support-rep.jpg" },
  finalcta: { g: ["#0a3a6e", "#041d38"], motif: "route", label: "" },
};

const GLYPH: Partial<Record<Motif, IconName>> = {
  office: "office",
  shield: "shield",
  car: "car",
  headset: "headset",
};

function MotifShapes({ kind }: { kind: Motif }) {
  if (kind === "boxes") {
    return (
      <div className="mtf mtf-boxes" aria-hidden>
        <span className="bx b1" />
        <span className="bx b2" />
        <span className="bx b3" />
        <span className="bx b4" />
      </div>
    );
  }
  if (kind === "truck") {
    return (
      <div className="mtf mtf-truck" aria-hidden>
        <span className="cab" />
        <span className="trailer" />
        <span className="wheel w1" />
        <span className="wheel w2" />
        <span className="wheel w3" />
      </div>
    );
  }
  if (kind === "route") {
    return (
      <div className="mtf mtf-route" aria-hidden>
        <span className="dot d1" />
        <span className="line" />
        <span className="dot d2" />
      </div>
    );
  }
  const glyph = GLYPH[kind];
  return (
    <div className="mtf mtf-glyph" aria-hidden>
      {glyph && <Icon name={glyph} />}
    </div>
  );
}

export interface ImageFillProps {
  scene?: SceneName;
  className?: string;
  style?: CSSProperties;
  showLabel?: boolean;
  /** Dark gradient overlay; pass a number 0-1 to control opacity. */
  overlay?: boolean | number;
  /** Real photo path under /public. When set, replaces the gradient placeholder. */
  src?: string;
  /** Alt text for the photo (when `src` is set). */
  alt?: string;
  /** Responsive `sizes` hint for the photo. */
  sizes?: string;
  /** Render the photo as an above-the-fold/LCP candidate. */
  priority?: boolean;
  children?: ReactNode;
}

export function ImageFill({
  scene = "hero",
  className,
  style,
  showLabel = true,
  overlay,
  src,
  alt = "",
  sizes = "100vw",
  priority,
  children,
}: ImageFillProps) {
  const s = SCENES[scene] ?? SCENES.hero;

  if (src) {
    return (
      <div className={cn("fill", className)} style={style}>
        <Image
          className="fill__photo"
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
        />
        {overlay ? (
          <div
            className="fill__ov"
            style={{ opacity: typeof overlay === "number" ? overlay : 0.55 }}
          />
        ) : null}
        {children}
      </div>
    );
  }

  return (
    <div
      className={cn("fill", className)}
      style={{
        background: `radial-gradient(120% 120% at 80% 0%, ${s.g[0]} 0%, ${s.g[1]} 70%)`,
        ...style,
      }}
    >
      <div className="fill__grain" aria-hidden />
      <MotifShapes kind={s.motif} />
      {overlay ? (
        <div
          className="fill__ov"
          style={{ opacity: typeof overlay === "number" ? overlay : 0.55 }}
        />
      ) : null}
      {children}
      {showLabel && s.label && <span className="fill__label">{s.label}</span>}
    </div>
  );
}
