// Server owns this contract. Check the distributed copy; never silently overwrite it.
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
const server = process.argv[2];
if (!server) throw new Error('Pass the authoritative server src/contracts/websiteAttribution.ts path');
const canonical = await readFile(server, 'utf8');
const copy = await readFile(new URL('../packages/api-client/src/website-attribution.ts', import.meta.url), 'utf8');
const normalize = value => value.replaceAll('\r\n', '\n');
if (normalize(canonical) !== normalize(copy)) throw new Error('Attribution contract drift: update the server-owned distributed copy');
console.log(JSON.stringify({ equal: true, sha256_lf: createHash('sha256').update(normalize(copy)).digest('hex') }));
