import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/Skeleton";

export function QuoteFormSkeleton({ compact }: { compact?: boolean }) {
  return (
    <div className={cn("qf", compact && "qf--compact")} aria-busy aria-label="Loading quote form">
      <div className="qf__head">
        <Skeleton h={26} w="55%" />
        <Skeleton h={14} w="80%" style={{ marginTop: 8 }} />
      </div>
      <div className="qf__steps" style={{ gap: 8 }}>
        <Skeleton h={32} w={32} style={{ borderRadius: "50%" }} />
        <Skeleton h={2} style={{ flex: 1, margin: "0 6px 22px" }} />
        <Skeleton h={32} w={32} style={{ borderRadius: "50%" }} />
        <Skeleton h={2} style={{ flex: 1, margin: "0 6px 22px" }} />
        <Skeleton h={32} w={32} style={{ borderRadius: "50%" }} />
      </div>
      <div className="qf__body">
        <div className="qf__skeleton">
          <Skeleton h={14} w="40%" />
          <Skeleton h={48} />
          <Skeleton h={14} w="40%" style={{ marginTop: 4 }} />
          <Skeleton h={48} />
        </div>
      </div>
      <div className="qf__foot">
        <Skeleton h={52} />
      </div>
    </div>
  );
}
