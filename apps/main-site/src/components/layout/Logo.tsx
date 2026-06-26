import Image from "next/image";
import Link from "next/link";
import { business } from "@/lib/content";

interface LogoProps {
  variant?: "header" | "footer";
}

export function Logo({ variant = "header" }: LogoProps) {
  const isFooter = variant === "footer";

  return (
    <Link href="/#top" className="flex items-center no-underline" aria-label={business.name}>
      <Image
        className={isFooter ? "h-[52px] w-auto" : "h-[36px] w-auto"}
        src="/vantage-movers-logo-refined-smaller-text.svg"
        alt=""
        width={301}
        height={86}
        priority
      />
    </Link>
  );
}
