import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/articles" }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(160, "Keep descriptions under 160 characters for SEO!"),
    pubDate: z.date(),
    image: z.string().optional(),
  }),
});

export const collections = { articles };