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
    let frame: number | null = null;
    const observed = new WeakSet<HTMLElement>();
    let io: IntersectionObserver | null = null;

    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("in");
              io?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
      );
    }

    function isInViewport(el: HTMLElement) {
      const rect = el.getBoundingClientRect();
      return rect.bottom > 0 && rect.top < window.innerHeight * 0.92;
    }

    function observeReveals() {
      const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal:not(.in)"));
      if (els.length === 0) return;

      els.forEach((el) => {
        if (!io || isInViewport(el)) {
          el.classList.add("in");
          return;
        }
        if (!observed.has(el)) {
          observed.add(el);
          io.observe(el);
        }
      });
    }

    function scheduleObserve() {
      if (frame !== null) return;
      frame = window.requestAnimationFrame(() => {
        frame = null;
        observeReveals();
      });
    }

    function handlePageShow(event: PageTransitionEvent) {
      if (event.persisted) {
        scheduleObserve();
      }
    }

    const mutations = new MutationObserver(scheduleObserve);
    mutations.observe(document.body, { childList: true, subtree: true });

    scheduleObserve();
    window.addEventListener("pageshow", handlePageShow);

    return () => {
      if (frame !== null) {
        window.cancelAnimationFrame(frame);
      }
      window.removeEventListener("pageshow", handlePageShow);
      mutations.disconnect();
      io?.disconnect();
    };
  }, [pathname]);

  return null;
}
