---
title: CommonJS 详细介绍
date: 2017-03-07 13:25:24
categories: 前端
tags: [JavaScript]
comments: false
---

## CommonJS 规范与实现
正如当年为了统一 JavaScript 语言标准，人们制定了 ECMAScript 规范一样，如今为了统一 JavaScript 在浏览器之外的实现，CommonJS 诞生了。CommonJS 试图定义一套普通应用程序使用的 API，从而填补 JavaScript 标准库过于简单的不足。CommonJS 的终极目标是制定一个像 C++ 标准库一样的规范，使得基于 CommonJS API 的应用程序可以在不同的环境下运行，就像用 C++ 编写的应用程序可以使用不同的编译器和运行时函数库一样。为了保持中立，CommonJS 不参与标准库实现，其实现交给像 Node.js 之类的项目来完成。下图是 CommonJS 的各种实现。

<!-- more -->

![ConmonJS 的实现](http://i2.muimg.com/567571/abd3d52d96d4db7c.png)

CommonJS 规范包括了模块（modules）、包（packages）、系统（system）、二进制（binary）、控制台（console）、编码（encodings）、文件系统（filesystems）、套接字（sockets）、单元测试（unit testing）等部分。

Node.js 是目前 CommonJS 规范最热门的一个实现，它基于 CommonJS 的 Modules/1.0 规范实现了 Node.js 的模块，同时随着 CommonJS 规范的更新，Node.js 也在不断跟进。

模块（Module）和包（Package）是 Node.js 最重要的支柱。开发一个具有一定规模的程序不可能只用一个文件，通常需要把各个功能拆分、封装，然后组合起来，模块正式为了实现这种方式而诞生的。在浏览器 JavaScript 中，脚本模块的拆分和组合通常使用 HTML 的 script 标签来实现。Node.js 提供了 require 函数来调用其他模块，而且模块都是基于文件的，机制十分简单。

## CommonJS 规范的实现
Node.js 的模块和包机制的实现参照了 CommonJS 的标准，但并未完全遵循。不过两者的区别不大，一般来说你大可不必担心，只有当你试图制作一个除了支持 Node.js 之外还要支持其他平台的模块或包的时候才需要仔细研究。通常，两者没有直接冲突的地方。

我们经常把 Node.js 的模块和包相提并论，因为模块和包是没有本质区别的，两个概念也时常混用。如果要辨析，那么可以**把包理解成是实现了某个功能模块的集合**，用于发布和维护。对使用者来说，模块和包的区别是透明的，因此经常不作区分。

CommonJS 规范规定，每个模块内部，module 变量代表当前模块。这个变量是一个对象，它的 exports 属性（即 module.exports）是对外的接口。加载某个模块，其实是加载该模块的 module.exports 属性。

为了方便，Node.js 为每个模块提供一个 exports 变量，指向 module.exports。这等同在每个模块头部，有一行这样的命令：
``` javascript
var exports = module.exports;
```
注意，不能直接将 exports 变量指向一个值，因为这样等于切断了 exports 与 module.exports 的联系。

**如果你觉得，exports 与 module.exports 之间的区别很难分清，一个简单的处理办法，就是放弃使用 exports，只使用 module.exports。**


## 什么是模块
模块是 Node.js 应用程序的基本组成部分，文件和模块是一一对应的。换言之，一个 Node.js 文件就是一个模块，这个文件可能是 JavaScript 代码、JSON 或者编译过的 C/C++ 扩展。

## 创建及加载模块
### 创建模块
在 Node.js 中，创建一个模块非常简单，因为一个文件就是一个模块，我们要关注的问题仅仅在于如何在其他文件中获取这个模块。Node.js 提供了 exports 和 require 两个对象，其中 exports 是模块公开的接口，require 用于从外部获取一个模块的接口，即所获取模块的 exports 对象。
让我以一个例子来了解模块。创建一个 module.js 文件，内容是：
``` javascript
// module.js
var name;
exports.setName = function(thyName) {
    name = thyName;
};
exports.sayHello = function() {
    console.log('Hello ' + name);
};
```

在同一目录下创建 getmodule.js，内容是：

``` javascript
// getmodule.js
var myModule = require('./module');
myModule.setName('Yu');
myModule.sayHello();
```

运行 `node getmodule.js` ，结果是：

> Hello Yu

module.js 通过 exports 对象把 setName 和 sayHello 作为模块的访问接口，在 getmodule.js 中通过 `require('./module')` 加载这个模块，然后就可以直接访问 module.js 中 exports 对象的成员函数了。

### 加载模块
> 在 Node.js 中，我们可以直接通过 require 获取核心模块，例如 `require('fs')` 。核心模块拥有最高的加载优先级，换言之如果有模块与其命名冲突，Node.js 总是会加载核心模块。

如果有模块与核心模块命名冲突，Node.js 为什么可以选择加载核心模块呢？require 的实现机制是怎样的呢？

#### 1、按路径加载模块

如果 require 参数以 "/" 开头，那么就以绝对路径的方式查找模块名称，例如 `require('/home/neveryu/module')` 将会按照 优先级依次尝试加载 `/home/neveryu/module.js`、`/home/neveryu/module.json` 和 `/home/neveryu/module.node`。

如果 require 参数 "./" 或 "../" 开头，那么则以相对路径的方式查找模块，这种方式在应用中是最常见的。例如前面的例子中我们用了 `require('./hello')`来加载同一文件夹下的 hello.js。

#### 2、通过查找 node_modules 目录加载模块

如果 require 参数不以 "/" ， "./" 或 "../" 开头，而该模块又不是核心模块，那么就要通过查找 node_modules 加载模块了。我们使用 npm 获取的包通常就是以这种方式加载的。
在 node_modules 目录的外面一层，外面可以直接使用 `require('express')` 来代替 `require('./node_modules/express')`。这是 Node.js 模块加载的一个重要特征：通过查找 node_modules 目录来加载模块。
我们不仅要在 project 目录下的 app.js 中使用 `require('express')`，而且可能要在 controllers 子目录下的 index_controller.js 中也使用 `require('express')`，这时就需要向父目录上溯一层才能找到 node_modules 中的 express 了。

#### 3、加载缓存
Node.js 通过文件名缓存所有加载过的文件模块，所以以后再访问到时就不会重新加载了。注意，Node.js 是根据实际文件名缓存的，而不是 require() 提供的参数缓存的，也就是说即使你分别通过 `require('express')` 和 `require('./node_modules/express')`加载两次，也不会重复加载，因为尽管两次参数不同，解析到的文件却是同一个。



### 单次加载
上面这个例子有点类似于创建一个对象，但实际上和对象又有本质的区别，因为 require 不会重复加载模块，也就是说无论调用多少次 require，获得的模块都是同一个。我们在 getmodule.js 的基础上稍作修改：
``` javascript
// loadmodule.js
var hello1 = require('./module');
hello1.setName('Yu');

var hello2 = require('./module');
hello2.setName('Yu 2');

hello1.sayHello();
```

运行后发现输出结果是 Hello Yu 2，这是因为变量 hello1 和 hello2 指向的是同一个实例，因此 hello1.setName 的结果被 hello2.setName 覆盖，最终输出结果是由后者决定的。

### 覆盖 exports
有时候我们只是想把一个对象封装到模块中，例如：
``` javascript
// singleobjct.js
function Hello() {
    var name;
    this.setName = function (thyName) {
        name = thyName;
    };
    this.sayHello = function () {
        console.log('Hello ' + name);
    };
}

exports.Hello = Hello;
```
此时我们在其他文件中需要通过 `require('./singleobject').Hello` 来获取 Hello 对象，这略显冗余，可以用下面方法稍微简化。
``` javascript
// hello.js
function Hello() {
  var name;
  this.setName = function(thyName) {
    name = thyName;
  };
  this.sayHello = function() {
    console.log('Hello ' + name);
  };
}
module.exports = Hello;
```
这样就可以直接获得这个对象了：
``` javascript
// gethello.js
var Hello = require('./hello');
hello = new Hello();
hello.setName('Yu');
hello.sayHello();
```


## Tip
### CommonJS 模块的特点如下：
1. 所有代码都运行在模块作用域，不会污染全局作用域。
2. 独立性是模块的重要特点就，模块内部最好不与程序的其他部分直接交互。
3. 模块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果就被缓存了，以后再加载，就直接读取缓存结果。要想让模块再次运行，必须清除缓存。
4. 模块加载的顺序，按照其在代码中出现的顺序。

### CommonJS 中的 Require

建议阅览：[CommonJS require 规范](http://wiki.commonjs.org/wiki/Modules/1.1.1#Require)



