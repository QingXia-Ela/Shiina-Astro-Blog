import type { ListItemProps } from "@/declare/Header/Header";
import cfg from "blog.config";
import { CategoriesMapFactory } from "@/pages/collect/[class]/[name]/utils/StaticPathFactory";
import { getCollection } from "astro:content";
import { COLLECT_CATEGORIES } from "@/constant/Collect";

interface MenuItemProps extends Record<string, any> {
  name?: string;
  href?: string;
  type?: "normal" | "list";
  iconfont?: string;
  data?: ListItemProps[];
}

const { SearchConfig } = cfg;
/** 疑似 bug，服务端渲染打包后启动服务器时在此处崩溃 */
const blog = await getCollection("blog")
const CategoriesMap = CategoriesMapFactory(blog), CategoriesList: ListItemProps[] = []

CategoriesMap.forEach((v, k) => {
  CategoriesList.push({
    name: k,
    href: `/collect/${COLLECT_CATEGORIES}/${k}`
  })
})


const ItemList: MenuItemProps[] = [
  {
    name: "首页",
    href: "/",
    type: "normal",
    iconfont: "iconfont icon-24gl-home11",
  },
  {
    name: "博客",
    href: "/blog",
    type: "normal",
    iconfont: "iconfont icon-24gl-fileText",
  },
  {
    name: "归档",
    type: "list",
    iconfont: "iconfont icon-24gl-banknotes",
    data: CategoriesList
  },
  {
    name: "标签",
    href: "/tags",
    iconfont: "iconfont icon-24gl-tags2",
  },
  {
    name: "友链",
    href: "/friends",
    iconfont: "iconfont icon-24gl-link",
  },
  {
    name: "关于",
    href: "/about",
    iconfont: "iconfont icon-24gl-user",
  }
];

if (SearchConfig) {
  ItemList.push({
    href: '/search',
    iconfont: 'iconfont icon-24gl-search2'
  })
}

export default ItemList