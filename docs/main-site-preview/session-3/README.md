# Integrated service journey

The recognizable Vantage shell now connects Home → Services → long-distance → estimate worksheet → quote → Wisconsin/Madison, with reciprocal English/Spanish pages. The current quote schema and Main Site Source Company remain authoritative. [Wizard evidence](wizard-evidence.md) records the mocked retry/confirmation boundary and browser tests.

`src/lib/publication.ts` is the route/navigation/alternate gate over `src/content/editorial/`. Preview mode explicitly permits drafts for Owner review; all other environments require `reviewed` plus a named reviewer. Unknown catchall paths are excluded through static params and return HTTP 404. `app/(en)` and `app/es` are separate root layouts so initial server HTML declares the correct language. Cross-root navigation reloads the document; the bounded session draft preserves progress across that reload.

Header browsing supports pointer, keyboard, Escape/focus return and all three content directories. Spanish links to untranslated legal/carrier documents identify them as English. A language fallback on legacy pages is labeled as the other language's home, rather than claiming an equivalent translated page. The global 404 offers recovery links in both languages.

The production homepage section order and embedded quote composition remain. Unsupported random metrics, static ratings, invented testimonial fallback and unconfirmed operational promises were removed. The [measurement/claim audit](../session-7/README.md) names that boundary. The process now uses the [reviewable media set](../session-5/README.md).

No backend domain, partner attribution, production credential or production Lead was changed by this implementation. The shared calendar gained an optional locale parameter; its default remains English. The Owner's existing Blob/publishing pipeline is outside this implementation; source text and static image assets are reviewable in this branch.
