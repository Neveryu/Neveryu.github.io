---
title: Hexo-NexT搭建个人博客（三）
date: 2016-11-11 13:25:24
categories: Hexo
tags: [Hexo, Next]
comments: false
---
　　经过前面两期文章，我相信你已经可以在本地建立一个非常令人满意的静态博客了，本篇文章将介绍如何将自己的静态博客部署到 gitpage 上，并托管到 github 上；以及关于 Hexo 和 NexT 中更深层次的一些问题及解方案。

## 一、菜单栏中标签与侧边栏中标签关联的问题
　　以我的博客为例，关于菜单栏中的选项 与侧边栏中的选项，由于顶部菜单栏中位置有限，所以我就想在顶部菜单栏中不显示**标签**这一项，于是我在 <span id="inline-purple">主题配置文件</span> 中 将 menu 配置项中的**标签**这一个选项给注释掉了，所以它不会在菜单栏中显示，但是不代表没有这个页面，这个页面是存在的，我们只是使其不显示在顶部的菜单栏中而已，我们可以直接输入绝对地址来查看这个页面，例如：[https://neveryu.github.io/tags/](https://neveryu.github.io/tags/)。但是与此同时，我们发现侧边栏中的<b>标签</b>选项只能显示标签数量，不能点击。

<!-- more -->

　　这是因为侧边栏中的点击链接是根据菜单栏中对应的项来添加的，什么意思呢？就是说如果顶部菜单栏中有 **标签** 这一项，那么就会给侧边栏中<b>标签</b>这一项也添加点击链接；如果顶部菜单栏中没有<b>标签</b>这一项，那么就不给侧边栏中<b>标签</b>这一项添加点击链接，导致侧边栏中的<b>标签</b>项只有显示数据，不提供点击链接。
　　如果我们不想在菜单栏中显示<b>标签</b>项，但是希望侧边栏中的<b>标签</b>项 可以点击，该怎么做呢？
　　在 <span id="inline-purple">主题配置文件</span> `\themes\next\layout\_macro\sidebar.swing_` 中，将
```
{% if site.tags.length > 0 %}
  <div class="site-state-item site-state-tags">
    {% if theme.menu.tags %}<a href="{{ url_for(theme.menu.tags) }}">{% endif %}
      <span class="site-state-item-count">{{ site.tags.length }}</span>
      <span class="site-state-item-name">{{ __('state.tags') }}</span>
    {% if theme.menu.tags %}</a>{% endif %}
  </div>
{% endif %}
```
改成：
```
{% if site.tags.length > 0 %}
  <div class="site-state-item site-state-tags">
    <a href="{{ url_for(theme.menu.tags) }}">
      <span class="site-state-item-count">{{ site.tags.length }}</span>
      <span class="site-state-item-name">{{ __('state.tags') }}</span>
    </a>
  </div>
{% endif %}
```
<p id="div-border-left-red">同理，关于菜单栏中 归档 和 分类 的类似操作也是如此。</p>


## 二、关于High一下中的音乐多次点击重叠播放的解决方案

　　在之前的 High一下 的播放音乐，如果多次点击的话，音乐会重复叠加播放，严重影响听歌体验，而且只能播放一首歌。
　　而现在的 High一下 已经解决了这个问题，而且可以列表循环多首歌曲。我将之前的那段播放音乐的代码换了。由于代码太长了，就不在这里贴出来了。大家可以去查看我的源码：[https://github.com/Neveryu/Blog](https://github.com/Neveryu/Blog)。
关于播放音乐的代码是在： [https://github.com/Neveryu/Blog/blob/master/themes/next/layout/_partials/header.swig](https://github.com/Neveryu/Blog/blob/master/themes/next/layout/_partials/header.swig) 中的第 60 行开始。
　　需要说明的是：现在的 High一下 实现了歌曲列表循环，所以，我们可以放入多首歌的链接。在代码中以数组元素的形式加入歌曲链接。
```
var songs = [
    "http://v.65dj.com/wailian/84791c997d8c55023dad0d5690e48c28.mp3",
    "http://7xoiki.com1.z0.glb.clouddn.com/Music-sunburst.mp3"
];
```


## 三、关于github屏蔽vendors ，导致页面空白的解决方案

关于 Github Pages 过滤掉了 source/vendors 目录的访问，导致加载 vendor 里面的文件全部 404 ，页面大面积空白。
1.在根目录添加 **.nojekyll** 文件。
2.也可以手动将 source/vendors 目录修改成 source/lib 同时，修改主题配置文件 _config.yml ，将 `_internal: vendors` 改成你所修改的名字，例如 `_internal: lib` 。



## 四、关于如何获取自己的多说userid
首先进入自己的帐号管理页面，点击左上自己的名字
![](http://i1.piimg.com/567571/afbb6058c9f628ad.png)
此时地址栏后面的一串数字就是你的多说 **userid**。
![](http://i1.piimg.com/567571/5e3de4efdcabd668.png)

## 五、关于如何修改内容区域宽度
Next 对内容的宽度的设定如下：
* 700px，当屏幕宽度 < 1600px
* 900px，当屏幕宽度 >= 1600px
* 移动设备下，宽度自适应

如果你需要修改内容的宽度，同样需要编辑样式文件。编辑主题的 source\css\_variables\custom.styl 文件，新增变量：
```
// 修改成你期望的宽度
$content-desktop = 700px

// 当视窗超过 1600px 后的宽度
$content-desktop-large = 900px
```
此方法不适用于 Pisces Scheme ， Pisces Scheme 编辑 `themes\next\source\css\_schemes\Picses\_layout.styl` 文件，更改以下 css 选项定义值：
```
.header {width: 1150px;}
.container .main-inner {width: 1150px;}
.content-wrap {width: calc(100% - 260px);}
```

## 六、图片模式
新建博文，设置 `type: "picture"` ，使用 `{\% gp x-x \%}...{\% endgp \%}` 标签引用要展示的图片地址，如下所示：
```
---
title: Naruto-Pictures
categories: [picture]
tags: [picture,naruto]
date: 2016-11-02 14:36:04
type: "picture"
---
{% gp 5-3 %}
![](http://oapjp6spr.bkt.clouddn.com/18210.jpg)
![](http://oapjp6spr.bkt.clouddn.com/196232.jpg)
![](http://oapjp6spr.bkt.clouddn.com/224147.jpg)
![](http://oapjp6spr.bkt.clouddn.com/199301.jpg)
![](http://oapjp6spr.bkt.clouddn.com/213318.jpg)
{% endgp %}
```

** 图片展示效果 **
`{\% gp 5-3 \%}`：设置图片展示效果，参考 themes\next\scripts\tags\group-pictures.js 注释示意图。
![](http://p1.bpimg.com/567571/eaef5acfcb3011c2.png)
`5-3` 的意思就是5张图片将会按照这种布局来展示，Next 提供了多张图片的多种布局，你可以随意选择。

<h5 style="color:#f63;"><i>最后要说的是：</i></h5>
<p id="div-border-top-green"><i>[博客源码](https://github.com/Neveryu/Neveryu.github.io) ， 欢迎 star
</i></p>