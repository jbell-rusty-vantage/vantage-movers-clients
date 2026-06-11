"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Single IntersectionObserver that adds `.in` to `.reveal` elements as they
 * scroll into view. CSS handles the transition and the reduced-motion opt-out.
 */
export function RevealManager() {
  const pathname = usePathname();

  useEffect(() => {
    const observers = new Set<IntersectionObserver>();

    function observeReveals() {
      const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal:not(.in)"));
      if (els.length === 0) return;

      if (!("IntersectionObserver" in window)) {
        els.forEach((el) => el.classList.add("in"));
        return;
      }

      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("in");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
      );

      observers.add(io);
      els.forEach((el) => io.observe(el));
    }

    function handlePageShow(event: PageTransitionEvent) {
      if (event.persisted) {
        observeReveals();
      }
    }

    observeReveals();
    window.addEventListener("pageshow", handlePageShow);

    return () => {
      window.removeEventListener("pageshow", handlePageShow);
      observers.forEach((io) => io.disconnect());
    };
  }, [pathname]);

  return null;
}
