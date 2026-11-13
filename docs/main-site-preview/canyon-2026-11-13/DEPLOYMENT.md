# Canyon preview deployment

Canyon uses branch `agent/main-site-canyon` in `jbell-rusty-vantage/vantage-movers-clients`. The Main Site Preview workflow deploys its exact source to the existing `vantage-movers-clients-main-site` project. The project is linked to GitHub, and the app's Vercel configuration delegates deployments to GitHub Actions.

Earlier runs built GitHub's detached PR test-merge. Vercel stored `githubCommitRef=HEAD` and the test-merge SHA even though the workflow exported the branch name. The updated workflow checks out the PR head or push SHA, checks that the checkout matches, attaches the source branch locally and supplies explicit GitHub metadata to Vercel. The deployment remains a CLI deployment. GitHub branch and commit metadata support source display and filtering, while the workflow assigns the stable Canyon review URL. [Vercel CLI branch association](https://vercel.com/docs/cli/deploy#associate-a-cli-deployment-with-a-git-branch) · [Vercel's GitHub Actions guidance](https://vercel.com/kb/guide/how-can-i-use-github-actions-with-vercel).

The workflow runs lint, typecheck and contract/publication tests, pulls the Vercel Preview configuration for the branch, verifies the isolated API origin and Form Lead route, and builds with the approved preview credentials. Preview runtime uses the same project's Preview configuration. The Form Lead route is `api/v1/form-leads`, and the shared preview API is `https://vantage-sites-preview-api.vercel.app`. GitHub holds the build API credentials and Vercel holds the runtime API and Places credentials. The Canyon branch inherits the existing Preview variables. Vercel omitted the sensitive Places credential from the local Preview pull.

The workflow checks the Canyon deployment's project, Ready state, Preview target, GitHub branch and exact SHA before assigning `vantage-main-site-canyon.vercel.app`. Its authenticated request to Consumer Information checks the Canyon presentation marker, the noindex response header and the isolated carrier fixture. The branch head must still match the build. A second API lookup verifies where the alias points. The optimization review alias is separately pinned to its qualified deployment.

## Isolated API admission

The server-owned v1 contract admits `main-site-canyon` / `2026-11-13` alongside `main-site-optimization` / `2026-11-12`. The client uses the selected presentation to choose the bounded design for analytics and quote attribution. The Main Site CMS still serves the existing shared catalog, including Owner edits.

- API source `b926311ee9b8ceb16be57dad9435624f1ad8beac`. The isolated preview workflow passed typecheck and 20 focused tests. [GitHub Actions](https://github.com/jbell-rusty-vantage/vantage-movers-server/actions/runs/43465326134).
- Deployment `dpl_EMKkp6QcLeXz3Sd1tR97A9LLKCiX`, Ready, Preview. The stable API URL resolves to this deployment. [Immutable API deployment](https://vantage-sites-preview-o5av3tbjr-vantage-4d3db9ef.vercel.app).
- Runtime readback confirmed the exact server SHA, database `testvantagemovers_sitepreview`, authenticated outcome report HTTP 200, invalid auth HTTP 401, forbidden list-all Form Leads HTTP 404 and the isolated carrier fixture. Deployed Canyon quote capture requires a separate synthetic submission and readback.

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

After Owner selection, merge the reviewed source through a PR to `main`. The Production workflow performs a fresh build with Production configuration.
