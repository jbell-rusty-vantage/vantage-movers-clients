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
      <img className="logo__img" src="/vantagelogo.svg" alt="" width={128} height={128} />
    </Link>
  );
}
