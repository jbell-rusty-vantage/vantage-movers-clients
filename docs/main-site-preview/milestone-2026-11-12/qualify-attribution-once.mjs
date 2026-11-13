// One authorized deployed preview submission. Never repeat after an attempt journal exists.
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
if (process.argv[2] !== '--submit-one-preview-quote') throw new Error('Explicit one-shot qualification mode required');
process.env.SITE_PREVIEW_EVIDENCE_RUN = 'attribution-20261112';
process.env.SITE_PREVIEW_URL = 'https://vantage-movers-clients-main-site-4oxm9wd0i-vantage-4d3db9ef.vercel.app';
process.env.SITE_PREVIEW_SOURCE_SHA = '73b4d7c7494e3f43cc006b2e88137596860ef0b1';
process.env.SITE_PREVIEW_ATTRIBUTION_PROOF = '1';
const apiSha = 'e94a27a6ba9e9c02fd65b3429f9f24fb0c18d4a2';
const q = await import('../session-8/preview-qualification.mjs');
const api = await q.previewConnection();
async function readReport(name) {
  const response = await api.get('/api/v1/site-preview/website-outcomes');
  const body = await response.json();
  q.check(response.status === 200 && body.source_sha === apiSha, 'Deployed API source mismatch');
  await q.saveEvidence(name, body);
  return body.data.data;
}
const before = await readReport('outcomes-before.json');
const tokenResult = spawnSync('vercel api /v9/projects/vantage-movers-clients-main-site --scope vantage-4d3db9ef', { shell: true, encoding: 'utf8', timeout: 45000 });
const bypass = Object.keys(JSON.parse(tokenResult.stdout).protectionBypass)[0];
q.check(Boolean(bypass), 'Preview site-scoped bypass missing');
const result = spawnSync(process.execPath, [fileURLToPath(new URL('../session-8/qualify-deployed-ui.mjs', import.meta.url)), '--submit-one-preview-quote'], { env: { ...process.env, SITE_PREVIEW_BYPASS: bypass }, stdio: 'inherit', timeout: 240000 });
if (result.status !== 0) process.exit(result.status ?? 1);
const after = await readReport('outcomes-after.json');
q.check(after.totals.form_leads === before.totals.form_leads + 1, 'Expected one new preview Lead in outcome cohort');
q.check(after.totals.attributed_leads === before.totals.attributed_leads + 1, 'Expected one new attributed Lead');
q.check(after.totals.unknown_attribution_leads === before.totals.unknown_attribution_leads, 'Historical unknown attribution changed');
console.log(JSON.stringify({ outcomeReport: 'passed', sourceSha: apiSha, addedLeads: 1, addedAttributedLeads: 1, historicalUnknownsUnchanged: true }));
