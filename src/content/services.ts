import type { Service } from "@/types";
import { SITE_IMAGES } from "@/content/images";

export const servicesIntro = {
  eyebrow: "What we do",
  title: "Long Distance Moving, Coordinated",
  body: "From quote requests to carrier coordination, we help customers plan interstate moves with practical support and clear next steps.",
};

export const services: Service[] = [
  {
    scene: "longdist",
    icon: "box",
    title: "Long Distance Moves",
    body: "Planning a move across the country or to another state? Request a customized estimate and coordination support for your interstate relocation.",
    image: SITE_IMAGES.longDistanceMoves,
  },
  {
    scene: "storage",
    icon: "box",
    title: "Packing & Storage",
    body: "Ask about packing and storage options that can be arranged through authorized service providers for your route and move size.",
    image: SITE_IMAGES.packingStorage,
  },
  {
    scene: "office",
    icon: "office",
    title: "Office Moves",
    body: "Relocating an office? We can help gather move details and coordinate available carrier options for business relocations.",
    image: SITE_IMAGES.officeMoves,
  },
  {
    scene: "military",
    icon: "shield",
    title: "Military Moves",
    body: "Service members and military families can request support comparing long distance moving options and coordinating the details of their relocation.",
    image: SITE_IMAGES.militaryMoves,
  },
];
