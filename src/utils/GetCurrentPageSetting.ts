import type { BasicPageConfig, PageList } from "@/declare/defineBlogConfig";
import cfg from "blog.config";
import astroCfg from '/astro.config.mjs';

type PathListProps = Record<string, PageList>

const PathList: PathListProps = {
  '/': 'index',
}

export default function (url: URL): BasicPageConfig {
  let res: BasicPageConfig | undefined
  const fURL = url.pathname.replace(astroCfg.base, "")
  if (PathList[fURL]) res = cfg.pages[PathList[fURL]]
  else {
    for (const i in cfg.pages) {
      if (fURL.indexOf(i) !== -1) {
        // @ts-expect-error: pages is object
        res = cfg.pages[i]
        break
      }
    }
  }

  return res ?? cfg.PageDefaultSettings
}