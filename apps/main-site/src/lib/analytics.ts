"use client";

import { track } from "@vercel/analytics";
import { sanitizeAnalyticsEvent, type AnalyticsProperties, type SafeEvent } from "./analytics-contract";
import type { TelemetryMode } from "./telemetry-mode";
export type { AnalyticsProperties } from "./analytics-contract";

export const quoteFormAnalytics = { form_name: "main_site_quote", form_version: "2026-11" } as const;
let collectionMode: TelemetryMode = "local";
const KEY = "vantage_main_site_engagement_v2";
const leadIntentEvents = new Set([
  "calendar_or_date_picker_opened", "cta_clicked", "email_clicked", "form_started",
  "form_step_completed", "form_submit_attempted", "form_submit_success", "form_validation_error", "phone_clicked",
]);

declare global {
  interface Window { __vantagePreviewEvents?: SafeEvent[]; }
}

export function configureAnalytics(mode: TelemetryMode) {
  collectionMode = mode;
}

function emit(name: string, properties: AnalyticsProperties = {}) {
  try {
    const event = sanitizeAnalyticsEvent(name, properties, window.location.pathname, collectionMode === "production");
    if (!event) return;
    if (collectionMode !== "production") {
      // Bounded diagnostics supplement deployed Preview receipts; never store form data.
      window.__vantagePreviewEvents = [...(window.__vantagePreviewEvents ?? []).slice(-99), event];
      window.dispatchEvent(new CustomEvent("vantage:analytics", { detail: event }));
    }
    if (collectionMode !== "local") track(event.name, event.properties);
  } catch { /* Telemetry cannot interrupt quote intake, including storage/SDK failures. */ }
}

function once(flag: string, callback: () => void) {
  try {
    if (window.sessionStorage.getItem(`${KEY}:${flag}`)) return;
    window.sessionStorage.setItem(`${KEY}:${flag}`, "1");
    callback();
  } catch { /* Storage unavailable: skip optional session-derived metrics. */ }
}

function engage() { once("engaged", () => emit("site_engaged")); }

export function trackEvent(eventName: string, properties: AnalyticsProperties = {}) {
  if (typeof window === "undefined") return;
  try {
    if (!sanitizeAnalyticsEvent(eventName, properties, window.location.pathname, collectionMode === "production")) return;
    if (leadIntentEvents.has(eventName)) {
      engage();
      once("intent", () => emit("site_lead_intent"));
    }
    // A phone click is intent only. Captures are emitted only by the confirmed API-success path.
    emit(eventName, properties);
  } catch { /* Best effort, never a prerequisite for submitting a quote. */ }
}

export function initializeBounceTracking() {
  if (typeof window === "undefined") return () => {};
  once("visit", () => emit("site_visit"));
  function onScroll() {
    const height = document.documentElement.scrollHeight - window.innerHeight;
    if (height > 0 && window.scrollY / height >= 0.5) engage();
  }
  function onPageHide() {
    try {
      if (!window.sessionStorage.getItem(`${KEY}:engaged`)) once("bounce", () => emit("site_bounce"));
    } catch { /* No bounce assertion when session state is unavailable. */ }
  }
  const timer = window.setTimeout(engage, 15_000);
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("pagehide", onPageHide);
  return () => {
    window.clearTimeout(timer);
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("pagehide", onPageHide);
  };
}

const viewedSections = new Set<string>();
export function trackSectionViewed(sectionId: string) {
  // Section labels are used in memory only and never sent to a collector.
  if (viewedSections.size < 3) viewedSections.add(sectionId);
  if (viewedSections.size >= 2) engage();
}

export function trackZipNotRecognized(properties: { field_name: "pickup" | "dest"; zip?: string; suggestion_count: number }) {
  trackEvent("zip_not_recognized", { field_name: properties.field_name });
}

export function legalEventForHref(href: string) {
  const path = href.split(/[?#]/)[0];
  if (path === "/privacy") return "privacy_policy_clicked";
  if (path === "/sms-terms") return "sms_terms_clicked";
  if (path === "/sms-privacy") return "sms_privacy_clicked";
  if (path === "/your-rights") return "moving_responsibilities_pdf_clicked";
  return null;
}
