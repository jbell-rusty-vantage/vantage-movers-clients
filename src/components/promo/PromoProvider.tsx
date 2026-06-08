"use client";

import { createContext, useContext, type ReactNode } from "react";
import { promo } from "@/content/promo";
import { usePromoTrigger } from "@/hooks/usePromoTrigger";
import { PromoModal } from "./PromoModal";

interface PromoContextValue {
  openPromo: () => void;
}

const PromoContext = createContext<PromoContextValue | null>(null);

/** Access the promo controls (e.g. to open the modal manually). */
export function usePromo() {
  const ctx = useContext(PromoContext);
  if (!ctx) throw new Error("usePromo must be used within <PromoProvider>");
  return ctx;
}

export function PromoProvider({ children }: { children: ReactNode }) {
  const [open, openNow, close] = usePromoTrigger({
    inactivitySec: promo.enabled ? promo.inactivitySec : 0,
    exitIntent: promo.enabled && promo.exitIntent,
  });

  return (
    <PromoContext.Provider value={{ openPromo: openNow }}>
      {children}
      {promo.enabled && (
        <PromoModal
          open={open}
          onClose={close}
          amount={promo.amount}
          urgencyText={promo.urgencyText}
        />
      )}
    </PromoContext.Provider>
  );
}
