import { z } from "zod";

export const MOVE_SIZES = [
  "Studio",
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
  pickup: z.string().trim().regex(ZIP_RE, "Enter a 5-digit ZIP"),
  dest: z.string().trim().regex(ZIP_RE, "Enter a 5-digit ZIP"),
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
  smsConsent: z.boolean().optional().default(true),
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
  smsConsent: true,
};

export const STEP_FIELDS: Record<number, (keyof QuoteFormInput)[]> = {
  0: ["pickup", "dest", "date", "size"],
  1: ["name", "phone", "email"],
};

export interface QuoteResult {
  low: number;
  high: number;
  leadCaptured?: boolean;
}
