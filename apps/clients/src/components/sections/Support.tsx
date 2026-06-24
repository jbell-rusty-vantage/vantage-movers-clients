import { support } from "@/content/sections";
import { TwoCol } from "./TwoCol";

export function Support({ image }: { image?: string } = {}) {
  return <TwoCol content={support} image={image} />;
}
