"use client";

import type { CSSProperties, ElementType, ReactNode } from "react";
import type { ButtonProps, IconName, IconProps, PhoneProps, SceneName } from "./types";

const iconPaths: Record<IconName, ReactNode> = {
  phone: (
    <path
      d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .57 3.6 1 1 0 0 1-.25 1Z"
      fill="currentColor"
      stroke="none"
    />
  ),
  star: (
    <path
      d="M12 2.2l2.95 5.98 6.6.96-4.78 4.66 1.13 6.57L12 17.27l-5.9 3.1 1.13-6.57L2.45 9.14l6.6-.96L12 2.2Z"
      fill="currentColor"
      stroke="none"
    />
  ),
  arrowUp: <path d="M12 19V6m0 0l-6 6m6-6l6 6" />,
  arrowRight: <path d="M5 12h14m0 0l-6-6m6 6l-6 6" />,
  check: <path d="M20 6L9 17l-5-5" />,
  truck: (
    <path d="M3 7h11v8H3zM14 10h4l3 3v2h-7M7 19a2 2 0 100-4 2 2 0 000 4Zm10 0a2 2 0 100-4 2 2 0 000 4Z" />
  ),
  box: <path d="M21 8l-9-5-9 5m18 0l-9 5m9-5v8l-9 5m0-8L3 8m9 5v8M3 8v8l9 5" />,
  office: <path d="M4 21V5a2 2 0 012-2h7a2 2 0 012 2v16M15 11h3a2 2 0 012 2v8M8 7h2M8 11h2M8 15h2" />,
  shield: <path d="M12 3l8 3v6c0 4.5-3.2 7.8-8 9-4.8-1.2-8-4.5-8-9V6l8-3Z" />,
  pin: (
    <path d="M12 21s7-5.6 7-11a7 7 0 10-14 0c0 5.4 7 11 7 11Zm0-8.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5Z" />
  ),
  headset: (
    <path d="M4 13v-1a8 8 0 0116 0v1M4 13a2 2 0 002 2h1v-5H6a2 2 0 00-2 2Zm16 0a2 2 0 00-2-2h-1v5h1a2 2 0 002-2Zm-2 4v.5a3.5 3.5 0 01-3.5 3.5H12" />
  ),
  car: <path d="M5 16l1.5-5A2 2 0 018.4 9.6h7.2A2 2 0 0117.5 11L19 16m-14 0h14m-14 0v2.5M19 16v2.5M7.5 16v0m9 0v0" />,
  users: (
    <path d="M16 19v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M9 9a3 3 0 100-6 3 3 0 000 6Zm13 10v-2a4 4 0 00-3-3.87M16 3.13A4 4 0 0119 7a4 4 0 01-3 3.87" />
  ),
  clock: <path d="M12 7v5l3 2M21 12a9 9 0 11-18 0 9 9 0 0118 0Z" />,
  mail: <path d="M3 6h18v12H3zM3 7l9 6 9-6" />,
  quote: (
    <path
      d="M7 7h4v6c0 2.5-1.5 4-4 4.5V15c1.3-.3 2-1 2-2H7V7Zm8 0h4v6c0 2.5-1.5 4-4 4.5V15c1.3-.3 2-1 2-2h-2V7Z"
      fill="currentColor"
      stroke="none"
    />
  ),
};

export function Icon({ name, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {iconPaths[name]}
    </svg>
  );
}

export function Btn({
  children,
  variant,
  size,
  block,
  arrow,
  className,
  href,
  type = "button",
  ...props
}: ButtonProps) {
  const classes = [
    "btn",
    variant === "gold" && "btn--gold",
    variant === "ghost" && "btn--ghost",
    size === "lg" && "btn--lg",
    block && "btn--block",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const Tag: ElementType = href ? "a" : "button";
  const tagProps = href ? { href } : { type };

  return (
    <Tag className={classes} {...tagProps} {...props}>
      {children}
      {arrow ? <Icon name="arrowRight" style={{ width: 17, height: 17 }} /> : null}
    </Tag>
  );
}

export function Phone({ num = "(800) 555-0199", label, dark, sm }: PhoneProps) {
  return (
    <a
      href={`tel:${num.replace(/[^0-9]/g, "")}`}
      className={`phone${dark ? " on-dark" : ""}${sm ? " phone--sm" : ""}`}
    >
      <span className="phone__icon">
        <Icon name="phone" />
      </span>
      <span>
        {label ? <span className="phone__label">{label}</span> : null}
        <span className="phone__num">{num}</span>
      </span>
    </a>
  );
}

export function Stars({ size = 20 }: { value?: number; size?: number }) {
  return (
    <span className="stars">
      {[0, 1, 2, 3, 4].map((i) => (
        <Icon key={i} name="star" style={{ width: size, height: size }} />
      ))}
    </span>
  );
}

const scenes: Record<SceneName, { g: [string, string]; motif: "boxes" | "route" | "office" | "shield" | "truck" | "car" | "headset"; label: string }> = {
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

function Motif({ kind }: { kind: (typeof scenes)[SceneName]["motif"] }) {
  if (kind === "boxes") {
    return (
      <div className="mtf mtf-boxes" aria-hidden="true">
        <span className="bx b1" />
        <span className="bx b2" />
        <span className="bx b3" />
        <span className="bx b4" />
      </div>
    );
  }

  if (kind === "truck") {
    return (
      <div className="mtf mtf-truck" aria-hidden="true">
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
      <div className="mtf mtf-route" aria-hidden="true">
        <span className="dot d1" />
        <span className="line" />
        <span className="dot d2" />
      </div>
    );
  }

  return (
    <div className="mtf mtf-glyph" aria-hidden="true">
      <Icon name={kind} />
    </div>
  );
}

export function ImageFill({
  scene = "hero",
  className = "",
  style,
  showLabel = true,
  children,
  overlay,
}: {
  scene?: SceneName;
  className?: string;
  style?: CSSProperties;
  showLabel?: boolean;
  children?: ReactNode;
  overlay?: boolean | number;
}) {
  const sceneData = scenes[scene];

  return (
    <div
      className={`fill ${className}`}
      style={{
        background: `radial-gradient(120% 120% at 80% 0%, ${sceneData.g[0]} 0%, ${sceneData.g[1]} 70%)`,
        ...style,
      }}
    >
      <div className="fill__grain" aria-hidden="true" />
      <Motif kind={sceneData.motif} />
      {overlay ? (
        <div className="fill__ov" style={{ opacity: typeof overlay === "number" ? overlay : 0.55 }} />
      ) : null}
      {children}
      {showLabel && sceneData.label ? <span className="fill__label">{sceneData.label}</span> : null}
    </div>
  );
}

