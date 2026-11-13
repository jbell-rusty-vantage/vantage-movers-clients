"use client";
import { useEffect } from "react";

/** Keep native hash/history behavior and move keyboard focus to the destination. */
export function AnchorFocus() {
  useEffect(() => {
    function focusHash() {
      const id = window.location.hash.slice(1);
      if (!id) return;
      let target: HTMLElement | null;
      try { target = document.getElementById(decodeURIComponent(id)); } catch { return; }
      if (!target) return;
      const focusable = target.matches("form") ? target.querySelector<HTMLElement>("input,button,select") : target;
      if (!focusable) return;
      if (!focusable.hasAttribute("tabindex") && !focusable.matches("input,button,select,a,textarea")) focusable.tabIndex = -1;
      focusable.focus({ preventScroll: true });
    }
    function click(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest("a[href]");
      if (!link) return;
      // SVG anchors expose href as SVGAnimatedString, unlike HTML anchors.
      const url = new URL(link.getAttribute("href")!, document.baseURI);
      if (url.origin === location.origin && url.pathname === location.pathname && url.hash) requestAnimationFrame(focusHash);
    }
    window.addEventListener("hashchange", focusHash);
    document.addEventListener("click", click);
    requestAnimationFrame(focusHash);
    return () => { window.removeEventListener("hashchange", focusHash); document.removeEventListener("click", click); };
  }, []);
  return null;
}
