import { z, defineCollection } from 'astro:content';

const releases = defineCollection({
  schema: {
    title: z.string(),
    version: z.number(),
  },
});

const engineeringBlog = defineCollection({
  schema: {
    title: z.string(),
    tags: z.array(z.string()),
    image: z.string().optional(),
  },
});

export const collections = {
  releases: releases,
  // Don't forget 'quotes' for collection names containing dashes
  'engineering-blog': engineeringBlog,
};