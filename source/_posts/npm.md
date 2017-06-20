title: npm 全面介绍
date: 2017-04-10 03:25:24
categories: 前端
tags: [npm]
comments: false
summary_img: http://i1.piimg.com/588926/30e7b49044d5cfc4.png
---

<!-- <img src="http://i1.piimg.com/588926/30e7b49044d5cfc4.png" alt="summary-img-src-npm"> -->

<!-- more -->

# 什么是 NPM

npm 之于 Node.js ，就像 pip 之于 Python， gem 之于 Ruby， pear 之于 PHP 。

npm 是 Node.js 官方提供的包管理工具，他已经成了 Node.js 包的标准发布平台，用于 Node.js 包的发布、传播、依赖控制。npm 提供了命令行工具，使你可以方便地下载、安装、升级、删除包，也可以让你作为开发者发布并维护包。

# 为什么要使用 NPM
npm 是随同 Node.js 一起安装的包管理工具，能解决 Node.js 代码部署上的很多问题，常见的场景有以下几种：

- 允许用户从 npm 服务器下载别人编写的第三方包到本地使用。
- 允许用户从 npm 服务器下载并安装别人编写的命令行程序到本地使用。
- 允许用户将自己编写的包或命令行程序上传到 npm 服务器供别人使用。

npm 的背后，是基于 couchdb 的一个数据库，详细记录了每个包的信息，包括作者、版本、依赖、授权信息等。它的一个很重要的作用就是：将开发者从繁琐的包管理工作（版本、依赖等）中解放出来，更加专注于功能的开发。

# 如何使用 NPM
## 安装
npm 不需要单独安装。在安装 Node 的时候，会连带一起安装 npm 。但是，Node 附带的 npm 可能不是最新版本，最后用下面的命令，更新到最新版本。
```
$ sudo npm install npm@latest -g
```
如果是 Window 系统使用以下命令即可：
```
npm install npm -g
```
也就是使用 npm 安装自己。之所以可以这样，是因为 npm 本身与 Node 的其他模块没有区别。

然后，运行下面的命令，查看各种信息。
``` bash
# 查看 npm 命令列表
$ npm help

# 查看各个命令的简单用法
$ npm -l

# 查看 npm 的版本
$ npm -v

# 查看 npm 的配置
$ npm config list -l
```

## 使用
### npm init
npm init 用来初始化生成一个新的 package.json 文件。它会向用户提问一系列问题，如果你觉得不用修改默认配置，一路回车就可以了。
如果使用了 -f（代表force）、-y（代表yes），则跳过提问阶段，直接生成一个新的 package.json 文件。
``` bash
$ npm init -y
```

### npm set
npm set 用来设置环境变量
``` bash
$ npm set init-author-name 'Your name'
$ npm set init-author-email 'Your email'
$ npm set init-author-url 'http://yourdomain.com'
$ npm set init-license 'MIT'
```
上面命令等于为 npm init 设置了默认值，以后执行 npm init 的时候，package.json 的作者姓名、邮件、主页、许可证字段就会自动写入预设的值。这些信息会存放在用户主目录的 ~/.npmrc文件，使得用户不用每个项目都输入。如果某个项目有不同的设置，可以针对该项目运行 npm config。

### npm info
npm info 命令可以查看每个模块的具体信息。比如，查看 underscore 模块的信息。
``` bash
$ npm info underscore
```
上面命令返回一个 JavaScript 对象，包含了 underscore 模块的详细信息。这个对象的每个成员，都可以直接从 info 命令查询。
``` bash
$ npm info underscore description

$ npm info underscore homepage

$ npm info underscore version
```

### npm search
npm search 命令用于搜索 npm 仓库，它后面可以跟字符串，也可以跟正则表达式。
``` bash
$ npm search <搜索词>
```

### npm list
npm list 命令以树形结构列出当前项目安装的所有模块，以及它们依赖的模块。
``` bash
$ npm list

# 加上 global 参数，会列出全局安装的模块
$ npm list -global

# npm list 命令也可以列出单个模块
$ npm list underscore
```

### npm install
使用 npm 安装包的命令格式为：
`npm [install/i] [package_name]`

#### 本地模式和全局模式
npm 在默认情况下会从 http://npmjs.org 搜索或下载包，将包安装到当前目录的 node_modules 子目录下。
如果你熟悉 Ruby 的 gem 或者 Python 的 pip，你会发现 npm 与它们的行为不同，gem 或 pip 总是以全局模式安装，使包可以供所有的程序使用，而 npm 默认会把包安装到当前目录下。这反映了 npm 不同的设计哲学。如果把包安装到全局，可以提供程序的重复利用程度，避免同样的内容的多分副本，但坏处是难以处理不同的版本依赖。如果把包安装到当前目录，或者说本地，则不会有不同程序依赖不同版本的包的冲突问题，同时还减轻了包作者的 API 兼容性压力，但缺陷则是同一个包可能会被安装许多次。

我们在使用 supervisor 的时候使用了 `npm install -g supervisor` 命令，就是以全局模式安装 supervisor 。

这里注意一点的就是，supervisor 必须安装到全局，如果你不安装到全局，错误命令会提示你安装到全局。如果不想安装到默认的全局，也可以自己修改全局路径到当前路径 `npm config set prefix "路径"` 安装完以后就可以用 supervisor 来启动服务了。
supervisor 可以帮助你实现这个功能，它会监视你对代码的驱动，并自动重启 Node.js 。


一般来说，全局安装只适用于工具模块，比如 eslint 和 gulp 。关于使用全局模式，多数时候并不是因为许多程序都有可能用到了它，为了减少多重副本而使用全局模式，而是因为**本地模式不会注册 PATH 环境变量**。
“本地安装”指的是将一个模块下载到当前项目的 node_modules 子目录，然后只有在项目目录之中，才能调用这个模块。

本地模式和全局模式的特点如下：

|模式|可通过 require 使用|注册 PATH|
|:---:|:---:|:---:|
|本地模式|是|否|
|全局模式|否|是|

``` bash
# 本地安装
$ npm install <package name>

# 全局安装
$ sudo npm install -global <package name>
$ sudo npm install -g <package name>
```

npm install 也支持直接输入 Github 代码库地址。
``` bash
$ npm install git://github.com/package/path.git
$ npm install git://github.com/package/path.git#0.1.0
```
安装之前，npm install 会先检查，node_modules 目录之中是否已经存在指定模块。如果存在，就不再重新安装了，即使远程仓库已经有了一个新版本，也是如此。

如果你希望，一个模块不管是否安装过， npm 都要强制重新安装，可以使用 -f 或 --force 参数。
``` bash
$ npm install <packageName> --force
```

#### 安装不同版本
install 命令总是安装模块的最新版本，如果要安装模块的特定版本，可以在模块名后面加上 @ 和版本号。
``` bash
$ npm install sax@latest
$ npm install sax@0.1.1
$ npm install sax@">=0.1.0 <0.2.0"
```
install 命令可以使用不同参数，指定所安装的模块属于哪一种性质的依赖关系，即出现在 packages.json 文件的哪一项中。

> --save：模块名将被添加到 dependencies，可以简化为参数-S。
> --save-dev：模块名将被添加到 devDependencies，可以简化为参数-D。


``` bash
$ npm install sax --save
$ npm install node-tap --save-dev
# 或者
$ npm install sax -S
$ npm install node-tap -D
```


##### dependencies 依赖
这个可以说是我们 npm 核心一项内容，依赖管理，这个对象里面的内容就是我们这个项目所依赖的 js 模块包。下面这段代码表示我们依赖了 `markdown-it` 这个包，版本是 `^8.1.0` ，代表最小依赖版本是 `8.1.0` ，如果这个包有更新，那么当我们使用 npm install 命令的时候，npm 会帮我们下载最新的包。当别人引用我们这个包的时候，包内的依赖包也会被下载下来。
``` javascript
"dependencies": {
    "markdown-it": "^8.1.0"
}
```

##### devDependencies 开发依赖
在我们开发的时候会用到的一些包，只是在开发环境中需要用到，但是在别人引用我们包的时候，不会用到这些内容，放在 devDependencies 的包，在别人引用的时候不会被 npm 下载。
``` javascript
"devDependencies": {
    "autoprefixer": "^6.4.0",0",
    "babel-preset-es2015": "^6.0.0",
    "babel-preset-stage-2": "^6.0.0",
    "babel-register": "^6.0.0",
    "webpack": "^1.13.2",
    "webpack-dev-middleware": "^1.8.3",
    "webpack-hot-middleware": "^2.12.2",
    "webpack-merge": "^0.14.1",
    "highlightjs": "^9.8.0"
}
```
当你有了一个完整的 package.json 文件的时候，就可以让人一眼看出来，这个模块的基本信息，和这个模块所需要依赖的包。我们可以通过 npm install 就可以很方便的下载好这个模块所需要的包。

npm install 默认会安装 dependencies 字段和 devDependencies 字段中的所有模块，如果使用 --production 参数，可以只安装 dependencies 字段的模块。
``` bash
$ npm install --production
# 或者
$ NODE_ENV=production npm install
```

一旦安装了某个模块，就可以在代码中用 require 命令加载这个模块。
``` javascript
var backbone = require('backbone')
console.log(backbone.VERSION)
```


### npm run
npm 不仅可以用于模块管理，还可以用于执行脚本。package.json 文件有一个 scripts 字段，可以用于指定脚本命令，供 npm 直接调用。
package.json
``` javascript
{
  "name": "myproject",
  "devDependencies": {
    "jshint": "latest",
    "browserify": "latest",
    "mocha": "latest"
  },
  "scripts": {
    "lint": "jshint **.js",
    "test": "mocha test/"
  }
}
```

#### scripts 脚本
顾名思义，就是一些脚本代码，可以通过 `npm run script-key` 来调用，例如在这个 package.json 的文件夹下使用 `npm run dev` 就相当于运行了 `node build/dev-server.js` 这一段代码。使用 scripts 的目的就是为了把一些要执行的代码合并到一起，使用 npm run 来快速的运行，方便省事。
npm run 是 npm run-script 的缩写，一般都使用前者，但是后者可以更好的反应这个命令的本质。

``` javascript
// 脚本
"scripts": {
    "dev": "node build/dev-server.js",
    "build": "node build/build.js",
    "docs": "node build/docs.js",
    "build-docs": "npm run docs & git checkout gh-pages & xcopy /sy dist\\* . & git add . & git commit -m 'auto-pages' & git push & git checkout master",
    "build-publish": "rmdir /S /Q lib & npm run build &git add . & git commit -m auto-build & npm version patch & npm publish & git push",
    "lint": "eslint --ext .js,.vue src"
}
```

npm run 如果不加任何参数，直接运行，会列出 package.json 里面所有可以执行的脚本命令。
npm 内置了两个命令简写， npm test 等同于执行 npm run test，npm start 等同于执行 npm run start。

``` javascript
"build": "npm run build-js && npm run build-css"
```
上面的写法是先运行 npm run build-js ，然后再运行 npm run build-css ，两个命令中间用 && 连接。如果希望两个命令同时平行执行，它们中间可以用 & 连接。

写在 scripts 属性中的命令，也可以在 node_modules/.bin 目录中直接写成 bash 脚本。下面是一个 bash 脚本。
``` bash
#!/bin/bash

cd site/main
browserify browser/main.js | uglifyjs -mc > static/bundle.js
```
假定上面的脚本文件名为 build.sh ，并且权限为可执行，就可以在 scripts 属性中引用该文件。
``` javascript
"build-js": "bin/build.sh"
```

### pre- 和 post- 脚本
npm run 为每条命令提供了 pre- 和 post- 两个钩子（hook）。以 npm run lint 为例，执行这条命令之前，npm 会先查看有没有定义 prelint 和 postlint 两个钩子，如果有的话，就会先执行 npm run prelint，然后执行 npm run lint，最后执行 npm run postlint。
``` javascript
{
  "name": "myproject",
  "devDependencies": {
    "eslint": "latest"
    "karma": "latest"
  },
  "scripts": {
    "lint": "eslint --cache --ext .js --ext .jsx src",
    "test": "karma start --log-leve=error karma.config.js --single-run=true",
    "pretest": "npm run lint",
    "posttest": "echo 'Finished running tests'"
  }
}
```
上面代码是一个 package.json 文件的例子。如果执行 npm test，会按下面的顺序执行相应的命令。
1. pretest
2. test
3. posttest

如果执行过程出错，就不会执行排在后面的脚本，即如果 prelint 脚本执行出错，就不会接着执行 lint 和 postlint 脚本。

### npm bin
npm bin 命令显示相对于当前目录的，Node 模块的可执行脚本所在的目录（即 .bin 目录）。
``` bash
# 项目根目录下执行
$ npm bin
./node_modules/.bin
```

# 创建全局链接
npm 提供了一个有趣的命令 npm link，它的功能是在本地包和全局包之间创建符号链接。我们说过使用全局模式安装的包不能直接通过 require 使用。但通过 npm link 命令可以打破这一限制。举个例子，我们已经通过 `npm install -g express` 安装了 express，这时在工程的目录下运行命令：
`npm link express ./node_modules/express -> /user/local/lib/node_modules/express`
我们可以在 node_modules 子目录中发现一个指向安装到全局的包的符号链接。通过这种方法，我们就可以把全局包当做本地包来使用了。
除了将全局的包链接到本地以外，使用 npm link 命令还可以将本地的包链接到全局。使用方法是在包目录（package.json 所在目录）中运行 npm link 命令。如果我们要开发一个包，利用这种方法可以非常方便地在不同的工程间进行测试。

# 创建包
包是在模块基础上更深一步的抽象，Node.js 的包类似于 C/C++ 的函数库或者 Java、.Net 的类库。它将某个独立的功能封装起来，用于发布、更新、依赖管理和版本控制。Node.js 根据 CommonJS 规范实现了包机制，开发了 npm 来解决包的发布和获取需求。
Node.js 的包是一个目录，其中包含了一个 JSON 格式的包说明文件 package.json。严格符合 CommonJS 规范的包应该具备以下特征：
。package.json 必须在包的顶层目录下；
。二进制文件应该在 bin 目录下；
。JavaScript 代码应该在 lib 目录下；
。文档应该在 doc 目录下；
。单元测试应该在 test 目录下。

Node.js 对包的要求并没有这么严格，只要顶层目录下有 package.json，并符合一些规范即可。当然为了提高兼容性，我们还是建议你在制作包的时候，严格遵守 CommonJS 规范。

我们也可以把文件夹封装为一个模块，即所谓的包。包通常是一些模块的集合，在模块的基础上提供了更高层的抽象，相当于提供了一些固定接口的函数库。通过定制 package.json，我们可以创建更复杂，更完善，更符合规范的包用于发布。
    
Node.js 在调用某个包时，会首先检查包中 packgage.json 文件的 main 字段，将其作为包的接口模块，如果 package.json 或 main 字段不存在，会尝试寻找 index.js 或 index.node 作为包的接口。
    
package.json 是 CommonJS 规定的用来描述包的文件，完全符合规范的 package.json 文件应该含有以下字段：
<span id="inline-yellow">name</span>: 包的名字，必须是唯一的，由小写英文字母、数字和下划线组成，不能包含空格。
<span id="inline-blue">description</span>: 包的简要说明。
<span id="inline-green">version</span>: 符合语义化版本识别规范的版本字符串。
<span id="inline-red">keywords</span>: 关键字数组，通常用于搜索。
<span id="inline-purple">maintainers</span>: 维护者数组，每个元素要包含 name 、email(可选)、web(可选)字段。
<span id="inline-yellow">contributors</span>: 贡献者数组，格式与 maintainers 相同。包的作者应该是贡献者数组的第一个元素。
<span id="inline-blue">bugs</span>: 提交 bug 的地址，可以是网址或者电子邮件地址。
<span id="inline-green">licenses</span>: 许可证数组，每个元素要包含 type（许可证的名称）和 url（链接到许可证文本的地址）字段。
<span id="inline-red">repositories</span>: 仓库托管地址数组，每个元素要包含 type（仓库的类型，如 git）、URL（仓库的地址）和 path（相对于仓库的路径，可选）字段。
<span id="inline-purple">dependencies</span>: 包的依赖，一个关联数组，由包名称和版本号组成。


# 包的发布
通过使用 npm init 可以根据交互式回答产生一个符合标准的 package.json。创建一个 index.js 作为包的接口,一个简单的包就制作完成了。
在发布前,我们还需要获得一个账号用于今后维护自己的包,使用 npm adduser 根据提示完成账号的创建
完成后可以使用 npm whoami 检测是否已经取得了账号。
接下来,在 package.json 所在目录下运行 npm publish，稍等片刻就可以完成发布了，打开浏览器，访问 http://search.npmjs.org/ 就可以找到自己刚刚发布的包了。现在我们可以在世界的任意一台计算机上使用 npm install neveryumodule 命令来安装它。
如果你的包将来有更新,只需要在 package.json 文件中修改 version 字段,然后重新使用 npm publish 命令就行了。
如果你对已发布的包不满意，可以使用 npm unpublish 命令来取消发布。

<p id="div-border-top-yellow">*需要说明的是：json 文件不能有注释*
</p>

# 参考链接
[http://javascript.ruanyifeng.com/nodejs/npm.html](http://javascript.ruanyifeng.com/nodejs/npm.html)

# 常用命令
npm version  查看npm和node的版本
npm list --depth=0 [-g]  查看[全局]安装的包
npm root [-g]  查看[全局的]包的安装路径





