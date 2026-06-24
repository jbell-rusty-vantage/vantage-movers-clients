"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@vantage/utils";
import { resolvePartner } from "@/content/partners";
import { useStickyHeader } from "@/hooks/useStickyHeader";
import { Phone } from "@/components/ui/Phone";
import { Logo } from "./Logo";

export function Header() {
  const stuck = useStickyHeader();
  const pathname = usePathname();
  const partner = resolvePartner(pathname);

  return (
    <header className={cn("header", stuck && "is-stuck")}>
      <div className="wrap header__in">
        <div className="header__left">
          <Logo />
          {partner.logo ? (
            <span className="header__partner" title={`In partnership with ${partner.name}`}>
              <Image
                className="header__partner-img"
                src={partner.logo}
                alt={partner.alt ?? partner.name}
                width={partner.logoWidth ?? 130}
                height={partner.logoHeight ?? 40}
              />
            </span>
          ) : null}
        </div>
        <Phone label="Call for a free quote" analyticsLocation="header" />
      </div>
    </header>
  );
}
