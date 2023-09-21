import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import vue from '@astrojs/vue';
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';
import InjectJSCSS from './src/_intergration/InjectJSCSS';
import BuildSearchIndex from './src/_intergration/BuildSearchIndex'
import RunJsonServer from './src/_intergration/RunJsonServer'

// https://astro.build/config
export default defineConfig({
  site: 'https://qingxia-ela.github.io',
  base: '/Shiina-Astro-Blog',
  integrations: [mdx(), sitemap(), vue(), InjectJSCSS(), BuildSearchIndex(), RunJsonServer()],
  vite: {
    resolve: {
      alias: [{
        find: '@/',
        replacement: 'src/'
      }]
    },
    server: {
      host: true
    }
  },
  markdown: {
    shikiConfig: {
      theme: 'dracula',
      langs: [],
      wrap: true
    }
  },
  // output: 'server',
  // adapter: node({
  //   mode: 'standalone'
  // })
});