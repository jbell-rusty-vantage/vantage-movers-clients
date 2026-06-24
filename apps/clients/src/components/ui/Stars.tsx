import { Icon } from "./Icon";

export interface StarsProps {
  value?: number;
  size?: number;
  className?: string;
}

export function Stars({ value = 5, size = 20, className }: StarsProps) {
  return (
    <span className={`stars${className ? ` ${className}` : ""}`} aria-label={`${value} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Icon key={i} name="star" width={size} height={size} fill="currentColor" stroke="none" />
      ))}
    </span>
  );
}
