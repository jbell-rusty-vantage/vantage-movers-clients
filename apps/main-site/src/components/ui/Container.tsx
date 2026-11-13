import { CmsText } from "@/components/cms/Content";
import type { ReactNode } from "react";
import { cn } from "@vantage/utils";

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[1200px] px-7", className)}>
      <CmsText scope="components/ui/Container.tsx">{children}</CmsText>
    </div>
  );
}
