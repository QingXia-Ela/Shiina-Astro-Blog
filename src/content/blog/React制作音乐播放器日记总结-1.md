---
title: React制作音乐播放器日记总结-1
date: 2022-07-31 15:08:11
categories: 技术
tags: [技术, React, 总结, 经验]
---

# React制作音乐播放器日记总结-1

## 声明：文章仅为本人总结的经验，不代表这就是正确标准答案

## 前言

这个是 6 月底的一个计划，打算用 React 做完这播放器后就算是半毕业 React 了，后面开一下小程序和 JS 高级语法。

整个播放器给我最大的感触就是自己得去学设计模式了，不然二次封装播放器整个思路乱糟糟的。

先放个初效果图在这里：

![](/content/blog/React制作音乐播放器日记总结-1/初效果图.jpg)

以下是我做的过程中所遇到的技术问题，还有其对应的解决方法；另一部分是自己在开发过程中找到的一些很好的组件推荐给大家使用。

## 问题总结

### 二次封装 antd 组件

起因：需要自定义进度条 UI 但基本功能保持不变

![](/content/blog/React制作音乐播放器日记总结-1/进度条.jpg)

问题场景：进度条位置由 redux 中的数据进行决定，但直接通过 props 传入数据会使得进度条无法拖动，因为 props 是只读的

解决方法：state 设置变量与进度条位置绑定，并通过 `getDerivedStateFromProps` 来设置 state

该钩子的使用时机见 React 官方文档解释：https://zh-hans.reactjs.org/docs/react-component.html#static-getderivedstatefromprops

刚好本组件所有的 state 都是由 props 进行决定，而 antd 的进度条组件在点击和拖动的时候，虽然在 DOM 上看不到进度条变化，但是可以触发 Change 事件，因此可以通过这点在 Change 事件中触发修改时间的函数，更新展示的时间

### 元素通过透明度隐藏的同时取消鼠标在元素上的所有操作

在 css 中对文字设置如下属性: `pointer-events`

该属性可以控制当前所在元素是否可以触发鼠标 js 事件

当元素不展示时将该项设置为 none ，即可关闭所有触发事件

通过这点我应用到了音量条的展示上

![](/content/blog/React制作音乐播放器日记总结-1/volumeControl.jpg)

当鼠标进入音量图标范围时设置音量条样式使得整个音量条展示出来，而鼠标从整个音量条元素离开时也是通过样式控制，因为有 css 取消对 鼠标事件 的监听，所以音量条不会被拖动，这样就不用担心音量条透明度设置为 0 的同时还能拖动音量条的情况。

### fixed 定位失效问题

先看 MDN 的文档说法：https://developer.mozilla.org/zh-CN/docs/Web/CSS/position#%E5%8F%96%E5%80%BC

当元素定位模式为 fixed 时，其本身将相对于屏幕视口进行定位，而不占用原来所在的位置，**但是其祖先元素的某条 css属性 如果创建了层叠上下文时，fixed 定位将会相对于该祖先进行定位**

层叠上下文原文档：https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context

总结下来，如果就是出现了 fixed 定位失效的问题，首先就是要检查其祖先元素是否含有创建层叠上下文功能的 css，个人的情况是祖先元素中 有个 `backdrop-filter` 的属性存在于父元素中，而在 MDN 文档中他具备创建层叠上下文的能力：

![](/content/blog/React制作音乐播放器日记总结-1/context.jpg)

图摘自 MDN 层叠上下文文档

个人的想法是取消了这个 `backdrop-filter` 样式，~~毕竟有一个主流浏览器也不支持该样式，为什么不支持以后可能会专门写一篇博客进行记录~~

{% note success %}
2022-7-27 日火狐发布更新：在 `FireFox 103` 版本中这个样式不兼容的问题得到了解决，电脑端和移动端现已全面支持该样式

详情参阅 MDN 官网：https://developer.mozilla.org/zh-CN/docs/Web/CSS/backdrop-filter#%E6%B5%8F%E8%A7%88%E5%99%A8%E5%85%BC%E5%AE%B9%E6%80%A7
{% endnote %}

## 组件推荐

### 拖拽组件

使用的组件：react-beautiful-dnd

参考的文章：https://blog.csdn.net/dongliang3164/article/details/118905576

这里拖拽的实现就是借助了 fixed 定位

### 自定义滚动条

antd 中没有滚动条组件，所以使用 react-custom-scrollbars

仓库：https://github.com/malte-wessel/react-custom-scrollbars

文档：https://github.com/malte-wessel/react-custom-scrollbars/tree/master/docs

### 歌词组件

虽然可以自己造轮子，但既然别人写了组件那还是用用罢（

仓库：https://github.com/mebtte/react-lrc
