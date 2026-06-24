import { site } from "@/content/site";
import { Icon } from "@/components/ui/Icon";

export function LicenseBar() {
  return (
    <div className="licensebar">
      <div className="wrap licensebar__in">
        <span>
          <Icon name="shield" width={14} height={14} /> Licensed Moving Broker
        </span>
        <span className="dot-sep">·</span>
        <span>{site.license.dot}</span>
        <span className="dot-sep">·</span>
        <span>{site.license.mc}</span>
      </div>
    </div>
  );
}
