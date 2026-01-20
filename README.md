# Shiina-Astro-Blog（即将废弃）

## 为什么要废弃项目？

本博客框架从正式启用到现在也有 3 年了，当初做这个项目的早期目的是为了熟练 astro 框架的使用，以及对其实现去做一些探究，为后面的个人项目做铺垫。

现如今来看本框架有几个缺点：
- 引入图片困难，且没有发挥 astro 自带的图片引入 + 预处理功能，在多图页面下访问速度会很慢。
- 对内容不够专注，作为博客应该专注的是内容传达，而不是花里胡哨的功能。
- 样式不佳，文章页的布局排版不够好，文字内容过于密集，而想要安置图片又没有一个较好的方式。
- 一些该有的功能也没有或使用有问题（侧边栏文章索引，图片查看与放大）
- 搜索质量不高（采用个人实现，而不是提供集成接口或接入静态搜索（如 pagefind））

基于以上问题，现开发一个全新的简约博客框架，可以关注 https://github.com/QingXia-Ela/Shiina-Astro-Blog-Next 获取进展

## -分割线- 旧README

一个基于 Astro + Vue 制作的个人静态博客生成器

不定期更新小功能

## 阅读指引

[点击这里阅读](./docs/user/%E6%A6%82%E8%A7%88.md)

## 项目启动

```
git clone https://github.com/QingXia-Ela/Shiina-Astro-Blog.git
cd ./Shiina-Astro-Blog
pnpm i
```

## 启动项目

```
npm run dev
```

## 新建一篇文章

```
npx blog n <文章标题>
```

## 构建

```
npm run build
```

## 推送到 git

```
npx blog d
```
