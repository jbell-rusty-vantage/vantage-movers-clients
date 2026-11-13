import { CmsImage as Image } from "@/components/cms/Content";
import { CmsLink as Link } from "@/components/cms/Content";
import { business } from "@/lib/content";

interface LogoProps {
  variant?: "header" | "footer";
  href?: string;
}

export function Logo({ variant = "header", href = "/#top" }: LogoProps) {
  const isFooter = variant === "footer";

  return (
    <Link scope="components/layout/Logo.tsx" href={href} className="flex items-center no-underline" aria-label={business.name}>
      <Image scope="components/layout/Logo.tsx"
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
