import type { AstroIntegration } from "astro";

export default function (): AstroIntegration {
  return {
    name: 'InjectJSCSS',
    hooks: {
      'astro:config:setup': ({ injectScript }) => {
        injectScript('page', 'import "source/_inject/_page.js"')
        injectScript('page-ssr', 'import "source/_inject/_page-ssr.scss"')
        /** theme auto switch */
        injectScript('head-inline', 'document.querySelector("html").setAttribute("class", localStorage.getItem("dark") === "true" ? "dark" : "")')
      }
    }
  }
}