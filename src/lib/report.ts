// Renders the interactive report card body. Used at build time (static HTML,
// complete without JavaScript) and in the browser when a visitor clicks a
// question, a tab or a bar. Example data only — see src/data/reports.ts.
import type { Report } from '../data/reports';

const UI = '/assets/icons/_sebit-ui-icons.svg#';

export function fmt(v: number): string {
  return Number(v).toLocaleString('cs-CZ', { maximumFractionDigits: 2 });
}

function pct(r: Report, v: number): number {
  return Math.max(0, Math.min(100, (v / r.max) * 100));
}

export function reportHtml(r: Report, sel: number): string {
  const v = r.values[sel];
  let detail = `<b>${r.labels[sel]}: ${fmt(v)} ${r.unit}</b>`;
  if (r.plan !== undefined) {
    const d = Math.round(((v - r.plan) / r.plan) * 100);
    detail += `<span>${d > 0 ? '+' : d < 0 ? '−' : '±'}${Math.abs(d)} % ${r.planVs}</span>`;
  }
  const kpis = r.kpis.map(([t, n, u]) => `<div><dt>${t}</dt><dd>${n}${u ? ` <small>${u}</small>` : ''}</dd></div>`).join('');
  const grid = r.ticks.map((t) => `<div class="w-rc__grid" style="bottom:${pct(r, t)}%"><span>${fmt(t)}</span></div>`).join('');
  const bars = r.values.map((val, i) =>
    `<button type="button" class="w-rc__bar" aria-pressed="${i === sel}" data-i="${i}" aria-label="${r.labels[i]}: ${fmt(val)} ${r.unit}"><i style="height:${pct(r, val)}%"></i></button>`).join('');
  const plan = r.plan !== undefined ? `<div class="w-rc__plan" style="bottom:${pct(r, r.plan)}%"><span>${r.planName}</span></div>` : '';
  const xs = r.labels.map((l, i) => `<span${i === sel ? ' class="is-sel"' : ''}>${l}</span>`).join('');
  const src = r.src.map((x) => `<span>${x}</span>`).join('');
  const arrow = `<svg class="sb-icon" aria-hidden="true"><use href="${UI}i-arrow-right"/></svg>`;
  return `<dl class="w-kpis">${kpis}</dl>` +
    `<div><div class="w-rc__head"><span>${r.title}, ${r.unit}</span><span class="w-rc__hint">Klikněte na sloupec</span></div>` +
    `<div class="w-rc__plot">${grid}<div class="w-rc__bars">${bars}</div>${plan}</div>` +
    `<div class="w-rc__x">${xs}</div></div>` +
    `<div class="w-rc__detail">${detail}</div>` +
    `<p class="w-rc__answer"><svg class="sb-icon" aria-hidden="true"><use href="${UI}i-info"/></svg><span>${r.answer}</span></p>` +
    `<div class="w-dash__src">${src}${arrow}<span>Microsoft Fabric</span>${arrow}<span>Power BI</span><em>aktualizováno dnes v 6:00</em></div>`;
}

/** Wire click and arrow-key selection of bars inside one report container. */
export function bindReport(el: HTMLElement, getReport: () => Report): void {
  let sel = getReport().sel;
  const draw = (focus: boolean) => {
    el.innerHTML = reportHtml(getReport(), sel);
    if (focus) el.querySelector<HTMLButtonElement>(`.w-rc__bar[data-i="${sel}"]`)?.focus();
  };
  el.addEventListener('click', (e) => {
    const b = (e.target as HTMLElement).closest<HTMLButtonElement>('.w-rc__bar');
    if (!b) return;
    sel = Number(b.dataset.i);
    draw(true);
  });
  el.addEventListener('keydown', (e) => {
    if (!(e.target as HTMLElement).closest('.w-rc__bar')) return;
    const n = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!n) return;
    e.preventDefault();
    const len = getReport().values.length;
    sel = (sel + n + len) % len;
    draw(true);
  });
  // a new report resets the selection to its default bar
  (el as HTMLElement & { resetReport?: () => void }).resetReport = () => { sel = getReport().sel; draw(false); };
}
