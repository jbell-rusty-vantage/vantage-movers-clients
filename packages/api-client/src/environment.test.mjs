import assert from 'node:assert/strict';
import { test } from 'node:test';
import { resolveApiBaseUrl, PRODUCTION_API_URL } from './environment.ts';

test('preview refuses absent, malformed, credential-bearing and live API origins', () => {
  for (const value of [undefined, '', 'https://', 'ftp://example.com', 'https://user:pass@example.com', PRODUCTION_API_URL, `${PRODUCTION_API_URL}/`, 'vantage-movers-servers.vercel.app']) {
    assert.throws(() => resolveApiBaseUrl(value, 'preview'));
  }
});
test('preview resolves the isolated API while production keeps its existing default', () => {
  assert.equal(resolveApiBaseUrl('https://preview.example.com/', 'preview'), 'https://preview.example.com');
  assert.equal(resolveApiBaseUrl(undefined, 'production'), PRODUCTION_API_URL);
});
