# sebit.cz

Web SEBIT Solutions s.r.o. — informace pro rozhodování provozu a financí, data, integrace (SEBIT Gateway), AI, weby a kapacitní outsourcing IT.

## Stack

- **Astro 5**, statický výstup, bez klientského frameworku. JavaScript jen tam, kde je interakce (report, katalog rolí, formulář, menu).
- **SEBIT Design System**: tokeny, kity, font Inter, loga a ikony jsou zkopírované z repozitáře [`sebit-design`](https://github.com/SEBIT-Solutions/sebit-design) (stav `main` 7a51eb0). Nic z toho se needituje ručně, viz níže.
- **GitHub Pages** přes GitHub Actions (`.github/workflows/deploy.yml`), doména `www.sebit.cz` (`public/CNAME`).

## Příkazy

```bash
npm ci
npm run dev                  # http://localhost:4321
npm run build                # → dist/
npm run preview              # náhled produkčního buildu
npm run check:placeholders   # seznam faktů, které je potřeba doplnit (po buildu)
```

Kontrola proti pravidlům design systemu (vyžaduje vedle naklonovaný `sebit-design`):

```bash
node ../sebit-design/ai/check.cjs src/pages src/components src/layouts src/styles/web.css src/lib src/data
```

## Struktura

| Cesta | Obsah |
|---|---|
| `src/pages/` | stránky; URL = cesta souboru (`co-delame/[slug].astro` generuje 4 stránky oblastí) |
| `src/data/site.ts` | firma, oblasti, detaily oblastí, role, klienti, manifest, typy poptávky — **texty měňte tady** |
| `src/data/reports.ts` | ukázková data interaktivních reportů (vždy označená „Ukázková data“) |
| `src/components/` | sdílené bloky (hlavička a patička jsou v `src/layouts/Base.astro`) |
| `src/lib/report.ts` | vykreslení reportu — stejný kód při buildu i v prohlížeči |
| `src/styles/ds/` | **vendor** kopie SEBIT DS (`tokens.css`, `bundle.css`, `button_kit.css`, `icon_kit.css`, fonty) |
| `src/styles/web.css` | styly webu, jen přes tokeny `--sb-*`, prefix `.w-` |
| `public/` | statické soubory; staré obrázky v kořeni zůstávají na původních URL (odkazují na ně e-mailové podpisy) |
| `public/timeline/`, `public/jira/` | interní nástroje, beze změny, v `robots.txt` zakázané |

## Pravidla

- Barvy, velikosti písma, rádiusy a stíny jen přes tokeny `--sb-*`. Loga jako `<img>` ze `/assets/logos/`, ikony ze sprite `/assets/icons/`.
- Fakt, který ještě není potvrzený, obalte `<Ph>…</Ph>` — zobrazí se žlutě a objeví se v `npm run check:placeholders`.
- Limetková: signet + jeden prvek na obrazovku (návrh DECISIONS #27 v `sebit-design`).
- Staré URL (`/solutions`, `/manifest`, `/labs`, `/Academy`, `/Medical`, `/privacy`) přesměrovává `astro.config.mjs`.

## Nasazení

Push do `main` spustí build a nasazení na GitHub Pages. V nastavení repozitáře musí být **Settings → Pages → Source: GitHub Actions** (jednorázově).

DNS (web4u.cz): apex `A` 185.199.108–111.153 + `AAAA` 2606:50c0:8000–8003::153, `www` → `CNAME sebit-solutions.github.io.`

---

© SEBIT Solutions s.r.o. · info@sebit.cz
