# sebit.cz

Web SEBIT Solutions s.r.o. — informace pro rozhodování provozu a financí, data, integrace (SEBIT Gateway), AI, weby a kapacitní outsourcing IT.

## Stack

- **Astro 5**, statický výstup, bez klientského frameworku. JavaScript jen tam, kde je interakce (report, katalog rolí, formulář, menu).
- **SEBIT Design System** z GitHub Release repozitáře [`sebit-design`](https://github.com/SEBIT-Solutions/sebit-design) — aktuálně `v6.0.0-alpha.3`, balíčky `@sebit/design-tokens` (tokeny, font Inter, loga, ikony, favicony, OG obrázky, checker) a `@sebit/react` (jen `styles.css` s třídami `.sb-*`) v `vendor/sebit/*.tgz`. Žádná ruční kopie; aktualizace = výměna dvou souborů, postup v [`AGENTS.md`](AGENTS.md).
- **GitHub Pages** přes GitHub Actions (`.github/workflows/deploy.yml`), doména `sebit.cz` (`public/CNAME`; `www.sebit.cz` přesměrovává na ni). `site` v `astro.config.mjs` musí odpovídat CNAME.

## Příkazy

```bash
npm ci
npm run dev                  # http://localhost:4321
npm run build                # → dist/
npm run preview              # náhled produkčního buildu
npm run check:placeholders   # seznam faktů, které je potřeba doplnit (po buildu)
npm run lint:ds              # pravidla design systemu (checker z nainstalovaného release)
npm run changelog:bump -- patch   # nová verze + sekce v CHANGELOG.md (povinné v každém PR)
npm run verify               # build + všechny kontroly; před každým push
```

## Struktura

| Cesta | Obsah |
|---|---|
| `src/pages/` | stránky; URL = cesta souboru (`co-delame/[slug].astro` generuje 4 stránky oblastí) |
| `src/data/site.ts` | firma, oblasti, detaily oblastí, role, klienti, manifest, typy poptávky — **texty měňte tady** |
| `src/data/reports.ts` | ukázková data interaktivních reportů (vždy označená „Ukázková data“) |
| `src/components/` | sdílené bloky (hlavička a patička jsou v `src/layouts/Base.astro`) |
| `src/lib/report.ts` | vykreslení reportu — stejný kód při buildu i v prohlížeči |
| `vendor/sebit/` | release SEBIT DS (`.tgz`), jen vyměňovat za soubory z GitHub Release |
| `src/styles/web.css` | vlastní layout webu, jen přes tokeny `--sb-*`, prefix `.w-`; komponenty jsou třídy `.sb-*` z DS |
| `public/assets/{logos,icons,favicon,og}/` | generované z release při `dev`/`build` (`scripts/sync-ds-assets.mjs`), v `.gitignore` |
| `public/` | statické soubory; staré obrázky v kořeni zůstávají na původních URL (odkazují na ně e-mailové podpisy) |
| `public/timeline/`, `public/jira/` | interní nástroje, beze změny, v `robots.txt` zakázané |

## Pravidla

- Úplná pravidla pro lidi i agenty: [`AGENTS.md`](AGENTS.md) (včetně pravidel DS synchronizovaných z release). Historie: [`CHANGELOG.md`](CHANGELOG.md) — každý PR přidává verzi a sekci, CI to vynucuje.
- Barvy, velikosti písma, rádiusy a stíny jen přes tokeny `--sb-*`. Loga jako `<img>` ze `/assets/logos/`, ikony ze sprite `/assets/icons/`.
- Fakt, který ještě není potvrzený, obalte `<Ph>…</Ph>` — zobrazí se žlutě a objeví se v `npm run check:placeholders`.
- Limetková: signet + jeden prvek na obrazovku (DECISIONS #27 v `sebit-design`).
- Staré URL (`/solutions`, `/manifest`, `/labs`, `/Academy`, `/Medical`, `/privacy`) přesměrovává `astro.config.mjs`.

## Nasazení

Merge do `main` spustí build, nasazení na GitHub Pages a tag `v<verze>` s GitHub Release (poznámky = sekce z `CHANGELOG.md`). V nastavení repozitáře musí být **Settings → Pages → Source: GitHub Actions** (jednorázově).

DNS (web4u.cz): apex `A` 185.199.108–111.153 + `AAAA` 2606:50c0:8000–8003::153, `www` → `CNAME sebit-solutions.github.io.`

---

© SEBIT Solutions s.r.o. · info@sebit.cz
