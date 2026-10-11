# SEBIT Design System

Design system for **SEBIT Solutions s.r.o.**, a Czech IT consulting firm. This
system captures the visual language, copy style, and UI components used across
the company's four divisions so designers and agents can produce on-brand
artifacts without guesswork.

---

## Company context

SEBIT Solutions s.r.o. (`info@sebit.cz`, `www.sebit.cz`) is a Czech **IT
consulting** company based in Mělník. Its public web presence is a static site
on GitHub Pages serving five surfaces under one brand:

| Division        | URL path          | Purpose                                                   |
|-----------------|-------------------|-----------------------------------------------------------|
| **Solutions**   | `/` (root)        | IT consulting, bodyshopping (T&M), team leasing, FT&FP    |
| **Labs**        | `/labs`           | R&D, experimental tech, prototypes                        |
| **Medical**     | `/Medical`        | Healthcare IT — HL7/FHIR integrations, EHR, GDPR          |
| **Academy**     | `/Academy`        | Student internships and IT courses                        |
| **Manifest**    | `/manifest`       | Company values (7-point "Manifest Spolupracovníka")       |

Core service offerings (Solutions): Bodyshopping (Time & Materials), Team
leasing, Dodávka na klíč (fixed-time/fixed-price), plus two specialist software
products — integration with Czech **základní registry státu** (ROB/ROS/RPP/RÚIAN)
and **Oracle Forms modernization** via REST API wrapping.

All copy is in **Czech**. All public URLs hang off `sebit.cz`.

### Sources consulted

- **GitHub repo:** [`SEBIT-Solutions/sebit-web`](https://github.com/SEBIT-Solutions/sebit-web) (branch `main`) — full static site, imported into `source/`.
- **Brand guidelines:** `source/brand_guidelines.md` — logo, palette, typography rules.
- **Live site:** `https://www.sebit.cz/`
- **Logo SVGs:** `assets/sebit_{division}_{light,dark}.svg` + `assets/favicon_arrow.svg`.
- **OG cards:** `assets/og_{division}.svg` (1200×630).

No Figma files, design tokens repo, or font binaries were provided. All tokens
in `colors_and_type.css` are reverse-engineered from the Tailwind config and
inline markup in the source pages.

---

## File index

| Path                          | What it is                                                                 |
|-------------------------------|----------------------------------------------------------------------------|
| `README.md`                   | You are here — the manifest.                                               |
| `SKILL.md`                    | Agent skill front-matter (compatible with Claude Code skills).             |
| `colors_and_type.css`         | CSS custom properties + semantic type classes. Import from any artifact.   |
| `assets/`                     | All logos, OG images, favicon. Copy from here — don't redraw.              |
| `preview/`                    | Design-system cards (colors, type, components) registered to the DS tab.  |
| `ui_kits/marketing/`          | React/JSX recreation of the SEBIT marketing site (hero, nav, cards, etc.). |
| `source/`                     | Imported source site — read-only reference. Do not link assets from here. |

### UI kits

- **`ui_kits/marketing/`** — the public-facing `sebit.cz` site, recreated as
  modular JSX components (`Nav`, `Hero`, `DivisionCard`, `ServiceCard`,
  `StatBlock`, `Testimonial`, `ContactForm`, `Footer`). `index.html` shows a
  working clickthrough of the Solutions homepage.

---

## CONTENT FUNDAMENTALS

### Language & voice

- **Czech (cs)** is the only language. Every public page ships `lang="cs"`.
- **Formal "vy/Vaše"** — the company addresses clients using the formal second
  person, with **capitalized "Vy/Vaše/Vám"** inside running text. Example from
  Software Development: *"Připravíme pro **Vaši** společnost kompletní
  implementaci..."*, and from Oracle Forms: *"Pokud chcete odejít z technologie
  Oracle Forms, ale nechcete řešit přepis..."*.
- **First-person plural "my/naši/jsme"** — the company speaks as a team, never
  as an individual or as the product. *"Nabízíme..."*, *"Jsme tým odborníků..."*,
  *"Naším cílem je..."*.
- **No English marketing loanwords** mid-sentence unless they are genuine
  technical terms (*Bodyshopping*, *Team leasing*, *Oracle Forms*,
  *REST API*, *DevOps*). Industry role names stay in English
  (*Solution Architect*, *Scrum Master*, *Java Developer*).
- **No emoji**. Zero across the entire source site.
- **No exclamation marks** outside the contact section ("Rádi vám pomůžeme!").
  The voice is calm, professional, grown-up.

### Tone

- **Reassuring and competent**, never salesy. Benefit-led but hedged with
  concrete scope: *"Jednoduché a profesionální řešení vašich kapacitních
  problémů s vývojem, včetně pronájmu celých týmů."*
- **Transparent**. The Manifest explicitly values *"transparentní výkaznictví"*
  and *"otevřená komunikace"*. Marketing copy mirrors this — claims are
  quantified where possible (*"50+ úspěšně obsazených pozic"*, *"5+ let
  zkušeností"*, *"98% spokojenost klientů"*) and never embellished.
- **Pragmatic, not visionary**. Even Labs (R&D) grounds itself in *"prototypy
  digitálních řešení"* rather than futuristic promises.

### Casing

- **Section headings:** Sentence case — *"Proč si vybrat SEBIT Solutions"*,
  *"Kontaktujte nás"*, *"Nahrazení technologie Oracle Forms"*.
- **Card titles (h3):** Sentence case — *"Správa základních registrů"*,
  *"Bodyshopping (T&M)"*.
- **Logo wordmark:** `SEBIT` all-caps + `SOLUTIONS` / `LABS` / `MEDICAL` /
  `ACADEMY` all-caps with letter-spacing on the sub-word.
- **Eyebrow labels:** UPPERCASE with wide tracking, lime color — used on
  Manifest (`SEBIT Solutions` over the page title).
- **Buttons:** Sentence case with imperative verb — *"Kontaktujte nás"*,
  *"Zjistit více"*, *"Odeslat zprávu"*, *"Začněme spolupráci"*.
- **Nav items:** Sentence case — *"Domů"*, *"Consulting"*, *"Software
  development"*, *"Kontakt"*.

### Signature copy snippets

- Hero CTA: **"Kontaktujte nás"**
- Closing CTA (reference section): **"Začněme spolupráci"**
- Disclosure button: **"Zjistit více"**
- Footer copyright: **"© {year} SEBIT Solutions s.r.o. Všechna práva vyhrazena."**
- Contact email line: **"info@sebit.cz"** · Phone: **"+420 721 405 384"**

---

## VISUAL FOUNDATIONS

### Palette

Three-color palette, used strictly:

| Role          | Hex       | Notes                                                  |
|---------------|-----------|--------------------------------------------------------|
| Navy          | `#002B5C` | Backgrounds of hero/divisions/reference/footer; primary text on white. |
| Lime          | `#C6FF00` | **Accent only** — arrow, stat numbers, CTA on navy, hover states, eyebrow tags. Never a large background. |
| White         | `#FFFFFF` | Card backgrounds, body bg, text on navy.               |

Supporting neutrals are Tailwind's default grays — `gray-50` (kontakt bg),
`gray-100` (alt section bg), `gray-200` (inert button), `gray-300` (muted text
on navy), `gray-500/600` (body on white), `gray-800` (default text).

**Lime rule:** lime is an ACCENT, not a fill. It appears as a small shape
(arrow stroke, icon circle), a hover color shift on links/buttons, or a big
stat number. **Never** lime-on-lime; **never** navy-on-dark-navy (per brand
guidelines).

### Typography

- **One family: Inter** (with Poppins as a historical fallback per brand
  guidelines). Weights loaded: 400 / 500 / 700 / 800. Tabular but friendly,
  geometric sans.
- **Hierarchy** (from source):
  - Hero `h1`: `text-4xl md:text-6xl font-extrabold` (36 → 60 px).
  - Section `h2`: `text-3xl font-bold` (30 px).
  - Card `h3`: `text-xl font-semibold` (20 px).
  - Hero subtitle: `text-lg md:text-2xl` (18 → 24 px, regular).
  - Body: `text-base` (16 px), line-height `leading-relaxed` ≈ 1.625.
  - Stat: `text-5xl font-extrabold` in lime.
- **No serif, no mono.** Any code blocks on the site use browser defaults.
- **Wide letter-spacing** only on the logotype's sub-word and on uppercase
  eyebrows.

### Layout

- **Container:** Tailwind's `container mx-auto px-4`, frequently capped with
  `max-w-5xl` (hero) or `max-w-6xl` (manifest grid). Everything is centered.
- **Grid rhythm:** `grid-cols-1 md:grid-cols-2/3/4 gap-6/8`. Card grids are
  the dominant layout device — two, three, or four columns, never
  asymmetric.
- **Vertical rhythm:** `py-16` for short sections (divisions), `py-20` for
  long narrative sections (Consulting, Software development, Reference,
  Kontakt). Section headings sit in a centered `mb-12` block above the grid.
- **Fixed nav:** white, `shadow`, `h-[4.5rem]`, always present at the top.
  A **sticky CTA pill** (lime, bottom-right, mobile only) appears after 400 px
  scroll.

### Backgrounds

- **No full-bleed photography.** No patterns, no textures, no illustrations.
- **No gradients** except a throwaway `bg-gradient-to-b from-white via-white
  to-white` on the mobile menu (effectively flat white).
- **Alternating flat fills:** the page alternates white → `gray-100` → navy →
  `gray-50` across sections to give rhythm. That's the entire background
  system.
- **Hero "artwork"** is a large instance of `favicon_arrow.svg` (the lime
  chevron signet) at `h-64`, floated right. Every division's hero does this.

### Borders & radii

- **Radii** are modest. `rounded` (4 px) on inputs and the "Zjistit více"
  button, `rounded-lg` (8 px) on cards, `rounded-xl` (12 px) on testimonial
  cards, `rounded-full` on every CTA and stat badge.
- **Borders** are rarely used. When present: `border border-gray-300` on form
  inputs, `border border-white/20` on translucent testimonial cards over navy.
- **No colored left-border accent cards.** Avoid that trope.

### Shadows

- **Cards:** Tailwind `shadow` at rest, **`shadow-2xl` on hover**. Combined
  with `transform hover:-translate-y-1` this produces the signature "card
  lifts up" feel.
- **Fixed header:** plain `shadow`.
- **CTAs:** `shadow-lg` at rest — chunky, substantial buttons.
- **Sticky mobile CTA:** `shadow-2xl` always.
- **No inner shadows anywhere.**

### Animation

- **Library:** [AOS](https://unpkg.com/aos@2.3.1) (Animate On Scroll), init'd
  once with `duration: 800, once: true`.
- **Entry:** `fade-up` for most sections, `fade-right` / `fade-left` for the
  hero two-column split. Cards in a grid stagger via `data-aos-delay="100"`,
  `"200"`, `"300"`.
- **Hover transitions:** `transition transform hover:-translate-y-1
  hover:shadow-2xl` on cards; `hover:opacity-90` on the lime CTA;
  `hover:text-sebit-lime` on text links; `hover:bg-sebit-navy hover:text-white`
  on the "Zjistit více" disclosure button.
- **Press states:** No explicit active/pressed styling — the browser default
  gets used. Transitions are short (unspecified duration — Tailwind default
  150 ms).
- **No bounces, no scale-ups, no parallax.** Motion is flat, short, one-shot.

### Transparency & blur

- **Blur: never used.** No `backdrop-filter`, no frosted glass.
- **Transparency:** only on over-navy elements — testimonial cards use
  `bg-white/10` with `border-white/20`; the hero wallpaper arrow uses
  `opacity-90` on manifest.

### Imagery vibe

There is effectively **no photography** on the site. All "imagery" is the
logotype, the lime arrow signet, or Font Awesome icons. When imagery is
eventually added, the brand guidelines imply: navy/white/lime-tinted,
high-contrast, professional stock or clean product shots. **Never warm-filtered,
never grainy, never illustrative.**

---

## ICONOGRAPHY

SEBIT's source site uses **two coexisting icon systems**, both deliberately
geometric and outline-leaning:

### 1. Font Awesome Free (primary)

Loaded via the kit script `https://kit.fontawesome.com/fd3cf42a2f.js` and used
throughout the solutions / medical / labs / academy / academy pages with the
`fas fa-*` classes. Size is set inline — typically `text-xl` inside a
navy-filled circle, or `text-4xl` on feature cards. Icons always sit on a
**navy circle/rounded-square with lime glyph** on white backgrounds, or the
reverse on navy. Examples from source: `fa-sitemap`, `fa-chart-bar`, `fa-vial`,
`fa-code`, `fa-database`, `fa-project-diagram`, `fa-exchange-alt`, `fa-cloud`,
`fa-file-medical-alt`, `fa-check`, `fa-envelope`, `fa-quote-left`,
`fa-university`, `fa-cogs`, `fa-users-cog`, `fa-cubes`, `fa-code-branch`,
`fa-laptop-code`, `fa-sync-alt`.

**Usage in this design system:** continue to use Font Awesome Free via the
same kit script. Pick the solid variant (`fas`) to match existing pages.

### 2. Inline Lucide-style stroke SVGs (manifest + UI chrome)

The Manifest page uses hand-rolled stroke SVGs (stroke-width `2`, rounded
caps, `24×24` viewBox) in **lime `#C6FF00`** on a navy circle — these match
the visual style of [Lucide](https://lucide.dev/). The nav hamburger, the
footer LinkedIn glyph, the "arrow-left" back button, and the favicon arrow
are all drawn inline the same way.

**Usage in this design system:** when you need a stroke icon with exactly
this feel, pull from Lucide (`https://unpkg.com/lucide@latest`) or draw inline
with `stroke="#C6FF00"` / `"#002B5C"`, `stroke-width="2"`,
`stroke-linecap="round"`, `stroke-linejoin="round"`.

### 3. The brand signet

The **lime chevron** (`assets/favicon_arrow.svg`) is the core brand mark — a
three-point polyline pointing right. It appears:
- As the favicon.
- Next to every logo ("keep arrow left of brand name" — brand guidelines).
- Blown up to `h-64` as the hero visual on every division page.
- As the `stroke-width="8"` glyph inside the OG cards.

### Emoji & unicode

- **No emoji.** Not in content, not in UI.
- **No unicode icons** (no ▸, ★, →). The only non-glyph character in body copy
  is the German-style low opening quote `„` / high closing quote `"` used in
  Czech quotations (e.g. testimonials: *„SEBIT Solutions nám rychle
  dodali..."*).

### Caveat — icons you don't have locally

Font Awesome itself is CDN-only — no `.woff`/`.ttf` files in the repo, and
we've kept it that way. If you need to ship a fully offline artifact, swap in
Lucide equivalents and **flag the substitution** in your artifact's comments.

---

## Next steps for the user

The system is reverse-engineered from the static site. Things worth
confirming or providing:

- **Font files** — no TTFs in the repo. We ship Inter via Google Fonts CDN.
  If you have licensed binaries, drop them into `fonts/` and we'll wire them.
- **Photography / illustration direction** — the site currently ships none.
  If the brand ever adds imagery, we need a direction brief.
- **Figma source** — if there is one, share a link and we'll upgrade the UI
  kit to match pixel-for-pixel.
