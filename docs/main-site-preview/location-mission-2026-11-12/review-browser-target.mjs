import { spawnSync } from 'node:child_process';
import { resolve, sep } from 'node:path';
import { pathToFileURL } from 'node:url';
import { assertPreviewSite } from '../session-8/preview-qualification.mjs';

export function reviewBrowserTarget(name, configuredUrl = process.env.REVIEW_URL) {
  const deployed = Boolean(configuredUrl);
  const origin = deployed ? assertPreviewSite(configuredUrl) : 'http://localhost:3001';
  const outputRoot = process.env.REVIEW_OUTPUT
    ? pathToFileURL(resolve(process.env.REVIEW_OUTPUT) + sep)
    : new URL(deployed ? './evidence/deployed/' : './evidence/', import.meta.url);
  const output = new URL(`${name}/`, outputRoot);
  let bypass;
  if (deployed) {
    const result = spawnSync('vercel api /v9/projects/vantage-movers-clients-main-site --scope vantage-4d3db9ef', {
      shell: true, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'],
    });
    if (result.status !== 0) throw new Error('Could not access the Main Site Vercel project');
    try {
      bypass = Object.keys(JSON.parse(result.stdout).protectionBypass ?? {})[0];
    } catch {
      throw new Error('Invalid Main Site Vercel project response');
    }
    if (!bypass) throw new Error('Main Site deployment protection bypass is unavailable');
  }

  function continueRead(route) {
    const request = route.request();
    const url = new URL(request.url());
    if (url.origin !== origin || !['GET', 'HEAD'].includes(request.method()) ||
        url.pathname.startsWith('/_vercel/') || url.pathname.startsWith('/api/')) {
      return route.abort();
    }
    return route.continue(bypass ? {
      headers: { ...request.headers(), 'x-vercel-protection-bypass': bypass },
    } : {});
  }

  return { deployed, origin, output, continueRead };
}
