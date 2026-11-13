# AGENTS.md — sebit.cz

The public website of SEBIT Solutions s.r.o. Read this whole file before you change anything. The design-system rules at the end come from the installed release and **win any conflict** with habits or with the rest of this file.

## What this site is, and why it looks like this

- **Purpose.** sebit.cz sells to people who decide about operations and finance in Czech firms. It shows what SEBIT does (data and reporting, integrations through SEBIT Gateway, AI, websites, IT outsourcing), proves it with sample reports, references and named people, and ends every page with one way to talk to us: the brief form on `/kontakt/`.
- **Look.** It is a consumer of the **SEBIT Design System** (`github.com/SEBIT-Solutions/sebit-design`). Navy and white grounds, flat colour and no photos except real SEBIT people, Inter only, lime as a single accent per screen, one button shape. This is deliberate brand policy (brand guidelines + DECISIONS in `sebit-design`), not taste — do not "freshen it up".
- **Built static on purpose.** Astro 5 static output, no client framework, a little vanilla JS only where something is interactive (sample report, role catalogue, brief form, mobile menu). Hosted on GitHub Pages. That means fast pages, no server to patch, no cookies and no third-party requests on page load (the only outside call is the brief form posting to the Supabase function on submit) — so the site needs no cookie banner, and `/ochrana-osobnich-udaju/` says so. Keep it that way: no analytics, CDNs, external fonts, embeds or trackers without Vojta's explicit decision, and if one ever comes, the privacy page changes in the same PR.
- **One source of truth for the brand.** Tokens, the `.sb-*` component classes, Inter, logos, icons, favicons and OG images all come from one `sebit-design` GitHub Release, installed from `vendor/sebit/*.tgz`. Nothing brand-related is copied or retyped into this repository.

## Where things live

| Path | What | Who edits it |
|---|---|---|
| `src/data/site.ts` | every fact and most copy: company, areas, roles, clients, manifest, brief options, `contactEndpoint` | you, for content changes |
| `src/data/reports.ts` | sample data of the interactive reports (always labelled „Ukázková data“) | you |
| `src/pages/` | pages; the URL is the file path (`co-delame/[slug].astro` renders the four area pages) | you |
| `src/components/` | shared blocks; header and footer are in `src/layouts/Base.astro` | you |
| `src/lib/report.ts` | report renderer, the same code at build time and in the browser | you |
| `src/styles/web.css` | the site's own layout, `.w-*` prefix, tokens only | you, sparingly |
| `astro.config.mjs` | `site` (must equal `public/CNAME`), old-URL redirects | you, with care |
| `supabase/functions/contact/` | Edge Function that e-mails the brief through Resend | you, with care (see below) |
| `vendor/sebit/*.tgz` | the design-system release (`@sebit/design-tokens`, `@sebit/react`) | **only replace** with files from a GitHub Release |
| `public/assets/{logos,icons,favicon,og}/` | copied from the release by `scripts/sync-ds-assets.mjs`, git-ignored | **never** |
| `public/` root files (`og.png`, `sebit_*.svg/png`, `favicon.svg`, …) | legacy URLs used by e-mail signatures and old links | **never** delete or rename |
| `public/timeline/`, `public/jira/` | internal tools, disallowed in `robots.txt` | not part of the site — leave alone |
| `CHANGELOG.md` | mandatory history, one section per PR | you, in every PR |
| `AGENTS.md` between the `ds:rules` markers | generated from the release | **never** by hand — `npm run sync:agents` |

How styles load (`src/layouts/Base.astro`): `@sebit/design-tokens/css` (tokens, aliases, self-hosted Inter) → `@sebit/react/styles.css` (the `.sb-*` classes) → `src/styles/web.css` (site layout). Pages use `.sb-button`, `.sb-icon` and the other `.sb-*` classes directly; there is no React at runtime.

## What you may do

- Change copy and facts — in `src/data/site.ts` first, in a page only when the text belongs to that page alone. Czech, vykání (lowercase *vy/váš/vám*), „…“ quotes, numbers quantified and defensible.
- Wrap any fact that is not yet confirmed in `<Ph>…</Ph>`: it renders yellow and is listed by `npm run check:placeholders`. Never invent a client, number, certificate, person or quote to fill a gap.
- Add or rework pages and sections from existing components and `.sb-*` classes. Reuse before you write: a design-system component first, then an existing `src/components/` block, only then new markup.
- Add layout to `web.css` with the `.w-` prefix and `var(--sb-*)` tokens only — for page layout the design system does not cover (grids, section rhythm, hero composition).
- Update the design system to a newer release (procedure below).
- Fix bugs, accessibility and performance.

## What you must not do

- Hard-code a colour, radius, shadow, font size, font name or duration; edit, copy or vendor any design-system file; restyle a `.sb-*` class to look different from the design system. If the design system lacks something, say so — the change belongs in `sebit-design`, then comes here with the next release.
- Redraw, retype or recolour a logo; add an icon library, emoji or unicode glyph as an icon; add a webfont or any CDN.
- Add a second `.w-*` copy of something the design system already has. Existing duplicates — `.w-badge`, `.w-pill`, `.w-table`, `.w-tabs`, `.w-field`, `.w-input`, `.w-textarea`, `.w-stat` — are debt: when a task touches them, move that use to the matching `.sb-*` class instead of extending the `.w-*` one.
- Break a URL. Pages that move or disappear get a redirect in `astro.config.mjs`; files in the root of `public/` stay.
- Weaken the contact function: it sends only to fixed recipients (never to the visitor's address), keeps the origin allow-list, honeypot, minimum fill time and length caps, and reads its key from Supabase secrets. Never put an API key in this repository or in client code. E-mail goes only through Resend on `ai.sebit.cz`.
- Push to `main`, merge a red PR, rewrite a released CHANGELOG section, or deploy by any route other than a merge.

## Workflow

1. Branch from `main` (`feat/…`, `fix/…`, `content/…`, `ds/…`).
2. Make the change. Run `npm run dev` and look at every page you touched, light ground and navy ground, at 375 px and 1280 px.
3. **Changelog — mandatory in every PR:** `npm run changelog:bump -- <patch|minor|major>` sets the version in `package.json` and the lockfile and inserts a dated section into `CHANGELOG.md`; replace its TODO with what changed and why. Rules for the level and the groups are at the top of `CHANGELOG.md`.
4. Before you push: `npm run verify` (builds, then runs `lint:ds`, `check:agents`, `check:changelog` and lists placeholders). It must pass.
5. Open a PR. CI (`.github/workflows/deploy.yml`) builds, runs the same checks and `check:changelog --base origin/main`, so a PR without a new, higher version and its section fails.
6. Merge when CI is green. The push to `main` builds, deploys to GitHub Pages (sebit.cz) and creates the tag `v<version>` with a GitHub Release whose notes are that CHANGELOG section. Then open the live page you changed and check it.

Two PRs open at once will both claim the next version: the second one rebases and bumps again.

## Updating the design system

```bash
gh release download v<x.y.z> -R SEBIT-Solutions/sebit-design -p '*.tgz' -D vendor/sebit
git rm vendor/sebit/*<old-version>*.tgz
# point both dependencies in package.json at the new files, then:
npm install
npm run sync:agents        # the rules block below follows the release
npm run verify
```

Compare the pages before and after (full-page screenshots of all pages). Differences that come from the design system are intended; describe them in the CHANGELOG (`minor` if the site looks different, otherwise `patch`). A new release can turn a former warning into an error: fix the site, never pin an old checker.

## Commands

| Command | What it does |
|---|---|
| `npm ci` | install exactly what the lockfile says (includes the design-system release) |
| `npm run dev` | dev server on http://localhost:4321 (copies the brand assets first) |
| `npm run build` | static site into `dist/` (copies the brand assets first) |
| `npm run preview` | serve the production build |
| `npm run lint:ds` | design-system checker from the installed release over `src/`; must report 0 errors |
| `npm run sync:agents` / `check:agents` | rewrite / verify the rules block in this file |
| `npm run changelog:bump -- <level>` | bump the version and add a CHANGELOG section |
| `npm run check:changelog` | CHANGELOG format, newest section = `package.json` version |
| `npm run check:placeholders` | list `<Ph>` facts still to confirm (after a build) |
| `npm run verify` | build + every check above — run before every push |

## Deployment facts

- GitHub Pages via Actions; Settings → Pages → Source: GitHub Actions. Domain `sebit.cz` (`public/CNAME`), `www.sebit.cz` redirects to it.
- DNS at web4u.cz: apex `A` 185.199.108–111.153 and `AAAA` 2606:50c0:8000–8003::153, `www` `CNAME sebit-solutions.github.io.`
- The contact function is deployed separately: `supabase functions deploy contact --no-verify-jwt`; secrets `RESEND_API_KEY`, `CONTACT_FROM`, `CONTACT_TO` live in Supabase.

<!-- ds:rules:start — generated from @sebit/design-tokens, do not edit; npm run sync:agents -->
<!-- @sebit/design-tokens 6.0.0-alpha.3 -->

<!-- Generated by ai/generate.cjs from README.md (Agent contract), tokens.json, components/ and brand/brand_guidelines.md — do not edit. -->
<!-- SEBIT Design System · tokens v1 · 170 tokens · 37 components. Paste into the AGENTS.md of a repository that uses the SEBIT Design System. -->

## SEBIT Design System

UI, copy and assets in this repo follow the SEBIT Design System. Its rules win over habits; when they conflict with this file, the design system wins.

- Source of truth: https://claude.ai/artifact/1M4rBe9JCMmN6RiEriyEt4 (start at project/README.md → Agent contract; index at project/llms.txt).
- Values: `var(--sb-*)` only — never copy a hex, px radius or font name out of the design system. Unknown token → ask.

### Rules
- **Tokens only.** Every colour, radius, shadow, font size, z-index and duration is a `var(--sb-*)`. No hex, `rgb()`, px radius or font name in your output. Never invent a token — `ai/check.cjs` rejects unknown `--sb-*` names. Missing value: ask.
- **Semantic first.** `--sb-fg-*`, `--sb-bg-*`, `--sb-border-*`, `--sb-status-*`, `--sb-chart-*`; a primitive (`--sb-navy-700`) only where no semantic token fits. Each token's usage note (in `tokens.json`) says where it may sit and its contrast.
- **Lime is an accent, on a budget.** Per screen: the arrow signet plus ONE lime element — the closing CTA, one highlighted data point, or an active state (nav underline, selected tab, focus ring). Headlines, stat numbers, eyebrow text and the hero CTA stay white or navy (DECISIONS #27). Never a section fill, never body text, never lime text on white.
- **Flat grounds.** Long pages alternate `--sb-bg-page` → `--sb-grey-100` → `--sb-bg-inverse` → `--sb-bg-surface`. No gradients, blur, patterns, textures or photos (exceptions: Academy, and portraits of real SEBIT people on O nás / Kariéra — brand §7, DECISIONS #22).
- **Inter only** (`--sb-font-sans`); code in `--sb-font-mono`. No other webfont, no Google Fonts CDN (GDPR, DECISIONS #13).
- **Logos are files.** `<img src="assets/logos/sebit_{solutions|labs|medical|academy|group}_{light|dark}.svg">` — light on white/grey, dark on navy; each file already contains the signet. Standalone signet: `assets/favicon/favicon_arrow.svg`, always left of the wordmark. Never redraw, retype, recolour or generate a logo (DECISIONS #15).
- **Icons from the sprites.** `<svg class="sb-icon" aria-hidden="true"><use href="assets/icons/_sebit-ui-icons.svg#i-arrow-right"/></svg>` — core UI glyphs in `_sebit-ui-icons.svg`, domain glyphs in `_sebit-icons.svg`; the names are listed in `llms-full.txt` § Icons and nothing else exists. No icon libraries, no emoji, no unicode glyphs (★ ▸ → ✓).
- **One button shape.** `--sb-radius-button` (8 px) on every surface, at least 44 px tall on marketing surfaces (DECISIONS #25). One primary per view; lime variant only for the closing CTA on navy; hero CTA on navy is white (`onNavy`). Label in Czech, sentence case, verb first, naming the outcome („Probrat projekt“; „Kontaktujte nás“ as fallback, DECISIONS #24).
- **Copy.** Czech, `lang="cs"`. Always vykání: lowercase *vy / váš / vám* on web, UI and ads, capital *Vy / Váš / Vám* in e-mails, letters and client documents (DECISIONS #17); the company speaks as *my / naše*. Czech quotes „…“. No exclamation marks except „Rádi vám pomůžeme!“. Numbers quantified and defensible. Signature copy: brand §2.6.
- **Accessible.** WCAG 2.2 AA. Focus with `--sb-focus-ring` (`--sb-focus-ring-on-inverse` on navy). Motion through `--sb-motion-*`, which already honour `prefers-reduced-motion`; no bounce, parallax or autoplay.
- **Reuse before you write.** A component (`@sebit/react` or its `.sb-*` classes) or a template before new markup. There is no second class system: the `.kit-*` kits were removed (DECISIONS #29). Change only what the task asks.

### Commands
- Lint changed UI files: `node <path-to-design-system>/ai/check.cjs <files>` — must exit 0.
- Do not edit vendored `tokens.css`, `components/bundle.js` or other generated design-system files; change the design system instead.

### Scope
Change only what the task asks. Reuse a design-system component, kit class or template before writing new UI.

<!-- ds:rules:end -->
