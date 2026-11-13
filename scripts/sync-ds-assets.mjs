#!/usr/bin/env node
// sebit.cz · copy the brand files from the installed SEBIT Design System release into public/
// -----------------------------------------------------------------------------------------
// Runs before `dev` and `build` (predev / prebuild). The release (@sebit/design-tokens, a
// .tgz in vendor/sebit/) is the only source of logos, icon sprites, the favicon signet and
// the Open Graph cards. The copies in public/assets/{logos,icons,favicon,og}/ are build
// output: git-ignored, never edited (DECISIONS #15 in sebit-design).
import { cpSync, mkdirSync, rmSync, existsSync, readdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';

const require = createRequire(import.meta.url);
const pkgDir = path.dirname(require.resolve('@sebit/design-tokens/package.json'));
const from = path.join(pkgDir, 'dist', 'assets');
const to = path.resolve('public', 'assets');
if (!existsSync(from)) {
  console.error('sync-ds-assets: @sebit/design-tokens has no dist/assets — install a release ≥ 6.0.0-alpha.3 (npm ci)');
  process.exit(1);
}
let n = 0;
for (const dir of ['logos', 'icons', 'favicon', 'og']) {
  rmSync(path.join(to, dir), { recursive: true, force: true });
  mkdirSync(path.join(to, dir), { recursive: true });
  cpSync(path.join(from, dir), path.join(to, dir), { recursive: true });
  n += readdirSync(path.join(to, dir)).length;
}
const { version } = require('@sebit/design-tokens/package.json');
console.log(`sync-ds-assets: ${n} brand files from @sebit/design-tokens ${version} → public/assets/`);
