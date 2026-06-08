"use client";

import { useEffect, useState } from "react";

/** Tracks scroll progress (0-1) and whether the page is scrolled past `showAfter`. */
export function useScrollProgress(showAfter = 600) {
  const [pct, setPct] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setPct(max > 0 ? h.scrollTop / max : 0);
      setShow(h.scrollTop > showAfter);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [showAfter]);

  return { pct, show };
}
