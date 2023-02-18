import { z, defineCollection } from 'astro:content';

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string().optional(),
    index_img: z.string().optional(),
    categories: z.string().optional(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().optional(),
    license: z.string().optional(),
    licenseLink: z.string().optional(),
  })
})

const friends = defineCollection({
  schema: z.object({})
})

export const collections = {
  blog,
  friends
};