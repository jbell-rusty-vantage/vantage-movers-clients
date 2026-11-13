export type EditorialLocale = "en" | "es";
export type EditorialKind = "service" | "resource" | "state" | "city" | "route";

export interface EditorialSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  sourceIds?: string[];
}

export interface EditorialWorksheet {
  caption: string;
  columns: [string, string, string];
  rows: { label: string; a: string; b: string }[];
  blankRows: string[];
  conclusion: string;
}

export interface EditorialEntry {
  id: string;
  kind: EditorialKind;
  locale: EditorialLocale;
  path: string;
  navLabel: string;
  title: string;
  description: string;
  sections: EditorialSection[];
  relatedIds: string[];
  sourceIds: string[];
  review: {
    status: "draft" | "reviewed";
    author: string;
    reviewer: string | null;
    checkedAt: string;
    notes: string[];
  };
  // Set only after the locale has been approved for publication.
  publishedAt?: string;
  // A material content revision, independent of publication approval.
  updatedAt?: string;
  worksheet?: EditorialWorksheet;
  geography?: import("./geography-types").GeographyContent;
}

export interface EditorialSource {
  id: string;
  title: string;
  url: string;
  section: string;
  scope: string;
  checkedAt: string;
  checkedBy: string;
  recheckTrigger: string;
  finding: string;
  limitation?: string;
}

export interface EditorialClaim {
  id: string;
  entryIds: string[];
  locales: EditorialLocale[];
  wording: { en: string; es: string };
  sourceIds: string[];
  status: "source-checked" | "internal-baseline" | "withheld";
  reviewer: string | null;
  recheckTrigger: string;
}
