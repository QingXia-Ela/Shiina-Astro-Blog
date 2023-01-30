---
title: 记一次Gitblit+Jenkins实现前端自动化部署上线经历
date: 2022-11-06 17:52:56
tags: [前端, 自动化, Gitblit, Jenkins]
categories: '技术'
index_img: ./cover.jpg
banner_img: ./cover.jpg
---

# 记一次Gitblit+Jenkins实现前端自动化部署上线经历

## 前言

本博客从上线到现在大概也有 5 个月左右了，当初本来一早就有计划说是要实现推送到服务器后自动部署到生产环境的流程，但由于当时技术力实在是不够所以只好放弃了，当时最终提出的解决方案如下：

![](/src/content/blog/记一次Gitblit+Jenkins实现前端自动化部署上线经历/1.jpg)

然后就这样子用了 5 个月，每次推送后就登录服务器去执行一下手动拉取脚本。

操作虽然觉得不是很累，但是既然懒就要懒到底，所以在经历了一段时间的学习后，我决定使用 Jenkins 来搭建一个简单的前端 CI / CD 流，实现全程自动化操作，解放双手。

我们的目标流如下：

![](/src/content/blog/记一次Gitblit+Jenkins实现前端自动化部署上线经历/target.jpg)


## 什么是 CI / CD

### CI

CI (Continuous integration) 是持续集成的意思，多名开发者都可以往同个仓库不同分支提交自己的代码和构建自己的功能，并在开发完成后合并到主分支，并且他们互不影响。

### CD

CD (Continuous Deploy) 是持续部署的意思，即基于某个工具或平台实现代码推送后进行自动化的构建，测试和部署到生产环境的工具。

这里只是做了一个简单的概念解释，详细的内容可以去百度或稀土掘金了解概念。

## 使用 Jenkins

这是一个开源的项目，他就是一种持续集成的工具，我们也通过它的`构建步骤`功能对博客进行构建部署。

下载安装这里不多赘述，网上有很多教程，本次使用的是 Windows 平台的安装包，第一次使用的时候选择了自动安装推荐的插件，这样就不需要自己手动添加各种 git 管理插件，我们安装后直接开始使用。

![](/src/content/blog/记一次Gitblit+Jenkins实现前端自动化部署上线经历/2.jpg)

上面是主界面截图。

### 新建项目和设置行为

我们的项目由于流程比较简单，所以直接选用 `Freestyle project` 进行操作。

由于是从本地 Gitblit 的只读链接拉取的代码，所以在源码管理部分我直接进行了拉取而不需要任何认证凭据。拉取的时候要注意自己的分支是不是正确且存在内容的分支。

![](/src/content/blog/记一次Gitblit+Jenkins实现前端自动化部署上线经历/3.jpg)

如果是 GitHub 的私有仓库的话需要在认证部分设置自己的用户名和个人 token 以便拉取。

我们希望 Jenkins 在拉取代码后进行构建，为此我们先将拉取的源码移动到一个文件夹先。在源码管理下的 `Additional Behaviours` 中新增一个 ` Check out to a sub-directory ` 行为，他的功能是将源码复制一份到指定的目录。

![](/src/content/blog/记一次Gitblit+Jenkins实现前端自动化部署上线经历/4.jpg)

在这里我直接将源码移动到 nginx 的博客文件夹目录下，并配置 nginx 的博客页面目录为打包构建后的目录，这样就不需要在后面的 Windows batch 做文件操作了。

复制完源码后我们需要执行 batch 命令去构建博客，这一栏的操作在 `Build Steps` 下：

![](/src/content/blog/记一次Gitblit+Jenkins实现前端自动化部署上线经历/5.jpg)

由于是 Windows Server 环境，所以选择的构建步骤是执行 Windows batch 命令，如果是其他操作系统比如 Linux 则需要选择 `Execute Shell` 了（大概，因为笔者只是浅浅了解过 Linux，并没有长期使用过）。

我在这里的操作是：
- cd 到前文复制了源码的目录下
- 执行 hexo 的构建命令

到这里后基本操作就完成了，点击保存将这个流程保存下来，随后就可以点击左侧菜单的 `Build Now` 开始测试了。

### 远程触发构建

接下来我们需要为这个构建添加一个触发的钩子，笔者在此处使用的是远程构建功能：

![](/src/content/blog/记一次Gitblit+Jenkins实现前端自动化部署上线经历/6.jpg)

当然还有其他触发器比如 GitHub hook，笔者猜是搭配 GitHub 仓库自带的 webhook 进行触发，这部分还有待探索。

上文需要你填入一个触发的 token，完成设置后你就可以通过对以下的链接远程触发构建功能：

```
http://${你的Jenkins地址}/job/${项目名字}/build?token=${你设置的token}
```

直接用 GET 方式进行触发即可。

到这里，Jenkins 的基本配置与触发功能已经基本完成。

## Gitblit 监听提交事件并触发 Jenkins 远程构建

因为笔者自己搭建了一个小型 git 服务，所以直接用内置的 groovy 脚本进行监听，如果是 GitHub 这种第三方仓库可能还需要研究一下其他的方法，但最终目的就是对上文的链接进行一次请求即可。

### 编写 Jenkins 专用脚本

在 gitblit 的安装目录下找到 `data/groovy` 文件夹，这个文件夹下面有很多 groovy 脚本，其中我们只需要使用 `jenkins.groovy`，对其拷贝一份，并重命名成 `jenkins.blog.groovy`：

![](/src/content/blog/记一次Gitblit+Jenkins实现前端自动化部署上线经历/7.jpg)

打开这个脚本，将最后一行的 `triggerUrl` 改为上文 Jenkins 的 url

```groovy
// ...other code
new URL('${你的 Jenkins 构建链接}').getContent()
```

### 在项目中引入脚本

登录你的 gitblit 管理页面，进入你的项目，并点击编辑按钮：

![](/src/content/blog/记一次Gitblit+Jenkins实现前端自动化部署上线经历/8.jpg)

选择 `接受` 一栏，找到 `post-receive 脚本`：

![](/src/content/blog/记一次Gitblit+Jenkins实现前端自动化部署上线经历/9.jpg)

这些脚本的执行时机是在仓库接受推送之后执行的脚本，功能非常强大。

找到你刚刚编写的 `jenkins.blog.groovy` 脚本并移动到右侧：

![](/src/content/blog/记一次Gitblit+Jenkins实现前端自动化部署上线经历/10.jpg)

保存后，你的 gitblit 在监听到提交事件后就会触发脚本，并唤醒 Jenkins 进行构建了！这比手动登录服务器去拉取强多了！

## 总结

以上这些操作只是实现了 Jenkins 一个及其简单 CI / CD 模式，以后做更大的项目可能要用到测试，多分支构建发布了，希望以后能继续深入学习，并为自己的开发质量带来更好的提升。