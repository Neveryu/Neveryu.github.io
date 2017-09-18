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
在 [Hexo-NexT搭建个人博客（一）](/2016/09/03/hexo-next-one/) 已经提到了本地调试三部曲：
```
hexo clean
hexo generate
hexo server --debug
```
然后我在项目的 `package.json` 中配成了这样：
```
"dev": "hexo clean && hexo generate && hexo server --debug",
```
这样的话，我执行 `npm run dev` 就可以启动本地环境了，省去了前面需要分别敲三次命令的步骤。
为什么可以这样写，详情看这里：
[npm 全面介绍](/2017/04/10/npm/)
[npm 的一个小细节](/2017/05/20/npm-two/)

这样还不爽，我希望在写博客的时候，按下 `Ctrl + S` 后能自动刷新浏览器，看到实时的效果，省去了自己手动刷新浏览器的过程，在双屏下，真的很好用，一边写一边看。
具体的做法是:
在项目的根目录下添加一个 `gulpfile.js` 文件，文件内容参看 [源码](https://github.com/Neveryu/Neveryu.github.io/blob/resource/gulpfile.js)，这里我就不贴了。
然后安装 `gulpfile.js` 里面的依赖包。

`gulpfile.js` 里面有一个 dev-proxy 方法，会代理本地的 4000 端口，并且监听文件变化，如有变化就会自动刷新浏览器。

最后，我们的开发步骤就变成这样了：
先打开一个 Terminal ，使用 `npm run dev` 开启本地的博客服务。
然后再开一个 Terminal，使用 `gulp` 命令来开启监听和代理服务。


# 代码压缩
在项目的根目录下，执行以下命令：
```
cnpm install gulp -g
cnpm install gulp-minify-css gulp-uglify gulp-htmlmin gulp --save-dev
```

然后在 `gulpfile.js` 里面写上相关代码，详情查看 [源码](https://github.com/Neveryu/Neveryu.github.io/blob/resource/gulpfile.js) 。

然后执行 `gulp min` 就会根据 `gulpfile.js` 中的配置，对 public 目录中的静态资源文件进行压缩。

鼠标右键 -> 查看网页源代码，可以看到已经是压缩过的。

# 自定义页面与目录
下面介绍两种方法：

第一种方法是使用 Hexo 提供的跳过渲染配置，适用于整个目录的设置。

![](/images/hexo-next-five-3.png)

具体步骤，打开博客根目录_config.yml，找到其中 skip_render 配置项，这个用来配置 /source/ 中需要跳过渲染的文件或目录，例如希望跳过 /source/projects/ 里的所有文件渲染，可以配置为：
```
skip_render: projects/**
```

匹配规则是一种类似正则的规则，官方给出的参考是[这个](https://github.com/isaacs/node-glob)。另外在测试这个功能的时候发现，Hexo 的内部缓存不是特别好用，有时候你修改了配置但生成出来的内容不一定及时应用了新配置，最好在生成之前执行一下 hexo clean 命令，清除掉旧的生成文件和缓存。

第二种方法是给单个文件添加不应用模板的标记，适用于个别特殊文件的处理。例如我们的网站如果要使用百度统计，往往需要在根目录放一个 html 格式的验证文件，这个文件默认也会经过用主题模板渲染，避免渲染的办法就是在文件头部添加如下内容：

```
---
layout: false
---
```
　　
这样，这个文件就不会经过模板渲染，最终发布到 /public/ 里的文件就是去掉标记后的文件的样子。


# 关于 categories 和 tags 页面 Cannot GET  的解决方案
有同学反馈在配置文件中配置了 categories 和 tags 后依然没有 categories 和 tags 页面，提示 Cannot GET。
![](/images/hexo-next-five-4.png)

其实在配置了 categories 和 tags  后，还需要在 /source/ 目录下新建 categories 目录和 tags 目录，里面的要有 index.md 文件，并且文件开头不能少，也不能写错。
![](/images/hexo-next-five-5.png)