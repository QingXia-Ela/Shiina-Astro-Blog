---
title: 记一次vue3项目转nuxtjs项目实践
date: 2022-09-28 11:49:12
tags: [vue,nuxtjs,nuxt3,前端,总结]
index_img: ./cover.jpg
banner_img: ./cover.jpg
---

# 记一次vue3项目转nuxtjs项目实践

## 项目背景

之前接了一个外包游戏网站，项目是计划用 vue3 + vite 进行开发，整体网站框架写完后突然说增加一个甲方，是一个游戏社团，然后也是套用这个网站的模板，对方提出可能需要优化搜索引擎对网页的抓取，所以我想到了使用服务端渲染对网站进行处理的方法。

## 什么是服务端渲染（SSR）

先说几个本文提到的概念

 - SSR （server side rendering）服务端渲染，是指由整个 HTML 页面在服务器完成页面的DOM结构拼接，然后发送到浏览器，为其绑定状态与事件，成为完全可交互页面的过程。
 - SEO（search engine optimization）搜索引擎优化，利用搜索引擎的规则提高网站在有关搜索引擎内的自然排名。
 - SPA（single page application）单页面应用，这种网页不会因为任何操作或导航切换而重新刷新页面，只是局部更新内容。
 - AJAX（Asynchronous Javascript And XML）异步JS & XML，前端发送 AJAX 请求后不阻塞其他操作，数据接手后再异步更新页面，即可以在不重新加载整个网页的情况下，对网页的局部数据进行更新。

在早期的网页开发中，许多网页的逻辑都比较简单，没有特别复杂的需求

随着前端技术不断地发展，页面需求逐渐变得多种多样，用户对网页的体验要求也变得越来越高，而 AJAX 的出现把前端的开发带入了一个新的模式：**前后端分离**，即前端可以专注于对页面的视觉处理与交互，不依赖于后端；后端则可以专注于编写接口，为前端提供服务。前端拿到后端接口的数据后再生成 HTML 并在用户的浏览器上渲染出来，这个就是 **客户端渲染**，即借用客户端的硬件进行页面渲染，由此各种前端框架应运而生：`Vue`, `React`, `Angular`, `Svelte`, `Solid JS`，同时配合着 `Node.js` 以及各种网页打包工具如：`Webpack`, `gulp`，以及现在比较热门的 `Vite` 使得前端的开发效率获得了大大的提高。

但是使用框架写出来的这种 SPA 应用也有一些缺点，比如：
- 对 SEO 不友好，因为 HTML 源码是只引入了 js 的一个文件，比如：
  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>USS Jackdaw Server</title>
    <script type="module" crossorigin src="/assets/index.f4dd723c.js"></script>
    <link rel="stylesheet" href="/assets/index.04983a65.css">
  </head>

  <body>
    <div id="app"></div>
  </body>

  </html>
  ```
  而搜索引擎是通过对网页的文本以及关键字进行抓取的，我们通过 js 生成的结构并不会被抓取到。
- 首屏加载速度慢，因为页面内容是由js拼接出来的，所以浏览器会等待js处理完成后才能渲染真正的DOM结构。

为了解决这些问题，人们便提出了服务端渲染这种解决方案，目的是优化首屏加载时间与 SEO 效果。

目前两款前端主流框架都有他们自己官方推出的服务端渲染插件，React 官方推出的是 Next.js，而 Vue 官方推出的是 Nuxt.js

本次项目使用的是 Vue3，因此在此处选择使用 Nuxt.js 进行处理。

## 项目遇到的困难

说实话挺多的，因为用的是 Vue3，所以 Nuxt 部分也得选用 Nuxt3，因为 Nuxt2 不能往高版本使用

Nuxt3英文文档官网：https://v3.nuxtjs.org/

国内热心人士翻译的部分文档：https://57code.gitee.io/nuxt3-docs-zh/

Nuxt3 有一个优点是可以自动引入包，而且是根据你使用的插件进行自动判断引入，这样对于常用的插件就减少了手动引入的次数，提升了开发效率

Nuxt3 的使用与现存的许多插件也都有一些出入与不符，本人就在这里总结一下安装各种包的经验与配置的技巧。

### Npm 包引入

#### Pinia

对于大部分插件，你都需要到他们官网下的 `服务端渲染` 来查看正确的引入方式，比如 Pinia 的文档如下：

![](/src/content/blog/记一次vue3项目转nuxtjs项目实践/pinia.jpg)

这个还算是比较简单的，官网只需要在配置文件下加上这些即可：

```ts
// nuxt.config.ts
export default {
  // ... other options
  buildModules: [
    // Nuxt 2 only:
    // https://composition-api.nuxtjs.org/getting-started/setup#quick-start
    '@nuxtjs/composition-api/module',
    '@pinia/nuxt',
  ],
}
```

但这是 `Nuxt 2 only`，而本人实测安装的时候是需要去掉第一行的 module 即可正常使用，原因也不太清楚

#### Swiper

项目中使用到了 Swiper，所以同样去官网找安装方法，但翻了一圈都没有找到，甚至官网都没有，后面决定先放着，找一下其他插件的引入方法。

项目中原来还有一个瀑布流页面的插件要使用，但是后来弃用了，不过很幸运的是他的官网有使用 SSR 的配置。

原文：https://github.com/shershen08/vue-masonry#nuxt-ssr-implementation


其中提到了一个插件 (plugins) 概念，这玩意我在官网有印象：https://v3.nuxtjs.org/guide/directory-structure/plugins

学着这个插件提供的指南，我写出了如下的引入方式：

```ts
// plugins/swiper.ts

import Swiper from 'vue-awesome-swiper'
import SwiperClass, { Navigation, Pagination } from 'swiper'

export default defineNuxtPlugin(nuxtApp => {
  // Doing something with nuxtApp
  SwiperClass.use([Navigation, Pagination])
  nuxtApp.vueApp.use(Swiper)
})
```

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  // ...
  plugins: [
    { src: '@/plugins/swiper', mode: 'client' },
  ],
  build: {
    transpile: ['swiper'],
  },
  css: [
    "swiper/css/bundle"
  ]
});
```

随后在 vue 组件中直接写就可以了，不需要在组件内再次引入，因为 Nuxt3 自带自动引入组件功能。

有一个问题就是如果直接进入有轮播图的页面中，Vue 会在控制台发出警告：

![](/src/content/blog/记一次vue3项目转nuxtjs项目实践/warn.jpg)

大概的意思是服务端渲染的 Dom 与 客户端的节点不匹配，这个的原因我猜想是因为我设置了插件是 **只在客户端进行渲染** 的原因，本人去 GitHub Issue 上也找了一圈，但是并没有理想答案，所以猜想是轮播图插件的兼容性并不是很好，导致会有这种警告。不过并不影响正常使用，所以我也没有继续探究下去了。
#### I18n 国际化

这个比较简单，直接在 `plugins` 文件夹下新建插件就行了

```ts
// i18n.ts

import { createI18n } from 'vue-i18n'

export const I18N = createI18n({
  // your options
})

export default defineNuxtPlugin(nuxtApp => {
  // Doing something with nuxtApp
  nuxtApp.vueApp.use(I18N)
})
```

#### 路由动画切换

这个还好，在 Nuxt3 中可以在 config 对全局变化进行配置，也可以对单独某个页面进行配置。

文档：https://v3.nuxtjs.org/api/configuration/nuxt-config#pagetransition

配置方式与 vue3 官网文档区别不大，我就在这里放一下自己是怎么写的：

```ts
// nuxt.config.ts
export default {
  // ... other options
  pageTransition: {
    name: "page",
    mode: "in-out",
    duration: 1000
  },
}
```

如果需要对某个页面单独使用一种效果则在那个页面组件这么写：

```vue
<script setup>
definePageMeta({
  pageTransition: {
    // 在此处设置你的 Transition
  },
});
</script>
```
#### 顶层 await 

项目在最后尝试打包的时候报了这样的一个错误：

![](/src/content/blog/记一次vue3项目转nuxtjs项目实践/error1.jpg)

错误似乎是与一个顶层 await 特性有关，顶层 await 本人并不是很了解，以后可能会出一篇文章进行详细讨论，眼下是先解决这个问题

注意到错误后面的兼容性问题，于是本人猜想是与打包兼容的问题相关，又是回到文档看了一圈，发现与打包兼容相关的配置是在 vite 文档内。于是继续顺着找，找到了打包目标的配置项，文档：https://vitejs.dev/config/build-options.html#build-target

根据官网的写法与顶层 await 特性的兼容表，我将配置写成了下面的样子：
```ts
// nuxt.config.ts
export default {
  // ... other options
  vite: {
    build: {
      target: ["chrome92", "firefox92", "edge89", "safari15", "opera75"],
    }
  },
}
```

### 注册全局指令

页面中有一个需求是监听移动端左右滑动事件，但是 vue 原生的监听事件是分了两个 listener，所以需要封装一个指令，使用了该指令的 Dom 元素可以触发左右滑动指令与其回调

在 Nuxt 中我们使用其提供的上下文环境进行指令的注入：https://v3.nuxtjs.org/guide/directory-structure/plugins#vue-directives

核心写法几乎跟 Vue3 原版的写法一样，只不过就是通过其提供的上下文内的 `vueApp` 将指令注入到全局中使用

```ts
// plugins/TouchSlide.ts
export default defineNuxtPlugin(nuxt => {
  const TouchSlideDirective: ObjectDirective<HTMLElement, HTMLElement> = {
    mounted(el, binding: DirectiveBinding, vnode) {
      let StartX = 0, EndX = 0, { stop } = binding.modifiers
      el.addEventListener('touchstart', (e) => {
        StartX = e.touches[0].clientX
        if (stop) e.stopPropagation()
      })

      el.addEventListener('touchend', (e) => {
        EndX = e.changedTouches[0].clientX
        const moveX = StartX - EndX
        if (stop) e.stopPropagation()

        if (moveX < -100) binding.value && binding.value({ direction: 'right' })
        else if (moveX > 100) binding.value && binding.value({ direction: 'left' })
      })
    }
  }
  nuxt.vueApp.directive('TouchSlide', TouchSlideDirective)
})
```


## 总结

整个使用体验还是不太好的，尤其是各种组件的引入，都需要花费很多时间处理兼容性问题，虽然官方已经于 `2022 年 4 月 21 日` 发布了正式版本，但是个人认为其 **广泛应用到生产环境** 中还需要相当一段长的时间进行打磨与处理，所以还需要一段时间进行观望，期待未来的时候 Nuxt3 能带给我们相对于 Nuxt2 更优质的开发体验与更友好的配置模式。

![](/src/content/blog/记一次vue3项目转nuxtjs项目实践/devtip.jpg)

## 参考文章

 - [浅谈nuxt3+Element-plus+i18n国际化+tailwincss 实际项目出现的问题一览](https://blog.csdn.net/Mr_xiaopang19/article/details/125316163)
 - [什么是服务端渲染](https://zhuanlan.zhihu.com/p/357538660)
 - [ECMAScript 2022 正式发布 JavaScript新功能了解一下](https://zhuanlan.zhihu.com/p/533275653)