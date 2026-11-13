# Proposal: Modernize Vantage’s Website Operations

**Date:** October 23, 2026  
**Status:** Proposed direction; implementation and account setup have not started.  
**Scope:** Main Site variations and measurement, Content + Resources, organic digital marketing, and organic AI discovery.

## 1. Recommendation

Build a small, measurable website operation around the existing Vantage sites. Use the Main Site to attract customers, publish useful resources, and test the existing designs. Connect marketing activity to actual Form Leads, Call Leads, Bookings, and Cancellations so the Owner can decide what deserves more effort.

Start with free measurement and research tools, content files that Vantage owns, and one experiment at a time. Add paid keyword or competitor research only when a specific decision needs information the free tools cannot provide.

The operating cycle is: **research customer questions → publish or improve a page → attract traffic → measure usage and sales outcomes → decide what to change.**

This is both a website project and an ongoing operating practice. Launching new designs alone will not produce the traffic or evidence needed to improve sales.

## 2. Starting point

The clients repository already contains two separate Next.js apps:

| Property | Purpose | Treatment in this proposal |
|---|---|---|
| Main Site (`apps/main-site`) | Vantage’s owned search and marketing traffic | Primary home for Resources, organic growth, and initial design experiments |
| Landing Pages (`apps/clients`) | Source Company traffic and quote capture | Preserve Source Company attribution; prepare for distribution and measurement separately |

The Owner reports that the Landing Pages are live but have not been released to Source Companies and receive no meaningful traffic. Their results are therefore not a useful conversion baseline yet. Main Site design files already exist; locating and reviewing those files is the first implementation task, not a reason to commission another redesign.

Repository inspection shows existing Vercel Analytics and Speed Insights integration, quote-form and phone-click events, engagement tracking, metadata, robots rules, a sitemap, and legal/consumer-information pages. Live account configuration, actual traffic, deployed versions, and domain cutover status were not audited for this proposal. Some project documentation describes an older site surface; implementation should use verified current behavior.

The important gaps are a defined experiment process, durable marketing attribution through sales outcomes, a Resources publishing workflow, and a regular research-and-improvement cadence.

## 3. Site variations and A/B testing

Measuring a released site is website analytics. **A/B testing** adds a controlled comparison: comparable visitors are randomly assigned to two versions during the same period to test a stated hypothesis.

### Use the existing designs

Inventory the supplied designs and select a control and one challenger. Record which differences are visual and which change the offer, copy, form, or navigation. Keep lead ingestion, source attribution, pricing behavior, and required disclosures consistent across variations.

Whole-page designs can be tested against each other, but the result then evaluates the complete design. After that, smaller tests can explain whether a headline, form arrangement, or trust section helps.

Each experiment needs an ID, immutable version, hypothesis, audience, allocation, primary metric, guardrails, planned sample size, start/end rules, and decision record. Begin with two versions and one active experiment per audience. Separate Main Site traffic from each Source Company’s Landing Page traffic.

Assign visitors before rendering, keep assignment stable within a defined experiment window, and record actual exposure. Avoid visible switching between designs. Exclude staff, previews, and known bots; check allocation balance and caching so one visitor’s assignment cannot accidentally become everyone’s page. Keep one canonical public URL and prevent preview routes from being indexed.

### Low traffic changes the method

First verify measurement and establish a baseline. If traffic cannot support a useful comparison, choose the strongest design using task walkthroughs, mobile usability checks, and observed form friction. Sequential releases can provide directional evidence, but seasonality and traffic changes prevent treating them as a randomized A/B result.

Set sample size using baseline conversion and the smallest commercially useful improvement. For illustration, detecting a change from 5% to 6% conversion requires roughly 8,200 visitors per version using a conventional two-sided 5% significance level and 80% power; this is not a forecast of Vantage’s traffic. Do not promise a winner after an arbitrary two weeks or a handful of Leads.

Use server-confirmed, eligible Form Lead capture per exposed visitor as the first practical primary metric. Track Duplicate Leads and Bad Leads separately. Once reliable attribution and sufficient volume exist, assess Booking rate and cancellation-adjusted Booking value for the same visitor/Lead cohorts. Observe a declared sales-maturation window before judging downstream results. Stop early for broken lead capture or serious performance problems; otherwise follow the planned analysis rules and report inconclusive results honestly.

## 4. Measurement that reaches sales outcomes

The Owner should be able to answer: **Which channels, pages, resources, and designs bring viable opportunities that become Bookings?**

| Layer | Measures | Decision it supports |
|---|---|---|
| Discovery | Search impressions/clicks, referring channels, campaigns | Where to invest marketing effort |
| Site usage | Eligible visits, experiment exposure, form starts, step abandonment, errors, phone clicks | Which experience needs improvement |
| Lead capture | Server-confirmed Form Leads; qualified Call Leads where attributable; duplicates and bad records | Whether traffic produces viable opportunities |
| Sales | Cohort Bookings, time to book, Cancellations, available Booking money measures | Whether opportunities turn into valuable business |

A phone click is intent, not proof of a Call Lead. The current site tracking treats phone clicks as a conversion signal for engagement reporting; sales reporting must distinguish that signal from Call Qualification and Booking. A client success screen or displayed estimate also cannot substitute for confirmed Form Lead capture.

### Attribution contract

Capture bounded campaign fields, referring host, landing path, content ID, and experiment ID/version/variation. Where permitted, retain first-touch and latest non-direct touch with timestamps; select one declared reporting model and show unknown attribution explicitly. Do not overwrite a known campaign with an internal navigation or direct return visit.

Persist a compact attribution snapshot with the Lead through the existing server boundary. The current shared API input does not expose this marketing contract, so this requires server validation and API changes as well as site changes. Validate experiment values against the issued assignment; do not trust arbitrary browser-supplied variant names. Preserve existing Tracking Reference and ingestion identities.

Main Site traffic remains under the Main Site Source Company. Organic search, social, AI referrals, and campaigns are marketing dimensions beneath it; each campaign or design must not become a new Source Company. Source Company Landing Pages retain their existing Source Company and Source Granularity rules. Later Booking and Cancellation reporting follows the canonical Lead relationship in the server.

Keep raw browsing events in the analytics provider, not Mongo. Use a consent-aware pseudonymous join reference only where necessary and supported. Do not send contact details, raw form values, or full query strings into analytics. Handle analytics failures independently of Lead capture, and preserve an explicit unmeasured group when tracking is unavailable.

For calls, mapped RingCentral Inbound Numbers can establish Source Company attribution. They do not establish which design a caller saw. Start with source-level call results; exclude calls from variant-level conclusions until a tested number/session linkage exists. Visitor-level call tracking may introduce additional number costs and complexity.

### Owner reporting

Begin with provider reports plus a small weekly scorecard. Later add a Website Performance view in `vantage-admin`, backed by server-owned outcome calculations and bounded provider summaries. Avoid building a second analytics platform.

Show traffic and capture rates by channel/page, current experiment evidence, Lead-cohort Booking and Cancellation outcomes, attribution coverage, and a short recommended action. Distinguish Booking binder/deposit measures from revenue or profit; use the existing server definitions. Report marketing spend separately from Main Site CPL, which remains zero under platform rules. Organic activity still consumes time and tools.

An example insight, not an observed finding: “The challenger produces more form starts, but fewer confirmed Form Leads on mobile; inspect the final step before promoting it.” Every insight should name its evidence, limitation, and next action.

## 5. Content + Resources: minimal but real

Create `/resources` and `/resources/[slug]` on the Main Site. Launch with approximately six reviewed resources, then publish or materially improve two per month. Favor evergreen customer questions over a high-volume news feed.

Suggested starting topics:

- Moving broker versus motor carrier: who does what.
- A practical long-distance moving checklist.
- What information helps produce an accurate moving estimate.
- What can change the final cost of a move.
- Packing and inventory preparation.
- How to read the estimate, cancellation terms, and consumer-information documents.

Use real operational knowledge, accurate broker descriptions, and source links. Each article should have a clear answer, useful steps, an accountable author/reviewer, a review date, and a relevant quote or phone action. Avoid invented savings, reviews, service locations, or guarantees. Build useful service pages before expanding into location pages, and publish location pages only where real coverage and distinct customer information justify them.

### Own the content without filling Mongo

**Recommended first version: structured metadata plus Markdown article bodies in version-controlled files.** These are Vantage’s canonical content objects. Serve approved media from existing static assets; adopt object storage only when upload/editor needs justify it. There is no need to put article bodies, images, or PDFs into Mongo.

Model a content item with a stable ID, slug, title, summary, type, topic, author/reviewer, workflow status, publication/review timestamps, canonical path, body reference, asset references, related content, and relevant CTA. The body format and references must remain exportable independently of any writing tool. Keep page configuration separate from articles while allowing the same content ID to be used across design variations.

Workflow: **idea → draft → factual review → approved → published → refresh or archive**. Use preview deployments for review, preserve revisions, maintain redirects when slugs change, and include only published canonical URLs in the sitemap. Use real content update timestamps rather than changing every article’s date on each build. Render articles into indexable HTML with per-article metadata and appropriate structured data that matches visible content.

External writing/research tools can assist drafting. Export the approved body and assets into Vantage-owned storage before publication. The site must not depend on a document-sharing link as its content source.

If the Owner later needs direct publishing from Admin, add a small server-owned content catalog and draft/publish commands in `vantage-main-server`, with an Admin interface. Mongo would hold only bounded metadata, body/asset references, checksums, and publication state. Bodies and revision history remain in files or object storage. This is a later capability, not a prerequisite for six resources.

### Storage boundaries

| Data | Recommended home |
|---|---|
| Article bodies, approved metadata, initial experiment definitions | Git-managed files |
| Images, PDFs, future uploaded bodies | Static assets initially; object storage when needed |
| Raw events, optional heatmaps/replays | External analytics provider |
| Leads, Bookings, Cancellations and compact attribution | Existing Mongo domain records |
| Optional future publishing catalog | Small server-owned Mongo records referencing bodies |

Do not add Mongo collections for page views, scraped competitor pages, full keyword datasets, session recordings, embeddings, or generated draft history. Keep research exports outside Mongo. If report caching becomes necessary, bound its dimensions and retention; retain no raw event mirror. Measure actual storage and index growth before and after rollout.

## 6. Organic digital marketing

Start with a narrow set of services, audiences, and customer questions the business can serve well. The first research pass should identify actual search language, likely intent, relevant competitors, and which existing or proposed page answers each question.

Priorities are technical discoverability, useful service/resource pages, accurate business information, genuine customer reviews, relevant business relationships, and consistent distribution through channels the team can maintain. Audit business-listing eligibility before creating or changing profiles. Verify sitemap submission, canonical URLs, indexing, mobile performance, internal links, and page-specific titles/descriptions.

For each resource, create a small distribution package: the article, a short social summary, a useful checklist excerpt, and a relevant internal link from a service page. Reuse the material in approved existing customer communications where appropriate. Measure tagged links and resulting outcomes. Concentrate on one or two distribution channels before expanding.

Maintain a lightweight monthly competitor review covering three to five relevant businesses: topics, offers, search visibility, useful resources, and customer concerns. Convert findings into specific page/content decisions rather than collecting reports indefinitely.

Paid advertising is outside the first phase. Paid keyword/competitor research remains optional: consider one month of a service such as Semrush when a prioritized research backlog justifies it, export the findings, and renew only if it changes decisions.

## 7. Organic AI marketing

Treat this as two connected activities: **make Vantage’s information easier for AI search systems to discover and cite, and use AI to assist reviewed marketing work.**

For discovery, publish direct answers, clear service and broker information, consistent company facts, accountable authorship, and verifiable supporting sources. Keep important facts in accessible HTML, with sensible headings and internal links. Check intended search crawlers against robots rules and hosting protections.

Google states that its AI search features use foundational SEO practices and require no special AI markup. Traffic from those features is included in overall Search Console reporting, so do not promise a separate, complete AI-search attribution report. [Google Search Central](https://developers.google.com/search/docs/appearance/ai-features)

For ChatGPT search eligibility, OpenAI advises allowing OAI-SearchBot and its published IP ranges; inclusion or placement remains unguaranteed. [OpenAI search guidance](https://help.openai.com/en/articles/9237897-searching-the-web-with-chatgpt)

Measure identifiable AI referral visits and their Lead/Booking outcomes, while acknowledging that missing referrals and answers that produce no click are not fully observable. A small monthly set of consistent sample questions can reveal citation opportunities, but it is directional research, not a reliable market-wide ranking score.

Use AI for topic clustering, outlining, editing, repurposing, and explaining measured results. Require factual review before publishing; keep customer data out of public drafting tools. Avoid bulk generic articles, manufactured endorsements, and treating an AI-generated assertion as evidence. Free interactive AI usage is suitable for assisted work; unattended API workflows have separate costs and are not assumed here.

## 8. Tools and cost policy

| Need | Initial approach | Cost position |
|---|---|---|
| Search visibility | Google Search Console; Bing Webmaster Tools | Use available free tools; verify ownership/setup |
| Usage and campaigns | GA4 standard; retain existing Vercel telemetry where useful | GA is offered free of charge; confirm existing Vercel entitlements and event limits |
| Friction diagnosis | Optional Microsoft Clarity, only if replay/heatmaps answer a real question | Clarity advertises free heatmaps; configure masking and consent before use |
| Content | Git-managed files and existing previews | No new CMS subscription |
| Experiments | Small assignment/configuration layer using existing sites | Engineering and hosting usage; no testing subscription assumed |
| Research | Search performance, manual competitor review, exported research notes | Free-first; paid research by explicit budget |
| Insights | Weekly scorecard initially; focused Admin view later | No new warehouse or BI subscription initially |

Sources: [Google Analytics](https://marketingplatform.google.com/about/analytics/), [Bing Webmaster Tools](https://www.bing.com/webmasters/help/getting-started-checklist-66a806de), [Microsoft Clarity](https://clarity.microsoft.com/heatmaps).

Target **$0 in new recurring software subscriptions at launch**, subject to current account entitlements and usage. This excludes engineering/content time, existing hosting/domains, communication charges, optional storage, and any additional call-tracking numbers. Free does not mean unlimited or no operating effort. Verify limits before enabling tools, and avoid duplicate high-volume event collection across providers.

## 9. Delivery and operating ownership

November 12 implementation checkpoint: [Main Site milestone](main-site-preview/milestone-2026-11-12/README.md) delivers isolated-preview attribution/outcome reporting and six bilingual resource candidates. This establishes engineering readiness within Stages 2–3; selecting/releasing one production design and reviewing/publishing/indexing those resources remain open. Stages 4–5 have not started under this milestone. The [subsequent resource-center and hero refinement](main-site-preview/resource-center-2026-11-12/README.md) adds article presentation, resource-type navigation, shared hero proof and composition, and the scroll call control for Owner review. It records the destination-resource expansion direction without claiming national guide coverage or publishing drafts.

Indicative sequence below; dates depend on design review, access, and current implementation. Traffic determines experiment duration and SEO learning time.

| Stage | Deliverables | Completion evidence |
|---|---|---|
| 1. Establish the baseline | Design inventory; account/domain audit; metric and attribution contract; initial research | Test journeys reconcile site activity with captured Leads; unknown/missing data is visible |
| 2. Connect measurement | Shared tracking contract; server attribution; outcome report; one production design | Verified capture/failure cases, attribution survives to Booking/Cancellation, tracking does not block ingestion |
| 3. Launch Resources | Index/article templates, content model, first six reviewed pieces, internal links | Preview review passed, published URLs indexable, unpublished content excluded, revisions recoverable |
| 4. Operate growth | Channel plan, content calendar, weekly scorecard; optional first A/B test | Each activity has an owner, measurable goal, evidence, and next decision |
| 5. Expand only from evidence | Further designs, optional paid research, optional Admin publishing | Existing workflow demonstrates a need and expected benefit |

Treat the first four stages as an initial four-to-six-week planning envelope, not a delivery commitment. Maintain a separate Landing Page release checklist for each Source Company: correct URL, attribution, phone mapping, form capture, and an agreed traffic start date. Begin its baseline when real traffic arrives; comparisons with the prior zero-traffic period are not useful experiments.

The Owner approves positioning, factual claims, priorities, and optional spend. A named marketing/content operator owns research, publication, and weekly decisions. Engineering owns capture reliability, attribution, experiments, and reporting. One person can cover several roles, but publication and review capacity must be explicit.

Weekly: review capture health and traffic quality, examine one friction point, and record one concrete improvement decision. Monthly: refresh search/competitor research, review content results and mature sales cohorts, and retire or update weak material. Automated insight summaries can follow once the underlying definitions are stable.

## 10. Proposed initial scope

Deliver one production Main Site design from the supplied files; verified usage-to-Lead measurement with a path to Booking and Cancellation outcomes; a small Resources area with six useful articles; free-first search setup and an editorial/distribution calendar; and the ability to run one controlled comparison when traffic supports it.

Defer a large CMS, marketing automation suite, paid advertising, a bespoke analytics warehouse, visitor-level call tracking, and mass content generation. The immediate approval is for this direction and a scoped implementation plan. Implementation planning should resolve design-file locations, domain/account access, baseline traffic, the content reviewer, and the desired Owner editing workflow without making them prerequisites for evaluating this proposal.
