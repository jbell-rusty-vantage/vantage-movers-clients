/**
 * Vantage Movers - Quote form schema & lead contract.
 * Stack: React Hook Form + @hookform/resolvers/zod (Zod 4).
 *
 * The validated `QuoteFormValues` is the lead payload that will later be
 * forwarded to vantage-main-server / the CRM (see app/api/quote/route.ts).
 */
import { z } from "zod";

/**
 * Move sizes mirror the vantage-main-server `MOVE_SIZES` enum exactly so the
 * captured value is accepted by the create-form-lead schema without mapping.
 */
export const MOVE_SIZES = [
  "Studio",
  "1 Bedroom",
  "2 Bedrooms",
  "3 Bedrooms",
  "4 Bedrooms",
  "5+ Bedrooms",
  "Office",
] as const;

export type MoveSize = (typeof MOVE_SIZES)[number];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ZIP_RE = /^\d{5}$/;

export const quoteFormSchema = z.object({
  // --- Step 1: Location --- (5-digit ZIPs => pickup_zip / destination_zip)
  pickup: z.string().trim().regex(ZIP_RE, "Enter a 5-digit ZIP"),
  dest: z.string().trim().regex(ZIP_RE, "Enter a 5-digit ZIP"),

  // --- Step 2: Details ---
  date: z
    .string()
    .min(1, "Pick a move date")
    .refine((d) => {
      const picked = new Date(`${d}T00:00:00`);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return picked >= today;
    }, "Move date can't be in the past"),
  size: z.enum(MOVE_SIZES, { error: "Select a move size" }),
  name: z.string().trim().min(1, "Tell us your name"),
  phone: z
    .string()
    .trim()
    .refine((v) => v.replace(/\D/g, "").length >= 10, "Enter a valid phone number"),
  email: z.string().trim().regex(EMAIL_RE, "Enter a valid email"),
  smsConsent: z.boolean().optional().default(false),
});

export type QuoteFormInput = z.input<typeof quoteFormSchema>;
export type QuoteFormValues = z.output<typeof quoteFormSchema>;

export const emptyQuote: QuoteFormValues = {
  pickup: "",
  dest: "",
  date: "",
  size: "" as QuoteFormValues["size"],
  name: "",
  phone: "",
  email: "",
  smsConsent: false,
};

/** Per-step field groups for `form.trigger(...)` before advancing. */
export const STEP_FIELDS: Record<number, (keyof QuoteFormInput)[]> = {
  0: ["pickup", "dest"],
  1: ["date", "size", "name", "phone", "email"],
};

export interface QuoteResult {
  low: number; // USD, rounded to nearest 50
  high: number; // USD, ~1.34 x low
  miles: number; // estimated route distance
  leadCaptured?: boolean; // true when the backend accepted the lead
}
