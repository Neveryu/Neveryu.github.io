title: npm 的一个小细节
date: 2017-05-20 01:25:24
categories: 前端
tags: [npm]
comments: false
summary_img: 
---

在使用 electron 构建桌面应用的时候，在 package.json 里面的 scripts 字段是这样的
``` 
"scripts": {
  "start": "electron ."
},
```
我们可以执行 npm start ，那么它就会执行 `electron .` 这个命令。
那么如果我们直接执行 `electron .`
由于我们没有将 electron 加入到全局，所以不行。
那么为什么 npm start 可以执行呢？

<!-- more -->

这就涉及到 npm run 命令的一个小细节了。
npm run xxx 可以执行 package.json 里面 scripts 里面对应的命令，并且是 shell 脚本。但是在执行的时候有一个小处理：

**npm run 新建的这个 shell ，会将当前目录的 node_modules/.bin 子目录加入 PATH 变量，执行结束后，再将 PATH 变量恢复原样。**

这就解释了，没有安装全局的 electron ，直接运行 `electron .` 是不行的，但是使用 `npm start` 来运行 `electron .` 可以。

**下面介绍一个使用 npm 的实践：**
很多朋友使用 hexo 来构建博客；hexo 是基于 Node.js 产物，用它发表博文，很是方便；你只需 hexo clean, hexo g, hexo d三个命令即可；而且每一个命令必须等待前一个命令运行完成。文章数据一多，一套命令打下来，也得 20s+；如果略懂 npm，在 package.js 中加入点命名，例如像这样；
``` javascript
"scripts": {
  "start": "sudo hexo clean && sudo hexo g && sudo gulp && sudo hexo d"
}
```

那么 只需运行 npm start 就好，可将时间消耗缩短至 2s节省时间虽说不多，却也是数量级的提升，而且代价只是那么小，并一劳永逸。所以有必要对此。

关于 npm 的详细学习，可以查看：[npm 全面介绍](https://neveryu.github.io/2017/04/10/npm/)