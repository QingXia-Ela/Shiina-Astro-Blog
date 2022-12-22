import defineBlogConfig from "@/declare/defineBlogConfig";

export default defineBlogConfig({
  PageDefaultSettings: {
    background: {
      type: 'fade',
      content: `linear-gradient(to left, #12c2e9, #c471ed, #f64f59)`
    },
    footer: {
      content: [
        '<div>Copyright © 2022 - 2023 Shiinafan</div>',
        '<div>Powered by Astro & Vue</div>',
        '<div>粤ICP备2022085367号</div>',
      ]
    }
  },
  UserInfo: {
    name: 'Shiinafan',
    introduction: '有钱终成眷属，没钱亲眼目睹',
    avatar: '/source/avatar2.jpg',
    link: [
      {
        sitename: 'Github',
        link: 'https://github.com/QingXia-Ela',
        class: 'iconfont icon-github'
      },
      {
        sitename: 'Gitee',
        link: 'https://gitee.com/shiinafan',
        class: 'iconfont icon-gitee-fill-round'
      }
    ]
  },
  WebsiteSettings: {
    title: `Shiina's Blog`,
    description: '',
    url: 'https://blog.shiinafan.top'
  },
  SearchConfig: {}
})