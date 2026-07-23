# Mlightning Custom — version Astro

Version Astro du site (à côté du projet Next.js, qui reste en ligne tant que
cette version n'est pas validée). Objectif : améliorer les performances et le
référencement.

## Pourquoi c'est plus rapide que la version Next.js

- **Zéro framework JS envoyé au navigateur.** Toutes les interactions (menu
  mobile, sous-menu Services, galerie/lightbox, formulaire de contact,
  compteurs animés, apparitions au scroll) sont réécrites en JavaScript
  natif dans des balises `<script>` par composant — pas de runtime React à
  télécharger ni à hydrater. C'est exactement le problème de TBT (Total
  Blocking Time) vu dans le dernier audit Lighthouse.
- **Site quasi 100 % statique** (`output: 'hybrid'` dans `astro.config.mjs`) :
  tout est pré-rendu en HTML au build, sauf `/api/contact` (a besoin de la
  clé API MailerSend côté serveur, donc exécutée à la demande).
- Polices en self-hosted via `@fontsource-variable` (pas de requête vers
  Google Fonts).

## Mise en route

```bash
npm install
cp .env.example .env
# renseigner MAILERSEND_API_KEY, CONTACT_FROM_EMAIL, CONTACT_TO_EMAIL dans .env
npm run dev       # http://localhost:4321
npm run build     # build de production dans dist/
npm run preview   # servir le build localement
```

## Déploiement

Le projet est configuré avec l'adaptateur `@astrojs/vercel` (mode
serverless), pour rester sur Vercel comme le site Next.js actuel. Les
variables d'environnement (`MAILERSEND_API_KEY`, `CONTACT_FROM_EMAIL`,
`CONTACT_TO_EMAIL`, et optionnellement `GOOGLE_PLACES_API_KEY` /
`GOOGLE_PLACE_ID`) doivent être renseignées dans les réglages du projet
Vercel, comme pour la version Next.js.

## À savoir avant de basculer

- **Versions pinnées volontairement** : `astro@^4.16.0` (pas la toute
  dernière version disponible) — c'est la version dont je suis sûr à 100 %
  du comportement, pour limiter les risques de bugs de migration. Une mise à
  jour vers une version plus récente d'Astro est possible ensuite, mais à
  tester séparément.
- **Avis Google (`Testimonials.astro`)** : récupérés au moment du `build`
  (site statique), pas à chaque visite comme sur Next.js (qui revalidait
  toutes les 24h côté serveur). Pour rafraîchir les avis affichés, il faut
  redéployer (`npm run build` + déploiement). C'est la contrepartie du
  passage en statique complet.
- **Je n'ai pas pu exécuter `npm install` / `npm run build` dans mon bac à
  sable** (accès réseau trop lent/instable pour un install complet dans le
  temps qui m'est alloué) — merci de lancer `npm install && npm run build`
  de ton côté pour valider avant de déployer. Je suis parti du code React
  existant fichier par fichier pour la conversion, mais une vérification
  locale reste nécessaire.
- Contenu, textes, données de services, avis, zones desservies (Guadeloupe
  incluse) : identiques à la version Next.js actuelle.

## Structure

```
src/
  components/       composants .astro (sections, layout, UI)
  data/             mêmes données que src/data/*.ts côté Next.js
  layouts/          BaseLayout.astro (head SEO, polices, header/footer)
  lib/              googleReviews.ts (avis Google, optionnel)
  pages/            routes (index, services/[slug], légales, 404, api/contact)
public/
  images/, videos/  mêmes fichiers déjà optimisés que le projet Next.js
```
