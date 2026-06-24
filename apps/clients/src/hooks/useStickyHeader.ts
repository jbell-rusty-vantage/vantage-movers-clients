"use client";

import { useEffect, useState } from "react";

/** Returns true once the page is scrolled past `threshold` px. */
export function useStickyHeader(threshold = 90) {
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > threshold);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return stuck;
}
