#!/usr/bin/env node
// CHANGELOG.md is mandatory: every PR bumps the version and adds its own dated section, and
// every merge to main deploys and tags exactly that version. This script keeps that honest.
//
//   node scripts/changelog.mjs check                 format + package.json/lockfile agree
//   node scripts/changelog.mjs check --base <ref>    …and this branch adds a new, higher version
//   node scripts/changelog.mjs bump <patch|minor|major|x.y.z>
//                                                    sets package.json + lockfile, inserts a section
//   node scripts/changelog.mjs notes [version]       prints one section (release notes)
import { readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const FILE = 'CHANGELOG.md';
const HEAD = /^## \[(\d+\.\d+\.\d+)\] — (\d{4}-\d{2}-\d{2})$/;
const KINDS = ['Added', 'Changed', 'Fixed', 'Removed', 'Security'];

const semver = (v) => v.split('.').map(Number);
const cmp = (a, b) => {
  const [x, y] = [semver(a), semver(b)];
  for (let i = 0; i < 3; i++) if (x[i] !== y[i]) return x[i] - y[i];
  return 0;
};
const readJson = (f) => JSON.parse(readFileSync(f, 'utf8'));

function parse(text) {
  const lines = text.split('\n');
  const sections = [];
  const errors = [];
  let cur = null;
  lines.forEach((line, i) => {
    if (line.startsWith('## ')) {
      const m = HEAD.exec(line);
      if (!m) { errors.push(`${FILE}:${i + 1} heading must be "## [x.y.z] — YYYY-MM-DD": ${line}`); cur = null; return; }
      cur = { version: m[1], date: m[2], line: i + 1, body: [] };
      sections.push(cur);
    } else if (cur) cur.body.push(line);
  });
  for (const s of sections) {
    const bullets = s.body.filter((l) => /^\s*- \S/.test(l));
    if (!bullets.length) errors.push(`${FILE}:${s.line} [${s.version}] has no entry ("- …")`);
    if (s.body.some((l) => /\bTODO\b/.test(l))) errors.push(`${FILE}:${s.line} [${s.version}] still contains TODO`);
    for (const l of s.body) {
      const k = /^### (.+)$/.exec(l);
      if (k && !KINDS.includes(k[1])) errors.push(`${FILE}:${s.line} [${s.version}] unknown group "### ${k[1]}" (use ${KINDS.join(', ')})`);
    }
  }
  for (let i = 1; i < sections.length; i++) {
    if (cmp(sections[i - 1].version, sections[i].version) <= 0)
      errors.push(`${FILE}:${sections[i - 1].line} versions must be newest first and unique (${sections[i - 1].version} above ${sections[i].version})`);
    if (sections[i - 1].date < sections[i].date)
      errors.push(`${FILE}:${sections[i - 1].line} dates must not go backwards (${sections[i - 1].date} above ${sections[i].date})`);
  }
  return { sections, errors };
}

function check(base) {
  const { sections, errors } = parse(readFileSync(FILE, 'utf8'));
  if (!sections.length) errors.push(`${FILE} has no version section`);
  const pkg = readJson('package.json').version;
  const lock = readJson('package-lock.json');
  const top = sections[0]?.version;
  if (top && top !== pkg) errors.push(`package.json version ${pkg} ≠ newest ${FILE} section ${top} — run: npm run changelog:bump -- <patch|minor|major>`);
  if (lock.version !== pkg || lock.packages?.['']?.version !== pkg) errors.push(`package-lock.json version ≠ package.json ${pkg} — run: npm install --package-lock-only`);
  if (base) {
    let baseVersion = null;
    let baseLog = '';
    try { baseVersion = JSON.parse(execFileSync('git', ['show', `${base}:package.json`], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] })).version; } catch { /* first PR */ }
    try { baseLog = execFileSync('git', ['show', `${base}:${FILE}`], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }); } catch { /* no changelog on base yet */ }
    if (baseVersion && top && cmp(top, baseVersion) <= 0)
      errors.push(`this PR must add a new version above ${baseVersion} (${base}); found ${top} — run: npm run changelog:bump -- <patch|minor|major>`);
    if (baseLog) {
      const kept = parse(baseLog).sections.map((s) => s.version);
      const now = new Set(sections.map((s) => s.version));
      for (const v of kept) if (!now.has(v)) errors.push(`released section [${v}] was removed from ${FILE} — released history is append-only`);
    }
  }
  if (errors.length) {
    for (const e of errors) console.error(`changelog: ${e}`);
    process.exit(1);
  }
  console.log(`changelog: OK — ${sections.length} versions, newest ${top} (${sections[0].date})${base ? `, new against ${base}` : ''}`);
}

function bump(arg) {
  const pkg = readJson('package.json');
  let next = arg;
  if (['patch', 'minor', 'major'].includes(arg)) {
    const [a, b, c] = semver(pkg.version);
    next = arg === 'major' ? `${a + 1}.0.0` : arg === 'minor' ? `${a}.${b + 1}.0` : `${a}.${b}.${c + 1}`;
  }
  if (!/^\d+\.\d+\.\d+$/.test(next ?? '')) { console.error('usage: changelog.mjs bump <patch|minor|major|x.y.z>'); process.exit(2); }
  if (cmp(next, pkg.version) <= 0) { console.error(`changelog: ${next} is not above ${pkg.version}`); process.exit(1); }
  execFileSync('npm', ['version', next, '--no-git-tag-version', '--allow-same-version'], { stdio: 'inherit' });
  const today = new Date().toISOString().slice(0, 10);
  const text = readFileSync(FILE, 'utf8');
  const at = text.indexOf('\n## ');
  const section = `## [${next}] — ${today}\n\n### Changed\n- TODO: what changed for a visitor or for the people who maintain the site, and why.\n\n`;
  writeFileSync(FILE, at < 0 ? `${text.trimEnd()}\n\n${section}` : `${text.slice(0, at + 1)}${section}${text.slice(at + 1)}`);
  console.log(`changelog: ${pkg.version} → ${next}; fill in the new section in ${FILE} (check fails while it says TODO)`);
}

function notes(version) {
  const { sections } = parse(readFileSync(FILE, 'utf8'));
  const s = version ? sections.find((x) => x.version === version) : sections[0];
  if (!s) { console.error(`changelog: no section ${version}`); process.exit(1); }
  process.stdout.write(`${s.body.join('\n').trim()}\n`);
}

const [cmd, ...rest] = process.argv.slice(2);
if (cmd === 'check') {
  const i = rest.indexOf('--base');
  check(i >= 0 ? rest[i + 1] : null);
} else if (cmd === 'bump') bump(rest[0]);
else if (cmd === 'notes') notes(rest[0]);
else { console.error('usage: changelog.mjs check [--base <ref>] | bump <patch|minor|major|x.y.z> | notes [version]'); process.exit(2); }
