import { z, defineCollection } from 'astro:content';

const blog = defineCollection({
  schema: {}
})

export const collections = {
  blog
};