# Canyon preview deployment

Canyon uses branch `agent/main-site-canyon` in `jbell-rusty-vantage/vantage-movers-clients`. The Main Site Preview workflow deploys its exact source to the existing `vantage-movers-clients-main-site` project. The project is linked to GitHub, and the app's Vercel configuration delegates deployments to GitHub Actions.

Earlier runs built GitHub's detached PR test-merge. Vercel stored `githubCommitRef=HEAD` and the test-merge SHA even though the workflow exported the branch name. The updated workflow checks out the PR head or push SHA, checks that the checkout matches, attaches the source branch locally and supplies explicit GitHub metadata to Vercel. The deployment remains a CLI deployment. GitHub branch and commit metadata support source display and filtering, while the workflow assigns the stable Canyon review URL. [Vercel CLI branch association](https://vercel.com/docs/cli/deploy#associate-a-cli-deployment-with-a-git-branch) · [Vercel's GitHub Actions guidance](https://vercel.com/kb/guide/how-can-i-use-github-actions-with-vercel).

The workflow runs lint, typecheck and contract/publication tests, pulls the Vercel Preview configuration for the branch, verifies the isolated API origin and Form Lead route, and builds with the approved preview credentials. Preview runtime uses the same project's Preview configuration. The Form Lead route is `api/v1/form-leads`, and the shared preview API is `https://vantage-sites-preview-api.vercel.app`. GitHub holds the build API credentials and Vercel holds the runtime API and Places credentials. The Canyon branch inherits the existing Preview variables. Vercel omitted the sensitive Places credential from the local Preview pull.

The workflow checks the Canyon deployment's project, Ready state, Preview target, GitHub branch and exact SHA before assigning `vantage-main-site-canyon.vercel.app`. Its authenticated request to Consumer Information checks the Canyon presentation marker, the noindex response header and the isolated carrier fixture. The branch head must still match the build. A second API lookup verifies where the alias points. The optimization review alias is separately pinned to its qualified deployment.

## Isolated API admission

The server-owned v1 contract admits `main-site-canyon` / `2026-11-13` alongside `main-site-optimization` / `2026-11-12`. The client uses the selected presentation to choose the bounded design for analytics and quote attribution. The Main Site CMS still serves the existing shared catalog, including Owner edits.

- API source `b926311ee9b8ceb16be57dad9435624f1ad8beac`. The isolated preview workflow passed typecheck and 20 focused tests. [GitHub Actions](https://github.com/jbell-rusty-vantage/vantage-movers-server/actions/runs/43465326134).
- Deployment `dpl_EMKkp6QcLeXz3Sd1tR97A9LLKCiX`, Ready, Preview. The stable API URL resolves to this deployment. [Immutable API deployment](https://vantage-sites-preview-o5av3tbjr-vantage-4d3db9ef.vercel.app).
- Runtime readback confirmed the exact server SHA, database `testvantagemovers_sitepreview`, authenticated outcome report HTTP 200, invalid auth HTTP 401, forbidden list-all Form Leads HTTP 404 and the isolated carrier fixture.

## Deployed quote qualification

The initial Canyon deployment `dpl_B7yiXktnAZzGVcJCfgpHdgatUydz` was Ready at exact source `9f884e255ccc1856a0f3627f51f25e8b65ca555a` with GitHub branch `agent/main-site-canyon`. Protected Consumer Information returned the Canyon presentation, a noindex header and the isolated carrier fixture. Places returned the expected destination ZIP. [Immutable Main Site deployment](https://vantage-movers-clients-main-site-3mtqeohor-vantage-4d3db9ef.vercel.app).

The browser intercepted an initial HTTP 503 and an HTTP 200 with `leadCaptured: false`. Both left the draft available for retry. It forwarded one identical request after the read-only exact-reference preflight counted zero matching Leads in both databases. The deployed site returned HTTP 200 with `leadCaptured: true` and displayed its confirmation. [Browser quote receipt](evidence/browser-quote.json).

The exact Tracking Reference now matches one Form Lead in `testvantagemovers_sitepreview` and zero in `vantagemovers`. The isolated API returned the same Lead ID and reference. Mongo readback verified Main Site source, LID, move size, disabled Granot posting, zero Lead Messages and zero Sheet Sync entries. The outcome report grouped the capture under Canyon with the expected English homepage and bounded review campaign. [Read-only API and database receipt](evidence/quote-readback.json).

The first workflow failed after deployment when its CLI forwarded a token option to curl. Commit `4f0c68efaa90b3a17ed4e6a61dc56607bc4852fc` moved smoke authentication to the CLI's environment. That run stopped before deployment on the existing intermittent Bricolage remote font parsing failure. [Initial Main Site run](https://github.com/jbell-rusty-vantage/vantage-movers-clients/actions/runs/43467203243) · [Workflow correction run](https://github.com/jbell-rusty-vantage/vantage-movers-clients/actions/runs/43467652330) · [Successful Partner Clients Preview](https://github.com/jbell-rusty-vantage/vantage-movers-clients/actions/runs/43467203227).

## Verify a Canyon deployment

```sh
vercel ls vantage-movers-clients-main-site --scope vantage-4d3db9ef --environment preview \
  --meta githubCommitRef=agent/main-site-canyon --meta "githubCommitSha=${WEBSITE_SHA}"
vercel inspect https://vantage-main-site-canyon.vercel.app --scope vantage-4d3db9ef
```

Match the alias to the immutable URL in the successful workflow summary. Record both deployment IDs and SHAs when verifying deployed Canyon attribution. Use one synthetic quote with an exact Tracking Reference, read the Form Lead from the isolated API, verify the Canyon design and outcome grouping, and check the exact reference has zero matches in production with a read-only query. Use the app's protected preview to qualify real Places requests.

For the first browser quote, use the inbound marker `CANYON-20261113-01`. Pause the browser's outgoing `POST /api/quote` through request interception and retain the submitted `ref_no` and `lid`. The Tracking Reference includes the generated prefix and the marker. Run the read-only `before` check while the request is paused, then continue the request once. Run the read-only `after` check with the same reference and LID.

```sh
node docs/main-site-preview/canyon-2026-11-13/verify-quote.mjs before "$TRACKING_REFERENCE"
node docs/main-site-preview/canyon-2026-11-13/verify-quote.mjs after "$TRACKING_REFERENCE" "$LID"
```

## Production promotion

After Owner selection, first review and integrate the server-owned website attribution contract and its tests into the production server source. Server `main` lacks the attribution contract. Review the canonical snapshot validation, persistence and outcome reporting introduced by preview branch source `e94a27a6`, including the registered route additions in `7f1cceca`. Isolated API commit `b926311e` adds the Canyon design pair to the bounded parser, tests canonical capture and historical optimization/Canyon outcome grouping, and documents the contract. Integrate the relevant production code in a focused PR and confirm the production contract supports both design pairs. Keep the isolated preview entrypoint, deployment workflow, CMS endpoints and test database configuration on their dedicated branch.

After the production server change passes release checks, merge the reviewed website source through a PR to `main`. The Production workflow performs a fresh build with Production configuration. Verify public read-only behavior against the production deployment. Production synthetic Form Lead submissions require explicit Owner authorization.
