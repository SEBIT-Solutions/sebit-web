// Supabase Edge Function: contact form of sebit.cz -> e-mail to info@sebit.cz via Resend.
//
// The static site (GitHub Pages) cannot hold an API key, so the form posts here.
// Secrets (Supabase → Edge Functions → Secrets):
//   RESEND_API_KEY   sending-only key, restricted to the sending domain
//   CONTACT_FROM     e.g. "Web SEBIT <web@ai.sebit.cz>" (a domain verified in Resend)
//   CONTACT_TO       optional, defaults to info@sebit.cz
// Deploy with JWT verification off (public form): `supabase functions deploy contact --no-verify-jwt`.
//
// Abuse guards: only fixed recipients (never the visitor's address), origin allow-list,
// honeypot field, minimum fill time, field length caps, payload size cap.

const ALLOWED_ORIGINS = new Set(['https://sebit.cz', 'https://www.sebit.cz']);
const TO = Deno.env.get('CONTACT_TO') ?? 'info@sebit.cz';
const FROM = Deno.env.get('CONTACT_FROM') ?? 'Web SEBIT <web@ai.sebit.cz>';
const KEY = Deno.env.get('RESEND_API_KEY') ?? '';
const MIN_FILL_MS = 3000;
const LIMITS: Record<string, number> = { need: 80, role: 200, when: 60, name: 120, email: 200, org: 200, tel: 40, msg: 5000 };

function cors(origin: string | null): HeadersInit {
  const allow = origin && ALLOWED_ORIGINS.has(origin) ? origin : 'https://sebit.cz';
  return {
    'Access-Control-Allow-Origin': allow,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'content-type',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  };
}

function json(status: number, body: unknown, origin: string | null): Response {
  return new Response(JSON.stringify(body), { status, headers: { ...cors(origin), 'content-type': 'application/json; charset=utf-8' } });
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
const oneLine = (s: string) => s.replace(/[\r\n]+/g, ' ').trim();

Deno.serve(async (req) => {
  const origin = req.headers.get('origin');
  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors(origin) });
  if (req.method !== 'POST') return json(405, { ok: false, error: 'method' }, origin);
  if (!origin || !ALLOWED_ORIGINS.has(origin)) return json(403, { ok: false, error: 'origin' }, origin);
  if (!KEY) return json(500, { ok: false, error: 'config' }, origin);

  const raw = await req.text();
  if (raw.length > 20_000) return json(413, { ok: false, error: 'size' }, origin);
  let d: Record<string, unknown>;
  try { d = JSON.parse(raw); } catch { return json(400, { ok: false, error: 'json' }, origin); }

  // honeypot and fill time: answer "ok" so bots learn nothing, but send nothing
  if (typeof d.website === 'string' && d.website !== '') return json(200, { ok: true }, origin);
  if (typeof d.t !== 'number' || d.t < MIN_FILL_MS) return json(200, { ok: true }, origin);

  const f: Record<string, string> = {};
  for (const [k, max] of Object.entries(LIMITS)) {
    const v = typeof d[k] === 'string' ? (d[k] as string).trim() : '';
    if (v.length > max) return json(400, { ok: false, error: `too_long:${k}` }, origin);
    f[k] = v;
  }
  if (!f.name) return json(400, { ok: false, error: 'name' }, origin);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email)) return json(400, { ok: false, error: 'email' }, origin);

  const rows: [string, string][] = [
    ['Co potřebuje', f.need], ['Role nebo téma', f.role], ['Kdy začít', f.when],
    ['Jméno', f.name], ['E-mail', f.email], ['Firma', f.org], ['Telefon', f.tel],
  ];
  const filled = rows.filter(([, v]) => v);
  const text = filled.map(([k, v]) => `${k}: ${v}`).join('\n') + (f.msg ? `\n\n${f.msg}` : '') + '\n\n— odesláno z formuláře na sebit.cz/kontakt/';
  const html = `<table style="font:14px/1.5 Inter,Arial,sans-serif;color:#1f2937;border-collapse:collapse">${
    filled.map(([k, v]) => `<tr><td style="padding:4px 16px 4px 0;color:#6b7280;vertical-align:top">${esc(k)}</td><td style="padding:4px 0"><b>${esc(v)}</b></td></tr>`).join('')
  }</table>${f.msg ? `<p style="font:14px/1.6 Inter,Arial,sans-serif;color:#1f2937;white-space:pre-wrap;margin-top:16px">${esc(f.msg)}</p>` : ''}<p style="font:12px Inter,Arial,sans-serif;color:#6b7280;margin-top:24px">Odesláno z formuláře na sebit.cz/kontakt/. Odpovědí se e-mail vrátí přímo odesílateli.</p>`;
  const subject = oneLine(`Poptávka z webu: ${f.need || 'obecná'}${f.org ? ` — ${f.org}` : ''} (${f.name})`).slice(0, 200);

  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: FROM, to: [TO], reply_to: oneLine(f.email), subject, text, html }),
  });
  if (!r.ok) {
    console.error('resend', r.status, await r.text());
    return json(502, { ok: false, error: 'send' }, origin);
  }
  return json(200, { ok: true }, origin);
});
