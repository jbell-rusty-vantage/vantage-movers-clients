import { Star } from "lucide-react";
import { cn } from "@vantage/utils";

interface StarsProps {
  count?: number;
  value?: number;
  size?: number;
  className?: string;
}

export function Stars({ count = 5, value = 5, size = 20, className }: StarsProps) {
  return (
    <div
      className={cn("flex gap-0.5", className)}
      aria-label={`${value} out of 5 stars`}
    >
      {Array.from({ length: count }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className="fill-brand-yellow text-brand-yellow"
          strokeWidth={0}
        />
      ))}
    </div>
  );
}
