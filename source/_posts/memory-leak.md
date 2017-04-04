---
title: 如何解决内存泄漏引发的血案
date: 2017-02-28 01:01:00
categories: 综合
tags: [JavaScript]
comments: false
---

之前做了一个谷歌浏览器的插件开发，它会打开一个链接，然后收集数据并上传。依次循环，但是跑的时间久了，内存就变得很高，然后浏览器就会变卡，慢慢的影响这个插件的运行，最后浏览器也会崩溃。

# 什么是内存泄漏
内存泄露是指一块被分配的内存既不能使用，又不能回收，直到浏览器进程结束。在 C++ 中，因为是手动管理内存，内存泄露是经常出现的事情。而现在流行的 C# 和 Java 等语言采用了自动垃圾回收方法管理内存，正常使用的情况下几乎不会发生内存泄露。浏览器中也是采用自动垃圾回收方法管理内存，但由于浏览器垃圾回收方法有 bug，会产生内存泄露。

<!-- more -->

自动垃圾收集是不能代替有效的内存管理的，特别是在大型，长时间运行的Web应用程序中。

# 内存泄漏的几种情况

1、Delete 一个 Object 的属性会让此对象变慢
``` javascript
var obj = {x: 'y'};
delete obj;  // 此时 obj 会成一个慢对象
obj.x;

var obj = {x: 'y'};
obj = null;  // 应该这样
```

2、闭包
1）在闭包中引入闭包外部的变量时，当闭包结束时此对象无法被垃圾回收（GC）。
2）闭包可以维持函数内局部变量，使其得不到释放。
``` javascript
var a = function() {
  var largeStr = new Array(1000000).join('x');
  return function() {
    return largeStr;
  }
}();
```

3、DOM 泄漏
当原有的 DOM 被移除时，子节点引用没有被移除则无法回收
当页面中元素被移除或替换时，若元素绑定的事件仍没被移除，在 IE 中不会作出恰当处理，此时要先手工移除事件，不然会存在内存泄漏。
``` javascript
var btn = document.getElementById("myBth");
btn.onclick = function() {
  document.getElementById("myDiv").innerHTML = 'test memory';
}
```

应改成下面：

``` javascript
var btn = document.getElementById("myBth");
btn.onclick = function() {
  btn.onclick = null;
  document.getElementById("myDiv").innerHTML = 'test memory';
}
```

4、Timers 计(定)时器泄漏
定时器也是常见产生内存泄露的地方
``` javascript
for(var i=0; i<90000; i++) {
  var obj = {
    callAgain: function() {
        var ref = this;
        var val = setTimeout(function(){
          ref.callAgain();
        },90000);
    }
  };
  obj.callAgain();
  // 虽然你想回收但是 timer 还在
  obj = null;
}
```

5、jquery 的 html() 函数
页面中还需要注意的一点是使用 jquery 的 html() 函数，该函数不是基于 innerHTML 实现的，大量使用同样也会导致系统性能下降。

6、使用事件委托代替事件注册
页面中如果元素过多，且需要为每个元素注册相同的 click 事件，这个时候我们优先考虑到使用委托机制，将需要注册的 click 事件注册到元素的上层或者顶层元素，这样我们就节省了大量的 click 注册事件。

7、自动类型装箱转换
``` javascript
var s = "test test";
alert(s.length);
```

s 本身是一个 string 而非 object，它没有 length 属性，所以当访问 length 时，JS 引擎会自动创建一个临时 String 对象封装 s，而这个对象一定会泄漏。这个 bug 匪夷所思，所幸解决起来相当容易，记得所有值类型做.运算之前先显示转换一下：
``` javascript
var s = "test test";
alert(new String(s).length);
```

# 调试内存
1、Timeline
Chrome 自带的内存调试工具可以很方便的查看内存使用情况和内存泄漏：
F12 -> Timeline -> Memory
点击 record 即可开始收集，点击弹出框的 Finish 即停止，然后会统计出 record 到 Finish 这一段时间内的内存使用情况。

2、Profiles
Chrome 自带的 Profiles 可以记录当前的内存使用情况
F12 -> Profiles -> Take Heap Snapshot
点击 Take Snapshot 就可以拍下当前 JS 的 heap 快照。
*注意：每次拍快照前，都会先自动执行一个 GC，所以在视图里的对象都是可及的。*


