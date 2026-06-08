import type { Service } from "@/types";

export const servicesIntro = {
  eyebrow: "What we do",
  title: "We Make Moving Easy",
  body: "From packing and moving to storage and more — we know what it takes, and we have the moving experts ready to get you into your new home or office.",
};

export const services: Service[] = [
  {
    scene: "longdist",
    icon: "box",
    title: "Long Distance Moves",
    body: "Planning a move across the country or to a different state? Get a customized quote for an easy, fully-coordinated long distance move.",
    image: "/sitepictures/Truck%20Loaded.jpeg",
  },
  {
    scene: "storage",
    icon: "box",
    title: "Packing & Storage",
    body: "Our moving team offers professional packing to keep your items safe during transit, with secure short- and long-term storage options afterward.",
    image: "/sitepictures/packing.jpg",
  },
  {
    scene: "office",
    icon: "office",
    title: "Office Moves",
    body: "Relocating a small or large office? Request an instant moving quote and let us make moving your business to a new location a breeze.",
    image: "/sitepictures/Furniture%202.jpeg",
  },
  {
    scene: "military",
    icon: "shield",
    title: "Military Moves",
    body: "Vantage proudly supports military families. We're a premier choice for helping service members relocate with care, precision, and respect.",
    image: "/sitepictures/Furniture%201.jpeg",
  },
];
