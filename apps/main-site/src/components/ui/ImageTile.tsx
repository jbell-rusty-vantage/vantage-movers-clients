import { CmsText } from "@/components/cms/Content";
import { CmsImage as Image } from "@/components/cms/Content";
import type { ReactNode } from "react";
import { cn } from "@vantage/utils";

interface ImageTileProps {
  src: string;
  alt: string;
  badge?: ReactNode;
  statBadge?: ReactNode;
  className?: string;
}

export function ImageTile({ src, alt, badge, statBadge, className }: ImageTileProps) {
  return (
    <div
      className={cn(
        "relative min-h-[420px] overflow-hidden rounded-panel shadow-tile md:min-h-[440px]",
        className,
      )}
    >
      <Image scope="components/ui/ImageTile.tsx"
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(4,18,38,.15)] to-[rgba(4,18,38,.55)]" />
      <CmsText scope="components/ui/ImageTile.tsx">{badge && <div className="absolute top-5 left-5 md:left-[22px] md:top-[22px]"><CmsText scope="components/ui/ImageTile.tsx">{badge}</CmsText></div>}</CmsText>
      <CmsText scope="components/ui/ImageTile.tsx">{statBadge && (
        <div className="absolute top-6 left-6 md:left-6 md:top-6"><CmsText scope="components/ui/ImageTile.tsx">{statBadge}</CmsText></div>
      )}</CmsText>
    </div>
  );
}

export function TileBadge({
  children,
  icon,
}: {
  children: ReactNode;
  icon: ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 font-display text-[13px] font-extrabold text-brand-blue">
      <CmsText scope="components/ui/ImageTile.tsx">{icon}</CmsText>
      <CmsText scope="components/ui/ImageTile.tsx">{children}</CmsText>
    </span>
  );
}

export function StatBadge({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-card bg-white/95 px-[22px] py-[18px] shadow-[0_12px_30px_rgba(4,18,38,.3)]">
      <div className="font-display text-[32px] leading-none font-black text-brand-blue">
        <CmsText scope="components/ui/ImageTile.tsx">{value}</CmsText>
      </div>
      <div className="mt-1 text-[13px] text-[#64748B]"><CmsText scope="components/ui/ImageTile.tsx">{label}</CmsText></div>
    </div>
  );
}
