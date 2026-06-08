import type { QuoteFormValues, QuoteResult } from "@/schemas/quote-form.schema";

/**
 * Placeholder pricing math ported from the prototype. NOT production pricing.
 * Replace with a real distance API (pickup -> dest) + rate table by size when
 * the CRM / vantage-main-server integration lands.
 */
const BASE_BY_SIZE: Record<string, number> = {
  Studio: 1200,
  "2 Bedrooms": 1850,
  "3 Bedrooms": 2650,
  "4 Bedrooms": 3200,
  "5+ Bedrooms": 3600,
  Office: 3100,
};

export function estimate(data: QuoteFormValues): QuoteResult {
  const seed =
    Number(data.pickup) * 7 + Number(data.dest) * 13 + String(data.size).length * 5;
  const base = BASE_BY_SIZE[data.size] ?? 2000;
  const miles = 380 + (seed % 9) * 110;
  const low = Math.round((base + miles * 1.6) / 50) * 50;
  const high = Math.round((low * 1.34) / 50) * 50;
  return { low, high, miles };
}
