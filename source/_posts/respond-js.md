---
title: polyfill — Respond.js
date: 2017-02-11 23:25:24
categories: 前端
tags: [JavaScript]
comments: false
---

> Respond.js 让不支持 css3 Media Query 的浏览器包括 IE6-IE8 等其他浏览器支持媒体查询。

Respond.js 是一个快速、轻量的 polyfill，用于为 IE6-8 以及其它不支持 CSS3 Media Queries 的浏览器提供媒体查询的 `min-width` 和 `max-width`特性，实现响应式网页设计（Responsive Web Design）。

<!-- more -->

响应式布局，理想状态是，对 `PC/移动` 各种终端进行响应。媒体查询的支持程度是 IE9+ 以及其他现代的浏览器，但是 IE8 在市场当中仍然占据了比较大量的市场份额，使我们不得不进行 IE 低端浏览器的考虑。那么如何在 IE6~8 浏览器中兼容响应式布局呢？
这里我们需要借助这样一个文件：`respond.js`.

文件下载地址：[respond.js](respond.js).

自己在阅读了官方文档之后，进行了一系列测试。友情提示各位朋友，关于 **respond.js** 的使用，有一些需要注意的地方，一旦不注意，在 IE6-8 中就无法显示出来。



# 插件原理
既然要实现响应式网页，那么就需要用到媒体查询，媒体查询的核心是 `min-width` 和 `max-width`,而 IE8 以下以及一些其它的浏览器不支持这两个属性，**respond.js** 是怎么做的呢？

* 将 `<head>` 中所有外部引入的CSS文件路径取出来存储到一个数组当中；
* 遍历数组，并一个个发送 AJAX 请求；
* AJAX 回调后，分析 response 中的 media query 的 `min-width` 和 `max-width` 语法（注意，仅仅支持 `min-width` 和 `max-width` ），分析出 viewport 变化区间对应相应的 css 块；
* 页面初始化时和 `window.resize` 时，根据当前 viewport 使用相应的 css 块。

# 使用方法
考虑到 IE9 是支持 CSS3 的，所以直接在 HTML 页面的 `<head>` 标签中添加脚本引入即可：


``` html
<head>
    <link rel="stylesheet" href="style.css">
    <!--[if lt IE 9]>
      <script src="js/respond.js"></script>
    <![endif]-->
</head>
```

讲道理，我们是应该将 js 文件放在 html 文件的最后，但是 repond.js 文件，我还是建议你将它放在 `<head>` 中，并且放在 css 文件的后面。越早引入越好，在 IE 下面看到页面闪屏的概率就越低，因为最初 css 会先渲染出来，如果 respond.js 加载得很后面，这时重新根据 media query 解析出来的 css 会再改变一次页面的布局等，所以看起来有闪屏的现象.


# 核心结论
那么此时，就可以根据基本的实现思路，得到一些书写代码时要注意的地方：
- 需要启动本地服务器（localhost），不能使用普通本地的url地址（file://开头）；
- 需要外部引入 CSS 文件，将 CSS 样式书写在 style 中是无效的；
- 由于 respond 插件是查找 CSS 文件，再进行处理，所以 respond.js 文件一定要放置在 CSS 文件的后面；
- 另外，虽然把 respond.js 放置在 `<head>` 里还是在 `<body>` 后面都能够实现，但是建议放置在 `<head>` 中（具体原因在下面的文档提示中有提到）；
- 最好不要为 CSS 设置 utf-8 的编码，使用默认（原因详见下面的文档提示部分）



# 文档提示
在官方文档当中的一些提示：
- 越早的引入 respond.js 文件，也就越可能避免 IE 下出现的闪屏。
- 不支持嵌套的媒体查询。
- utf-8 的字符编码对 respond.js 文件的运行有影响。
官方API原文：
`if CSS files are encoded in UTF-8 with Byte-Order-Mark, they will not work with Respond.js in IE7 or IE8.`
基本含义就是：**utf-8 格式的 CSS 文件字符编码会对插件造成影响**
但是在我使用 IE6-8 进行测试的时候，都能够正常显示（无论是在 css 文件中增加 charset 设置还是在 link 标签中增加 charset 设置）。因此，并不是太清楚这个位置 bug 的含义。
- 跨域可能会出现闪屏（还没有测试，具体情况不详）

# NOTE

1. Respond.js 和 跨域（cross-domain） CSS 的问题
如果Respond.js和CSS文件被放在不同的域名或子域名下面（例如，使用CDN）时需要一些额外的设置。请参考Respond.js文档获取详细信息。

2. Internet Explorer 8 与 box-sizing
IE8 不能完全支持 `box-sizing: border-box;` 与 `min-width`、`max-width`、`min-height` 或 `max-height` 一同使用。由于此原因，从 Bootstrap v3.0.1 版本开始，我们不再为 `.container` 使用 `max-width`。

3. IE兼容模式
Bootstrap 不支持 IE 的兼容模式。为了让 IE 浏览器运行最新的渲染模式，建议将此 标签加入到你的页面中：
`<meta http-equiv="X-UA-Compatible" content="IE=Edge">`
此标签被加入到所有文档页面和案例页面中，以确保在每个被支持的 IE 浏览器中保持最好的页面展现效果。

4. Respond.js 和 @import
Respond.js 不支持通过 @import 引入的 CSS 文件。例如，Drupal 一般被配置为通过 @import 引入 CSS 文件，Respond.js 对其将无法起到作用。

# Tips
从 respond.js 的工作原理可以知道，它将 `<head>` 中所有外部引入的 CSS 文件路径取出来存储到一个数组当中；然后遍历数组，并一个个发送 AJAX 请求；可以看出这里必须依赖 ajax 请求 css 路径才能得到 css 文件中的 media query 的内容，那 ajax 的跨域问题就要解决了；

由于我们的静态资源都是要放在 cdn 的，responds.js 也给出了跨域方法，即引入代理页面：

//把 cross-domain/respond-proxy.html 放到cdn上
//把 cross-domain/respond.proxy.gif 放到当前域服务器上

``` html
<!-- Respond.js proxy on external server -->
<link href="http://externalcdn.com/respond-proxy.html" id="respond-proxy" rel="respond-proxy" />

<!-- Respond.js redirect location on local server -->
<link href="/path/to/respond.proxy.gif" id="respond-redirect" rel="respond-redirect" />

<!-- Respond.js proxy script on local server -->
<script src="/path/to/respond.proxy.js"></script>
```


# 其他的支持响应式布局的插件  css3-dediaqueries.js
css3-mediaqueries.js 支持几乎所有的 media query 的语法。会出现闪屏。并不是很推荐使用，虽然能够支持全部的 media queries,但 `min-width` 和 `max-width` 其实就可以满足我们对响应式布局的需要。

# 补充一点
if CSS files are encoded in UTF-8 with Byte-Order-Mark,they will not work with Repond.js in IE7 or IE8.

也就是说保存格式应该是 utf-8 无 BOM 格式，BOM 会影响程序对文档的处理，正常的 utf-8 文档应该没事。


# Tips
**always link stylesheets or write inline CSS before js scripts.**

Respond.js on Github： [https://github.com/scottjehl/Respond](https://github.com/scottjehl/Respond).
