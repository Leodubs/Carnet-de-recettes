# AGENTS.md — Carnet de recettes (miam.eleonoredbs.com)

> Contexte pour tout agent de code travaillant sur ce dépôt (Vibe Code, etc.).
> Propriétaire : Éléonore Dubois (Leodubs) · Site : https://miam.eleonoredbs.com · Langue du projet : **français**.
> 👉 Lire aussi `ASTRO.md` : mode d'emploi du portage Astro (structure, ajout de recette).

## Le projet
Carnet de recettes privé, site **Astro** statique déployé sur **Vercel** depuis la branche `master` de ce dépôt GitHub (ex-GitLab). Ajout de recettes au fil de l'eau, sans login, via un pipeline semi-automatique (voir Feuille de route).

## État actuel (novembre 2026)
- **Astro en prod sur `master` depuis le 2 nov 2026** : ~126 recettes en `src/content/recipes/*.md` (un fichier par recette), schéma zod dans `src/content.config.ts` (build refusé si champ manquant/invalide), page unique `src/pages/index.astro` (recettes sérialisées dans l'îlot `#recipes-data`, rendues par le script client historique), CSS inchangé dans `public/style.css`.
- `public/index.html` a été **supprimé** (il écraserait la page générée) — ne pas le recréer. L'ancien site HTML est conservé sur la branche `version-html`.
- **Conventions recettes** : frontmatter `id` (slug), `name`, `cat` ∈ sale|sansgluten|sucre, `tags` (∈ viande|poisson|végé|vegan), `ordre`, `time`, `parts`, `origin`, `desc`, `ingredients[]`, `steps[]`, `tip` facultatif. **`ordre` : plus petit = plus récent** — nouvelle recette → `ordre: -10` (ou inférieur au minimum actuel).
- **Recherche** : toutes catégories confondues, bouton ✕ (`#searchClear`) ; barre de recherche = floating bottom bar (`.dock`, fixe en bas, toujours visible). Pendant une recherche : onglets masqués, filtres de tags visibles. ⚠️ Condition de filtrage `okCat = !!q || r.cat === activeCat` — ne JAMAIS l'inverser (bug du 2 nov, corrigé commit 12e1831).
- **Helper `tagsOf(id)`** : TAGS associe id → chaîne OU tableau ; toujours passer par `tagsOf`, jamais `(TAGS[id] || []).map` (historique de bug).
- Recette "poulet-morilles-cognac" : l'étape « bouillon des morilles » est la formulation de l'utilisatrice — ne pas la « corriger ».
- Recette labneh Earl Grey retirée à sa demande : ne pas la réajouter.

## Décisions prises (à respecter)
1. **Sobriété d'abord** : site statique sans runtime client superflu ; le JS client est le script vanilla historique (~120 lignes). Ne pas introduire de framework d'îlots interactifs ni de lib UI.
2. **Zéro copier-coller** : l'agent édite et committe directement dans ce dépôt ; l'utilisatrice relit sur GitHub/Vercel.
3. **Transparence obligatoire** : toute proposition doit expliciter les appels externes (quelle API, quelles données envoyées, quel coût).
4. Pas d'authentification : carnet privé, l'ajout passe par le pipeline, pas par un CMS ni un login.
5. **Impression / livre A5 : reporté** — ne pas y travailler sans demande explicite (Paged.js envisagé plus tard).

## Feuille de route
1. Vérifier le déploiement Vercel (miam.eleonoredbs.com en Astro) ; supprimer la branche `astro` (fusionnée/répliquée) ; nettoyer `.gitlab-ci.yml` et le README (hérités du template GitLab Pages).
2. **Simplification du pipeline d'ajout** : cron local 2×/mois (1er et 15) → `instaloader --login … :saved --fast-update --no-videos --dirname-target sources/saved --filename-pattern "{shortcode}"` → push des sources (légendes `.txt` + métadonnées `.json.xz` versionnées ; images/vidéos gitignorées) → **tri a posteriori + extraction des recettes par l'agent dans la conversation** (pas d'API tierce) → commit d'un simple `.md` dans `src/content/recipes/` → redéploiement Vercel. Manifeste `sources/processed.json` pour le dédoublonnage.
   - Alternative déjà validée côté collecte : export HTML Instagram (« Télécharger vos informations », fichier `saved_collections.html`, collection « Miam », légendes complètes) envoyé dans le chat.

## Vigilances
- **Instagram** : l'accès automatisé est contre leurs ToS — fréquence douce (2×/mois), session dédiée, un « checkpoint » se règle en relançant `instaloader --login` à la main.
- **Droits** : recettes « inspirées de » avec crédit `@compte` + lien vers le post original ; ne pas republier les photos des créateurs sans autorisation.
- **Secrets** (tokens, `.env.miam`) : jamais commiter, jamais demander leur valeur.
- Commits petits et relisibles ; les posts de la collection sans recette exploitable sont écartés définitivement (liste tenue côté Vibe Work) — ne pas les retraiter.
