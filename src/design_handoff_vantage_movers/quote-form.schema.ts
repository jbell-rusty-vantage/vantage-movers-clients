import { z } from "zod";

export const MOVE_SIZES = [
  "Studio / 1 Bed",
  "2 Bedroom",
  "3 Bedroom",
  "4+ Bedroom",
  "Office",
] as const;

export const quoteFormSchema = z.object({
  pickup: z.string().trim().min(2, "Enter a city or ZIP"),
  dest: z.string().trim().min(2, "Enter a city or ZIP"),
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
  email: z.string().trim().email("Enter a valid email"),
});

export const quoteLocationSchema = quoteFormSchema.pick({
  pickup: true,
  dest: true,
});

export const quoteDetailsSchema = quoteFormSchema.pick({
  date: true,
  size: true,
  name: true,
  email: true,
});

export type QuoteFormValues = z.infer<typeof quoteFormSchema>;
export type MoveSize = (typeof MOVE_SIZES)[number];

export interface QuoteResult {
  low: number;
  high: number;
  miles: number;
}

export const emptyQuote: QuoteFormValues = {
  pickup: "",
  dest: "",
  date: "",
  size: "Studio / 1 Bed",
  name: "",
  email: "",
};

