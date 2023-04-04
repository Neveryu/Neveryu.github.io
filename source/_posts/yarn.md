---
title: Yarn安装与使用详细介绍
date: 2018-07-20 03:25:24
categories: 前端
tags: [Yarn]
comments: false
---

# 背景
在 Node 生态系统中，依赖通常安装在项目的 `node_modules` 文件夹中。然而，这个文件的结构和实际依赖树可能有所区别，因为重复的依赖可以合并到一起。`npm` 客户端把依赖安装到 `node_modules` 目录的过程具有不确定性。这意味着当依赖的安装顺序不同时，`node_modules` 目录的结构可能会发生变化。这种差异可能会导致类似<font color="red">“我的电脑上可以运行，别的电脑上不行”</font>的情况，并且通常需要花费大量时间定为与解决。

> 有时候就会遇到这种情况，完整可运行的项目上传到 git 上，别人 pull 下来以后，npm install 会报错。

[Yarn](https://github.com/yarnpkg/yarn) 一开始的主要目标是解决由于语义版本控制而导致的 npm 安装的不确定性问题。虽然可以用 `npm shrinkwrap` 来实现可预测的依赖关系树，但它并不是默认选项，而是取决于所有的开发人员指导并启用这个选项。

<!-- more -->

> npm 5+ 以后的版本加入了 package-lock.json 可以用来锁版本，package-lock.json 的名字，一看就懂，更清楚，但是不向后兼容。

> npm-shrinkwrap.json 向后兼容 npm 2-4。

<font color="red">举个例子：</font>
npm 对包引入顺序也十分的敏感，比如在一个空项目里执行以下命令：
``` js
npm init -y
npm install globule@0.1.0 -S
npm install babel-generator@6.19.0 -S
npm install babel-helper-define-map@6.18.0 -S
```
我们这里安装了 3 个包都依赖于 lodash，不过 globule 依赖 lodash@1.0.3，另外另个依赖 lodash@4.x。
现在目录依赖结构如下：
![npm-package](https://img-blog.csdn.net/20180824142908356?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NzZG5feXVkb25n/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

这是假设我们在项目里使用 lodash，但是忘记重新安装 lodash
``` js
var lodash = require('lodash')
console.log(lodash.VERSION)  // v1.0.3
```
另一个同事获取项目代码，执行 `npm install`，这时的目录依赖结构里面，第一层依赖的 lodash 变成了 4.x 版本，这样就造成了依赖版本不一致的问题。而 yarn 则会保证无论怎样引入的顺序，目录依赖结构都是一致的，确保不会发生这样的BUG。



# 什么是 Yarn
Yarn 就是一个类似于 npm 的包管理工具，它是由 facebook 推出并开源。

与 npm 相比，yarn 有着众多的优势，主要的优势在于：速度快、离线模式、版本控制。

## 速度快
npm 会等一个包完全安装完才跳到下一个包，但 yarn 会并行执行包，因此速度会快很多。

Yarn 会缓存它下载的每个包，所以无需重复下载。它还能并行化操作以最大化资源利用率，安装速度之快前所未有。

## 离线模式
之前安装过的包会被保存进缓存目录，以后安装就直接从缓存中复制过来，这样做的本质还是会提高安装下载的速度，避免不必要的网络请求。

## 可靠可确定性
保证各平台依赖的一致性

## 网络优化
力求网络资源最大利用化，让资源下载完美队列执行，避免大量的无用请求，下载失败会自动重新请求，避免整个安装过程失败

## 扁平化模式
对于不匹配的依赖版本的包创立一个独立的包，避免创建重复的。
对于多个包依赖同一个子包的情况，yarn 会尽量提取为同一个包，防止出现多处副本，浪费空间。

## 版本控制
npm 用下来比较强的一个痛点就是：当包的依赖层次比较深时，版本控制不够精确。会出现相同 package.json，但不同人的电脑上安装出不同版本的依赖包，出现类似<font color="red">“我的电脑上可以运行，别的电脑上不行”</font>的 bug 很难查找。你可以使用 [npm-shrinkwrap](https://docs.npmjs.com/cli/shrinkwrap) 来实现版本固化，版本信息会写入 npm-shrinkwrap.json 文件中，但它毕竟不是 npm 的标准配置。

而 yarn 天生就能实现版本固化。会生成一个类似 npm-shrinkwrap.json 的 yarn.lock 文件，而文件内会描述包自身的版本号，还会锁定所有它依赖的包的版本号：
``` js
"@babel/code-frame@7.0.0-beta.47":
  version "7.0.0-beta.47"
  resolved "https://registry.yarnpkg.com/@babel/code-frame/-/code-frame-7.0.0-beta.47.tgz#d18c2f4c4ba8d093a2bcfab5616593bfe2441a27"
  dependencies:
    "@babel/highlight" "7.0.0-beta.47"
```
yarn.lock 存储着你的每个包的确切依赖版本，能确保从本地开发到生产环境，所有机器上都有精确相同的依赖版本。

## 其他关于 Yarn 的介绍
我们在使用 Yarn 时，依然要访问 npm 仓库，但 Yarn 能够更快速地安装软件包和管理依赖关系，并且可以在跨机器或者无网络的安全环境中保持代码的一致性。

# Yarn 安装

## windows
在 Yarn 中文网可以找到 window 下的三种安装方法：

![yarn-install](https://img-blog.csdn.net/20180824120236673?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NzZG5feXVkb25n/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

不过我觉得这三种方法都不好用，快速好用的安装方法应该还是使用 npm 来安装：
```
npm install -g yarn
```

关于为什么使用 `-g`，以及 `-g` 会带来哪来影响，这个可以看我的这篇文章：[npm详细介绍](https://neveryu.github.io/2017/04/10/npm/)，里面详细介绍了为什么要使用 `-g`，以及 `-g` 的作用。

## mac
### 方式一
```
npm install -g yarn
```
如果有报： `Please try running this command again as root/Administrator.`，可能就是权限不足，因此你需要切换到最高权限去执行命令
```
sudo -s
npm install yarn -g
```

### 方式二
使用另一种初始化脚本的方法，可能就会比较简单一些：
```
curl -o- -L https://yarnpkg.com/install.sh | bash
```

### 方式三
如果你的电脑上面已经安装了 Homebrew 的话，你可以通过 Homebrew 包管理器安装 Yarn
``` js
brew install yarn

```

# Yarn 换源
Yarn 源仓库包下载不稳定
```
// 查看 yarn 配置
yarn config get registry
或者
yarn config list

> registry: 'https://registry.yarnpkg.com'
```

```
安装淘宝镜像
yarn config set registry https://registry.npm.taobao.org
```

# Yarn 常用命令

- `npm install` === `yarn`  —— install安装是默认行为
- `npm install taco --save` === `yarn add taco`  —— taco包立即被保存到 `package.json` 中。
- `npm uninstall taco --save` === `yarn remove taco`
- `npm install taco --save-dev` === `yarn add taco --dev`
- `npm update --save` === `yarn upgrade`

-

- `npm install taco@latest --save` === `yarn add taco`
- `npm install taco --global` === `yarn global add taco`  —— 一如既往，请谨慎使用 global 标记。

> 注意：使用yarn或yarn install安装全部依赖时是根据package.json里的"dependencies"字段来决定的

-

- `npm init` === `yarn init`
- `npm init --yes/-y` === `yarn init --yes/-y`
- `npm link` === `yarn link`
- `npm outdated` === `yarn outdated`
- `npm publish` === `yarn publish`
- `npm run` === `yarn run`
- `npm cache clean` === `yarn cache clean`
- `npm login` === `yarn login`
- `npm test` === `yarn test`

## Yarn 独有的命令
- `yarn licenses ls`  —— 允许你检查依赖的许可信息
- `yarn licenses generate`  —— 自动创建依赖免责声明 license
- `yarn why taco`  —— 检查为什么会安装 taco，详细列出依赖它的其他包
- `yarn why vuepress`  —— 检查为什么会安装 vuepress，详细列出依赖它的其他包


# 特性
Yarn 除了让安装过程变得更快与更可靠，还添加了一些额外的特性，从而进一步简化依赖管理的工作流。

- 同时兼容 `npm` 与 `bower` 工作流，并支持两种软件仓库混合使用
- 可以限制已安装模块的协议，并提供方法输出协议信息
- 提供一套稳定的共有 JS API，用于记录构建工具的输出信息
- 可读、最小化、美观的 CLI 输出信息