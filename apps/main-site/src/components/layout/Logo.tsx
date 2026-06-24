import Link from "next/link";
import { business } from "@/lib/content";

interface LogoProps {
  variant?: "header" | "footer";
}

export function Logo({ variant = "header" }: LogoProps) {
  const isFooter = variant === "footer";

  return (
    <Link href="#top" className="flex items-center gap-3 no-underline" aria-label={business.name}>
      <span
        className={
          "grid size-[42px] place-items-center rounded-[10px] shadow-[0_6px_16px_rgba(2,71,153,.22)] " +
          (isFooter ? "bg-white" : "bg-brand-blue")
        }
      >
        <span className="size-[17px] rotate-45 rounded-[3px] bg-brand-yellow" />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={
            "font-display text-[21px] font-black -tracking-[.02em] " +
            (isFooter ? "text-white" : "text-brand-blue")
          }
        >
          VANTAGE
        </span>
        <span
          className={
            "mt-[3px] font-display text-[10.5px] font-bold tracking-[.28em] " +
            (isFooter ? "text-on-dark-600" : "text-[#64748B]")
          }
        >
          {business.tagline}
        </span>
      </span>
    </Link>
  );
}
