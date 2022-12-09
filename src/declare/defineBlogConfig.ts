// 个人信息配置
interface BasicLinkConfig {
  sitename: string,
  link: string,
  class: string
}

interface BasicPersonalConfig {
  name: string
  introduction: string,
  avatar?: string,
  link?: BasicLinkConfig[]
}

// search 相关配置
interface BasicSearchConfig {
  requestURL: string
}

// header 通用配置
interface BasicHeaderConfig {
  /** 保持背景颜色，即取消透明模式，默认 `true` */
  keepBackgroundColor?: boolean
}

// 单个页面的 header 配置
interface PageHeaderConfig extends BasicHeaderConfig { }

interface BasicBackgroundConfig {
  /** 为背景提供一个毛玻璃效果，默认 `false`，详见：[MDN filter](https://developer.mozilla.org/zh-CN/docs/Web/CSS/filter) */
  filter: boolean
  /** 为背景提供一个暗色效果，默认 `false`，详见：[MDN filter](https://developer.mozilla.org/zh-CN/docs/Web/CSS/filter) */
  mask: boolean
}

// footer 配置
interface BasicPageFooterConfig {
  /** 底部 footer，默认是 `Copyright © By {你的名字}`，会作为 HTML 插入到页尾 */
  content?: string[]
}

interface PageFooterConfig extends BasicPageFooterConfig { }

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

interface LightThemeColorConfig extends Partial<BasicThemeColorConfig> { }

interface DarkThemeColorConfig extends Partial<BasicThemeColorConfig> { }

// 页面配置
interface BasicPageConfig {
  header?: PageHeaderConfig
  background?: BasicBackgroundConfig
  footer?: PageFooterConfig
}

enum PageList {
  'index' = 'index',
  'blog' = 'blog',
  'tags' = 'tags',
  'about' = 'about',
  'friends' = 'friends',
  'article' = 'article',
  'custom' = 'custom'
}

interface PageConfig extends BasicPageConfig { }

interface BlogConfig {
  color?: {
    light?: LightThemeColorConfig
    dark?: DarkThemeColorConfig
  }
  pages?: {
    [key in PageList]: PageConfig
  }
  UserInfo?: BasicPersonalConfig
}

export default function defineBlogConfig(config: BlogConfig) {
  return config
}