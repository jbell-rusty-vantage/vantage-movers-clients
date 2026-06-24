"use client";

import { useEffect, useMemo, useState } from "react";
import { cn } from "@vantage/utils";

export interface RollingNumberProps {
  fallback: string;
  min: number;
  max: number;
  suffix?: string;
  className?: string;
}

const FORMATTER = new Intl.NumberFormat("en-US");

function getRandomInRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function RollingNumber({ fallback, min, max, suffix = "", className }: RollingNumberProps) {
  const [value, setValue] = useState<number | null>(null);
  const target = useMemo(() => getRandomInRange(min, max), [min, max]);

  useEffect(() => {
    let tick = 0;
    const totalTicks = 24;
    const interval = window.setInterval(() => {
      tick += 1;

      if (tick >= totalTicks) {
        setValue(target);
        window.clearInterval(interval);
        return;
      }

      setValue(getRandomInRange(min, max));
    }, 45);

    return () => window.clearInterval(interval);
  }, [max, min, target]);

  const display = value === null ? fallback : `${FORMATTER.format(value)}${suffix}`;

  return (
    <span
      className={cn("inline-block tabular-nums", className)}
      aria-label={display}
    >
      {display}
    </span>
  );
}
