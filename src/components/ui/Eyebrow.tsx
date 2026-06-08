import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface EyebrowProps {
  children: ReactNode;
  center?: boolean;
  /** Gold variant used on dark/navy backgrounds. */
  onDark?: boolean;
  className?: string;
}

export function Eyebrow({ children, center, onDark, className }: EyebrowProps) {
  return (
    <span className={cn("eyebrow", center && "center", onDark && "on-dark", className)}>
      {children}
    </span>
  );
}
