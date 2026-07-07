"use client";

import { track } from "@vercel/analytics";

const FORM_NAME = "main_site_quote";
const FORM_VERSION = "2026-07";
const SESSION_KEY = "vantage_main_site_bounce_session";
const SESSION_STARTED_AT_KEY = "vantage_main_site_bounce_started_at";
const SESSION_LANDING_PATH_KEY = "vantage_main_site_bounce_landing_path";
const SESSION_CONVERTED_KEY = "vantage_main_site_bounce_converted";
const SESSION_ENGAGED_KEY = "vantage_main_site_session_engaged";
const SESSION_LEAD_INTENT_KEY = "vantage_main_site_lead_intent";
const SESSION_VIEWED_SECTIONS_KEY = "vantage_main_site_viewed_sections";
const BOUNCE_REPORTED_KEY = "vantage_main_site_bounce_reported";
const ENGAGEMENT_SECONDS = 15;
const ENGAGEMENT_SCROLL_PERCENT = 50;
const ENGAGEMENT_SECTION_COUNT = 2;
const CONVERSION_EVENTS = new Set(["phone_clicked", "form_submit_success"]);
const LEAD_INTENT_EVENTS = new Set([
  "calendar_or_date_picker_opened",
  "cta_clicked",
  "email_clicked",
  "form_started",
  "form_step_completed",
  "form_submit_attempted",
  "form_submit_success",
  "form_validation_error",
  "phone_clicked",
  "quote_estimate_viewed",
]);
const ENGAGEMENT_EVENTS = new Set([
  ...LEAD_INTENT_EVENTS,
  "moving_responsibilities_pdf_clicked",
  "nav_link_clicked",
  "privacy_policy_clicked",
  "sms_privacy_clicked",
  "sms_terms_clicked",
  "zip_lookup_failed",
  "zip_not_recognized",
]);

type AnalyticsValue = string | number | boolean | null;
export type AnalyticsProperties = Record<string, AnalyticsValue>;

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
  const existingSessionId = storage?.getItem(SESSION_KEY);
  if (existingSessionId) return existingSessionId;

  const sessionId = createSessionId();
  storage?.setItem(SESSION_KEY, sessionId);
  return sessionId;
}

function sessionBaseProperties(): AnalyticsProperties {
  const storage = getSessionStorage();
  const startedAt = Number(storage?.getItem(SESSION_STARTED_AT_KEY) || Date.now());

  return {
    session_id: getOrCreateBounceSession() || "unknown",
    landing_path: storage?.getItem(SESSION_LANDING_PATH_KEY) || window.location.pathname,
    current_path: window.location.pathname,
    seconds_on_site: Math.max(0, Math.round((Date.now() - startedAt) / 1000)),
  };
}

function markSessionEngaged(reason: string, properties: AnalyticsProperties = {}) {
  if (typeof window === "undefined") return;
  const storage = getSessionStorage();
  if (!storage) return;
  if (storage.getItem(SESSION_ENGAGED_KEY) === "true") return;

  storage.setItem(SESSION_ENGAGED_KEY, "true");
  track("site_engaged", {
    ...sessionBaseProperties(),
    ...properties,
    engagement_reason: reason,
  });
}

function markLeadIntent(eventName: string) {
  if (typeof window === "undefined") return;
  const storage = getSessionStorage();
  if (!storage) return;

  markSessionEngaged(eventName, { engagement_event: eventName });

  if (storage.getItem(SESSION_LEAD_INTENT_KEY) === "true") return;
  storage.setItem(SESSION_LEAD_INTENT_KEY, "true");
  track("site_lead_intent", {
    ...sessionBaseProperties(),
    intent_event: eventName,
  });
}

function markSessionConverted(eventName: string) {
  if (typeof window === "undefined") return;
  const storage = getSessionStorage();
  if (!storage) return;

  storage.setItem(SESSION_CONVERTED_KEY, "true");
  markLeadIntent(eventName);
}

export function trackEvent(eventName: string, properties: AnalyticsProperties = {}) {
  if (typeof window === "undefined") return;
  if (CONVERSION_EVENTS.has(eventName)) {
    markSessionConverted(eventName);
  } else if (LEAD_INTENT_EVENTS.has(eventName)) {
    markLeadIntent(eventName);
  } else if (ENGAGEMENT_EVENTS.has(eventName)) {
    markSessionEngaged(eventName, { engagement_event: eventName });
  }
  track(eventName, properties);
}

export function initializeBounceTracking() {
  if (typeof window === "undefined") return () => {};

  const storage = getSessionStorage();
  const sessionId = getOrCreateBounceSession();

  if (storage && !storage.getItem(SESSION_STARTED_AT_KEY)) {
    storage.setItem(SESSION_STARTED_AT_KEY, String(Date.now()));
    storage.setItem(SESSION_LANDING_PATH_KEY, window.location.pathname);
    trackEvent("site_visit", {
      ...sessionBaseProperties(),
      session_id: sessionId || "unknown",
      seconds_on_site: 0,
    });
  }

  function reportBounce(reason: string) {
    if (!storage) return;
    if (storage.getItem(SESSION_ENGAGED_KEY) === "true") return;
    if (storage.getItem(BOUNCE_REPORTED_KEY) === "true") return;

    storage.setItem(BOUNCE_REPORTED_KEY, "true");
    track("site_bounce", {
      ...sessionBaseProperties(),
      exit_reason: reason,
    });
  }

  function handleScroll() {
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (documentHeight <= 0) return;

    const scrollPercent = Math.round((window.scrollY / documentHeight) * 100);
    if (scrollPercent < ENGAGEMENT_SCROLL_PERCENT) return;

    markSessionEngaged("scroll_depth", { scroll_percent: scrollPercent });
    window.removeEventListener("scroll", handleScroll);
  }

  function handlePageHide() {
    reportBounce("pagehide");
  }

  function handleBeforeUnload() {
    reportBounce("beforeunload");
  }

  const activeTimeTimer = window.setTimeout(() => {
    markSessionEngaged("active_time", { engagement_seconds: ENGAGEMENT_SECONDS });
  }, ENGAGEMENT_SECONDS * 1000);

  window.addEventListener("scroll", handleScroll, { passive: true });
  window.addEventListener("pagehide", handlePageHide);
  window.addEventListener("beforeunload", handleBeforeUnload);

  return () => {
    window.clearTimeout(activeTimeTimer);
    window.removeEventListener("scroll", handleScroll);
    window.removeEventListener("pagehide", handlePageHide);
    window.removeEventListener("beforeunload", handleBeforeUnload);
  };
}

export function trackSectionViewed(sectionId: string) {
  if (typeof window === "undefined") return;
  const storage = getSessionStorage();
  if (!storage) return;

  const viewedSections = new Set(
    (storage.getItem(SESSION_VIEWED_SECTIONS_KEY) || "")
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean),
  );

  if (viewedSections.has(sectionId)) return;
  viewedSections.add(sectionId);
  storage.setItem(SESSION_VIEWED_SECTIONS_KEY, Array.from(viewedSections).join(","));

  if (viewedSections.size >= ENGAGEMENT_SECTION_COUNT) {
    markSessionEngaged("section_depth", {
      sections_viewed: viewedSections.size,
      section_id: sectionId,
    });
  }
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
