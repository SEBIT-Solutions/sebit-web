# SEBIT Solutions Web

Tento repozitář obsahuje statickou webovou prezentaci společnosti SEBIT Solutions s.r.o., zaměřenou na IT consulting, bodyshopping, team leasing a vývoj moderních webových řešení.

## Struktura projektu

- `index.html` – Hlavní stránka s přehledem služeb a odkazem na jednotlivé divize.
- `Academy/`, `Medical/`, `labs/`, `solutions/`, `jira/` – Podstránky jednotlivých divizí (každá má vlastní `index.html`).
- `manifest/`, `timeline/`, `privacy/`, `shared/` – Další stránky a sdílené prvky.
- `SEBIT Design System/` – Design system webu (tokeny, komponenty, zdrojový snapshot).
- `favicon_rounded.png`, `favicon_arrow.svg` – Favicony a loga.
- `sebit_*_light.svg`, `sebit_*_dark.svg` – Loga jednotlivých divizí.
- `brand_guidelines.md` – Pravidla pro používání značky.
- `CNAME` – Nastavení vlastní domény pro GitHub Pages.

## Technologie

- **HTML5** – Statické stránky.
- **Tailwind CSS** (CDN) – Rychlé stylování a responzivní design.
- **AOS (Animate On Scroll)** – Animace při scrollování.
- **Font Awesome** – Ikony.
- **JavaScript** – Interaktivita (mobilní menu, dynamický rok ve footeru, rozbalovací sekce "Zjistit více").

## Spuštění

Web je statický, není potřeba žádný build proces. Stačí otevřít `index.html` v prohlížeči nebo nasadit na libovolný webhosting (např. GitHub Pages).

## Nasazení

- Hosting: **GitHub Pages** z větve `main` (root), bez build kroku. Každý push do `main` = produkční deploy.
- Doména: `sebit.cz` (soubor `CNAME`), doména je ověřená v organizaci `SEBIT-Solutions`.
- DNS (web4u.cz): apex `A` 185.199.108–111.153 + `AAAA` 2606:50c0:8000–8003::153, `www` → `CNAME sebit-solutions.github.io.`
- Změny dělej přes PR do `main`.

## Úpravy

- Pro změnu obsahu upravte příslušné HTML soubory.
- Pro změnu stylů lze upravit Tailwind konfiguraci v `<script>` v `<head>`.

## Kontakt

- Web: [https://www.sebit.cz/](https://www.sebit.cz/)
- E-mail: info@sebit.cz

---

© SEBIT Solutions s.r.o.
