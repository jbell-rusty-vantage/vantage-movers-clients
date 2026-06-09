import { autoTransport } from "@/content/sections";
import { TwoCol } from "./TwoCol";

export function AutoTransport({ image }: { image?: string } = {}) {
  return <TwoCol content={autoTransport} image={image} />;
}
