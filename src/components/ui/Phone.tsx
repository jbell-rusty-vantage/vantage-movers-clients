import { cn } from "@/lib/utils";
import { telHref } from "@/lib/format";
import { site } from "@/content/site";
import { Icon } from "./Icon";

export interface PhoneProps {
  num?: string;
  label?: string;
  dark?: boolean;
  sm?: boolean;
  className?: string;
}

export function Phone({ num = site.phone, label, dark, sm, className }: PhoneProps) {
  return (
    <a
      href={telHref(num)}
      className={cn("phone", dark && "on-dark", sm && "phone--sm", className)}
      aria-label={`Call ${num}`}
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
