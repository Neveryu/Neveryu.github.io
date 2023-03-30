---
title: 手把手教你 Vue 服务端渲染
date: 2019-03-31 07:25:24
categories: 前端
tags: [Vue]
comments: false
summary_img: /images/vue-ssr-img.jpeg
---

# 序

在写这篇文章之前，我有写一篇 [Vue 预渲染的教程](https://neveryu.github.io/2018/06/18/vue-prerender/) 以及 [在线示例](https://neveryu.github.io/prerender-website/index.html)，有需要的可以看一下~

-------

<font color="green">【下面开始 Vue 服务端渲染】</font>

<!-- more -->

服务端渲染 = SSR = Server-Side Rendering

[Vue 服务器渲染](https://ssr.vuejs.org/zh/) 可以说是我们学习 Vue 技术的最后一个环节了；也是上手难度稍为高一点的一个环节。

目前还没有发现很好的学习资料或者教程，文档也不是特别明白，这也导致了很多人没能拿下 vue 的 ssr。

所以就想着写一个曲线平滑，循序渐进，明了易懂的 [教程](https://github.com/Neveryu/vue-ssr-lessons) 来帮助大家找到 Vue SSR 的感觉。

# 写在前面
<font color="red">由于内容较多，如果只写一篇文章就想把 Vue SSR 介绍清晰透彻的话，我觉得不太现实；</font>所以就想着把一个完整的 Vue SSR 项目细分开来，每一个小节讲解一个知识点，这样效果应该会好一点吧。这个项目虽然不大，但已经包含了 Vue SSR 的所有内容。

<p id="div-border-top-green">项目仓库：[https://github.com/Neveryu/vue-ssr-lessons](https://github.com/Neveryu/vue-ssr-lessons)
</p>

1、[这个教程](https://github.com/Neveryu/vue-ssr-lessons) 分为 7 个小节，每个小节都是一个独立的可以运行的小项目，这样可以减少大家出错的概率（如果只给出最终的代码，那万一又跑不起来，岂不凉凉，影响大家学习的心情）；每个小节简单配备了 **运行步骤** 以及 **简要说明** 来帮助大家运行项目以及了解本节的知识点。

![](/images/vue-ssr-1.png)

2、其次，每个小节都是在前一小节的基础上，继续补充写代码的，这样，大家对比就能知道，这一节具体增加了哪些代码，哪些内容；方便大家学习某一个小节的知识（如果笼统的一次性给出最终代码，这样在找代码之间逻辑关系时，比较吃力）


# 章节介绍
第一节：一个最简单的服务端渲染原型（10 行代码）【难度：<i class="fa fa-star"></i>】
第二节：与服务器集成，使用 Express 作为服务器提供服务【难度：<i class="fa fa-star"></i>】
第三节：使用一个页面模版【难度：<i class="fa fa-star"></i>】
第四节：开发客户端与服务端入口文件，配置webpack【难度：<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>】
第五节：使用vue-router来做路由【难度：<i class="fa fa-star"></i><i class="fa fa-star"></i>】
第六节：数据，vuex，状态容器【难度：<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>】
第七节：增加一些额外的功能，完善项目【难度：<i class="fa fa-star"></i><i class="fa fa-star"></i>】

# 如何学习

1、建议你先看一遍 Vue SSR 的文档，*看不懂的地方不要慌，留个印象也行*
2、学习这个课程的时候，打开 Vue SSR 的文档；找到当前这一小节对应文档中的文字介绍部分
3、如果你基础有点薄弱的话，不要太过于着急
4、不能保证所有人看一遍就能学会，但是能保证所有人，两遍能拿下
5、如果你能跟着动手敲的话，将会事半功倍

# 知识点

**1、避免单例状态**
在 `app.js` 中，暴露一个可以重复执行的工厂函数，为每个请求创建新的应用程序实例。

[相关文档](https://ssr.vuejs.org/zh/guide/structure.html#%E9%81%BF%E5%85%8D%E7%8A%B6%E6%80%81%E5%8D%95%E4%BE%8B)

![](/images/vue-ssr-2.png)

**2、配置webpack**
`webpack` 配置文件包含：基本配置(base config)、客户端配置(client config)、服务器配置(server config)。
基本配置包含两个环境（客户端环境，服务器环境）共享的配置；然后客户端配置和服务器配置都会通过使用 `webpack-merge` 来简单的扩展基本配置。

[相关文档](https://ssr.vuejs.org/zh/guide/build-config.html)

> 教程中的 webpack 相关的配置已经配置好了，你可以直接全部拿过来用就行了

**3、createBundleRenderer**
我们在前三节使用的都是 `vue-server-renderer` 中的 `createRenderer` 方法；从第四节开始，我们使用的是 `createBundleRenderer`，所创建的 `bundle renderer`，用法和普通 `renderer` 相同。 `createBundleRenderer` 接收一个 `server bundle` 生成的特殊 `JSON` 文件。但是 `bundle renderer` 提供以下优点：

- 内置的 `source map` 支持（在 `webpack` 配置中使用 `devtool: 'source-map'`）
- 在开发环境甚至部署过程中热重载（通过读取更新后的 `bundle`，然后重新创建 `renderer` 实例）
- 关键 `CSS(critical CSS)` 注入（在使用 `*.vue` 文件时）：自动内联在渲染过程中用到的组件所需的 `CSS`。更多细节请查看 `CSS` 章节。
- 使用 `clientManifest` 进行资源注入：自动推断出最佳的预加载(`preload`)和预取(`prefetch`)指令，以及初始渲染所需的代码分割 `chunk`。

[相关文档](https://ssr.vuejs.org/zh/guide/bundle-renderer.html)







