"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const PROMO_SEEN_KEY = "vm_promo_seen";
const EXIT_INTENT_TOP_PX = 8;

export interface PromoTriggerOptions {
  /** Seconds of no interaction before firing (0 disables inactivity trigger). */
  inactivitySec?: number;
  /** Fire when the cursor leaves the top of the viewport (desktop). */
  exitIntent?: boolean;
  /** Don't auto-fire again once dismissed this session. */
  oncePerSession?: boolean;
}

/**
 * Promo trigger: fires on exit-intent (desktop) or inactivity, whichever
 * comes first. Shows once per session and never interrupts an active form fill.
 */
export function usePromoTrigger({
  inactivitySec = 35,
  exitIntent = true,
  oncePerSession = true,
}: PromoTriggerOptions): [boolean, () => void, () => void] {
  const [open, setOpen] = useState(false);
  const fired = useRef(false);

  const openNow = useCallback(() => {
    fired.current = true;
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    if (oncePerSession) {
      try {
        sessionStorage.setItem(PROMO_SEEN_KEY, "1");
      } catch {
        /* ignore */
      }
    }
  }, [oncePerSession]);

  useEffect(() => {
    if (oncePerSession) {
      try {
        if (sessionStorage.getItem(PROMO_SEEN_KEY)) fired.current = true;
      } catch {
        /* ignore */
      }
    }

    let timer: ReturnType<typeof setTimeout> | null = null;

    const isTyping = () => {
      const el = document.activeElement as HTMLElement | null;
      return !!el?.closest?.(".qf, input, textarea, select");
    };

    const schedule = () => {
      if (timer) clearTimeout(timer);
      if (!fired.current && inactivitySec > 0) timer = setTimeout(fire, inactivitySec * 1000);
    };

    function fire() {
      if (fired.current) return;
      if (isTyping()) {
        schedule();
        return;
      }
      fired.current = true;
      setOpen(true);
    }

    const onActivity = () => {
      if (!fired.current) schedule();
    };
    const onExit = (e: MouseEvent) => {
      if (e.clientY > EXIT_INTENT_TOP_PX) return;

      // Some browsers/extensions provide a relatedTarget when crossing browser
      // chrome. Only ignore the event when the pointer is still inside the page.
      if (e.relatedTarget instanceof Node && document.documentElement.contains(e.relatedTarget)) {
        return;
      }

      fire();
    };

    const acts: (keyof WindowEventMap)[] = [
      "mousemove",
      "mousedown",
      "keydown",
      "scroll",
      "touchstart",
      "wheel",
    ];
    acts.forEach((a) => window.addEventListener(a, onActivity, { passive: true }));
    if (exitIntent) {
      document.addEventListener("mouseout", onExit);
      document.documentElement.addEventListener("mouseleave", onExit);
    }
    schedule();

    return () => {
      if (timer) clearTimeout(timer);
      acts.forEach((a) => window.removeEventListener(a, onActivity));
      document.removeEventListener("mouseout", onExit);
      document.documentElement.removeEventListener("mouseleave", onExit);
    };
  }, [inactivitySec, exitIntent, oncePerSession]);

  return [open, openNow, close];
}
