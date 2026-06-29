"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import { promo } from "@/content/promo";
import { resolvePartner } from "@/content/partners";
import { usePromoTrigger } from "@/hooks/usePromoTrigger";
import { PromoModal } from "./PromoModal";

interface PromoContextValue {
  openPromo: () => void;
  setPromoSuppressed: (suppressed: boolean) => void;
}

const PromoContext = createContext<PromoContextValue | null>(null);

/** Access the promo controls (e.g. to open the modal manually). */
export function usePromo() {
  const ctx = useContext(PromoContext);
  if (!ctx) throw new Error("usePromo must be used within <PromoProvider>");
  return ctx;
}

export function PromoProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const phoneNumber = resolvePartner(pathname).phone;
  const previousPathname = useRef(pathname);
  const promoSuppressedRef = useRef(false);
  const [promoSuppressed, setPromoSuppressed] = useState(false);
  const shouldSuppressPromo = useCallback(() => promoSuppressedRef.current, []);
  const updatePromoSuppressed = useCallback((suppressed: boolean) => {
    promoSuppressedRef.current = suppressed;
    setPromoSuppressed(suppressed);
  }, []);
  const [open, openNow, close] = usePromoTrigger({
    inactivitySec: promo.enabled ? promo.inactivitySec : 0,
    exitIntent: promo.enabled && promo.exitIntent,
    shouldSuppress: shouldSuppressPromo,
  });
  const contextValue = useMemo(
    () => ({ openPromo: openNow, setPromoSuppressed: updatePromoSuppressed }),
    [openNow, updatePromoSuppressed],
  );

  useEffect(() => {
    if (promoSuppressed && open) close();
  }, [close, open, promoSuppressed]);

  useEffect(() => {
    if (previousPathname.current !== pathname) {
      previousPathname.current = pathname;
      if (open) close();
    }
  }, [close, open, pathname]);

  return (
    <PromoContext.Provider value={contextValue}>
      {children}
      {promo.enabled && (
        <PromoModal
          open={open}
          onClose={close}
          amount={promo.amount}
          urgencyText={promo.urgencyText}
          phone={phoneNumber}
        />
      )}
    </PromoContext.Provider>
  );
}
