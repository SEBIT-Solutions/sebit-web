#!/usr/bin/env node
// sebit.cz · keep the design-system rules in AGENTS.md equal to the installed release
// -----------------------------------------------------------------------------------------
// The block between the two markers in AGENTS.md is a copy of
// @sebit/design-tokens/dist/ai/AGENTS.snippet.txt (generated in sebit-design from its
// Agent contract). `npm run sync:agents` rewrites it; `--check` (CI) fails when it differs.
import { readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';

const require = createRequire(import.meta.url);
const pkgDir = path.dirname(require.resolve('@sebit/design-tokens/package.json'));
const { version } = require('@sebit/design-tokens/package.json');
const snippet = readFileSync(path.join(pkgDir, 'dist', 'ai', 'AGENTS.snippet.txt'), 'utf8').trim();
const START = '<!-- ds:rules:start — generated from @sebit/design-tokens, do not edit; npm run sync:agents -->';
const END = '<!-- ds:rules:end -->';
const file = 'AGENTS.md';
const text = readFileSync(file, 'utf8');
const a = text.indexOf(START);
const b = text.indexOf(END);
if (a < 0 || b < a) { console.error(`sync-agents: ${file} lacks the ${START} … ${END} markers`); process.exit(1); }
const block = `${START}\n<!-- @sebit/design-tokens ${version} -->\n\n${snippet}\n\n${END}`;
const next = text.slice(0, a) + block + text.slice(b + END.length);
if (process.argv.includes('--check')) {
  if (next !== text) { console.error(`sync-agents: the design-system rules in ${file} differ from @sebit/design-tokens ${version} — run npm run sync:agents`); process.exit(1); }
  console.log(`sync-agents: ${file} carries the rules of @sebit/design-tokens ${version}`);
} else {
  writeFileSync(file, next);
  console.log(`sync-agents: wrote the rules of @sebit/design-tokens ${version} into ${file}`);
}
