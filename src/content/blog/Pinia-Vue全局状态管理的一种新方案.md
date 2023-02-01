---
title: Pinia-Vue全局状态管理的一种新方案
date: 2022-09-21 20:59:11
categories: 技术
tags: [vue, Pinia, 前端, 浅谈, 笔记]
index_img: ./pinia.jpg
banner_img: ./pinia.jpg
---

# Pinia - Vue 全局状态管理的一种新方案

## 写在前面

如果你有学习过 Vuex 这个全局状态管理的插件，那么你肯定对他的使用方法有过很大的困惑，笔者当初学习使用 Vuex 的时候跟着视频一行行地敲代码，到完全熟练使用花了不少的事件，而且在这其中被其各种冗余的代码使用感到很头痛。

为了解决这些问题，vue 官方的一位成员提出了下一代 vuex 要实现的目标，Github 截图如下：
![](/content/blog/Pinia-Vue全局状态管理的一种新方案/github1.jpg)

PR 源地址：https://github.com/vuejs/rfcs/pull/271

简单提取要素就是：
 - 同时支持选项式 API 和组合式 API
 - 去除 mutations
 - 取消模块嵌套结构，保留 store 功能
 - Typescript 完全支持
 - 自动代码分割

而 Pinia 则在今年(2022)被正式转为官方推荐使用的全局状态管理方案，在 vue3 的官网中的生态系统分类下的官方库可以看到他的身影

Pinia 官方文档：https://pinia.web3doc.top

## 区别与优势

### 代码展示

我们用一个例子来看看 Vuex 使用时的代码量：

在状态管理中：
```js
// store.js
import { createStore } from 'vuex'
// 假设一个模拟异步请求的函数
import sleep from '@/utils/sleep'

// 创建一个新的 store 实例
const store = createStore({
  state () {
    return {
      count: 0
    }
  },
  // 派生状态
  getters: {
    countGreaterThanZero(state) {
      return state.count > 0
    }
  },
  // 变化行为
  mutations: {
    increment (state) {
      state.count++
    }
  },
  // 异步行为
  actions: {
    async incrementAsync (context) {
      // 一秒后继续执行
      await sleep(1000)
      // 异步触发 Mutations
      context.commit('increment')
    }
  }
})

export default store
```
在组件中：
```vue
<template>
  <div>{{ count }}</div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'

export default {
  // 当前组件数据
  // ...
  computed: {
    // 获取原生状态
    ...mapState({
      // 箭头函数可使代码更简练
      count: state => state.count,
    }),
    // 获取派生状态
    ...mapGetters({
      'countGreaterThanZero',
    })
  },
  methods: {
    // 变化行为
    increment() {
      this.$store.commit('increment')
    },
    // 异步行为
    incrementAsync() {
      this.$store.dispatch('incrementAsync')
    }
  }
}
</script>
```

在上述的例子中，分别有两个状态获取的模式和两个行为模式，但是我个人在实际开发体验中顶多是直接使用 `state` 和 `mutations`，部分异步的就使用 `action`，个人觉得最麻烦的还是需要通过 `mapState` 进行状态的获取，这样子使得代码的可读性变得非常差，体验大幅度下降。

现在再让我们看看 Pinia 实现以上的功能要怎么做

对一类状态定义的 store：
```js
// counter.js
import { defineStore } from 'pinia'
// 假设一个模拟异步请求的函数
import sleep from '@/utils/sleep'

export const useStore = defineStore('count', {
  state: () => ({
    count: 0
  }),
  actions: {
    increment() {
      this.count++
    },
    async incrementAsync() {
      // 过了 1 秒后继续执行
      await sleep(1000)
      this.count++
    }
  }
})
```
组件中：
```vue
<template>
  <div>{{ store.count }}</div>
</template>
<script setup>
import { useStore } from '@/stores/counter'

const store = useStore()

onMounted(() => {
  // 直接调用
  store.increment()
  store.incrementAsync()
})
</script>
```

### 优势总结

总结一下体验的区别：

 - 代码量少了很多，而且与 vue3 的组合式 api 结合的更好，使用起来更方便。
 - 对 Typescript 的支持也是非常完善的，使用后都会有自动补全。
    ![](/content/blog/Pinia-Vue全局状态管理的一种新方案/ts提示.png)
 - 每个 store 直接独立，可以分开导用，组件中可以直接在 setup 函数下进行取用
 - 去除了 mutations, actions 支持同步和异步，不需要分别定义行为

## 其他体验

### 扩展 Pinia

官方文档说明：https://pinia.web3doc.top/core-concepts/plugins.html

这个部分笔者并没有实际体验，只是单纯的在文档上进行(~~纸上谈兵~~)了解

大概看了一下，pinia 的插件都是以函数的形式安装到 pinia 本身，然后函数本身可以获得操作 pinia 的上下文：

```js
export function myPiniaPlugin(context) {
  context.pinia // 使用 `createPinia()` 创建的 pinia
  context.app // 使用 `createApp()` 创建的当前应用程序（仅限 Vue 3）
  context.store // 插件正在扩充的 store
  context.options // 定义存储的选项对象传递给`defineStore()`
  // ...
}
```

说几个个人认为比较惊喜的点：

#### 添加新的外部属性

我觉得这一点是个好东西，有时候我们可以通过挂载一些全局 store 专用方法和常量来对各种环境进行区分，而不需要从常量文件夹中单独引入使得代码耦合性上升

官方示例是把路由对象添加到其中：
```js
import { markRaw } from 'vue'
// 根据您的路由所在的位置进行调整
import { router } from './router'

pinia.use(({ store }) => {
  store.router = markRaw(router)
})
```
#### 插件内使用 $subscribe $onAction

这个是监听状态改变和 action 执行的钩子，这个让我联想到了 axios 的请求拦截器和响应拦截器，我觉得在这里他也可以发挥相同的功能，比如 `全局提示消息` 等功能

```js
pinia.use(({ store }) => {
  store.$subscribe(() => {
    // 在存储变化的时候执行
  })
  store.$onAction(() => {
    // 在 action 的时候执行
  })
})
```

还有更多的用法可以前往官网查看和了解。

### Nuxt.js 的服务端渲染

在 Pinia 中服务端渲染只需要在 vite 的配置下进行简单配置即可像 vue 一样正常使用 store，

而原来的 vuex 需要将全局状态区分为客户端与服务端地状态，
```js
// nuxt.config.js
export default {
  // ... other options
  buildModules: [
    '@pinia/nuxt',
  ],
}
```

## 总结

Pinia 相比 vuex，省去了许多复杂冗余的代码，让代码的可读性变得更好；通过组合式的 API 使得使用更加灵活，可以更加方便地区分业务逻辑，提升开发效率，相信在未来使用 Pinia 将会成为 vue 全局状态管理地主流，为广大开发者提供一个更好的全局状态解决方案。