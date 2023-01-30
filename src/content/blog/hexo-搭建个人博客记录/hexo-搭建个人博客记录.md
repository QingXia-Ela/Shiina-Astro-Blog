---
title: Hexo搭建个人博客记录
date: 2022-06-30 11:07:16
tags: [技术, Hexo, 生活]
categories: 技术
---

# Hexo搭建个人博客踩坑记录

## 前言

临近假期，我回想了一下这个学期干了什么，还有什么事情没干的时候，突然想起来自己去年这个时候高考完，打算学习前端并搭建个人博客得事情，现在回想起来才发现自己还没有建立个人博客，所以决定在这几天把博客建立起来，顺便写篇博客记录一下自己踩过的坑。也算是为其他想搭建博客的开发者写一篇指南。

## 搭建博客所需前置知识

（个人总结，非 100% 准确）

`nodejs`

这个点是必须学习，整个博客都是靠着它来构建运作

`html, css, js` 

这三样用于帮你自定义你想要插入在页面中的 html ， 本博客的话就只有页尾的版权信息使用了，如果你不是很介意的话可以不需要使用。

`git` 

这个好像是用来克隆 Hexo 官方主题模板用的，但学习 git 对以后开发和就业都很有用！

## 开始

可以参考官方文档：

[Hexo官方文档](https://hexo.io/zh-cn/docs/)

[Fluid主题官方文档](https://hexo.fluid-dev.com/docs/start/)

## 踩过的坑

### hexo 不存在

<!-- {% asset_img 1.jpg This is an example image %} -->
![](/src/content/blog/hexo-搭建个人博客记录/1.jpg)

解决方法：
1. 命令前加 npx : `npx hexo init`
2. 重新核验系统变量。[参考文章](https://blog.csdn.net/miaozhenzhong/article/details/113616224)

npx 本身是用于下载模块并执行命令的管理器，之前 react 建立脚手架也是加个 npx 就解决了

### 写博客文章时自动刷新

本人使用该主题后好像自动刷新用不了，网上一时也找不到解决方案，于是最终采用了 browsersync 的解决方法进行处理，使用该插件就可以实时在网页看到博客的效果

[解决方案点这里](https://blog.singee.me/2018/05/16/hexo/hexo-auto-refresh/)

### 文章的相对路径资源储存

{% note warning %}
**2022 / 7 / 13 域名改为 blog.shiinafan.top，因此该部分已失效！**
{% endnote %}

[官方文档](https://hexo.io/zh-cn/docs/asset-folders#%E7%9B%B8%E5%AF%B9%E8%B7%AF%E5%BE%84%E5%BC%95%E7%94%A8%E7%9A%84%E6%A0%87%E7%AD%BE%E6%8F%92%E4%BB%B6)

只需要在 hexo 当前目录下的 `_config.yml` 增加以下设置即可：
```yml
# _config.yml

post_asset_folder: true
marked:
  prependRoot: true
  postAsset: true
```

我个人习惯更有规律地进行博客资源的存储，所以使用了资源文件夹这种形式保持图片之类的东西。

![](/src/content/blog/hexo-搭建个人博客记录/2.jpg)

如果你的个人博客在网址中设置了资源路径，如下图：

![](/src/content/blog/hexo-搭建个人博客记录/3.jpg)
![](/src/content/blog/hexo-搭建个人博客记录/4.jpg)


那么在 markdown 引入图片时需要这样子：`![](../name.jpg)`

因为在启用资源文件夹功能后会将图片路径解析成如下：

`/设置的资源路径/文章日期文件夹/设置的资源路径/`

比如设置资源路径为 `/blog` 时会这样子：`/blog/yyyy:mm:dd/blog/`

此时就是在当前文章的**资源文件夹**下找 `blog` 文件夹再找图片，所以需要 `../` 翻出去找上一层。

{% note primary %}
**注意：如果使用 nginx 建站则直接在 nginx 配置路径就好！不需要在 hexo 配置额外的资源路径**
{% endnote %}

### 使用 Github Actions 自动部署

[参考文章](https://zhuanlan.zhihu.com/p/364366127)
 
个人决定在本机 push 后在服务器直接拉下来，虽然还是要登陆服务器但是不需要复制文件，让本地执行一个脚本就好了，要是能监听 push 事件并执行脚本自动 pull 下来那是最好的

好像找到一个 windows 远程执行命令的程序，到时候试试整合一下

### 备案部署

部署似乎也没啥好讲的，唯一麻烦的就是耗时间，在这里感谢一下一个后端大哥对我进行的部署指导 [dog_us](blog.stemdoge.ink)，帮助我申请了安全证书，辅助我完成了其他操作。

备案的话本人是在腾讯云备案的，速度挺快，不到6个小时就打电话过来告诉哪里需要修改，然后就过了，最长时间的是管局，我是 7 月 2 日进行的审核，一直到 7 月 12 日才通过，花了大概 10 天。

域名还是腾讯云买吧，当然追求便宜可以去这个比价网站上对比然后自己核实一下：https://namebeta.com

### 隐性重定向

之前博客是通过主域名下的 `/blog` 路径进行访问的，后面改成 `blog.shiinafan.top` 了，在 nginx 加入以下配置即可：
```conf
    server {
        listen 443 ssl;
        server_name blog.shiinafan.top;
        # 你的安全证书绝对路径

        location / {
            proxy_pass https://www.shiinafan.top/blog/;
        }
    }
```
即添加一个反向代理