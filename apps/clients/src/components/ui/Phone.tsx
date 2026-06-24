"use client";

import { cn } from "@vantage/utils";
import { telHref } from "@/lib/format";
import { trackEvent } from "@/lib/analytics";
import { site } from "@/content/site";
import { Icon } from "./Icon";

export interface PhoneProps {
  num?: string;
  label?: string;
  dark?: boolean;
  sm?: boolean;
  className?: string;
  analyticsLocation?: string;
}

export function Phone({
  num = site.phone,
  label,
  dark,
  sm,
  className,
  analyticsLocation = "site_phone",
}: PhoneProps) {
  return (
    <a
      href={telHref(num)}
      className={cn("phone", dark && "on-dark", sm && "phone--sm", className)}
      aria-label={`Call ${num}`}
      onClick={() => trackEvent("phone_clicked", { link_location: analyticsLocation })}
    >
      <span className="phone__icon">
        <Icon name="phone" />
      </span>
      <span className="phone__text">
        {label && <span className="phone__label">{label}</span>}
        <span className="phone__num">{num}</span>
      </span>
    </a>
  );
}
