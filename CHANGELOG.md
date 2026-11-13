# Changelog — sebit.cz

Every PR adds one section here **and** bumps `version` in `package.json` (`npm run changelog:bump -- <patch|minor|major>`). A merge to `main` deploys the site and tags `v<version>` with this section as the release notes. CI fails a PR that does not do both (`npm run check:changelog`).

- **major**: a redesign, a new information architecture, or URLs that go away.
- **minor**: a new page, section or feature; a new design-system release that changes how the site looks.
- **patch**: copy, facts, fixes, dependencies, internal tooling.

Groups: `### Added`, `### Changed`, `### Fixed`, `### Removed`, `### Security`. Write for whoever reads the history next: what changed on the site and why, not which files moved. Released sections are never rewritten.

## [2.1.0] — 2026-11-13

### Changed
- The design system comes from the GitHub Release of `sebit-design` (`v6.0.0-alpha.3`: `@sebit/design-tokens` + `@sebit/react`, the `.tgz` files in `vendor/sebit/`), not from a hand-copied snapshot. Updating the design system is now one PR that swaps the two files.
- Buttons and icons use the design-system classes `.sb-button*` and `.sb-icon`; the removed kit classes `.kit-btn*` and `.sb-i` are gone. Visible effect: buttons are 2 px wider and the label sits 1 px lower — the design system's button metrics.
- Logos, icons, favicons and OG images under `public/assets/` are copied from the release on every `dev`/`build` (`scripts/sync-ds-assets.mjs`) instead of being committed. The share image is now `/assets/og/og_solutions.png`, the favicon `/assets/favicon/favicon_arrow.svg`.

### Added
- `AGENTS.md` (and `CLAUDE.md`): how the site is built and why, what an agent may change, the workflow, and the design-system rules synced from the release (`npm run sync:agents`).
- This changelog, enforced in CI, and a `v<version>` tag with a GitHub Release on every deploy.
- `npm run lint:ds` (the design-system checker from the release) and `npm run check:agents` run in CI.

### Removed
- `src/styles/ds/` (the copied `tokens.css`, `bundle.css`, kit stylesheets and fonts — Inter now comes from `@sebit/design-tokens`) and the committed copies in `public/assets/logos/` and `public/assets/icons/`. The old files in the root of `public/` stay: e-mail signatures and old links point to them.

## [2.0.0] — 2026-11-06

### Changed
- New sebit.cz on Astro 5 and the SEBIT Design System (#11): pages Co děláme (four areas, Oracle Forms modernisation, základní registry), IT outsourcing, Reference, O nás, Kariéra, Kontakt and privacy; interactive sample reports; facts still to confirm marked with `<Ph>`.
- Canonical domain `sebit.cz` instead of `www.sebit.cz` (#12).
- Logos as outlined paths from `sebit-design` (#13), larger wordmark in the header, footer, ecosystem cards and Kariéra (#14).
- Home page: question section removed, cards toggle, calmer colour rhythm, scroll cue (#15).

### Fixed
- The contact form sends the brief to info@sebit.cz through Resend (Supabase Edge Function `supabase/functions/contact`) instead of failing (#16).

### Removed
- The 2025 static site. Old URLs (`/solutions`, `/manifest`, `/labs`, `/Academy`, `/Medical`, `/privacy`) redirect; the internal tools in `public/timeline/` and `public/jira/` are unchanged.
