import _ from 'lodash'

// 外链配置
interface BasicLinkConfig {
  sitename: string,
  link: string,
  class: string
}

// 个人信息配置
interface BasicPersonalConfig {
  name: string
  introduction?: string,
  /** 头像路径，从项目根目录开始查找，如：`/source/avatar.jpg`，如果文件位于 `/public` 下可以将其省略 */
  avatar?: string,
  link?: BasicLinkConfig[]
}

/**
 * search 相关配置
 * @deprecated 将会在新版本中启用
 */
interface BasicSearchConfig {
  useRequest?: boolean
  requestURL?: string
}

// header 通用配置
interface BasicHeaderConfig {
  /** 隐藏 header，默认 `false` */
  hidden?: boolean
  /** 保持背景颜色，即取消透明模式，默认 `true` */
  keepBackgroundColor?: boolean
}

// 单个页面的 header 配置
interface PageHeaderConfig extends BasicHeaderConfig { }

interface BasicBackgroundConfig {
  /** 
   * 背景类型，`photo` 为图片，`fade` 为渐变色，`purity` 为纯色
   * 
   * - 选用 `photo` `fade` 时内部使用 `background-image` 处理，图片只需要写上路径即可
   * 
   * - 使用 `purity` 则用 `background-color` 处理
   */
  type: 'photo' | 'fade' | 'purity'
  /**
   * @deprecated 将会在新版本中启用
   */
  jsPlugin: boolean
  /** 为背景提供一个毛玻璃效果，默认 `false`，详见：[MDN filter](https://developer.mozilla.org/zh-CN/docs/Web/CSS/filter) */
  filter: boolean
  /** 为背景提供一个暗色效果，默认 `false`，详见：[MDN filter](https://developer.mozilla.org/zh-CN/docs/Web/CSS/filter) */
  mask: boolean
}

// footer 配置
interface BasicFooterConfig {
  /** 隐藏 footer，默认 `false` */
  hidden?: boolean
  /** 底部 footer，默认是 `Copyright © By {你的名字}`，会作为 HTML 插入到页尾 */
  content?: string[]
}

interface PageFooterConfig extends BasicFooterConfig { }

// 底色配置
interface BasicThemeColorConfig {
  /** 背景默认颜色，默认：`#f2f5f8`，夜间默认：`#222` */
  backgroundDefault: string
  /** 选择框激活 / 鼠标悬浮时的背景颜色，默认：`#ddd`，夜间默认：`#444` */
  backgroundActiveDefault: string
  /** 文字默认颜色，默认：`#fff`，夜间默认：`#000` */
  textDefault: string
  /** 文字按钮激活 / 鼠标悬浮时默认颜色，默认：`#ad7ffd`，夜间默认：`#4e3e6b` */
  tipsDefault: string
}

interface LightThemeColorConfig extends BasicThemeColorConfig { }

interface DarkThemeColorConfig extends BasicThemeColorConfig { }

// 页面配置
interface BasicPageConfig {
  header?: PageHeaderConfig
  background?: Partial<BasicBackgroundConfig>
  footer?: PageFooterConfig
}

interface PageConfig extends BasicPageConfig { }

// 网站配置
interface BasicWebsiteConfig {
  /** 网站默认标题，会被放入 head 标签内的 title 部分，header 处也会使用 */
  title: string
  /** 网站描述 */
  description: string
  /** 网站线上链接 */
  url: string
}

type PageList = 'index' | 'blog' | 'tags' | 'about' | 'friends' | 'article' | 'custom'

interface BlogConfig {
  PageDefaultSettings: BasicPageConfig
  WebsiteSettings: BasicWebsiteConfig
  color: {
    light: LightThemeColorConfig
    dark: DarkThemeColorConfig
  }
  pages: Partial<Record<PageList, PageConfig>>
  UserInfo: BasicPersonalConfig
}

export default function defineBlogConfig(config: Partial<BlogConfig>) {
  const _DEFAULT_CONFIG_: BlogConfig = {
    PageDefaultSettings: {
      header: {
        hidden: false,
        keepBackgroundColor: true
      },
      background: {
        filter: false,
        mask: false
      },
      footer: {
        hidden: false,
        content: [
          'Copyright © By {{ name }}'
        ]
      }
    },
    WebsiteSettings: {
      title: `Shiina's Blog`,
      description: '',
      url: 'https://blog.shiinafan.top'
    },
    UserInfo: {
      name: 'Shiinafan',
      introduction: '有钱终成眷属，没钱亲眼目睹',
      avatar: '/source/avatar.jpg'
    },
    color: {
      light: {
        backgroundDefault: '#f2f5f8',
        backgroundActiveDefault: '#ddd',
        textDefault: '#fff',
        tipsDefault: '#ad7ffd'
      },
      dark: {
        backgroundDefault: '#222',
        backgroundActiveDefault: '#444',
        textDefault: '#000',
        tipsDefault: '#4e3e6b'
      },
    },
    pages: {
      'index': {
        header: {
          hidden: true
        },
        footer: {
          hidden: true
        }
      },
      'blog': {},
      'about': {},
      'article': {},
      'custom': {},
      'friends': {},
      'tags': {},
    }
  }
  // copy default value from page default settings
  for (const i in _DEFAULT_CONFIG_.pages) {
    // @ts-expect-error
    _DEFAULT_CONFIG_.pages[i] = _.defaultsDeep(_DEFAULT_CONFIG_.pages[i], _DEFAULT_CONFIG_.PageDefaultSettings)
  }

  return _.defaultsDeep(_DEFAULT_CONFIG_, config)
}