"use client";

import { track } from "@vercel/analytics";

const FORM_NAME = "moving_quote";
const FORM_VERSION = "2026-06";

type AnalyticsValue = string | number | boolean | null;
type AnalyticsProperties = Record<string, AnalyticsValue>;

export const quoteFormAnalytics = {
  form_name: FORM_NAME,
  form_version: FORM_VERSION,
} as const;

export function trackEvent(eventName: string, properties: AnalyticsProperties = {}) {
  if (typeof window === "undefined") return;
  track(eventName, properties);
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
