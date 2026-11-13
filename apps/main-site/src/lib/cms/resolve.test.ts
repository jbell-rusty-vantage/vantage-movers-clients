import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { CmsElement, CmsText, ContentProvider, ContentScope } from "@/components/cms/Content";
import { resolveContent, resolveContactHref, resolveLegalMarkup, isContentImage, type ContentField } from "./resolve";
import { contentBindings } from "./snapshot";
import actualCatalog from "@/content/cms/catalog.json";

const fields: ContentField[] = [
  { key: "home", defaultValue: "Request Your Moving Quote", sourceFile: "lib/content.ts", locale: "en", kind: "text" },
  { key: "form", defaultValue: "Request Your Moving Quote", sourceFile: "lib/quote-copy.ts", locale: "en", kind: "text" },
  { key: "es", defaultValue: "Cotice su mudanza", sourceFile: "lib/quote-copy.ts", locale: "es", kind: "text" },
  { key: "legal", defaultValue: "Privacy Policy", sourceFile: "content/legal/docs.ts", locale: "en", kind: "text" },
  { key: "footer", defaultValue: "Privacy Policy", sourceFile: "lib/content.ts", locale: "en", kind: "text" },
  { key: "studio", defaultValue: "Studio", sourceFile: "schemas/quote-form.schema.ts", locale: "shared", kind: "text" },
];

describe("preview content rendering", () => {
  it("binds active bilingual navigation without borrowing quote-form labels", () => {
    const source = "components/layout/BrowseNavigation.tsx|lib/publication.ts|components/interactive/ServicesDropdown.tsx";
    const faq = actualCatalog.find(field => field.sourceFile === "lib/publication.ts" && field.defaultValue === "FAQ")!;
    const resources = actualCatalog.find(field => field.sourceFile === "lib/publication.ts" && field.defaultValue === "Recursos")!;
    const quoteContact = actualCatalog.find(field => field.sourceFile === "lib/quote-copy.ts" && field.defaultValue === "Contact")!;
    const snapshot = contentBindings(actualCatalog, { [faq.key]: "Common questions", [resources.key]: "Guías", "text.4cb6665920a2416d": "Moving services", [quoteContact.key]: "Your details" });
    expect(resolveContent("FAQ", snapshot.values, source, "en", "text", snapshot.fields)).toBe("Common questions");
    expect(resolveContent("Recursos", snapshot.values, source, "es", "text", snapshot.fields)).toBe("Guías");
    expect(resolveContent("Services", snapshot.values, source, "en", "text", snapshot.fields)).toBe("Moving services");
    expect(resolveContent("Contact", snapshot.values, source, "en", "text", snapshot.fields)).toBe("Contact");
  });
  it("retains unedited source siblings in the actual compact browser snapshot", () => {
    const snapshot = contentBindings(fields, { home: "Contact us" });
    expect(snapshot.fields.map(field => field.key)).toEqual(["home", "form"]);
    expect(resolveContent("Request Your Moving Quote", snapshot.values, "quote|lib/quote-copy.ts", "en", "text", snapshot.fields)).toBe("Request Your Moving Quote");
    expect(resolveContent("Request Your Moving Quote", snapshot.values, "contact|lib/content.ts", "en", "text", snapshot.fields)).toBe("Contact us");
  });
  it("interpolates parameterized copy without changing the underlying rating", () => {
    const template: ContentField = { key: "stars", defaultValue: "{{0}} out of 5 stars", sourceFile: "components/ui/Stars.tsx", locale: "shared", kind: "text" };
    expect(resolveContent("4 out of 5 stars", { stars: "Rated {{0}} / 5" }, template.sourceFile, "en", "text", [template])).toBe("Rated 4 / 5");
    const fragment = { ...template, key: "fragment", defaultValue: ", or {{4}}." };
    expect(resolveContent(", or contact@example.com.", { fragment: "; alternatively {{4}}." }, fragment.sourceFile, "en", "text", [fragment])).toBe("; alternatively contact@example.com.");
  });
  it("never applies a changed legal template to unrelated contact labels", () => {
    const template = actualCatalog.find(field => field.defaultValue === "Contact {{0}}")!;
    expect(template).toBeDefined();
    const snapshot = contentBindings(actualCatalog, { [template.key]: "Reach {{0}}" });
    expect(resolveContent("Contact Vantage", snapshot.values, "components/editorial/ContactPage.tsx", "en", "text", snapshot.fields)).toBe("Contact Vantage");
    expect(resolveContent("Contact details", snapshot.values, "content/legal/docs.ts", "en", "text", snapshot.fields)).toBe("Contact details");
    expect(resolveContent("Contact Example Company", snapshot.values, "content/legal/docs.ts", "en", "text", snapshot.fields)).toBe("Reach Example Company");
  });
  it("keeps contact display edits and their phone/email targets together", () => {
    const contacts: ContentField[] = [
      { key: "phone", defaultValue: "(888) 477-9232", sourceFile: "lib/content.ts", locale: "en", kind: "text" },
      { key: "email", defaultValue: "support@vantagehomemovers.com", sourceFile: "lib/content.ts", locale: "en", kind: "text" },
    ];
    expect(resolveContactHref("tel:8884779232", { phone: "(555) 123-4567" }, contacts)).toBe("tel:5551234567");
    expect(resolveContactHref("mailto:support@vantagehomemovers.com", { email: "hello@example.com" }, contacts)).toBe("mailto:hello@example.com");
    expect(resolveContactHref("/contact", { phone: "(555) 123-4567" }, contacts)).toBe("/contact");
    expect(resolveContent("(888) 477-9232", { phone: "(555) 123-4567" }, "lib/content.ts", "es", "text", contacts)).toBe("(555) 123-4567");
    expect(resolveLegalMarkup('<a href="mailto:support@vantagehomemovers.com">support@vantagehomemovers.com</a>', { email: "hello@example.com" }, "content/legal/docs.ts", "en", contacts)).toBe('<a href="mailto:hello@example.com">hello@example.com</a>');
    const composite = contentBindings([...contacts, { key: "call", defaultValue: "Please call {{0}} for help.", sourceFile: "lib/content.ts", locale: "en", kind: "text" }], { phone: "(555) 123-4567" });
    expect(resolveContent("Please call (888) 477-9232 for help.", composite.values, "faq|lib/content.ts", "en", "text", composite.fields)).toBe("Please call (555) 123-4567 for help.");
  });
  it("distinguishes quote copy from the separate contact-section title and fails unchanged when absent", () => {
    const values = { home: "Contact us", form: "Plan your move" };
    expect(resolveContent("Request Your Moving Quote", values, "components/interactive/QuoteWizard.tsx|lib/quote-copy.ts", "en", "text", fields)).toBe("Plan your move");
    expect(resolveContent("Request Your Moving Quote", values, "lib/content.ts", "en", "text", fields)).toBe("Contact us");
    expect(resolveContent("Request Your Moving Quote", { home: "Contact us" }, "lib/quote-copy.ts", "en", "text", fields)).toBe("Request Your Moving Quote");
  });
  it("preserves whitespace, locale separation, and unknown external text", () => {
    expect(resolveContent(" Cotice su mudanza ", { es: "Prepare su mudanza" }, "lib/quote-copy.ts", "es", "text", fields)).toBe(" Prepare su mudanza ");
    expect(resolveContent("Cotice su mudanza", { es: "Changed" }, "lib/quote-copy.ts", "en", "text", fields)).toBe("Cotice su mudanza");
    expect(resolveContent("A customer's own review", { es: "Changed" }, "reviews", "en", "text", fields)).toBe("A customer's own review");
  });
  it("renders edited children and native option/placeholder attributes in the initial HTML", () => {
    const html = renderToStaticMarkup(createElement(ContentProvider, { children: undefined, locale: "en", fields, values: { form: "Choose your move", studio: "Studio apartment" } },
      createElement(ContentScope, { children: undefined, source: "lib/quote-copy.ts|schemas/quote-form.schema.ts" },
        createElement(CmsText, { scope: "quote" }, "Request Your Moving Quote"),
        createElement(CmsElement, { element: "input", scope: "quote", placeholder: "Request Your Moving Quote" }),
        createElement(CmsElement, { element: "option", scope: "quote", value: "Studio" }, "Studio"))));
    expect(html).toContain('Choose your move<input placeholder="Choose your move"/>');
    expect(html).toContain('<option value="Studio">Studio apartment</option>');
  });
  it("keeps legal links intact while treating Owner changes as text", () => {
    const html = '<a href="/privacy">Privacy Policy</a>';
    expect(resolveLegalMarkup(html, { legal: '<img src=x onerror=alert(1)>' }, "content/legal/docs.ts", "en", fields)).toBe('<a href="/privacy">&lt;img src=x onerror=alert(1)&gt;</a>');
  });
  it("accepts only local image assets or isolated uploaded media", () => {
    expect(isContentImage("/api/site-content/media/0123456789abcdef01234567")).toBe(true);
    expect(isContentImage("https://external.example/image.png")).toBe(false);
    expect(isContentImage("//external.example/image.png")).toBe(false);
    expect(isContentImage("/images/../private.png")).toBe(false);
  });
});
