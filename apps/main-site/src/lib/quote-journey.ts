import { z } from "zod";
import { MOVE_SIZES } from "@/schemas/quote-form.schema";

export type QuoteLocale = "en" | "es";
export const QUOTE_DRAFT_KEY = "vantage.main-site.quote.v1";
export const QUOTE_DRAFT_TTL = 60 * 60 * 1000;

const destinationSchema = z.object({
  postalCode: z.string().regex(/^\d{5}$/),
  city: z.string().max(120),
  state: z.string().regex(/^[A-Z]{2}$/),
  country: z.literal("US"),
});
export type ConfirmedDestination = z.infer<typeof destinationSchema>;
const draftSchema = z.object({
  version: z.literal(1),
  savedAt: z.number(),
  step: z.union([z.literal(0), z.literal(1)]),
  internalRefNo: z.string().regex(/^MS-[\w-]{1,100}$/),
  inboundRefNo: z.string().max(24),
  lid: z.string().regex(/^LID[a-f0-9]{13}$/),
  started: z.boolean(),
  completedSteps: z.array(z.number().int().min(0).max(1)).max(2),
  values: z.object({
    pickup: z.string().regex(/^\d{0,5}$/),
    dest: z.string().regex(/^\d{0,5}$/),
    date: z.string().max(10),
    size: z.union([z.enum(MOVE_SIZES), z.literal("")]),
    name: z.string().max(200),
    email: z.string().max(320),
    phone: z.string().max(50),
    smsConsent: z.boolean(),
  }),
  destination: destinationSchema.nullable(),
});
export type QuoteDraft = z.infer<typeof draftSchema>;

export function parseQuoteDraft(raw: string | null, now = Date.now()): QuoteDraft | null {
  if (!raw || raw.length > 8000) return null;
  try {
    const result = draftSchema.safeParse(JSON.parse(raw));
    if (!result.success || result.data.savedAt > now || now - result.data.savedAt > QUOTE_DRAFT_TTL) return null;
    const draft = result.data;
    if (draft.destination?.postalCode !== draft.values.dest) draft.destination = null;
    return draft;
  } catch { return null; }
}

export function destinationGuide(destination: ConfirmedDestination | null): "madison" | "wisconsin" | "generic" {
  if (destination?.country !== "US" || destination.state !== "WI") return "generic";
  return destination.city.toLocaleLowerCase("en-US").trim() === "madison" ? "madison" : "wisconsin";
}

export function parseDestination(value: unknown): ConfirmedDestination | null {
  const result = destinationSchema.safeParse(value);
  return result.success ? result.data : null;
}

export function isCapturedResponse(value: unknown): value is { leadCaptured: true } {
  return typeof value === "object" && value !== null && "leadCaptured" in value && value.leadCaptured === true;
}
