import _ from 'lodash'
import type { SearchResultItem } from './Search'

// const astroCfg = {}
// 外链配置
interface BasicLinkConfig {
  sitename?: string,
  link?: string,
  class: string
}

// 个人信息配置
interface BasicPersonalConfig {
  /** 你的名字，用于资料卡名字展示 */
  name: string
  /** 你的简介 */
  introduction?: string,
  /** 头像路径，从public目录开始查找，如：`/avatar/avatar2.jpg` */
  avatar?: string,
  /** 你的网站外链，如 GitHub，会展示在资料卡 */
  link: BasicLinkConfig[]
}

/**
 * search 相关配置
 */
interface BasicSearchConfig {
  /**  激活搜索功能，默认 `true` */
  active?: boolean
  /** 是否构建搜索索引，默认为 `true` */
  buildSearchIndex?: boolean
  /** 
   * 输出搜索索引文件的路径，返回一个绝对路径来指定，返回内容为空时将不会输出文件
   * 
   * 默认被设置到生产环境文件中的默认静态资源目录下
   * @param rootDir 项目的根路径
   */
  searchIndexPath?: (rootDir: URL) => string | Promise<string>
  /** 
   * 网页处理搜索结果的模式，默认为 `static`
   * @see `/docs/user/搜索.md` 了解更多
   */
  mode?: 'static' | 'server'
  /** 
   * 请求的URL地址，默认是搜索索引被构建出来的位置，需要自己托管搜索索引文件时可以修改此项，内部使用 fetch api 实现文件获取
   * 
   * 静态生成的站点一般无需修改，其默认指向静态文件路径；服务端渲染的博客如果将 `mode` 选项设置为 `server` 时需要设置为自己的接口
   *
   * @example `http://127.0.0.1/search` 
   */
  requestURL?: string
  /** 
   * 静态搜索处理函数，当搜索索引不是内置生成的文件时需要修改
   * @param content 静态文件的字符串形式
   * @param key 搜索关键词
   * @returns 需要一次性返回所有匹配的结果
   */
  staticSearchHandler?: (content: any, keywords: string) => (SearchResultItem[] | Promise<SearchResultItem[]>)
}

// header 通用配置
interface BasicHeaderConfig {
  /** 当前网站标题，会用于 head 部分设置网站标题与大标题 */
  title?: string
  /** 隐藏 header，默认 `false` */
  hidden?: boolean
  /** 保持背景颜色，即取消透明模式，默认 `true` */
  keepBackgroundColor?: boolean
  /** 保持 header 展开，默认 `true` */
  keepOpen?: boolean
}

// 单个页面的 header 配置
type PageHeaderConfig = BasicHeaderConfig

export interface BasicBackgroundConfig {
  /** 
   * 背景类型，`photo` 为图片；`fade` 为渐变色，但只要是 `background-image` 可接受的参数即可；`purity` 为纯色
   */
  type: 'photo' | 'fade' | 'purity'
  /**
   * 填入内容，根据 `type` 选项决定
   * - `photo`，则填入图片路径，**将图片放在 public 文件夹下，并将 public 作为根路径来查找图片**
   * - `fade` 则填入 `background-image` 可接受参数，比如 `linear-gradient()`
   * - `purify` 则填入颜色代码，如 `#eee`
   */
  content: string
  /**
   * @deprecated 将会在新版本中启用
   */
  jsPlugin: boolean
  /** 为背景提供一个毛玻璃效果，默认 `false`，详见：[MDN filter](https://developer.mozilla.org/zh-CN/docs/Web/CSS/filter) */
  filter: boolean
  /** 
   * 为背景提供一个暗色效果，默认 `false`，详见：[MDN background-color](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-color)
   * 
   * 颜色不透明度 0.3
   */
  mask: boolean
  /**
   * 暗色模式下启用背景面罩，用于降低背景亮度，默认 `false`
   */
  useMaskOnDarkMode: boolean
}

// footer 配置
interface BasicFooterConfig {
  /** 隐藏 footer，默认 `false` */
  hidden?: boolean
  /** 底部 footer，默认是 `Copyright © {当前年份}`，会作为 HTML 插入到页尾 */
  content?: string[]
}

type PageFooterConfig = BasicFooterConfig

// 底色配置
interface BasicThemeColorConfig {
  /** 背景默认颜色，默认：`#f2f5f8`，夜间默认：`#222` */
  backgroundDefault: string
  /** 选择框激活 / 鼠标悬浮时的背景颜色，默认：`#ddd`，夜间默认：`#444` */
  backgroundActiveDefault: string
  /** 文字默认颜色，默认：`#000`，夜间默认：`#fff` */
  textDefault: string
  /** 文字按钮激活 / 鼠标悬浮时默认颜色，默认：`#3F5EFB`，夜间默认：`#919edf` */
  tipsDefault: string
}

type LightThemeColorConfig = BasicThemeColorConfig

type DarkThemeColorConfig = BasicThemeColorConfig

// 页面配置
export interface BasicPageConfig {
  header?: PageHeaderConfig
  background?: Partial<BasicBackgroundConfig>
  footer?: PageFooterConfig
  /** 
   * 给予页面中心部分最小高度，默认为 `content`
   * 
   * - 'content' 会将内容控制在 `header` 与 `footer` 之间
   * - 'fill' 将会以百分百宽高填充整个可见区域，并隐藏屏幕滚动条
   * - 'unset' 将不对高度做任何处理，保留滚动条
   */
  setMinHeight?: 'content' | 'fill' | 'unset',
}

interface BlogPageConfig extends BasicPageConfig {
  /** 博客页中每页展示的文章数量，默认5 */
  PageArticleCount?: number
}

interface CollectPageConfig extends BasicPageConfig {
  /** 集合页中每页展示的文章数量，默认10 */
  PageArticleCount?: number
}

interface FriendItem {
  name: string
  link: string
  avatar?: string
  description?: string
}

interface FriendsPageConfig extends BasicPageConfig {
  /** 友链列表 */
  FriendList?: FriendItem[]
}

// 网站配置
interface BasicWebsiteConfig {
  /** 网站默认标题，会被放入 head 标签内的 title 部分，header 处也会使用 */
  title: string
  /** 网站描述 */
  description: string
  /** 
   * 网站线上链接，**请设置成 `astro.config.mjs` 下的 `site` 值**
   * @example
   * // blog.config.ts
   * export default defineConfig({
   *    site: '', // 确保此处的值与 astro.config.mjs 的值相同
   * })
   *  */
  site: string
  /** 为博客添加一个自定义主页，默认为 false */
  useIndex?: boolean
  /** 
   * 网站二级路径，**请设置成 `astro.config.mjs` 下的 `base` 值**
   * @example
   * // blog.config.ts
   * export default defineConfig({
   *    base: '', // 确保此处的值与 astro.config.mjs 的值相同
   * })
   * @see https://docs.astro.build/zh-cn/guides/deploy/github/#如何部署 参考设置 base 属性
   */
  base?: string
}

export type PageList = 'index' | 'blog' | 'tags' | 'about' | 'friends' | 'posts' | 'custom' | 'search' | 'collect'

interface BlogConfig extends Record<any, any> {
  PageDefaultSettings: BasicPageConfig
  WebsiteSettings: BasicWebsiteConfig
  color: {
    light: LightThemeColorConfig
    dark: DarkThemeColorConfig
  }
  pages: Partial<Record<PageList, BasicPageConfig>> & Partial<{
    'blog': BlogPageConfig
    'collect': CollectPageConfig
    'friends': FriendsPageConfig
  }>
  UserInfo: BasicPersonalConfig
  /** 
   * 搜索配置
   */
  SearchConfig: BasicSearchConfig
}

export default function defineBlogConfig(config: Partial<BlogConfig>): BlogConfig {
  const _DEFAULT_CONFIG_: BlogConfig = {
    PageDefaultSettings: {
      setMinHeight: 'content',
      header: {
        title: '',
        hidden: false,
        keepBackgroundColor: true,
        keepOpen: true
      },
      background: {
        filter: false,
        mask: false,
        type: "purity",
        content: "#ddd"
      },
      footer: {
        hidden: false,
        content: [
          `<div>Copyright © ${(new Date()).getFullYear()}</div>`
        ]
      }
    },
    WebsiteSettings: {
      title: `Shiina's Blog`,
      description: '',
      site: "",
      useIndex: false,
      base: "",
    },
    UserInfo: {
      name: 'Shiinafan',
      introduction: '有钱终成眷属，没钱亲眼目睹',
      avatar: '/source/avatar.jpg',
      link: []
    },
    color: {
      light: {
        backgroundDefault: '#fcfcfc',
        backgroundActiveDefault: '#ddd',
        textDefault: '#222',
        tipsDefault: '#3F5EFB'
      },
      dark: {
        backgroundDefault: '#121212',
        backgroundActiveDefault: '#444',
        textDefault: '#fff',
        tipsDefault: '#919edf'
      },
    },
    pages: {
      'index': {
        header: {
          title: '主页'
        }
      },
      'blog': {
        header: {
          title: '博客'
        },
        PageArticleCount: 5
      },
      'about': {},
      'posts': {},
      'custom': {},
      'collect': {
        header: {
          title: '集合'
        },
        PageArticleCount: 10
      },
      'friends': {
        header: {
          title: '友链'
        },
        FriendList: []
      },
      'tags': {
        header: {
          title: '标签'
        }
      },
      'search': {
        header: {
          title: '搜索'
        }
      }
    },
    SearchConfig: {
      active: true,
      mode: 'static',
      buildSearchIndex: true
    }
  }

  const C = _.defaultsDeep(config, _DEFAULT_CONFIG_)

  for (const i in C.pages) {
    C.pages[i] = _.defaultsDeep(C.pages[i], C.PageDefaultSettings)
  }

  return C
}