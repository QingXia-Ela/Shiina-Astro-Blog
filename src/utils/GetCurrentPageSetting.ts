import type { BasicPageConfig, PageList } from "@/declare/defineBlogConfig";
import cfg from "blog.config";

type PathListProps = Record<string, PageList>

const PathList: PathListProps = {
  '/': 'index',
  '/blog': 'blog',
  '/about': 'about',
  '/search': 'search',
  '/tags': 'tags',
  '/friends': 'friends',
  '/posts': 'posts'
}

export default function (url: URL): BasicPageConfig {
  for (let i in PathList) {
    if (i == '/') i = '/index'
    // console.log(url.pathname, i);

    if (url.pathname.indexOf(i) !== -1) {
      // console.log(cfg.pages[PathList[i]]!);

      return cfg.pages[PathList[i]]!
    }
  }
  return cfg.pages[PathList[url.pathname]]!
}