import cfg from "blog.config";
const { SearchConfig } = cfg;

interface MenuItemProps extends Record<string, any> {
  name?: string;
  href?: string;
  type?: "normal" | "list";
  iconfont?: string;
  data?: any[];
}

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