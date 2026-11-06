// @ts-check
import { defineConfig } from 'astro/config';

// Static output for GitHub Pages (custom domain via public/CNAME).
// Old URLs keep working: Astro writes a meta-refresh + canonical page for each
// redirect (GitHub Pages cannot send HTTP 301).
export default defineConfig({
  site: 'https://www.sebit.cz',
  trailingSlash: 'always',
  build: { format: 'directory' },
  redirects: {
    '/solutions': '/it-outsourcing/',
    '/manifest': '/o-nas/',
    '/labs': '/co-delame/ai/',
    '/Academy': '/kariera/',
    '/Medical': '/',
    '/privacy': '/ochrana-osobnich-udaju/',
  },
});
