import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { cn } from "@vantage/utils";

interface EyebrowProps {
  children: ReactNode;
  onDark?: boolean;
  className?: string;
}

export function Eyebrow({ children, onDark, className }: EyebrowProps) {
  return (
    <div
      className={cn(
        "mb-4 inline-flex items-center gap-2 font-display text-[13px] font-bold tracking-[0.14em] uppercase",
        onDark ? "text-on-dark-400" : "text-brand-blue-bright",
        className,
      )}
    >
      <Check className="size-3.5 text-brand-yellow" strokeWidth={3} aria-hidden />
      {children}
    </div>
  );
}
