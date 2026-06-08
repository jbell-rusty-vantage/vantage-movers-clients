import { Fragment } from "react";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";

const STEP_LABELS = ["Location", "Details", "Quote"];

export function StepIndicator({ step }: { step: number }) {
  return (
    <div className="qf__steps">
      {STEP_LABELS.map((label, i) => (
        <Fragment key={label}>
          <div
            className={cn("qf__step", i === step && "is-active", i < step && "is-done")}
          >
            <span className="qf__step-num">
              {i < step ? <Icon name="check" width={15} height={15} /> : i + 1}
            </span>
            <span className="qf__step-label">{label}</span>
          </div>
          {i < 2 && <span className={cn("qf__step-bar", i < step && "is-done")} />}
        </Fragment>
      ))}
    </div>
  );
}
