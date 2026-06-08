"use client";

import { useEffect, useRef } from "react";
import { telHref } from "@/lib/format";
import { site } from "@/content/site";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { Icon } from "@/components/ui/Icon";

export interface PromoModalProps {
  open: boolean;
  onClose: () => void;
  amount: number;
  phone?: string;
  urgencyText: string;
}

export function PromoModal({
  open,
  onClose,
  amount,
  phone = site.phone,
  urgencyText,
}: PromoModalProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useLockBodyScroll(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const frame = requestAnimationFrame(() => cardRef.current?.focus());
    return () => {
      document.removeEventListener("keydown", onKey);
      cancelAnimationFrame(frame);
    };
  }, [open, onClose]);

  if (!open) return null;

  const goToQuote = () => {
    onClose();
    const q = document.getElementById("quote");
    if (q) requestAnimationFrame(() => q.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  return (
    <div
      className="pm-backdrop is-open"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pm-title"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="pm-card" ref={cardRef} tabIndex={-1}>
        <button className="pm-close" onClick={onClose} aria-label="Close offer">
          <Icon name="close" />
        </button>

        <div className="pm-head">
          <p className="pm-eyebrow">Limited-time offer</p>
          <div className="pm-amount">
            <span className="pm-amount__cur">$</span>
            <span className="pm-amount__val">{amount}</span>
            <span className="pm-amount__off">OFF</span>
          </div>
          <p className="pm-cap">YOUR MOVING ESTIMATE WHEN YOU CALL TODAY</p>
        </div>

        <div className="pm-body">
          <h2 id="pm-title">Wait — don&apos;t move without your discount</h2>
          <p>
            Call now and mention this offer to take <b>${amount} off</b> your move. A moving
            specialist will give you a free, no-obligation estimate in minutes.
          </p>

          <a className="pm-call" href={telHref(phone)} aria-label={`Call ${phone}`}>
            <span className="pm-call__ico">
              <Icon name="phone" fill="currentColor" stroke="none" />
            </span>
            <span className="pm-call__text">
              <span className="pm-call__label">Call now to claim</span>
              <span className="pm-call__num">{phone}</span>
            </span>
          </a>

          <div>
            <button className="pm-alt" onClick={goToQuote}>
              Or get my free quote online
            </button>
          </div>

          <span className="pm-urgency">
            <span className="pm-urgency__dot" />
            {urgencyText}
          </span>

          <p className="pm-fine">
            Discount applied to your moving estimate. Available to new customers only. Mention this
            offer when you call.
          </p>
        </div>
      </div>
    </div>
  );
}
