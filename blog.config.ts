import defineBlogConfig from "@/declare/defineBlogConfig";

export default defineBlogConfig({
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
      header: {
        hidden: false
      }
    }
  }
})