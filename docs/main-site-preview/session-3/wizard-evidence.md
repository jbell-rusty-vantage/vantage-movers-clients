# Preserved bilingual quote journey

The first service journey can now carry a quote draft through a guide, browser Back, a language change and a reload. The browser trials below qualify local behavior only. Deployed preview persistence, real Places credentials and analytics destination receipts remain separate proofs.

## Implemented boundary

- `QuoteWizard` retains the existing canonical move-size values, server schema, Main Site attribution, optional consent and same-origin `/api/quote` payload. Only display labels change by language.
- English and Spanish cover fields, steps, validation messages, retry/confirmation, move-size labels, consent and the date picker (including its accessible labels). Spanish wording remains pending the separate editorial/legal review.
- A bounded, validated sessionStorage draft preserves values, step, reference, LID, optional false consent and a confirmed destination. It expires after one hour from interaction, and clears on confirmed capture or Start Over. Blocked storage does not prevent intake. Only the active homepage form writes the shared draft on pagehide.
- Draft identity survives failed requests, guide exploration and locale changes. Start Over creates a fresh reference and LID. Browser storage is not server idempotency evidence.
- ZIP lookup remains advisory. The delivery suggestion uses structured Places city, state, country and postal code, requires explicit confirmation, and invalidates when the ZIP changes. Madison, Wisconsin uses its city guide; other Wisconsin cities use the state guide; other or unconfirmed destinations use generic guidance. A same-name city in another state is not Madison, Wisconsin.
- Form-start and first-step events begin with intentional pointer, keyboard or input activity. Mounting a form alone does not emit either event. Completion is tracked once per step of the persisted attempt. The confirmation and success event require `leadCaptured === true`, including for HTTP 200 responses. Private form values are not added to event properties.
- No pickup geolocation control is offered: the current integration provides ZIP lookup and place details, not reverse geocoding. No permission request or denied-permission proof is claimed. Manual ZIP entry remains available.

## Reproduce and evidence

Run the existing local server in isolated preview mode, then from the repository root:

```powershell
node docs/main-site-preview/session-3/capture-wizard.mjs
pnpm --filter @vantage/main-site exec vitest run --config vitest.unit.config.mts src/lib/quote-journey.test.ts src/app/api/places/places.test.ts
pnpm --filter @vantage/ui typecheck
pnpm --filter @vantage/clients typecheck
```

The capture script accepts localhost only. All quote and Places requests are intercepted, external requests and telemetry are blocked in the service journeys, and only synthetic contact data is entered. It creates no Form Lead. [Machine-readable results](evidence/wizard-journey.json) record capture time and viewport results.

Both 390×844 and 1440×1000 trials passed:

1. Confirm Madison WI, edit it, confirm Madison AL (generic), another Wisconsin city (state), then Madison WI again (city).
2. Enter details and contact information, leave SMS consent unchecked, explore the guide, go Back, switch to Spanish and reload.
3. Receive mocked HTTP 200 with false capture, then HTTP 503, then HTTP 200 with true capture. Only the third shows confirmation. All three logical payloads are identical, including reference, LID and false consent.
4. Confirm cleared draft, no horizontal document overflow and no uncaught browser exceptions.
5. Use both homepage forms and navigate away: the active form's values survive instead of an inactive form overwriting them.

The ten unit cases cover draft corruption/expiry, consent and identity preservation, stale destination invalidation, city/state fallback, capture semantics, locale allowlisting and structured Places identity. Focused wizard/Places lint, shared UI typecheck and Clients typecheck passed. Main Site integration checks are owned by the combined build.

Screenshots: [phone request](evidence/wizard-390-request.png), [desktop request](evidence/wizard-1440-request.png), [phone retry](evidence/wizard-390-false-capture.png), [desktop retry](evidence/wizard-1440-false-capture.png), [phone confirmation](evidence/wizard-390-confirmation.png), [desktop confirmation](evidence/wizard-1440-confirmation.png). These are development-mode viewport emulations, not physical-device tests.

`apps/main-site/public/images/preview/quote-request.webp` is the first-party desktop form capture with fictional ZIP/date/size inputs, encoded as WebP for the process sequence. Its source is the reproducible screenshot script, not a fabricated interface. It carries no customer identity or endorsement. Later visual changes require recapture.
