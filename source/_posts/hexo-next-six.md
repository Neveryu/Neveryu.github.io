---
title: Hexo-NexT搭建个人博客（六）
date: 2018-10-15 23:25:24
categories: Hexo
tags: [Hexo, Next]
comments: false
---

在 hexo 中，我们如何使用自己自定义的 html 页面呢？

我们知道，在 hexo 中，我们使用的是 markdown 格式的文件，渲染出来的页面是有主题样式的。如果我们不希望我们的页面使用主题样式。那么需要在文件头部加一个 `layout: false` 的配置。

**使用 md 文件写文章时增加配置不使用 layout **

<!-- more -->

``` md
---
title: 我来试一下如何禁止解析html
date: 2018-10-04 13:25:24
categories: 综合
tags: [综合]
comments: false
layout: false
---
```

这样，我们的文件就不会被主题渲染。

---

其实在我们的 hexo 中，是可以直接写 html 文件的，不过也会被渲染，出来的页面还是有主题样式的。如果我们不想要这个主题样式，怎么做呢？

** 使用 `skip_render` **

`skip_render` 跳过指定文件的渲染，您可使用 [glob 表达式](https://github.com/isaacs/node-glob) 来匹配路径。   

`skip_render` 的配置在 <span id="inline-blue">站点配置文件</span> 中。

只有 `source` 目录下的文件才会发布到 `public`（能够在网络上访问到），因此 Hexo 只渲染 `source` 目录下的文件。`skip_render` 参数设置的路径是相对于 `source` 目录的路径。
```
skip_render: test.html
```
注意，千万不要写成`/test.html`，这里只能填相对于source文件夹的相对路径。



