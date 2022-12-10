import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import vue from '@astrojs/vue'
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://shiinafan.top',
  integrations: [mdx(), sitemap(), vue()],
  vite: {
    resolve: {
      alias: [
        {
          find: '@/',
          replacement: 'src/'
        }
      ]
    }
  }
});
