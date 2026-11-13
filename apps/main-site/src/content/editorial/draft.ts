import type { EditorialEntry, EditorialLocale } from "./types";

/** Drafts are content for review, never an implicit production publication. */
export function draft(
  locale: EditorialLocale,
  entry: Omit<EditorialEntry, "locale" | "review">,
): EditorialEntry {
  return {
    ...entry,
    locale,
    review: {
      status: "draft",
      author: "Codex editorial draft",
      reviewer: null,
      checkedAt: "2026-11-12",
      notes: [
        "Official references source-checked by Codex on 2026-11-12; this is not business or legal approval.",
        "Owner designated as reviewer on 2026-11-12; content approval is pending. Unconfirmed service promises are excluded.",
        ...(locale === "es" ? ["Spanish language and compliance review pending; translation is independently drafted without English fallback."] : []),
      ],
    },
  };
}
