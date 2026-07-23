import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel/serverless';

// Site quasi entièrement statique (le meilleur profil de perf/SEO possible :
// zéro framework JS envoyé par défaut, HTML pré-rendu). Seule la route
// /api/contact a besoin d'exécution serveur (appel MailerSend avec la clé
// API secrète) — elle désactive le pré-rendu via `export const prerender =
// false` dans son propre fichier. Le mode "hybrid" pré-rend tout par défaut
// sauf les routes qui s'excluent explicitement.
export default defineConfig({
  site: 'https://mlightning-custom.fr',
  output: 'hybrid',
  adapter: vercel(),
  integrations: [
    tailwind({ applyBaseStyles: false }),
    sitemap({
      filter: (page) => !page.includes('/api/'),
    }),
  ],
});
