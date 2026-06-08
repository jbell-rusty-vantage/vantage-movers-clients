import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { site } from "@/content/site";

export interface LogoProps {
  dark?: boolean;
}

export function Logo({ dark }: LogoProps) {
  return (
    <Link className={cn("logo", dark && "logo--dark")} href="/" aria-label={site.name}>
      <Image
        className="logo__img"
        src="/vantagelogo.svg"
        alt=""
        width={121}
        height={120}
        priority
      />
      <span className="logo__name">
        Vantage <span>Movers</span>
      </span>
    </Link>
  );
}
