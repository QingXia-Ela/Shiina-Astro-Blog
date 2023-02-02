import defineBlogConfig from "./src/declare/defineBlogConfig";

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
        '<a href="https://beian.miit.gov.cn/" target="_blank">粤ICP备2022085367号</a>',
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
  SearchConfig: {
    active: true
  },
  pages: {
    'friends': {
      FriendList: [
        {
          name: '晒逗的快乐生活',
          link: "https://www.ussjackdaw.com/",
          avatar: "https://www.ussjackdaw.com/usr/uploads/2020/08/3358277886.png",
          description: 'WDRShadow'
        },
        {
          name: "Light_Quanta's Site",
          description: "Light_Quanta",
          link: "https://docs.lq0.tech/",
          avatar: "https://docs.lq0.tech/_assets/favicons/favicon-16x16.png"
        },
        {
          name: "agou",
          description: "Hi，我是 agou，一个人群中最不起眼，但闹起事来让人急眼的普通大学生。",
          link: "https://agou.im",
          avatar: "https://gravatar.junbo.wang/avatar/92f14fcd71bdc4008eb6d7f2e6ca50e8?s=128&r=R&d="
        }
      ]
    },
    index: {
      header: {
        hidden: false
      },
      background: {

      },
      footer: {
        hidden: true
      },
      setMinHeight: 'fill'
    }
  }
})