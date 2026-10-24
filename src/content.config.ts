import { defineCollection, z } from 'astro:content';

// Schéma typé des recettes — une erreur ici casse le build,
// plus de bug silencieux comme le TAGS .map de l'ancien site.
const recipes = defineCollection({
  type: 'content',
  schema: z.object({
    id: z.string(),
    name: z.string(),
    cat: z.enum(['sale', 'sansgluten', 'sucre']),
    tags: z.array(z.enum(['viande', 'poisson', 'végé', 'vegan'])).default([]),
    ordre: z.number().int(),
    time: z.string(),
    parts: z.string(),
    origin: z.string(),
    desc: z.string(),
    ingredients: z.array(z.string()),
    steps: z.array(z.string()),
    tip: z.string().optional(),
  }),
});

export const collections = { recipes };
