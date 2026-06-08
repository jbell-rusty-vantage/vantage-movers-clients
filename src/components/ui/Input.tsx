import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

/**
 * Native input themed by the `.qf` scope. Native is intentional: it keeps the
 * approved focus-ring / fill styling and works directly with RHF `register`.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, ...props },
  ref,
) {
  return <input ref={ref} className={cn(className)} {...props} />;
});
