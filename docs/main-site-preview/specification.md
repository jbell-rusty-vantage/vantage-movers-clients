# Page, component and editorial specification

## Routes and journeys

Paths below are proposed unless they already resolve on the integration revision. Match existing service slugs and locale conventions before creating routes.

| Entry | Page composition | Customer’s next action |
|---|---|---|
| Home / | Keep the production header, prominent quote wizard, trust and contact elements. Make Services, Locations and Resources reachable in desktop and mobile navigation. Reuse the existing section order where it serves the journey. Improve How It Works with the process sequence below. | Start a quote immediately or browse by service or destination. |
| Services /services and service detail | Use the service registry for the index, menu and detail routes. Detail order: specific customer question, short answer, quote entry, what to prepare, what the coordinator reviews, carrier responsibilities, related guide and FAQ. | Choose one service, understand what affects the estimate, request a quote. |
| All Locations /locations | Searchable or grouped list of published state pages, text links alongside any map, service directory and editable destination picker. Distinguish guide availability from service coverage. | Choose Wisconsin or browse services directly. |
| Wisconsin Movers /locations/wisconsin-movers | State overview, services available for that route, practical Wisconsin guidance, published cities, official links, quote CTA. The state page acts as a directory. | Open Packing or Long-distance on its existing service URL, or open the Madison city guide. |
| Madison city guide | Example proposed child path /locations/wisconsin-movers/madison. Use the actual heading “Getting ready to move to Madison, Wisconsin.” Give arrival logistics, building questions, a relevant seasonal detail, an official new-resident resource and a useful local destination. | Return to Wisconsin, read the inventory checklist or continue the quote. |
| Resources /resources and named articles | Three collections: guides and worksheets, common questions, official resources and carrier contacts. Each original piece has a stable URL, answer-first heading, author/reviewer, checked date, citations and related next step. | Read or print a usable guide, visit an official source in a new tab, or return to the service or quote. |

Default to the current production typography, logo, palette, section spacing, button states, photography treatment and mobile wizard. Inspect the actual rendered homepage and its font/token definitions. Use existing Header, SiteFooter, ServicesDropdown, CoverageMap, QuoteWizard and HowItWorksSection. Sketch mobile and desktop compositions before changing them. Give real links to cards and navigation entries, a visible focus state, meaningful labels and breadcrumb links on detail pages. Use same-tab internal navigation and external links that open a new tab with opener protection and an accessible indication. Retain direct access to consumer information and legal pages.

## Destination behavior

Offer optional pickup geolocation on an explicit user action where it improves entry. Ask the visitor to confirm any suggestion. Manual entry works when permission is denied, unavailable or inaccurate. A confirmed delivery city/ZIP drives the destination guide. Resolve it to a reviewed city and state identity, including same-name cities. Show the reviewed city, else state, else generic interstate guidance. Editing the destination updates the suggestion. Preserve wizard progress on language switch and guide exploration. Render actual place names in each locale. Keep private itinerary data out of URLs, shared page caches and analytics. A state page visit alone establishes reading interest.

## First publication queue

| Deliverable | Content the writer must actually produce | Placement |
|---|---|---|
| Before the inventory call | A usable room-by-room checklist including closets, garage, outdoor items, fragile pieces and access at both ends. Give the customer space to note changes for the rep. | Residential, packing, post-quote next step |
| Comparing two written moving estimates | A printable two-column worksheet with rows for matched inventory, packing, stairs/long carries, storage, redelivery and open questions. Include a worked fictional comparison without a price promise. Use semantic table headers and a readable phone layout. | Long-distance and storage |
| Who handles my move after I request a quote? | Original short article tracing customer, Vantage rep and assigned carrier responsibilities. Point to official broker guidance and the customer’s carrier paperwork. | Quote confirmation, resources and support |
| Getting ready for Wisconsin / Madison | Two independently useful pieces. Wisconsin covers new-resident resources and service navigation. Madison covers delivery entrance planning, campus turnover where relevant and first-week information. | State and city routes, destination suggestion |
| Eight service pages | Long-distance, residential, office, military/veteran, senior, packing, storage and auto transport. Use each service’s distinct opening and preparation questions from the earlier proposal. Resolve any Vantage-specific offerings with operations before publication. | Header, service index, relevant state pages |

Write in English and natural Spanish using the same content IDs, locale-specific slugs where already supported, reciprocal language links and meaningful fallbacks. Recheck translated service, legal and consent language against its reviewed counterpart. Publish only reviewed locale entries. Use useful headings, canonical metadata, breadcrumbs, language alternates and truthful structured data. Keep unfinished routes out of production navigation and sitemaps.

## Still photography and the process slideshow

Assign image production to **GPT-6 Astra using ChatGPT Images**. Deliver a small art-directed set: home hero, packing detail, residential inventory, office preparation and a coordinator conversation. Audit existing approved assets first. For each missing slot record placement, narrative purpose, rights/provenance, prompt, aspect ratios, safe crop, focal point, alt text and final optimized file. Preserve the actors and room across process frames using an approved reference image. Use real interface captures from the working preview for software steps; composite captions in accessible HTML.

Starter prompt for a hero concept: “Editorial photograph for a US interstate moving broker. Morning light in a lived-in apartment. Two adults comparing a handwritten room inventory beside half-packed boxes. Warm neutral surfaces, a small blue accent, natural expressions. Place the people on the right with clear space for a left-side headline. No legible text, logos, vehicles or uniforms.” Generate landscape and phone crops and compare them in the actual hero. Reserve real company portraits and testimonials for verified people.

| Frame | Visual | Caption intent |
|---|---|---|
| Request | Screenshot of the actual quote wizard with fictional ZIPs, size and date | Tell Vantage the basics of your move. |
| Inventory call | Customer with room list speaking to the coordinator | Your sales rep reviews belongings and access at both addresses. |
| Review | Close-up of a sample document with no personal details | Review the written estimate and ask about optional services. |
| Prepare | Same home, labeled boxes and clear doorway | Confirm arrangements and keep important paperwork handy. |
| Pickup and delivery | Resident at the doorway reviewing paperwork with an unbranded carrier representative | The assigned motor carrier handles pickup, transport and delivery. |

Build a lightweight sequence of stills with captions, gentle transitions, previous/next and frame position. Default to manual progression. If timed playback is offered, make it opt-in with pause and replay. Respect reduced motion, support touch and keyboard, avoid moving focus and expose the same steps as text. Show a useful first image before JavaScript loads. Size images responsively and defer later frames. Keep faces, copy and quote controls readable at phone widths. Compare hero loading and layout shift against the production control. Never show a Vantage truck, Vantage driver, fabricated customer endorsement or invented tracking interface.
