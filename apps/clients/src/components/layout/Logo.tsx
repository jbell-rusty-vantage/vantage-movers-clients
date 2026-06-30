import Link from "next/link";
import { cn } from "@vantage/utils";
import { site } from "@/content/site";

export interface LogoProps {
  dark?: boolean;
}

export function Logo({ dark }: LogoProps) {
  return (
    <Link className={cn("logo", dark && "logo--dark")} href="/" aria-label={site.name}>
      {/* Native img keeps SVG paths/colors intact; Next/Image + clip-paths hid the road dashes. */}
      <img
        className="logo__img"
        src="/vantage-movers-logo-refined-smaller-text.svg"
        alt=""
        width={301}
        height={86}
      />
    </Link>
  );
}
