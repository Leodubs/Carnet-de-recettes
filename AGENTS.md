# AGENTS.md — Carnet de recettes (miam.eleonoredbs.com)

> Fichier de contexte pour tout agent de code travaillant sur ce dépôt (Vibe Code, etc.).
> Propriétaire : Éléonore Dubois (Leodubs) · Site : https://miam.eleonoredbs.com · Langue du projet : **français**.

## Le projet
Carnet de recettes privé, site statique déployé sur **Vercel** depuis ce dépôt (ex-GitLab, migré sur GitHub en octobre 2026). Ajout de recettes au fil de l'eau, sans login, via un pipeline semi-automatique (voir Feuille de route).

## État actuel (octobre 2026)
- **Site** : `public/index.html` (~80 recettes) + `public/style.css`. Un seul fichier HTML : tableau JS `RECETTES` en tête du `<script>`, sous le bandeau « 📌 BACK DU SITE », puis map `TAGS`.
- **TAGS** : valeurs = chaînes simples (`"viande" | "poisson" | "végé" | "vegan"`), consommées via le helper `tagsOf()` (historique : bug .map documenté dans le README, corrigé).
- **Conventions recettes** : nouvelle recette collée **au début** de `RECETTES` (ordre : plus récent → plus ancien) ; sections FAMILLE / RÉSEAUX dans le tableau.
- **Onglets** : Salé (défaut) / Sans gluten / Sucré. Filtres de tags visibles sur Salé et Sans gluten, masqués sur Sucré. Recherche en header, placeholder « Mon envie du moment ».
- **Mobile** : grille 1 colonne sous 820px (media query).
- **Palette** : fond `#fef6e9`, cartes `#ffefc9`, encre/boutons `#5003c0`, salé `#5003c0`, sucré `#ff467a`, sans gluten `#ffd51e`, magenta accents `#ab03a9`.
- `sources/` : destination du pipeline instaloader (vide pour l'instant).
- `.gitlab-ci.yml` et README : hérités du template GitLab Pages, à nettoyer lors du portage.

## Décisions prises (à respecter)
1. **Sobriété d'abord** : choix final du portage = **Eleventy (11ty)**. Écartés : Astro (outillage plus lourd), Vue/Nuxt (runtime client inutile pour un carnet), Hugo (templates Go peu lisibles).
2. **Zéro copier-coller** : l'agent édite et committe directement dans ce dépôt ; l'utilisatrice relit sur GitHub/Vercel, elle ne colle jamais de code.
3. **Transparence obligatoire** : toute proposition doit expliciter les appels externes (quelle API, quelles données envoyées, quel coût).
4. Pas d'authentification : carnet privé, l'ajout passe par le pipeline, pas par un CMS ni un login.
5. **Impression / livre A5 : reporté** — ne pas y travailler sans demande explicite (Paged.js envisagé plus tard).

## Feuille de route
1. **Portage 11ty sur une branche** : recettes → `content/recettes/*.md` (frontmatter : id, name, cat ∈ sale|sucre|sansgluten, tags[], time, parts, origin, desc, ingredients[], steps[], tip facultatif) ; design **fidèle** à l'actuel (comparer page à page) ; mini-validation du frontmatter au build (cat/tags valides, champs requis) ; conserver l'ancien `public/index.html` jusqu'à validation visuelle par l'utilisatrice.
2. **Bascule Vercel** de GitLab vers GitHub (à faire par l'utilisatrice).
3. **Pipeline d'ajout** : cron local 2×/mois (1er et 15) → `instaloader --login … :saved --fast-update --no-videos --dirname-target sources/saved --filename-pattern "{shortcode}"` → push des sources (légendes `.txt` + métadonnées `.json.xz`, images/vidéos gitignorées) → **tri a posteriori + extraction des recettes par l'agent** (pas d'API tierce) → commit des recettes → redéploiement Vercel. Manifeste `sources/processed.json` pour le dédoublonnage.

## Vigilances
- **Instagram** : l'accès automatisé est contre leurs ToS — fréquence douce (2×/mois), session dédiée, un « checkpoint » se règle en relançant `instaloader --login` à la main.
- **Droits** : recettes « inspirées de » avec crédit `@compte` + lien vers le post original ; ne pas republier les photos des créateurs sans autorisation.
- **Secrets** (tokens, `.env.miam`) : jamais commiter, jamais demander leur valeur.
- Commits petits et relisibles ; ne jamais réécraser `index.html` entier sans validation.
