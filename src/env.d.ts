/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare module '/*' {
  const AnyModule: any
  export default AnyModule
}

declare module "*.vue" {
  const VueComponent: any
  export default VueComponent
}
