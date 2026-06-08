import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

export interface SkeletonProps {
  className?: string;
  style?: CSSProperties;
  /** Inline height/width shortcuts. */
  h?: number | string;
  w?: number | string;
}

/** Shimmer block used to build loading skeletons (reuses .qf-skel styling). */
export function Skeleton({ className, style, h, w }: SkeletonProps) {
  return (
    <span
      className={cn("qf-skel", className)}
      style={{ display: "block", height: h, width: w, ...style }}
      aria-hidden
    />
  );
}
