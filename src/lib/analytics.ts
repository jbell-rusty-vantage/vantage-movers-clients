"use client";

import { track } from "@vercel/analytics";

const FORM_NAME = "moving_quote";
const FORM_VERSION = "2026-06";
const BOUNCE_SESSION_KEY = "vantage_bounce_session";
const BOUNCE_STARTED_AT_KEY = "vantage_bounce_started_at";
const BOUNCE_LANDING_PATH_KEY = "vantage_bounce_landing_path";
const BOUNCE_CONVERTED_KEY = "vantage_bounce_converted";
const BOUNCE_REPORTED_KEY = "vantage_bounce_reported";
const CONVERSION_EVENTS = new Set(["phone_clicked", "form_submit_success"]);

type AnalyticsValue = string | number | boolean | null;
type AnalyticsProperties = Record<string, AnalyticsValue>;

export const quoteFormAnalytics = {
  form_name: FORM_NAME,
  form_version: FORM_VERSION,
} as const;

function getSessionStorage() {
  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
}

function createSessionId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function getOrCreateBounceSession() {
  if (typeof window === "undefined") return null;

  const storage = getSessionStorage();
  const existingSessionId = storage?.getItem(BOUNCE_SESSION_KEY);
  if (existingSessionId) return existingSessionId;

  const sessionId = createSessionId();
  storage?.setItem(BOUNCE_SESSION_KEY, sessionId);
  return sessionId;
}

function markBounceConverted() {
  if (typeof window === "undefined") return;
  getSessionStorage()?.setItem(BOUNCE_CONVERTED_KEY, "true");
}

function bounceBaseProperties(): AnalyticsProperties {
  const storage = getSessionStorage();
  const startedAt = Number(storage?.getItem(BOUNCE_STARTED_AT_KEY) || Date.now());

  return {
    session_id: getOrCreateBounceSession() || "unknown",
    landing_path: storage?.getItem(BOUNCE_LANDING_PATH_KEY) || window.location.pathname,
    current_path: window.location.pathname,
    seconds_on_site: Math.max(0, Math.round((Date.now() - startedAt) / 1000)),
  };
}

export function trackEvent(eventName: string, properties: AnalyticsProperties = {}) {
  if (typeof window === "undefined") return;
  if (CONVERSION_EVENTS.has(eventName)) markBounceConverted();
  track(eventName, properties);
}

export function initializeBounceTracking() {
  if (typeof window === "undefined") return () => {};

  const storage = getSessionStorage();
  const sessionId = getOrCreateBounceSession();

  if (storage && !storage.getItem(BOUNCE_STARTED_AT_KEY)) {
    storage.setItem(BOUNCE_STARTED_AT_KEY, String(Date.now()));
    storage.setItem(BOUNCE_LANDING_PATH_KEY, window.location.pathname);
    trackEvent("site_visit", {
      ...bounceBaseProperties(),
      session_id: sessionId || "unknown",
      seconds_on_site: 0,
    });
  }

  function reportBounce(reason: string) {
    if (!storage) return;
    if (storage.getItem(BOUNCE_CONVERTED_KEY) === "true") return;
    if (storage.getItem(BOUNCE_REPORTED_KEY) === "true") return;

    storage.setItem(BOUNCE_REPORTED_KEY, "true");
    trackEvent("site_bounce", {
      ...bounceBaseProperties(),
      exit_reason: reason,
    });
  }

  function handlePageHide() {
    reportBounce("pagehide");
  }

  function handleBeforeUnload() {
    reportBounce("beforeunload");
  }

  window.addEventListener("pagehide", handlePageHide);
  window.addEventListener("beforeunload", handleBeforeUnload);

  return () => {
    window.removeEventListener("pagehide", handlePageHide);
    window.removeEventListener("beforeunload", handleBeforeUnload);
  };
}

export function trackZipNotRecognized(properties: {
  field_name: "pickup" | "dest";
  zip: string;
  suggestion_count: number;
}) {
  trackEvent("zip_not_recognized", {
    ...quoteFormAnalytics,
    ...properties,
  });
}

export function legalEventForHref(href: string) {
  if (href.startsWith("/privacy")) return "privacy_policy_clicked";
  if (href.startsWith("/sms-terms")) return "sms_terms_clicked";
  if (href.startsWith("/sms-privacy")) return "sms_privacy_clicked";
  if (href.startsWith("/your-rights")) return "moving_responsibilities_pdf_clicked";
  return null;
}
