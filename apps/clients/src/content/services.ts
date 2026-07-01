import type { Service } from "@/types";
import { SITE_IMAGES } from "@/content/images";

export const servicesIntro = {
  eyebrow: "",
  title: "",
  body: "",
};

export const services: Service[] = [
  {
    scene: "longdist",
    icon: "box",
    title: "Long Distance Moves",
    body: "With our nationwide footprint we have the moving experts and coordinators ready to help you with your long distance moving journey.",
    image: SITE_IMAGES.longDistanceMoves,
  },
  {
    scene: "storage",
    icon: "box",
    title: "Packing and Storage",
    body: "Get the full Vantage experience. With professional packing and storage services. Your moving team ensures your belongings stay safe during and after moving.",
    image: SITE_IMAGES.packingStorage,
  },
  {
    scene: "office",
    icon: "office",
    title: "Office Moves",
    body: "From large to small we'll help coordinate and provide the professional movers you need for a smooth office relocation.",
    image: SITE_IMAGES.officeMoves,
  },
  {
    scene: "military",
    icon: "shield",
    title: "Military Moves",
    body: "Vantage Movers is trusted by thousands of military families. Contact us today to see how we can help you with our military family moving services.",
    image: SITE_IMAGES.militaryMoves,
  },
];
