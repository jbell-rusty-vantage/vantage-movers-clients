import type { ComponentType } from "react";
import {
  Archive,
  Briefcase,
  Building2,
  Car,
  DollarSign,
  FileText,
  Globe,
  Headphones,
  Home,
  Package,
  Route,
  Shield,
  Truck,
  UserCheck,
} from "lucide-react";
import type { IconKey } from "@/lib/content";

type IconSize = { size?: number; className?: string; strokeWidth?: number };

export const SERVICE_ICONS: Record<
  IconKey,
  ComponentType<{ size?: number; className?: string; strokeWidth?: number }>
> = {
  truck: Truck,
  globe: Globe,
  route: Route,
  home: Home,
  office: Building2,
  shield: Shield,
  box: Package,
  archive: Archive,
  car: Car,
};

export const WHY_ICONS: Record<
  string,
  ComponentType<IconSize>
> = {
  shield: Shield,
  "dollar-sign": DollarSign,
  globe: Globe,
  headphones: Headphones,
  briefcase: Briefcase,
};

export const HOW_ICONS: Record<string, ComponentType<IconSize>> = {
  file: FileText,
  "user-check": UserCheck,
  truck: Truck,
};

export function ServiceIcon({
  icon,
  size = 26,
  className,
}: {
  icon: IconKey;
  size?: number;
  className?: string;
}) {
  const Icon = SERVICE_ICONS[icon];
  return <Icon size={size} className={className} aria-hidden />;
}
