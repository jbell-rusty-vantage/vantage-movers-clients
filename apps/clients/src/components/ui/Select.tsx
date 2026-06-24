import { forwardRef, type SelectHTMLAttributes } from "react";
import { cn } from "@vantage/utils";

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

/** Native select themed by the `.qf` scope; integrates directly with RHF. */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { className, children, ...props },
  ref,
) {
  return (
    <select ref={ref} className={cn(className)} {...props}>
      {children}
    </select>
  );
});
