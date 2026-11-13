import { CmsImage as Image } from "@/components/cms/Content";

// Keep the subject above the copy, and outside the form's right-hand column.
// Crop positions are per asset; mobile receives its own composition.
export function HeroBackdrop({ src, position = "50% 25%", mobilePosition = position, variant = "editorial" }: { src: string; position?: string; mobilePosition?: string; variant?: "editorial" | "immersive" }) {
  return <div aria-hidden className="hero-backdrop pointer-events-none absolute inset-0 overflow-hidden bg-[var(--tone-dark)]" data-backdrop={variant}>
    <div className="hero-backdrop__image absolute top-0 left-0 h-[380px] w-full lg:h-[540px] lg:w-[58%]">
      <Image scope="components/sections/HeroBackdrop.tsx" src={src} alt="" fill preload sizes={variant === "immersive" ? "100vw" : "(min-width: 1024px) 58vw, 100vw"} className="object-cover [object-position:var(--hero-mobile-focus)] lg:[object-position:var(--hero-focus)]" style={{ "--hero-focus": position, "--hero-mobile-focus": mobilePosition } as React.CSSProperties} />
      <div className="hero-backdrop__wash absolute inset-0 bg-gradient-to-b from-[var(--tone-dark)]/10 via-[var(--tone-dark)]/35 to-[var(--tone-dark)]" />
      <div className="hero-backdrop__edge absolute inset-y-0 right-0 hidden w-1/5 bg-gradient-to-r from-transparent to-[var(--tone-dark)] lg:block" />
    </div>
  </div>;
}
