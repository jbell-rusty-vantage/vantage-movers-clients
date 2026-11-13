export const bbbReviewSnapshot = {
  url: "https://www.bbb.org/us/fl/boynton-beach/profile/moving-brokers/vantage-movers-llc-0633-92031922/customer-reviews",
  score: "4.48/5",
  count: 423,
  checkedAt: "2026-11-12",
} as const;

export function heroProofFacts(locale: "en" | "es", mode = process.env.VERCEL_ENV) {
  const es = locale === "es";
  // Owner supplied 50,000 for preview on 2026-11-12. Period/definition remain
  // unqualified; do not promote the count through a future production build.
  const moves = mode === "preview"
    ? ["50,000", es ? "Mudanzas coordinadas" : "Moves coordinated"]
    : [es ? "Personal" : "Personal", es ? "Planificación de su mudanza" : "Move planning conversation"];
  return [moves, [bbbReviewSnapshot.score, es ? "Reseñas de clientes en BBB" : "BBB customer reviews"],
    [es ? "Interestatal" : "Interstate", es ? "Coordinación de mudanzas" : "Move coordination"],
    [es ? "Gratis" : "Free", es ? "Solicitud de cotización" : "Quote request"]];
}
