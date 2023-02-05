import type { AstroIntegration } from "astro";
import RunServer from '/json-server/index.js'

export default function (): AstroIntegration {
  return {
    name: "RunJsonServer",
    hooks: {
      "astro:server:start": () => {
        RunServer()
      }
    }
  }
}