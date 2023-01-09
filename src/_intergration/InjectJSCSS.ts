import type { AstroIntegration } from "astro";

export default function (): AstroIntegration {
  return {
    name: 'InjectJSCSS',
    hooks: {
      'astro:config:setup': ({ injectScript }) => {
        injectScript('page', 'import "source/_inject/_page.js"')
      }
    }
  }
}