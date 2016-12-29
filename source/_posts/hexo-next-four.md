---
title: Hexo-NexT搭建个人博客（四）
date: 2016-12-15 23:25:24
categories: 综合
tags: [Hexo,Next]
comments: false
---
本篇文章将介绍在使用 `heox` 做博客框架中的一些 `bug` 处理情况。

按照之前的教程介绍应该是会比较顺利的搭建好博客，但是难免会遇到一些意外，这个时候就要学会解决问题了。
解决问题的原则是：查看 `bug` 信息，从上到下一次解决 `bug`。

下面来看几个例子：

<!-- more -->

![](http://i1.piimg.com/567571/08a05e89a756ee75.png)
提示插件 `hexo-deployer-got` 加载失败，想了一下，应该是上次我在移动博客目录的时候，这个模块中有一些文件名比较长的文件，系统会提示移动不过来，导致这个模块异常，很简单，删除这个模块，重新安装即可。如下：

![](http://i1.piimg.com/567571/a26efa972092fb9e.png)

OK ， 现在好了，`hexo clean` 没有报错了。

![](http://i1.piimg.com/567571/24a28fcb40d1c95f.png)

下面，我们是 `hexo g` 的操作，同样也出现了错误：

![](http://i1.piimg.com/567571/40a2d64a4aba2a04.png)

遇到问题，首先不要害怕，不要逃避，看一下错误信息：
如 1 所示：我们首先会发现缺少模块 `isarray` ，但是我们查看 `package.json` 文件，我们的项目根本就没有引入 `isarray` 这个模块，我猜测这个 `isarray` 模块应该是某个模块的子模块 。

如 2 所示：我们顺着 `at` 一路往下找。

如 3 所示：发现这个 `isarray` `at` `hexo-generator-sitemap` ，所以我们删除这个 `hexo-generator-sitemap` 模块，然后重新安装这个模块。如下：

![](http://i1.piimg.com/567571/6a740eb49f5ad0c2.png)

OK ， 现在好了，`hexo g` 没有报错了。

![](http://i1.piimg.com/567571/91abd56ac0617023.png)

总结：遇到问题 bug ，不要慌也不要放弃，查阅错误提示信息，遵守从上往下解决的方案。
