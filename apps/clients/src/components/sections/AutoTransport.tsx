import { autoTransport } from "@/content/sections";
import { TwoCol } from "./TwoCol";

export function AutoTransport({ image, phone }: { image?: string; phone?: string } = {}) {
  return <TwoCol content={autoTransport} image={image} phone={phone} />;
}
