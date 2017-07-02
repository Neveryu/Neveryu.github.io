---
title: gulp 详解与使用
date: 2017-05-01 01:25:24
categories: 前端
tags: [gulp]
comments: false
summary_img: 
---

# 什么是 gulp
[gulp](http://gulpjs.com/) 是一个前端构建工具，它能通过自动执行常见任务，比如编译预处理 CSS ，压缩 JavaScript 和刷新浏览器，来改进网站开发的过程，从而使开发更加快速高效。

# 为什么要用 gulp
与 grunt 相比，gulp 无需写一大堆繁杂的配置参数，[API](https://github.com/gulpjs/gulp/blob/master/docs/API.md)（[中文 API](http://www.gulpjs.com.cn/docs/api/)） 也非常简单，学习起来很容易，而且 gulp 使用的是 nodejs 中 [stream](https://nodejs.org/api/stream.html) 来读取和操作数据，其速度更快。
gulp 有庞大的生态圈，且每天都在发展。依靠成千上万可供选择的插件，你可以利用 gulp 自动完成几乎任何事。

# 如何使用 gulp
## Installing Gulp
新版的 gulp 命令行工具已经改名为 gulp-cli 。
如果你之前安装了全局的 gulp 。在使用新的 gulp-cli 之前，执行命令
 `npm rm --global gulp` ，将之前的全局 gulp 卸掉。

<!-- more -->

### Install the gulp command 
``` bash
npm install --global gulp-cli
```

### Install gulp in your devDependencies
Run this command in your project directory
``` bash
npm install --save-dev gulp
```

## Create a gulpfile
Create a file called gulpfile.js in your project root with these contents:
``` javascript
var gulp = require('gulp');

gulp.task('default', function() {
  // place code for your default tash here
});
```

## Test it out
Run the gulp command in your projct directory:
``` bash
gulp
```

# gulp API
gulp 的核心 API 有四个：gulp.task() 、 gulp.src() 、 gulp.dest() 、 gulp.watch() 。
[gulp API](https://github.com/gulpjs/gulp/blob/master/docs/API.md)
[gulp API 中文](http://www.gulpjs.com.cn/docs/api/)

下面详细介绍一下：

## gulp.src()
gulp.src() 可以读取你需要操作的文件，相比于 Grunt 主要以文件为媒介来运行它的工作流，gulp 使用的是 Nodejs 中的 [stream](https://nodejs.org/api/stream.html) 流，首先获取到需要的 stream ，然后可以通过 stream 的 pipe() 方法把流导入到你想要的地方，比如 gulp 的插件中，经过插件处理后的流又可以继续导入到其他插件中，当然也可以把流写入到文件中。所以 gulp 是以 stream 为媒介的，它不需要频繁的生成临时文件，这也是 gulp 的速度比 Grunt 快的一个原因。再回到正题上来，gulp.src() 方法正是用来获取流的，但要注意这个流里的内容不是原始的文件流，而是一个虚拟文件对象流（Vinyl files），这个虚拟文件对象中存储着原始文件的路径、文件名、内容等信息，这个我们暂时不用去深入理解，你只需简单的理解可以用这个方法来读取你需要操作的文件就行了。其语法为：
``` javascript
gulp.src(globs [, options])
```
gulp 用到的 glob 的匹配规则以及一些文件匹配技巧。
gulp 内部使用了 node-glob 模块来实现其文件匹配功能。我们可以使用下面这些特殊的字符来匹配我们想要的文件：

- `*` 匹配文件路径中的 0 个或多个字符，但不会匹配路径分配符，除非路径分隔符出现在末尾
- ** 匹配路径中的 0 个或多个目录及其子目录，需要单独出现，即它左右不能有其他东西了。如果出现在末尾，也能匹配文件。
- ? 匹配文件路径中的一个字符（不会匹配路径分隔符）
- [...] 匹配方括号中出现的字符中的任意一个，当方括号中第一个字符为 ^ 或 ! 时，则表示不匹配方括号中出现的其他字符中的任意一个，类似 js 正则表达式中的用法。
- !(pattern|pattern|pattern) 匹配任何与括号中给定的任一模式都不匹配的
- ?(pattern|pattern|pattern) 匹配括号中给定的任一模式 0 次或 1 次，类似于 js 正则中的(pattern|pattern|pattern)?
- +(pattern|pattern|pattern) 匹配括号中给定的任一模式至少 1 次，类似于正则中的(pattern|pattern|pattern)+
- `*(pattern|pattern|pattern)` 匹配括号中的给定的任一模式 0 次或多次，类似于 js 正则中的 `(pattern|pattern|pattern)*`
- @(pattern|pattern|pattern) 匹配括号中给定的任一模式 1 次，类似于 js 正则中的(pattern|pattern|pattern)

下面以一系列例子来加深理解
- `*` 能匹配 a.js 、 x.y 、 abc 、 abc/ ，但不能匹配 a/b.js
- `*.*` 能匹配 a.js 、 style.css 、 a.b 、 x.y
- `*/*/*.js` 能匹配 a/b/c.js 、 x/y/z.js ，不能匹配 a/b.js 、a/b/c/d.js
- ** 能匹配 abc 、 a/b.js 、 a/b/c.js 、 x/y/z 、x/y/z/a.b ，能用来匹配所有的目录和文件
- **/*.js 能匹配 foo.js 、 a/foo.js 、 a/b/foo.js 、 a/b/c/foo.js
- a/**/z 能匹配 a/z 、 a/b/z 、 a/b/c/z 、 a/d/g/h/r/z
- `a/**b/z` 能匹配 a/b/z 、 a/fb/z ，但不能匹配 a/x/gb/z ，因为只有单 ** 单独出现才能匹配多级目录
- ?.js 能匹配 a.js 、 b.js 、 c.js
- a?? 能匹配 a.b 、 abc ，但不能匹配 ab/ ，因为它不会匹配路径分隔符
- [xyz].js 只能匹配 x.js 、 y.js 、 z.js ，不会匹配 xy.js 、 xyz.js 等，整个中括号只代表一个字符
- [^xyz].js 能匹配 a.js 、 b.js 、 c.js 等，不能匹配 x.js 、 y.js 、 z.js

当有多种匹配模式时可以使用数组
``` javascript
// 使用数组的方式来匹配多种文件
gulp.src(['js/*.js','css/*.css','*.html'])
```
使用数组的方式还有一个好处就是可以很方便的使用排除模式，在数组中的单个匹配模式前加上 ! 即是排除模式，它会在匹配的结果中排除这个匹配，要注意一点的是不能在数组中的第一个元素中使用排除模式
``` javascript
gulp.src([*.js,'!b*.js'])  //匹配所有 js 文件，但排除掉以 b 开头的 js 文件
gulp.src(['!b*.js',*.js])  //不会排除任何文件，因为排除模式不能出现在数组的第一个元素中
```
此外，还可以使用展开模式。展开模式以花括号作为定界符，根据它里面的内容，会展开为多个模式，最后匹配的结果为所有展开的模式想加起来得到的结果。展开的例子如下：

- a{b,c}d 会展开为 abd 、 acd
- a{b,}c 会展开为 abc 、 ac
- a{0..3}d 会展开为 a0d 、 a1d 、 a2d 、 a3d 
- a{b,c{d,e}f}g 会展开为 abg 、 acdfg 、 acefg
- a{b,c}d{e,f}g 会展开为 abdeg 、 acdeg 、 abdfg 、 abdeg

## gulp.dest()
gulp.dest() 方法是用来写文件的，其语法为：
``` javascript
gulp.dest(path[, options])
```
**path** 为写入文件的路径
我们给 gulp.dest() 传入的路径参数，只能用来指定要生成的文件的目录，而不能指定生成文件的文件名，它生成文件的文件名使用的是导入到它的文件流自身的文件名，所以生成的文件名是由导入到它的文件流决定的，即使我们给它传入一个带有文件名的路径参数，然后它也会把这个文件名当作是目录名，例如：
``` javascript
var gulp = require("gulp");
gulp.src("script/jquery.js").pipe(gulp.dest("dist/foo.js"));
// 最终生成的文件路径为 dist/foo.js/jquery.js ，而不是 dist/foo.js
```
要想改变文件名，可以使用插件 gulp-rename
下面说说生成的文件路径与我们给 gulp.dest() 方法传入的路径参数之间的关系。
gulp.dest(path) 生成的文件路径是我们传入的 path 参数后面再加上 gulp.src() 中有通配符开始出现的那部分路径。例如：
``` javascript
var gulp = require("gulp");
//有通配符开始出现的那部分路径为 **/*.js
gulp.src("script/**/*.js").pipe(gulp.dest("dist"));
//最后生成的文件路径为 dist/**/*.js
//如果 **/*.js 匹配到的文件为 jquery/jquery.js ，则生成的文件路径为 dist/jquery/jquery.js
```
再举更多一点的例子
``` javascript
gulp.src("script/avalon/avalon.js").pipe(gulp.dest("dist"));
//没有通配符出现的情况，最后生成的文件路径为 dist/avalon.js

gulp.src("script/**/underscore.js").pipe(gulp.dest("dist"));
//有通配符开始出现的那部分路径为 **/underscore.js
//假设匹配到的文件为script/util/underscore.js
//则最后生成的文件路径为dist/util/underscore.js

gulp.src("script/*").pipe(gulp.dest("dist"));
//有通配符出现的那部分路径为*
//假设匹配到的文件为script/zepto.js
//则最后生成的文件路径为dist/zepto.js
```
通过指定 gulp.src() 方法配置参数中的 base 属性，我们可以灵活的来改变 gulp.dest() 生成的文件路径。
当我们没有在 gulp.src() 方法配置参数中的 base 属性，base 的默认值为通配符开始出现之前那部分路径，例如：
``` javascript
gulp.src("app/src/**/*.css") //此时base的值为 app/src
```
上面我们说的 gulp.dest() 所生成的文件路径的规则，其实也可以理解成，用我们给 gulp.dest() 传入的路径替换掉 gulp.src() 中的 base 路径，最终得到生成文件的路径。
``` javascript
gulp.src("app/src/**/*.css").pipe(gulp.dest("dist"));
//此时base的值为app/src，也就是说它的base路径为app/src
//设该模式匹配到了文件app/src/css/normal.css
//用dist替换掉base路径，最终得到dist/css/normal.css
```
所以改变 base 路径后，gulp.dest() 生成的文件路径也会改变
``` javascript
gulp.src("script/lib/*.js").pipe(gulp.dest("build"));
//没有配置base参数，此时默认的base路径为script/lib
//假设匹配到的文件为script/lib/jquery.js
//生成的文件路径为build/jquery.js

gulp.src("script/lib/*.js", {base: "script"}).pipe(gulp.dest("build"));
//配置了base参数，此时base路径为script
//假设匹配到的文件为script/lib/jquery.js
//此时生成的文件路径为build/lib/jquery.js
```
用 gulp.dest() 把文件流写入文件后，文件流仍然可以继续使用。

## gulp.task()
gulp.task 方法用来定义任务，内部使用的是 Orchestrator ，其语法为：
``` javascript
gulp.task(name[, deps], fn)
```
**name** 为任务名，如果你需要在命令行中运行你的某些任务，那么，请不要在名字中使用空个。
**deps** 是当前定义的任务需要依赖的其他任务，为一个数组。当前定义的任务会在所有依赖的任务执行完毕后才开始执行。如果没有依赖，则可省略这个参数。
**fn** 为任务函数，我们把任务要执行的代码都要写在里面。该参数也是可选的。
``` javascript
gulp.task("mytask", ["array", "of", "task", "names"], function() {
  //定义一个有依赖的任务
  // Do something
});
```
关于 gulp.task() ，我们需要知道执行多个任务时怎么来控制任务执行的顺序。
gulp 中执行多个任务，可以通过任务依赖来实现。例如我想要执行 one ，two ，three 这三个任务，那我们就可以定义一个空的任务，然后把那三个任务当做这个空的任务的依赖就行了：
``` javascript
//只要执行default任务，就相当于把one,two,three这三个任务执行了
gulp.task('default',['one','two','three']);
```
如果任务相互之间没有依赖，任务会按你书写的顺序来执行，如果有依赖的话则会先执行依赖的任务。
但是如果某个任务所依赖的任务是异步的，就要注意了，gulp 并不会等待那个所依赖的异步任务完成，而是会接着执行后续的任务。例如：
``` javascript
gulp.task('one', function(){
  // one是一个异步执行的任务
  setTimeout(function(){
    console.log("one is done");
  },3000);
});

//two任务虽然依赖于one任务，但并不会等到one任务中的异步操作完成后再执行
gulp.task("two", ["one"], function(){
  console.log("two is done");
});
```
![](/images/gulp-1.png)
上面的例子中我们执行 two 任务时，会先执行 one 任务，但不会去等待 one 任务中的异步操作完成后再执行 two 任务，而是紧接着执行 two 任务。因为 one 任务耗时 5 秒，所以 two 任务会在 one 任务中的异步操作完成之前就执行了。

那如果我们想等待异步任务中的异步操作完成后再执行后续的任务，该怎么做呢？
有三种方法可以实现：

第一：在异步操作完成后执行一个回调函数来通知 gulp 这个异步任务已经完成，这个回调函数就是任务函数的第一个参数。
``` javascript
gulp.task("one", function(cb) {
  //cb为任务函数提供的回调，用来通知任务已经完成
  //one是一个异步执行的任务
  setTimeout(function(){
    console.log("one is done");
    cb(); //执行回调，表示这个异步任务已经完成
  },5000);
});

//这时two任务会在one任务中的异步操作完成后再执行
gulp.task("two", ["one"], function(){
  console.log("two is done");
});
```

第二：定义任务时返回一个流对象。适用于任务就是操作 gulp.src 获取到的流的情况。
``` javascript
gulp.task("one", function(cb) {
  var stream = gulp.src("client/**/*.js")
      .pipe(dosomething()) //dosomething()中有某些异步操作
      .pipe(gulp.dest("build"));
  return stream;
});

// 这是two任务会在one任务中的异步操作完成后再执行
gulp.task("two", ["one"], function(){
  console.log("two is done");
});
```

第三：返回一个 promise 对象，例如：
``` javascript
var Q = require('q'); //一个著名的异步处理的库 https://github.com/kriskowal/q
gulp.task("one", function(cb){
  var deferred = Q.defer();
  //做一些异步操作
  setTimeout(function(){
    deferred.resolve();
  },5000);
  return deferred.promise;
});

gulp.task("two", ["one"], function() {
  console.log("two is done");
});
```
关于 gulp.task() ，主要的就是要清除当依赖异步任务时要如何处理。

## gulp.watch()
gulp.watch() 用来监视文件的变化，当文件发生变化后，我们可以利用它来执行相应的任务，例如文件压缩等。其语法为：
``` javascript
gulp.watch(glob[, opts], tasks);
```
**glob** 为要监视的文件匹配模式，规则和用法与 gulp.src() 方法中的 glob 相同。
**opts** 为一个可选的配置对象，通常不需要用到。
**tasks** 为文件变化后要执行的任务，为一个数组
``` javascript
gulp.task("uglify", function() {
  //do something
});
gulp.task("reload", function() {
  //do something
});
gulp.watch("js/**/*.js", ["uglify","reload"]);
```
gulp.watch(glob [,opts, cb])
**glob** 和 **opts** 参数与第一种用法相同
**cb** 参数为一个函数。每当监视的文件发生变化时，就会调用这个函数，并且会给它传入一个对象，该对象包含了文件变化的一些信息，type 属性为变化的类型，可以是 added 、changed 、deleted ，path 属性为发生变化的文件的路径
``` javascript
gulp.watch("js/**/*.js", function(event){
  console.log(event.type); //变化类型added为新增，deleted为删除，changed为改变
  console.log(event.path); //变化的文件的路径
});
```

# gulp 的插件
gulp 本身虽然不能完成很多任务，但它有大量插件可用，我们可以在 [插件页面](http://gulpjs.com/plugins/) 或者在 npm 搜索 gulpplugin 。
列一些很棒的 plugin ：
- [JSHint](https://www.npmjs.com/package/gulp-jshint/) ： js代码检查分析工具
- [gulp-coffee](https://www.npmjs.com/package/gulp-coffee/) ： 编译CoffeeScript
- [gulp-mocha](https://www.npmjs.com/package/gulp-mocha) ： 执行Mocha测试
- [gulp-bump](https://www.npmjs.com/package/gulp-bump) ： 更新版本号
- [gulp-sass](https://www.npmjs.com/package/gulp-sass) ： sass 编译
- [browser-sync](http://www.browsersync.cn/docs/gulp/) ： 浏览器自动刷新
- [gulp-uglify](https://www.npmjs.com/package/gulp-uglify) ： 代码压缩
- [gulp-concat](https://www.npmjs.com/package/gulp-concat) ： 合并
- [gulp-eslint](https://www.npmjs.com/package/gulp-eslint) ： 支持 ES6 JSX

# gulp 命令行参数
- `-v` 或 `--version` 会显示全局和项目本地所安装的 gulp 版本号
- `--require <module path>` 将会在执行之前 require 一个模块。这对于一些语言编译器或者需要其他应用的情况来说很有用。你可以使用多个 `--require`
- `--gulpfile <gulpfile path>` 手动指定一个 gulpfile 的路径，这在你有很多个 gulpfile 的时候很有用。这也会将 CWD 设置到该 gulpfile 所在目录
- `--cwd <dir path>` 手动指定 CWD 。定义 gulpfile 查找的位置，此外，所有的相应的依赖（require）会从这里开始计算相对路径
- `-T` 或 `--tasks` 会显示所指定 gulpfile 的 task 依赖树
- `--tasks-simple` 会以纯文本的方式显示所载入的 gulpfile 中的 task 列表
- `--color` 强制 gulp 和 gulp 插件显示颜色，即便没有颜色支持
- `--no-color` 强制不显示颜色，即便检测到有颜色支持
- `--silent` 禁止所有的 gulp 日志


命令行会在 process.env.INIT_CW 中记录它是从哪里被运行的。

# tip

1、gulp 写进项目 package.json 文件的依赖有什么作用
方便别人查看你项目中有些什么依赖，而且在项目目录下执行 npm install 命令会安装项目 package.json 中的所有依赖模块，这样就能简化项目的安装程序了，不用一个一个模块去安装啊。

2、gulp 中着重了解 gulp.task() 如何处理依赖任务是耗时操作或者异步操作的情况。






