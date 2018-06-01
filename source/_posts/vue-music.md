---
title: vue2.x 做一个音乐app
date: 2018-05-01 03:25:24
categories: 前端
tags: [vue]
comments: false
---

## 简介

<p id="div-border-top-green">本项目是基于 vue2.4.1 最新的实战项目，vue-cli2.9.3 + vue2.4.1 + axios + vue-router3.0.1 + es6 + vux3.0.1 + webpack + better-scroll + 线上真实接口的一个移动端音乐 app。</p>

<!-- more -->

![](/images/vue-music-2.png)

## 实现的功能
1、音乐列表、歌单、歌手、排行、榜单、推荐
2、音乐播放、暂停、上一曲、下一曲、喜欢
3、播放列表、添加到播放列表、历史列表
4、搜索单曲、歌手、专辑、MV
5、查看歌手页面、专辑页面、MV
6、热门搜索
7、搜索历史记录
8、排行榜
9、切换播放模式
10、歌词
11、个人中心
12、项目介绍


<p id="div-border-left-red">现在最流行的开发方式就是前后分离了；
[vue](/tags/vue) 也是现在最流行的前端框架之一。</p>




## 截屏演示
<video src="/images/vue-music.mp4" controls="controls" preload="preload" height="400px"></video>

## 移动端演示
扫二维码在手机上查看效果更好
![](/images/vue-music-1.png)

## 项目代码
[https://github.com/Neveryu/vue-music](https://github.com/Neveryu/vue-music)

## 构建

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run local server
npm run prod.server.js
```

## Tip 

```bash
# 如果 npm install 长时间没有反应或者安装失败，请尝试
npm install --registry=https://registry.npm.taobao.org
```


## 详细

vue 有自己的脚手架构建工具 vue-cli 。使用起来非常方便，使用 webpack 来集成各种开发便捷工具，比如：
- 代码热更新，修改代码之后网页无刷新改变，对前端开发来说非常的方便
- Postcss，再也不用去管兼容性的问题了，只针对 chrome 写 css 代码，会自动编译生成支持多款浏览器的 css 代码
- ESlint，统一代码风格
- bable，ES2015 出来已经有一段事件了，但是不少浏览器还没有兼容 ES6。有了 bable，放心使用 ES6 语法，它会自动转义成 ES5 语法
- Stylus，类似于 sass/scss ，但是可以不写 `{ }` 和 `: `，使用起来还是很方便的
- better-scroll，很好用的移动端各种滚动场景需求的插件（已支持PC）
- vuex，Vuex是一个专为 Vue.js 应用程序开发的状态管理模式
- vue-router，专为 Vue.js 应用程序开发的路由工具

除此之外，vue-cli 已经使用 node 配置了一套本地服务器和安装命令等，本地运行和打包只需要一个命令就可以搞定，非常的方便。

## 为什么写这个项目
之前的 [vue-sell](https://neveryu.github.io/2017/11/11/vue-sell/)，是一个非常好的 vue 的项目教程了，学了 vue 以后，跟着做一遍 vue-sell，应该对 vue 的基本操作都能非常熟练的掌握了。
但是如何结合 vuex 和 vue-router，以及其他技术，做一个大型的项目，很多同学还是苦于没有经验和项目实例，所以就有了这个 vue-music。

[vue-music](https://neveryu.github.io/music/#/recommend) 里面用到了 vue 全家桶，还有 better-scroll，jsonp 等其他工具，用的也是线上真实的音乐接口数据，而且项目里封装了很多完美的组件，对个人技术的学习和提升有很大的帮助，项目级别上也达到了中大型级别。
非常适合 vue 的进阶学习。

## 获取教程
这个项目我从头到尾写了一遍，解决了项目中遇到的所有问题，由于有一些包或者模块升级的原因，会有一些小的问题，我都已经解决过了。
现在扫码即可获取视频教程以及本人联系方式 微信/QQ，你可以问我你在学这个项目中遇到的任何问题，我都会帮你解答。
![](/images/vue-music-pay.JPG)
