---
title: 使用 Travis CI 自动更新 GitHub Pages
date: 2019-02-05 07:25:24
categories: 前端
tags: [CI]
comments: false
summary_img: /images/travis-logo2.png
---

[Travis CI](https://travis-ci.org/) 提供的是持续集成服务（Continuous Integration，简称 CI）。我们在软件开发过程中，有构建、测试、部署这些必不可少的步骤，而这些会花掉我们很多的时间。为了提高软件开发的效率，现在涌现了很多自动化工具。[Travis CI](https://travis-ci.org/) 是目前[市场份额](https://github.blog/2017-11-07-github-welcomes-all-ci-tools/)最大的一个，而且有很详细的文档以及可以和 Github 很好的对接。

<!-- more -->

Travis CI 还是很强大的，用好这个工具不仅可以提高效率，还能使开发流程更可靠和专业化。

就我写的 [web-bookmarks](https://neveryu.github.io/web-bookmarks/) 这个项目来说的话，每次更改完都要手动部署到 GitHub Pages。

从最开始的手动构建部署：手动敲构建命令，然后手动推到 GitHub。(*重复的次数多了就显得很麻烦，出错的几率也会变大。*)

后来写了一个构建部署的脚本：每次开发完，再手动执行脚本，完成构建部署。

再到现在的使用 CI 自动更新：开发完，我只用将源码 push 到 GitHub 做版本管理，就 ok 了；Travis 监测到代码有变化，然后就会自动执行我们设定好的任务。【优秀～】

# 一、什么是持续集成
Travis CI 提供的持续集成服务（Continuous Integration，简称 CI）。它绑定 Github 上面的项目，只要有新的代码，就会自动抓取。然后，提供一个运行环境，执行测试，完成构建，还能部署到服务器。

持续集成指的是只要代码有变更，就自动运行构建和测试，反馈运行结果。
<p id="div-border-top-purple">举一个例子：我们可以在我们的开源项目中，安排一个代码格式检查和测试的任务 `npm run test`，不管是自己提交代码，还是别人提交的 PR，Travis 监测到代码有新的内容，都会来执行这个任务。【不管代码写的怎样，格式一定不能乱～，哈哈😄】
</p>

持续集成的好处在于，每次代码的小幅变更，就能看到运行结果，从而不断累积小的变更，而不是在开发周期结束时，一下子合并一大块代码。

# 二、开始使用
首先打开官方网站 [travis-ci.org](https://travis-ci.org)，然后使用 Github 账号登入 Travis CI，然后 Travis 中会列出你 Github 上面所有的仓库，以及你所属于的组织。

然后，勾选你需要 Travis 帮你自动构建的仓库，打开仓库旁边的开关，打开以后，Travis 就会监听这个仓库的所有变化了。

![travis-ci-1](/images/travis-ci-1.png)

# 三、.travis.yml
Travis 要求项目的根目录下面，必须有一个 `.travis.yml` 文件。这是配置文件，指定了 Travis 的行为。该文件必须保存在 Github 仓库里面，一旦代码仓库有新的 `Commit`，Travis 就会去找这个文件，执行里面的命令。

所以呢，我们就可以在这个文件里，配置我们任务（Travis 监测到仓库有 `commit` 后会自动执行）。

一个简单的 `.travis.yml` 文件如下：
``` yml
language: node_js
script: true
```

所以呢，我在 `.travis.yml` 里，配置了一个执行脚本的任务；那么现在 Travis 监测到我仓库有 `commit` 后就会找到 `.travis.yml` 这个文件，然后就执行了我的那个脚本了。

## install 字段
`install` 字段用来指定安装脚本，如果有多个脚本，可以写成下面的形式。
``` yml
install:
  - command1
  - command2
```
上面代码中，如果 `command1` 失败了，整个构建就会停下来，不再往下进行
如果不需要安装，即跳过安装阶段，就直接设为 `true`。
``` bash
install: true
```

## script 字段
`script` 字段用来配置构建或者测试脚本，如果有多个脚本，可以写成下面的形式。
``` yml
script:
  - command1
  - command2
```
注意，`script` 与 `install` 不一样，如果 `command1` 失败，`command2` 会继续执行。但是，整个构建阶段的状态是失败。

如果 `command2` 只有在 `command1` 成功后才能执行，就要写成下面这样。
``` yml
script: command1 && command2
```

# 四、部署时面临的问题

<p id="div-border-left-red">现在脚本是由 Travis CI 来执行的，部署的时候，怎么让 Travis 有权限往 Github 提交代码呢？</p>

Github 有提供一个 [Personal access tokens](https://github.blog/2013-05-16-personal-api-tokens/)，这个 Token 与 账号密码 以及 SSH Keys 同样具有 Github 写入能力。

前往 Github 帐号 Settings 页面，在左侧选择 `Personal Access Token`，然后在右侧面板点击 `“Generate new token”` 来新建一个 Token。需要注意的是，创建完的 Token 只有第一次可见，之后再访问就无法看见（只能看见他的名称），因此要保存好这个值。

![travis-ci-2](/images/travis-ci-2.png)


那么，这个 Token 怎么使用呢。


## 方案一、

一个比较方便快捷的方式，是通过 Travis 网站，写在每个仓库的设置页面里，有一个 `Environment Variables` 的配置项，给我们的 Token 起一个名字 `gh_token` 添加进去。这样以来，脚本内部就可以使用这个环境变量了。
![travis-ci-1](/images/travis-ci-3.png)
你可以在你脚本内部使用 `${gh_token}` 的形式来使用这个 Token 了。【当然了，你还可以添加其他的环境变量进去。】【[官方文档在这里](https://docs.travis-ci.com/user/environment-variables)】

使用 `Personal access tokens` 向 GitHub 提交代码的命令格式如下：
``` bash
# ${GH_TOKEN} 对应就是 Personal access tokens ， GH_TOKEN 是环境变量名
# ${GH_REF} 对应的是你的 Github 仓库地址，GH_REF 是变量名
git push -f "https://${GH_TOKEN}@${GH_REF}" master:gh-pages
```

<p id="div-border-left-green">这里需要注意的是：
1、GitHub 生成的这个 Token ，只有生成的时候可以看到明文，后面就看不到明文了，所以你使用的时候最好一次操作成功。
2、Travis CI 中添加 Token 时，记得用密文，要不然在 `build log` 中是可以被看到的。
</p>

## 方案二、

你还可以使用 Travis CI 提供的加密工具来加密我们的这个 Token。加密原理机制如下：

![travis-ci-encrypt](/images/travis-encrypt.png)

首先，安装 Ruby 的包 `travis` 。
```bash
# 安装 Travis CI 命令行工具
$ gem install travis
```

然后，就可以用 `travis encrypt` 命令加密信息。
在项目的根目录下，执行下面的命令。
``` bash
$ travis encrypt name=secretvalue
```
上面命令中，`gh_token` 是要加密的变量名，`secretvalue` 是要加密的变量值。执行以后，屏幕上会输出如下信息。
```
secure: "... encrypted data ..."
```
现在，就可以把这一行加入 `.travis.yml` 。
``` bash
env:
  global:
    - GH_REF: github.com/Neveryu/xxxxx.git
    - secure: "... entrypted data ..."
```
然后，脚本里面就可以使用环境变量 `gh_token` 了，Travis 会在运行时自动对它解密。

```bash
# ${gh_token} 对应就是 Personal access tokens ， gh_token 是环境变量名
# ${GH_REF} 对应的是你的 Github 仓库地址，GH_REF 是变量名
git push -f "https://${gh_token}@${GH_REF}" master:gh-pages
```


`travis encrypt` 命令的 `--add` 参数会把输出自动写入 `.travis.yml`，省掉了修改 `env` 字段的步骤。
``` bash
$ travis encrypt name=secretvalue --add
```
详细信息请看[官方文档](https://docs.travis-ci.com/user/encryption-keys/)

<p id="div-border-top-red">可以参考我的 <a href="https://github.com/Neveryu/vue-cms" target="_blank" title="vue-cms">vue-cms</a> 这个项目中的 `.travis.yml` 文件</p>

# 常见问题

## 如何显示 Status Image

[![Build Status](https://travis-ci.org/Neveryu/web-bookmarks.svg?branch=master)](https://travis-ci.org/Neveryu/web-bookmarks)

![travis-ci-4](/images/travis-ci-4.png)


## 如何跳过自动构建

如果 commit 不想让 Travis 构建，那么就在 commit message 里加上 [ci skip] 就行了。
```bash
git commit -m "[ci skip] commit message"
```

## 权限问题

如果遇到脚本权限不够的提示或者问题，你可以给你的脚本加上权限：
``` bash
chmod u+x deploy.sh
```

或者在 `.travis.yml` 里加：
``` yml
before_install:
  - chmod u+x deploy.sh
```


# 扩展知识

## Travis CI 加密文件

如果要加密的是文件（比如私钥），Travis 提供了加密文件功能。
安装命令行客户端以后，使用下面的命令登入 Travis CI 。
``` bash
$ travis login
```
然后，进入项目的根目录，使用 `travis encrypt-file` 命令加密那些想要加密的文件。
``` bash
$ travis entrypt-file bacon.txt

encrypting bacon.txt for rkh/travis-encrypt-file-example
storing result as bacon.txt.enc
storing secure env variables for decryption

Please add the following to your build script (before_install stage in your .travis.yml, for instance):

    openssl aes-256-cbc -K $encrypted_0a6446eb3ae3_key -iv $encrypted_0a6446eb3ae3_key -in bacon.txt.enc -out bacon.txt -d

Pro Tip: You can add it automatically by running with --add.

Make sure to add bacon.txt.enc to the git repository.
Make sure not to add bacon.txt to the git repository.
Commit all changes to your .travis.yml.
```

上面的代码对文件 `bacon.txt` 进行加密，加密后会生成 `bacon.txt.enc` ，该文件需要提交到代码库。此外，该命令还会生成一个环境变量 `$entrypted_0a6446eb3ae3_key`，保存密钥，储存在 Travis CI，文件解密时需要这个环境变量。你需要把解密所需的 `openssl` 命令，写在 `.travis.yml` 的 `before_install` 字段里面。这些都写在上面的命令行提示里面。

`--add` 参数可以自动把环境变量写入 `.travis.yml` 。

``` bash
$ travis encrypt-file bacon.txt --add
entrypting bacon.txt for rkh/travis-encrypt-file-example
storing result as bacon.txt.enc
storing secure env variables for decryption

Make sure to add bacon.txt.enc to the git repository.
Make sure not to add bacon.txt to the git repository.
Commit all changes to your .travis.yml.
```
详细信息请看[官方文档](https://docs.travis-ci.com/user/encrypting-files/)

