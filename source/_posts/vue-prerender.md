---
title: Vue 服务端渲染 or 预渲染
date: 2018-06-18 16:25:24
categories: 前端
tags: [vue]
comments: false
---

## 简介
关于 Vue 的 SPA 说的已经太多太多了，它为我们带来了极速的开发体验，极强的开发效率。可能唯一有些许不足的就是，当我们对 SEO 很在乎的时候，我们如何去处理 SEO 的需求。

关于 SEO ，Vue 也有现成的解决方案： [Vue 服务端渲染](https://ssr.vuejs.org/zh/)

<!-- more -->

## 那么

### 什么是服务端渲染
服务端将完整的页面 html 输出到客户端显示，与 SPA （Single-Page-Application）使用 js 渲染页面不同。

### 为什么使用服务端渲染

- 更好的 SEO
- 更快的内容到达时间

### 服务端渲染 or 预渲染
就像官网所说的，如果你调研服务器端渲染(SSR)只是用来改善少数营销页面（例如 /, /about, /contact 等）的 SEO，那么你可能需要[预渲染](https://github.com/chrisvfritz/prerender-spa-plugin)，一个典型的预渲染使用场景可能类似[这个网站](https://neveryu.github.io/vue-tour/)。

### 区别
**服务端渲染**和**预渲染**的使用场景还是有较明显的区别的。预渲染的使用场景更多是我们所说的静态页面的形式，比如说[这个网站](https://neveryu.github.io/vue-tour/)。服务端渲染适用于大型的、页面数据处理较多且较为复杂的、与服务端有数据交互的功能型网站，一个明显的使用场景就是电商网站。

## 如何使用预渲染
**预渲染**的核心是使用 [prerender-spa-plugin](https://github.com/chrisvfritz/prerender-spa-plugin)，如何使用它呢？我们还是以[这个网站](https://neveryu.github.io/vue-tour/)的[源代码](https://github.com/Neveryu/prerender-website)中的 webpack 配置为例：
``` javascript
new PrerenderSPAPlugin({
  staticDir: path.join(__dirname, 'dist'),
  routes: [ '/', '/home', '/infomation', '/ticket', '/scenery', '/about' ],
  renderer: new Renderer({
    headless: false,
    renderAfterDocumentEvent: 'render-event'
  })
}),
```
我们需要简单的配置一下，项目所有的路由，最终生成后有几个页面，都是以这个配置为依据，而不是你在 vue-router 中配置的路由。

最基础也最核心的配置项也就这几行代码，当然，如果你有更多的需求配置项，你可以去 github 上查看文档，文档中也有很详细的介绍。 

## 如何搭建一个预渲染开发环境
如果你也想要使用**预渲染**来开发你的网站的话，最简单的方法就是克隆[这个项目](https://github.com/Neveryu/prerender-website)，然后简单删减以后进行二次开发，整个的开发流程和 Vue 是一模一样的。

## Tip
1、相较于 Vue 的模板中大而全的 webpack 配置项，**预渲染**中的 webpack 配置简单小巧，如果你有一些 webpack 的配置需求的话，你可能需要自己动手。

2、我的[这个项目](https://github.com/Neveryu/prerender-website)使用的是 stylus 来作为 css 预编译语言，如果你想使用其他的 css 预编译语言的话，需要额外安装一些插件以及做一些简单配置。当然了，默认的 css 肯定是支持的。

3、在写这个项目的过程中，也有做一些简单的知识点记录。[vue-prerender 笔记](https://github.com/Neveryu/prerender-website/blob/master/project-note.md)

4、最后项目打包发布到生产环境，使用 `npm run build` 一键操作即可。如果你想要部署到子目录下的话，那么，你可能需要做一些简单的修改，具体在 [vue-prerender 笔记](https://github.com/Neveryu/prerender-website/blob/master/project-note.md) 有提到。

## 写在最后
[项目预览](https://neveryu.github.io/vue-tour/)
[项目github地址](https://github.com/Neveryu/prerender-website)