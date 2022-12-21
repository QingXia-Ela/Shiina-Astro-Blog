import type { PageConfig, PageList } from "@/declare/defineBlogConfig";
import cfg from "blog.config";

type PathListProps = Record<string, PageList>

const PathList: PathListProps = {
  '/': 'index',
  '/blog': 'blog',
  '/about': 'about',
  '/search': 'search',
  '/tags': 'tags',
  '/friends': 'friends'
}

export default function (url: URL): PageConfig {
  for (const i in PathList) {
    if (url.pathname.indexOf(i) !== -1) return cfg.pages[PathList[i]]!
  }
  return cfg.pages[PathList[url.pathname]]!
}