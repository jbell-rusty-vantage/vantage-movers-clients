import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Building2,
  Car,
  Check,
  ChevronRight,
  Clock,
  Headset,
  Info,
  Mail,
  MapPin,
  Package,
  Phone,
  Quote,
  ShieldCheck,
  Star,
  Truck,
  Users,
  X,
  type LucideProps,
} from "lucide-react";
import type { ComponentType } from "react";
import type { IconName } from "@/types";

const ICONS: Record<IconName, ComponentType<LucideProps>> = {
  phone: Phone,
  star: Star,
  arrowUp: ArrowUp,
  arrowRight: ArrowRight,
  arrowLeft: ArrowLeft,
  check: Check,
  truck: Truck,
  box: Package,
  office: Building2,
  shield: ShieldCheck,
  pin: MapPin,
  headset: Headset,
  car: Car,
  users: Users,
  clock: Clock,
  mail: Mail,
  quote: Quote,
  info: Info,
  chevronRight: ChevronRight,
  close: X,
};

export interface IconProps extends LucideProps {
  name: IconName;
}

export function Icon({ name, ...props }: IconProps) {
  const Cmp = ICONS[name];
  return <Cmp aria-hidden focusable={false} {...props} />;
}
