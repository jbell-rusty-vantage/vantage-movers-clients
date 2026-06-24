import type { ReactNode } from "react";
import { Check } from "lucide-react";

export function CheckListItem({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-[11px] text-[15.5px] text-ink-soft">
      <span className="grid size-6 flex-none place-items-center rounded-full bg-brand-yellow-soft">
        <Check className="size-3 text-brand-blue-bright" strokeWidth={3} aria-hidden />
      </span>
      {children}
    </div>
  );
}
