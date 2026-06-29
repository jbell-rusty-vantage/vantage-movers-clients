import { support } from "@/content/sections";
import { TwoCol } from "./TwoCol";

export function Support({ image, phone }: { image?: string; phone?: string } = {}) {
  return <TwoCol content={support} image={image} phone={phone} />;
}
