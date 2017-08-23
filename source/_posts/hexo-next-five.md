---
title: Hexo-NexT搭建个人博客（五）
date: 2017-07-15 23:25:24
categories: Hexo
tags: [Hexo, Next]
comments: false
---

在这之前，我写过四篇关于 Hexo + NexT 构建博客的文章。=》【[传送门](/categories/Hexo/)】

本文将会介绍一些自定义的功能。相较于之前主要是修改配置文件中的内容，现在更多的是动手改源码来实现功能，而且还能帮你搞懂一些 Hexo NexT 的源码。如果你能弄懂源码的一些流程和逻辑，那么，你将能更好的来实现自己的一些想法。

# 文章封面

文章封面的意思就是：在博客首页的时候会显示文章的封面图片，进入这篇文章的详细页面后，将不显示这张图片。

如果想添加文章封面的话，需要添加一个字段属性：`summary_img`，`summary_img` 的值是图片的路径。

<!-- more -->

例如：
```
---
title: CSS 各种Hack手段
date: 2017-06-25 03:25:24
categories: 前端
tags: [CSS]
comments: false
summary_img: /images/css-hack-1.png
---
```

具体实现细节如下：
修改 `\themes\next\layout\_macro\post.swing` 文件。
将代码：
```
{% if post.summary_img  %}
  <div class="out-img-topic">
    <img src={{ post.summary_img }} class="img-topic">
  </div>
{% endif %}
```
添加到下图所示的位置

![](/images/hexo-next-five-1.png)

这样的话，就可以使用 `summary_img: imageurl` 来设置文章封面了。

开启了文章封面的文章，我建议将 `<!-- more -->` 放在文章内容的开头，像这样：

![](/images/hexo-next-five-2.png)



# 网页加载进度条

打开 `/themes/next/layout/_partials/head.swing` 文件，在文件末尾添加如下代码：
```
<!-- 网页加载条 -->
<script src="https://neveryu.github.io/js/src/pace.min.js"></script>
```

然后，打开 `/themes/source/css/_custom/custom.styl` 文件，在文件末尾添加如下代码：
```
/*网页加载条*/
/* This is a compiled file, you should be editing the file in the templates directory */
.pace {
  -webkit-pointer-events: none;
  pointer-events: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

.pace-inactive {
  display: none;
}

.pace .pace-progress {
  background: #1e92fb;
  position: fixed;
  z-index: 2000;
  top: 0;
  right: 100%;
  width: 100%;
  height: 3px;
}

.pace .pace-progress-inner {
  display: block;
  position: absolute;
  right: 0px;
  width: 100px;
  height: 100%;
  box-shadow: 0 0 10px #e90f92, 0 0 5px #e90f92;
  opacity: 1.0;
  -webkit-transform: rotate(3deg) translate(0px, -4px);
  -moz-transform: rotate(3deg) translate(0px, -4px);
  -ms-transform: rotate(3deg) translate(0px, -4px);
  -o-transform: rotate(3deg) translate(0px, -4px);
  transform: rotate(3deg) translate(0px, -4px);
}

.pace .pace-activity {
  display: block;
  position: fixed;
  z-index: 2000;
  top: 15px;
  right: 15px;
  width: 14px;
  height: 14px;
  border: solid 2px transparent;
  border-top-color: #e90f92;
  border-left-color: #e90f92;
  border-radius: 10px;
  -webkit-animation: pace-spinner 400ms linear infinite;
  -moz-animation: pace-spinner 400ms linear infinite;
  -ms-animation: pace-spinner 400ms linear infinite;
  -o-animation: pace-spinner 400ms linear infinite;
  animation: pace-spinner 400ms linear infinite;
}

@-webkit-keyframes pace-spinner {
  0% { -webkit-transform: rotate(0deg); transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); transform: rotate(360deg); }
}
@-moz-keyframes pace-spinner {
  0% { -moz-transform: rotate(0deg); transform: rotate(0deg); }
  100% { -moz-transform: rotate(360deg); transform: rotate(360deg); }
}
@-o-keyframes pace-spinner {
  0% { -o-transform: rotate(0deg); transform: rotate(0deg); }
  100% { -o-transform: rotate(360deg); transform: rotate(360deg); }
}
@-ms-keyframes pace-spinner {
  0% { -ms-transform: rotate(0deg); transform: rotate(0deg); }
  100% { -ms-transform: rotate(360deg); transform: rotate(360deg); }
}
@keyframes pace-spinner {
  0% { transform: rotate(0deg); transform: rotate(0deg); }
  100% { transform: rotate(360deg); transform: rotate(360deg); }
}
/*网页加载条 END*/
```



# 开发环境自动刷新

# 代码压缩


