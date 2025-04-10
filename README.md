这是我的个人博客仓库，博客地址： [https://neveryu.github.io/](https://neveryu.github.io/)

## Build Setup

```bash
# 我是使用npm来安装依赖包和启动项目，没有用yarn
# install dependencies
npm install

# serve at localhost:4000
npm run dev

# serve with hot reload at localhost:3000
npm start

# build
npm run build

# deploy
npm run deploy
```

移动端快速访问：

![my-blog](https://neveryu.github.io/images/view-my-blog.png)

---

## 浏览器支持 Browser support

![Browser support](http://iissnan.com/nexus/next/browser-support.png)

[建站日志](https://neveryu.github.io/weblog/) | [给我留言](https://neveryu.github.io/guestbook/)

---

# 其他项目

<div>
  <div title="sell">
    <b>用 vue 做的移动端外卖网站</b>
    <br>
    <i>扫码体验：</i>
    <br>  
    <img src="https://neveryu.github.io/images/vue-sell-2.png" alt="vue-sell" width="200">
  </div>
  <div title="vue-music">
    <b>用 vue 开发移动端音乐播放器</b>
    <br>
    <i>扫码体验：</i>
    <br>
    <img src="https://neveryu.github.io/images/vue-music-1.png" alt="vue-music" width="200">
  </div>
</div>

# 部署到 github page

方式 1、使用 Hexo 自带的命令【我目前使用的部署方式】

```bash
npm run deploy
```

> 由于我的这个仓库创建时间较早，依赖的相关工具的版本比较老旧；在本地运行服务的时候，可能对 `node` 版本还没有什么特殊的要求。但是不能使用过高版本的 `node` 来构建和部署，目前测试发现在构建的时候，`node` 版本超过 12 就不行了。

> 所以，在构建和部署的时候，要把 `node` 版本切换到 12；部署完了再切换 `node` 到一个比较新的版本。

方式 2、使用 github 的 action

```bash
# 1、写好 action 脚本
# 2、把源代码推送到 github 仓库即可，github 的 action 会自动安装以来，构建，部署
```

> 由于我的这个仓库依赖的相关工具的版本比较老旧，action 的 action 在安装依赖时，发现有安全性的问题，就会报错，不会继续执行下去。

方式 3、自定义 `.deploy.sh` 脚本

```bash
# 目前就用方式一，也还挺方便的
```

# Contact Me

欢迎加入 QQ 群，共同学习讨论，QQ 群：[685486827](//shang.qq.com/wpa/qunwpa?idkey=32da7a18744756b0d8ffdd05b84999afecb5265dbad0fb119033e122abe803f3) ，<a target="_blank" href="//shang.qq.com/wpa/qunwpa?idkey=32da7a18744756b0d8ffdd05b84999afecb5265dbad0fb119033e122abe803f3">一键加群</a>

<img src="https://neveryu.github.io/images/qq-group.png" alt="vue-music" width="250">
