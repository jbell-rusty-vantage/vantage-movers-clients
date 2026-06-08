import { commitment } from "@/content/sections";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function Commitment() {
  return (
    <section className="section--tight commitment reveal">
      <div className="wrap commitment__in">
        <Eyebrow center>{commitment.eyebrow}</Eyebrow>
        <h2>{commitment.title}</h2>
        <p>{commitment.body}</p>
      </div>
    </section>
  );
}
