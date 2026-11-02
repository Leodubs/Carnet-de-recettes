# Portage Astro

Même design, même comportement (onglets, recherche, filtres de tags, modale, clic sur les
ingrédients) que l'ancien `public/index.html` — mais les recettes vivent dans
`src/content/recipes/*.md`, un fichier par recette, avec un schéma typé
(`src/content.config.ts`) : plus de bug silencieux (l'histoire du `TAGS .map`).

L'ancienne version HTML du site est conservée sur la branche `version-html`.

## Ajouter une recette
1. Créer `src/content/recipes/<id-slug>.md` avec le frontmatter du schéma
   (`id`, `name`, `cat` : sale | sansgluten | sucre, `tags`, `ordre`, `time`, `parts`,
   `origin`, `desc`, `ingredients`, `steps`, `tip` facultatif).
2. `ordre` = position dans la liste (plus petit = plus récent). Pour une nouvelle recette,
   prendre `ordre: -10` (ou inférieur au minimum actuel).
3. Commit → push → Vercel redéploie. `npm run dev` pour tester en local.

## Structure
- `src/pages/index.astro` — la page unique (HTML identique à l'ancien) ; les recettes sont
  sérialisées en JSON dans l'îlot `#recipes-data` et rendues par le script client,
  repris quasi tel quel de l'ancien site (helper `tagsOf` conservé).
- `src/content.config.ts` — schéma zod (build cassé si un champ manque).
- `public/style.css` — inchangé, copie de l'ancien.
