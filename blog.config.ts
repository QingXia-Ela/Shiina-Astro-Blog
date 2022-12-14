import defineBlogConfig from "@/declare/defineBlogConfig";

export default defineBlogConfig({
  PageDefaultSettings: {
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
    avatar: '/source/avatar2.jpg'
  },
  WebsiteSettings: {
    title: `Shiina's Blog`,
    description: '',
    url: 'https://blog.shiinafan.top'
  },
  pages: {
    'index': {

    }
  }
})