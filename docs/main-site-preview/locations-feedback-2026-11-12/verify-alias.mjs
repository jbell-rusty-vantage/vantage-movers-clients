import { spawnSync } from 'node:child_process';
import { writeFile } from 'node:fs/promises';
const base = 'https://vantage-main-site-optimization.vercel.app';
const project = JSON.parse(spawnSync('vercel api /v9/projects/vantage-movers-clients-main-site --scope vantage-4d3db9ef', { shell: true, encoding: 'utf8' }).stdout);
const token = Object.keys(project.protectionBypass)[0];
if (!token) throw new Error('Preview bypass unavailable');
const results = [];
for (const [path, expected] of [
  ['/', 'Explore all locations'],
  ['/locations', '50 states. A fresh start.'],
  ['/es/destinos', '50 estados. Un nuevo comienzo.'],
  ['/services/long-distance-moving', 'Explore all locations'],
]) {
  const response = await fetch(base + path, { headers: { 'x-vercel-protection-bypass': token } });
  const html = await response.text();
  const robots = response.headers.get('x-robots-tag');
  results.push({ path, status: response.status, expectedCopy: html.includes(expected), noindex: Boolean(robots?.includes('noindex') || /name="robots" content="[^"]*noindex/.test(html)) });
}
await writeFile(new URL('./evidence/stable-alias.json', import.meta.url), JSON.stringify({ base, results }, null, 2));
console.log(JSON.stringify(results));
if (results.some(r => r.status !== 200 || !r.expectedCopy || !r.noindex)) process.exitCode = 1;
