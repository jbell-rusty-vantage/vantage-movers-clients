import type { ContentField, ContentValues } from "./resolve";

export function contentBindings(catalog: ContentField[], values: ContentValues) {
  const changed = catalog.filter(field => Object.hasOwn(values, field.key) && values[field.key] !== field.defaultValue);
  const defaults = new Set(changed.map(field => field.defaultValue));
  const templateSources = new Set(changed.filter(field => /\{\{\d+\}\}/.test(field.defaultValue)).map(field => field.sourceFile));
  const contactChanged = changed.some(field => field.sourceFile === "lib/content.ts" && (/^(?:1)?\d{10}$/.test(field.defaultValue.replace(/\D/g, "")) || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.defaultValue)));
  return {
    // An unedited sibling still participates in origin selection, preventing cross-section edits.
    fields: catalog.filter(field => defaults.has(field.defaultValue) || templateSources.has(field.sourceFile) || contactChanged && /\{\{\d+\}\}/.test(field.defaultValue)).map(({ key, defaultValue, sourceFile, locale, kind }) => ({ key, defaultValue, sourceFile, locale, kind })),
    values: Object.fromEntries(changed.map(field => [field.key, values[field.key]])),
  };
}
