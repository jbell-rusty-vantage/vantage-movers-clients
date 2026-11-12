import fs from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';
import crypto from 'node:crypto';

// Run from the repository root. Same Sharp quality/resize approach as session 5.
const here = 'docs/main-site-preview/milestone-2026-11-12/media';
const config = JSON.parse(await fs.readFile(`${here}/prompts.json`, 'utf8'));
const require = createRequire(await fs.realpath(path.resolve('apps/main-site/node_modules/next/package.json')));
const sharp = require('sharp');
const sha256 = buffer => crypto.createHash('sha256').update(buffer).digest('hex');
const entries = [];
for (const entry of config.entries) {
  const sourcePath = path.join(config.sourceRoot, entry.sourceFile);
  const input = await fs.readFile(sourcePath);
  const sourceMetadata = await sharp(input).metadata();
  const outputs = [];
  for (const [width, quality, suffix] of [[1440, 82, ''], [720, 80, '-720']]) {
    const file = `apps/main-site/public/images/preview/${entry.name}${suffix}.webp`;
    await sharp(input).resize({ width, withoutEnlargement: true }).webp({ quality }).toFile(file);
    const buffer = await fs.readFile(file);
    const metadata = await sharp(buffer).metadata();
    outputs.push({ file, width: metadata.width, height: metadata.height, bytes: buffer.length, sha256: sha256(buffer), quality, crop: 'none; full original frame retained' });
  }
  let editInput;
  if (entry.edit) {
    const inputPath = path.join(config.sourceRoot, entry.edit.inputSourceFile);
    const buffer = await fs.readFile(inputPath);
    editInput = { path: inputPath, sha256: sha256(buffer), bytes: buffer.length, selected: false };
  }
  entries.push({ ...entry, source: { path: sourcePath, width: sourceMetadata.width, height: sourceMetadata.height, bytes: input.length, sha256: sha256(input) }, ...(editInput ? { editInput } : {}), outputs, status: config.approval });
}
await fs.writeFile(`${here}/assets.json`, JSON.stringify({ generatedDate: config.generatedDate, direction: config.direction, generator: config.generator, rightsAndProvenance: config.rightsAndProvenance, entries }, null, 2) + '\n');
console.log(JSON.stringify(entries.map(({ name, outputs }) => ({ name, outputs })), null, 2));
