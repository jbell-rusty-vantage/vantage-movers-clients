"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollProgressState {
  pct: number;
  show: boolean;
}

/** Tracks scroll progress (0-1) and whether the page is scrolled past `showAfter`. */
export function useScrollProgress(showAfter = 600) {
  const [state, setState] = useState<ScrollProgressState>({ pct: 0, show: false });
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const update = () => {
      frame.current = null;
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const pct = max > 0 ? h.scrollTop / max : 0;
      const show = h.scrollTop > showAfter;

      setState((current) => {
        if (current.show === show && Math.abs(current.pct - pct) < 0.002) {
          return current;
        }
        return { pct, show };
      });
    };

    const onScroll = () => {
      if (frame.current !== null) return;
      frame.current = window.requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => {
      if (frame.current !== null) {
        window.cancelAnimationFrame(frame.current);
      }
      window.removeEventListener("scroll", onScroll);
    };
  }, [showAfter]);

  return state;
}
