import type { APIRoute } from 'astro';
import { details } from '../data/site';

const paths = [
  '/', '/co-delame/', ...details.map((d) => `/co-delame/${d.slug}/`),
  '/co-delame/integrace/zakladni-registry/', '/co-delame/modernizace-oracle-forms/',
  '/it-outsourcing/', '/reference/', '/o-nas/', '/kariera/', '/kontakt/', '/ochrana-osobnich-udaju/',
];

export const GET: APIRoute = ({ site }) => {
  const urls = paths.map((p) => `  <url><loc>${new URL(p, site).href}</loc></url>`).join('\n');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
