---
title: 【转】如何优雅处理前端异常
date: 2019-05-01 03:25:24
categories: 前端
tags: [JavaScript]
comments: false
---

前端一直是距离用户最近的一层，随着产品的日益完善，我们会更加注重用户体验，而前端异常却如鲠在喉，甚是烦人。

# 一、为什么要处理异常？
<p id="div-border-left-green">异常是不可控的，会影响最终的呈现结果，但是我们有充分的理由去做这样的事情。</p>

1.增强用户体验；
2.远程定位问题；
3.未雨绸缪，及早发现问题；
4.无法复线问题，尤其是移动端，机型，系统都是问题；
5.完善的前端方案，前端监控系统；

<!-- more -->

对于 JS 而言，我们面对的仅仅只是异常，异常的出现不会直接导致 JS 引擎崩溃，最多只会使当前执行的任务终止。

# 二、需要处理哪些异常？
对于前端来说，我们可做的异常捕获还真不少。总结一下，大概如下：
- JS 语法错误、代码异常
- AJAX 请求异常
- 静态资源加载异常
- Promise 异常
- Iframe 异常
- 跨域 Script error
- 崩溃和卡顿

<p id="div-border-left-yellow">下面我会针对每种具体情况来说明如何处理这些异常。</p>


# 三、Try-Catch 的误区

<p id="div-border-top-blue">`try-catch` 只能捕获到 <font color="red">**同步**</font> 的运行时错误，对 <font color="red">语法</font> 和 <font color="red">异步</font> 错误却无能为力，捕获不到。【不能捕获XHR，AJAX的异常】</p>

1.同步运行时错误：

```js
try {
  let name = 'jartto';
  console.log(nam);
} catch(e) {
  console.log('捕获到异常：',e);
}
```
输出：
```js
捕获到异常： ReferenceError: nam is not defined at <anonymous>:3:15
```
2.不能捕获到语法错误，我们修改一下代码，删掉一个单引号：
```js
try {
  let name = 'jartto;
  console.log(nam);
} catch(e) {
  console.log('捕获到异常：',e);
}
```
输出：
```js
Uncaught SyntaxError: Invalid or unexpected token
```

> <font color="#0e8a16">不过语法错误在我们开发阶段就可以看到，应该不会顺利上到线上环境吧。?</font>

3.异步错误
```js
try {
  setTimeout(() => {
    undefined.map(v => v);
  }, 1000)
} catch(e) {
  console.log('捕获到异常：',e);
}
```
我们看看日志：
```js
Uncaught TypeError: Cannot read property 'map' of undefined at setTimeout (<anonymous>:3:11)
```
并没有捕获到异常，这是需要我们特别注意的地方。<font color="#b60205">【try catch 无法捕获异步异常】</font>

# 四、window.onerror 不是万能的

当 JS 运行时错误发生时，window 会触发一个 ErrorEvent 接口的 error 事件，并执行 `window.onerror()`。
```js
/**
* @param {String}  message    错误信息
* @param {String}  source    出错文件
* @param {Number}  lineno    行号
* @param {Number}  colno    列号
* @param {Object}  error  Error对象（对象）
*/
window.onerror = function(message, source, lineno, colno, error) {
   console.log('捕获到异常：',{message, source, lineno, colno, error});
}
```
1.首先试试同步运行时错误
```js
window.onerror = function(message, source, lineno, colno, error) {
// message：错误信息（字符串）。
// source：发生错误的脚本URL（字符串）
// lineno：发生错误的行号（数字）
// colno：发生错误的列号（数字）
// error：Error对象（对象）
  console.log('捕获到异常：',{message, source, lineno, colno, error});
}
Jartto;
```
可以看到，我们捕获到了异常：
![](/images/js-exception-handing-1.png)

2.再试试语法错误呢？
```js
window.onerror = function(message, source, lineno, colno, error) {
  console.log('捕获到异常：',{message, source, lineno, colno, error});
}
let name = 'Jartto
```
控制台打印出了这样的异常：
```js
Uncaught SyntaxError: Invalid or unexpected token
```

<p id="div-border-top-red">什么，竟然没有捕获到语法错误？!!</p>

3.怀着忐忑的心，我们最后来试试异步运行时错误：
```js
window.onerror = function(message, source, lineno, colno, error) {
  console.log('捕获到异常：',{message, source, lineno, colno, error});
}
setTimeout(() => {
  Jartto;
});
```
控制台输出了：
```js
捕获到异常： {message: "Uncaught ReferenceError: Jartto is not defined", 
  source: "http://127.0.0.1:8001/", 
  lineno: 36, colno: 5, 
  error: ReferenceError: Jartto is not defined at setTimeout (http://127.0.0.1:8001/:36:5)}
```

4.接着，我们试试网络请求异常的情况：
```js
<script>
window.onerror = function(message, source, lineno, colno, error) {
  console.log('捕获到异常：',{message, source, lineno, colno, error});
  return true;
}
</script>
<img src="./jartto.png">
```

<p id="div-border-left-red">我们发现，不论是静态资源异常，或者接口异常，错误都无法捕获到。</p>

补充一点：`window.onerror` 函数只有在返回 true 的时候，异常才不会向上抛出，否则即使是知道异常的发生控制台还是会显示 `Uncaught Error: xxxxx`

```js
window.onerror = function(message, source, lineno, colno, error) {
  console.log('捕获到异常：',{message, source, lineno, colno, error});
  return true;
}
setTimeout(() => {
  Jartto;
});
```
控制台就不会再有这样的错误了：
```js
Uncaught ReferenceError: Jartto is not defined
    at setTimeout ((index):36)
```
<font color="#ff8f00">需要注意：</font>

- onerror 最好写在所有 JS 脚本的前面，否则有可能捕获不到错误；
- onerror 无法捕获语法错误；

<p id="div-border-top-red">到这里基本就清晰了：在实际的使用过程中，`onerror` 主要是来捕获预料之外的错误，而 `try-catch` 则是用来在可预见情况下监控特定的错误，两者结合使用更加高效。</p>

<p id="div-border-left-yellow">问题又来了，捕获不到静态资源加载异常怎么办？</p>

# 五、window.addEventListener

当一项资源（如图片或脚本）加载失败，加载资源的元素会触发一个 Event 接口的 error 事件，并执行该元素上的 `onerror()` 处理函数。这些 error 事件不会向上冒泡到 window ，不过（至少在 Firefox 中）能被单一的 `window.addEventListener` 捕获。
```js
<scritp>
window.addEventListener('error', (error) => {
  console.log('捕获到异常：', error);
}, true)
</script>
<img src="./jartto.png">
```
控制台输出：
![](/images/js-exception-handing-2.png)

由于网络请求异常不会事件冒泡，因此必须在捕获阶段将其捕捉到才行，但是这种方式虽然可以捕捉到网络请求的异常，但是无法判断 HTTP 的状态是 404 还是其他比如 500 等等，所以还需要配合服务端日志才进行排查分析才可以。

<font color="red">需要注意：</font>

- 不同浏览器下返回的 error 对象可能不同，需要注意兼容处理。
- 需要注意避免 addEventListener 重复监听。

# 六、Promise Catch
<p id="div-border-top-blue">在 promise 中使用 catch 可以非常方便的捕获到异步 error ，这个很简单。</p>

没有写 catch 的 Promise 中抛出的错误无法被 onerror 或 try-catch 捕获到，所以我们务必要在 Promise 中不要忘记写 catch 处理抛出的异常。

解决方案： 为了防止有漏掉的 Promise 异常，建议在全局增加一个对 `unhandledrejection`的监听，用来全局监听 `Uncaught Promise Error`。使用方式：
```js
window.addEventListener("unhandledrejection", function(e){
  console.log(e);
});
```
我们继续来尝试一下：
```js
window.addEventListener("unhandledrejection", function(e){
  e.preventDefault()
  console.log('捕获到异常：', e);
  return true;
});
Promise.reject('promise error');
```
可以看到如下输出：
![](/images/js-exception-handing-3.png)

那如果对 Promise 不进行 catch 呢？
```js
window.addEventListener("unhandledrejection", function(e){
  e.preventDefault()
  console.log('捕获到异常：', e);
  return true;
});
new Promise((resolve, reject) => {
  reject('jartto: promise error');
});
```
嗯，事实证明，也是会被正常捕获到的。

所以，正如我们上面所说，为了防止有漏掉的 Promise 异常，建议在全局增加一个对 `unhandledrejection` 的监听，用来全局监听 `Uncaught Promise Error`。

补充一点：如果去掉控制台的异常显示，需要加上：
```js
event.preventDefault();
```

# 七、VUE errorHandler
```js
Vue.config.errorHandler = (err, vm, info) => {
  console.error('通过vue errorHandler捕获的错误');
  console.error(err);
  console.error(vm);
  console.error(info);
}
```

# 八、React 异常捕获
React 16 提供了一个内置函数 componentDidCatch，使用它可以非常简单的获取到 react 下的错误信息
```js
componentDidCatch(error, info) {
  console.log(error, info);
}
```
除此之外，我们可以了解一下：`error boundary`
UI 的某部分引起的 JS 错误不应该破坏整个程序，为了帮 React 的使用者解决这个问题，React 16 介绍了一种关于错误边界（error boundary)的新观念。

<p id="div-border-left-red">需要注意的是： error boundaries 并不会捕捉下面这些错误。</p>

1.事件处理器
2.异步代码
3.服务端的渲染代码
4.在 error boundaries 区域内的错误

我们来举一个小例子，在下面这个 `componentDIdCatch(error,info)` 里的类会变成一个 `error boundary`：
```js
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
 
  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    logErrorToMyService(error, info);
  }
 
  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
```
然后我们像使用普通组件那样使用它：
```js
<ErrorBoundary>
  <MyWidget />
</ErrorBoundary>
```

`componentDidCatch()` 方法像 JS 的 `catch{}` 模块一样工作，但是对于组件，只有 class 类型的组件`( class component )`可以成为一个 `error boundaries`。

实际上，大多数情况下我们可以在整个程序中定义一个 `error boundary`组件，之后就可以一直使用它了！

# 九、iframe 异常
对于 iframe 的异常捕获，我们还得借力 `window.onerror`：
```js
window.onerror = function(message, source, lineno, colno, error) {
  console.log('捕获到异常：',{message, source, lineno, colno, error});
}
```
一个简单的例子可能如下：
```js
<iframe src="./iframe.html" frameborder="0"></iframe>
<script>
  window.frames[0].onerror = function (message, source, lineno, colno, error) {
    console.log('捕获到 iframe 异常：',{message, source, lineno, colno, error});
    return true;
  };
</script>
```

# 十、Script error
一般情况，如果出现 `script error` 这样的错误，基本上可以确定是出现了跨域问题。这时候，是不会有其他太多辅助信息的，但是解决思路无非如下：

<p id="div-border-left-blue">跨源资源共享机制( CORS )：我们为 script 标签添加 crossOrigin 属性。</p>

```js
<script src="http://jartto.wang/main.js" crossorigin></script>
```
或者动态去添加 js 脚本：
```js
const script = document.createElement('script');
script.crossOrigin = 'anonymous';
script.src = url;
document.body.appendChild(script);
```

<p id="div-border-left-yellow">特别注意，服务器端需要设置：Access-Control-Allow-Origin </p>

此外，我们也可以试试这个 - [解决 Script Error 的另类思路](https://juejin.im/post/5c00a405f265da610e7fd024)：

```js
const originAddEventListener = EventTarget.prototype.addEventListener;
EventTarget.prototype.addEventListener = function (type, listener, options) {
  const wrappedListener = function (...args) {
    try {
      return listener.apply(this, args);
    }
    catch (err) {
      throw err;
    }
  }
  return originAddEventListener.call(this, type, wrappedListener, options);
}
```
简单解释一下：

- 改写了 EventTarget 的 addEventListener 方法；
- 对传入的 listener 进行包装，返回包装过的 listener，对其执行进行 try-catch；
- 浏览器不会对 try-catch 起来的异常进行跨域拦截，所以 catch 到的时候，是有堆栈信息的；
- 重新 throw 出来异常的时候，执行的是同域代码，所以 window.onerror 捕获的时候不会丢失堆栈信息；

利用包装 addEventListener，我们还可以达到「扩展堆栈」的效果：
```js
(() => {
   const originAddEventListener = EventTarget.prototype.addEventListener;
   EventTarget.prototype.addEventListener = function (type, listener, options) {
+    // 捕获添加事件时的堆栈
+    const addStack = new Error(`Event (${type})`).stack;
     const wrappedListener = function (...args) {
       try {
         return listener.apply(this, args);
       }
       catch (err) {
+        // 异常发生时，扩展堆栈
+        err.stack += '\n' + addStack;
         throw err;
       }
     }
     return originAddEventListener.call(this, type, wrappedListener, options);
   }
 })();
```

# 十一、崩溃和卡顿
卡顿也就是网页暂时响应比较慢， JS 可能无法及时执行。但崩溃就不一样了，网页都崩溃了，JS 都不运行了，还有什么办法可以监控网页的崩溃，并将网页崩溃上报呢？

>崩溃和卡顿也是不可忽视的，也许会导致你的用户流失。

1.利用 window 对象的 load 和 beforeunload 事件实现了网页崩溃的监控。
不错的文章，推荐阅读：[Logging Information on Browser Crashes](http://jasonjl.me/blog/2015/06/21/taking-action-on-browser-crashes/)。
```js
window.addEventListener('load', function () {
  sessionStorage.setItem('good_exit', 'pending');
  setInterval(function () {
      sessionStorage.setItem('time_before_crash', new Date().toString());
  }, 1000);
});
window.addEventListener('beforeunload', function () {
  sessionStorage.setItem('good_exit', 'true');
});
if(sessionStorage.getItem('good_exit') &&
  sessionStorage.getItem('good_exit') !== 'true') {
  /*
      insert crash logging code here
  */
  alert('Hey, welcome back from your crash, looks like you crashed on: ' + sessionStorage.getItem('time_before_crash'));
}
```

2.基于以下原因，我们可以使用 `Service Worker` 来实现 [网页崩溃的监控](https://juejin.im/entry/5be158116fb9a049c6434f4a?utm_source=gold_browser_extension)：

- Service Worker 有自己独立的工作线程，与网页区分开，网页崩溃了，Service Worker 一般情况下不会崩溃；
- Service Worker 生命周期一般要比网页还要长，可以用来监控网页的状态；
- 网页可以通过 `navigator.serviceWorker.controller.postMessage` API 向掌管自己的 SW 发送消息。

# 十二、错误上报
1.通过 Ajax 发送数据
因为 Ajax 请求本身也有可能会发生异常，而且有可能会引发跨域问题，一般情况下更推荐使用动态创建 img 标签的形式进行上报。

2.动态创建 img 标签的形式
```js
function report(error) {
  let reportUrl = 'http://jartto.wang/report';
  new Image().src = `${reportUrl}?logs=${error}`;
}
```
收集异常信息量太多，怎么办？实际中，我们不得不考虑这样一种情况：如果你的网站访问量很大，那么一个必然的错误发送的信息就有很多条，这时候，我们需要设置采集率，从而减缓服务器的压力：
```js
Reporter.send = function(data) {
  // 只采集 30%
  if(Math.random() < 0.3) {
    send(data)      // 上报错误信息
  }
}
```
采集率应该通过实际情况来设定，随机数，或者某些用户特征都是不错的选择。<font color="red">【这个随机数用的不错！】</font>

# 十三、总结
<p id="div-border-left-yellow">回到我们开头提出的那个问题，如何优雅的处理异常呢？</p>

1.可疑区域增加 Try-Catch
2.全局监控 JS 异常 window.onerror
3.全局监控静态资源异常 window.addEventListener
4.捕获没有 Catch 的 Promise 异常：unhandledrejection
5.VUE errorHandler 和 React componentDidCatch
6.监控网页崩溃：window 对象的 load 和 beforeunload
7.跨域 crossOrigin 解决

其实很简单，正如本文所说：采用组合方案，分类型的去捕获异常，这样基本 80%-90% 的问题都化于无形。

[原文](http://jartto.wang/2018/11/20/js-exception-handling/)
