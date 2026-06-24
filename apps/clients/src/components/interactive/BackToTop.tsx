"use client";

import { cn } from "@vantage/utils";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { Icon } from "@/components/ui/Icon";

const RADIUS = 23;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function BackToTop() {
  const { pct, show } = useScrollProgress(600);

  return (
    <button
      className={cn("totop", show && "show")}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
    >
      <svg className="totop__ring" viewBox="0 0 52 52">
        <circle className="bg" cx="26" cy="26" r={RADIUS} />
        <circle
          className="fg"
          cx="26"
          cy="26"
          r={RADIUS}
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE * (1 - pct)}
        />
      </svg>
      <Icon name="arrowUp" />
    </button>
  );
}
