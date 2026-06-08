import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Icon } from "./Icon";

type Variant = "primary" | "gold" | "ghost";

interface CommonProps {
  variant?: Variant;
  size?: "lg";
  block?: boolean;
  /** Append a right-arrow that nudges on hover. */
  arrow?: boolean;
  children: ReactNode;
  className?: string;
}

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & { href?: undefined };

type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

function classes({ variant = "primary", size, block, className }: CommonProps) {
  return cn(
    "btn",
    variant === "gold" && "btn--gold",
    variant === "ghost" && "btn--ghost",
    size === "lg" && "btn--lg",
    block && "btn--block",
    className,
  );
}

export function Button(props: ButtonProps) {
  const { variant, size, block, arrow, children, className, ...rest } = props;
  const cls = classes({ variant, size, block, className, children });
  const inner = (
    <>
      {children}
      {arrow && <Icon name="arrowRight" width={17} height={17} />}
    </>
  );

  if ("href" in props && props.href !== undefined) {
    const { href, ...anchorRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement> & {
      href: string;
    };
    const isInternal = href.startsWith("/");
    if (isInternal) {
      return (
        <Link href={href} className={cls} {...anchorRest}>
          {inner}
        </Link>
      );
    }
    return (
      <a href={href} className={cls} {...anchorRest}>
        {inner}
      </a>
    );
  }

  return (
    <button className={cls} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {inner}
    </button>
  );
}
