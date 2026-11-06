// Lists every placeholder (<Ph>, rendered as data-placeholder) left in the built
// site, so the launch checklist is visible in CI. Run after `npm run build`.
// Exit code stays 0: placeholders are a content task, not a build failure.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const DIST = new URL('../dist/', import.meta.url).pathname;
const walk = (d) => readdirSync(d).flatMap((f) => {
  const p = join(d, f);
  return statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') ? [p] : [];
});
let total = 0;
for (const file of walk(DIST)) {
  const html = readFileSync(file, 'utf8');
  const found = [...html.matchAll(/data-placeholder[^>]*>(.*?)<\/span>/g)].map((m) => m[1].replace(/<[^>]+>/g, ''));
  if (!found.length) continue;
  total += found.length;
  console.log(`${file.replace(DIST, '/')}  (${found.length})`);
  for (const t of [...new Set(found)]) console.log(`   - ${t}`);
}
console.log(total ? `\n${total} placeholders to fill before launch.` : 'No placeholders left.');
