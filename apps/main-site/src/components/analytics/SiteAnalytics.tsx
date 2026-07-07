"use client";

import { useEffect } from "react";
import {
  initializeBounceTracking,
  legalEventForHref,
  trackSectionViewed,
  trackEvent,
  type AnalyticsProperties,
} from "@/lib/analytics";

function datasetProperties(element: HTMLElement): AnalyticsProperties {
  const properties: AnalyticsProperties = {};

  for (const [key, value] of Object.entries(element.dataset)) {
    if (!key.startsWith("analytics") || key === "analyticsEvent") continue;
    if (!value) continue;

    const propertyName = key
      .replace(/^analytics/, "")
      .replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)
      .replace(/^_/, "");

    properties[propertyName] = value;
  }

  return properties;
}

function propertiesForAnchor(anchor: HTMLAnchorElement): {
  eventName: string;
  properties: AnalyticsProperties;
} | null {
  const href = anchor.getAttribute("href") || "";
  const linkText = anchor.textContent?.trim().replace(/\s+/g, " ").slice(0, 80) || "unknown";
  const explicitEvent = anchor.dataset.analyticsEvent;
  const dataProperties = datasetProperties(anchor);
  const linkLocation = anchor.dataset.analyticsLocation || "unknown";

  if (explicitEvent) {
    return { eventName: explicitEvent, properties: dataProperties };
  }

  if (href.startsWith("tel:")) {
    return { eventName: "phone_clicked", properties: { link_location: linkLocation } };
  }

  if (href.startsWith("mailto:")) {
    return { eventName: "email_clicked", properties: { link_location: linkLocation } };
  }

  const legalEvent = legalEventForHref(href);
  if (legalEvent) {
    return { eventName: legalEvent, properties: { link_location: linkLocation } };
  }

  if (href === "#quote" || href === "/#quote") {
    return {
      eventName: "cta_clicked",
      properties: {
        cta_location: anchor.dataset.analyticsLocation || linkText,
        ...dataProperties,
      },
    };
  }

  if (href.startsWith("#") || href.startsWith("/#")) {
    return {
      eventName: "nav_link_clicked",
      properties: {
        link_location: linkLocation,
        link_text: linkText,
        link_href: href,
        move_type: anchor.dataset.analyticsMoveType || null,
      },
    };
  }

  return null;
}

export function SiteAnalytics() {
  useEffect(() => initializeBounceTracking(), []);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;

    const sections = Array.from(document.querySelectorAll<HTMLElement>("main section"));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;

          const section = entry.target as HTMLElement;
          const sectionIndex = sections.indexOf(section);
          const sectionId = section.id || `section_${sectionIndex + 1}`;
          trackSectionViewed(sectionId);
          observer.unobserve(section);
        }
      },
      { threshold: 0.45 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest<HTMLAnchorElement>("a[href]");
      if (!anchor) return;

      const analyticsEvent = propertiesForAnchor(anchor);
      if (!analyticsEvent) return;

      trackEvent(analyticsEvent.eventName, analyticsEvent.properties);
    }

    document.addEventListener("click", handleClick, { capture: true });
    return () => document.removeEventListener("click", handleClick, { capture: true });
  }, []);

  return null;
}
