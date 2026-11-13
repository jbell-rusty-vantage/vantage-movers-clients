import { CmsImage as Image } from "@/components/cms/Content";

// Keep the subject above the copy, and outside the form's right-hand column.
// Crop positions are per asset; mobile receives its own composition.
export function HeroBackdrop({ src, position = "50% 25%", mobilePosition = position }: { src: string; position?: string; mobilePosition?: string }) {
  return <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden bg-[#041a36]">
    <div className="absolute top-0 left-0 h-[380px] w-full lg:h-[540px] lg:w-[58%]">
      <Image scope="components/sections/HeroBackdrop.tsx" src={src} alt="" fill preload sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover [object-position:var(--hero-mobile-focus)] lg:[object-position:var(--hero-focus)]" style={{ "--hero-focus": position, "--hero-mobile-focus": mobilePosition } as React.CSSProperties} />
      <div className="absolute inset-0 bg-gradient-to-b from-[#041a36]/10 via-[#041a36]/35 to-[#041a36]" />
      <div className="absolute inset-y-0 right-0 hidden w-1/5 bg-gradient-to-r from-transparent to-[#041a36] lg:block" />
    </div>
  </div>;
}
