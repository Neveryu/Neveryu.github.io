---
title: 【转】为什么我们放弃了 Zepto
date: 2017-02-14 01:25:24
categories: 综合
tags: [zepto]
comments: false
summary_img: http://i2.muimg.com/567571/fae45a374015a1c2.png
---

<!-- <img src="http://i2.muimg.com/567571/fae45a374015a1c2.png" alt="summary-img-src-zepto"> -->

<!-- more -->

> [Foundation](http://foundation.zurb.com/) 是 [Zurb](http://zurb.com/) 公司开源的一套前端框架，和 [Bootstrap](http://www.bootcss.com/) 类似。


在漆深的洞中，聪明、强壮的雪人（雪人 -- Yeti -- 是 Foundation 框架的吉祥物，这里其实是暗指 Foundation 框架）听到人们的询问“Zepto 去哪儿了？”。


回顾 Foundation 版本 4 开发时，我们考虑采用 Zepto 库（jQuery 可选），主要是由于 Zepto 体积小、加载速度快。


随着时间的推移，我们发现文件体积的大小根本和执行效率没有任何比例关系。当然，必须承认，Zepto 下载的确很快。但是，一旦下载到浏览器之后，它并不像 jQuery 一样执行速度快。并且，很多第三方插件都依赖 jQuery，不支持 Zepto -- 实际上，我们发现某些第三方插件和 Zepto 有冲突。


对于我们来讲，维护多套代码很不容易。例如，Zepto 缺少合适的高度计算函数，这让某些栅格（grid）的计算变得很困难。


为了解决这些问题，我们发现解决办法其实极其简单：基于 jQuery 2 构建 Foundation 版本 5。除了获得更好的执行速度和广泛的业界支持外，jQuery 2 的文档更优秀、支持也同样更好。jQuery 的 API 在各个版本是兼容的。


等一等，为了把问题讲清楚，我们还是先假定 Zepto 的执行速度可能比 jQeury 快。我们不希望犯同样的错误，因此，我们将 Zepto 和 jQuery 2 进行对比测试，测试结果是：[jQuery 2 每秒执行的操作次数比 Zepto 多](http://jsperf.com/zepto-vs-jquery-2013/25)。这让 Foundation 版本 5 的执行效率更高，同时让所有用户感受到更好的体验。


最后，我们希望帮助大家更快速地设计优秀的产品 -- 这次，我们的一点儿改变，让 Foundation 这个前端框架的速度得到大幅提升！



## 译者总结：
在开源的世界中，充斥着大量的开源项目，但是，只有少部分的开源项目为广大开发者所熟知并积极使用。一个好的开源项目必须有一个强大的社区和一批积极的贡献者，jQuery 就是其中一个幸运儿。

原文地址：[http://zurb.com/article/1293/why-we-dropped-zepto](http://zurb.com/article/1293/why-we-dropped-zepto)