import type { CSSProperties, ReactNode, SVGProps } from "react";

export type IconName =
  | "phone"
  | "star"
  | "arrowUp"
  | "arrowRight"
  | "check"
  | "truck"
  | "box"
  | "office"
  | "shield"
  | "pin"
  | "headset"
  | "car"
  | "users"
  | "clock"
  | "mail"
  | "quote";

export type SceneName =
  | "hero"
  | "longdist"
  | "storage"
  | "office"
  | "military"
  | "promo"
  | "expertise"
  | "auto"
  | "support"
  | "finalcta";

export type HeroVariant = "split" | "centered";
export type Emphasis = "blue" | "gold";
export type FontPair = "premium" | "geometric" | "bold";

export interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
}

export interface ButtonProps {
  children: ReactNode;
  variant?: "gold" | "ghost";
  size?: "lg";
  block?: boolean;
  arrow?: boolean;
  className?: string;
  disabled?: boolean;
  href?: string;
  onClick?: () => void;
  style?: CSSProperties;
  type?: "button" | "submit" | "reset";
}

export interface PhoneProps {
  num?: string;
  label?: string;
  dark?: boolean;
  sm?: boolean;
}

