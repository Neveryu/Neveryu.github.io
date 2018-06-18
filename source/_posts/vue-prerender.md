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

