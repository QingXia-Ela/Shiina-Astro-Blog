import defineBlogConfig from "./src/declare/defineBlogConfig";

const site = `https://qingxia-ela.github.io`, base = `/Shiina-Astro-Blog`

export default defineBlogConfig({
  PageDefaultSettings: {
    background: {
      type: 'fade',
      content: `linear-gradient(to left, #12c2e9, #c471ed, #f64f59)`,
    },
    footer: {
      content: [
        '<div>Powered by Astro & Vue</div>',
        '<a href="https://github.com/QingXia-Ela/Shiina-Astro-Blog/" target="_blank">Github Link</a>',
      ]
    }
  },
  UserInfo: {
    name: 'Shiinafan',
    introduction: '有钱终成眷属，没钱亲眼目睹',
    avatar: '/avatar/avatar2.jpg',
    link: [
      {
        sitename: 'Github',
        link: 'https://github.com/QingXia-Ela',
        class: 'iconfont icon-github'
      }
    ]
  },
  WebsiteSettings: {
    title: `Shiina's Blog`,
    description: `Shiina's Blog，用于记录自己学习的知识和踩过的坑`,
    site,
    useIndex: true,
    base,
  },
  SearchConfig: {
    active: true,
    mode: 'static',
  },
  pages: {
    'friends': {
      FriendList: []
    },
    index: {
      header: {
        hidden: true
      },
      background: {
        type: "photo",
        content: "/indexBG.jpg",
        useMaskOnDarkMode: true
      },
      footer: {
        hidden: true
      },
      setMinHeight: "fill"
    },
    blog: {
      PageArticleCount: 5
    },
  }
})