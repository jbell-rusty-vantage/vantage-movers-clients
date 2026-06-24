import type { PromoConfig } from "@/types";
import { URGENCY_TEXT } from "./sections";

/**
 * Promo pop-up configuration. Baked from the prototype's locked-in Tweak
 * defaults. Override via env where useful so non-devs can tune without a
 * code change.
 */
export const promo: PromoConfig = {
  enabled: process.env.NEXT_PUBLIC_PROMO_ENABLED !== "false",
  amount: Number(process.env.NEXT_PUBLIC_PROMO_AMOUNT ?? 750),
  inactivitySec: Number(process.env.NEXT_PUBLIC_PROMO_INACTIVITY ?? 35),
  exitIntent: process.env.NEXT_PUBLIC_PROMO_EXIT_INTENT !== "false",
  urgencyText: URGENCY_TEXT,
};
