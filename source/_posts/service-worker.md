---
title: 使用 Service worker 实现加速/离线访问博客
date: 2017-06-08 11:25:24
categories: 前端
tags: [Service-worker]
comments: false
summary_img:
---
有一个困扰 web 用户多年的难题——丢失网络连接。即使是世界上最好的 web app，如果下载不了它，也是非常糟糕的体验。如今虽然已经有很多种技术去尝试着解决这一问题。而随着**离线页面**的出现，一些问题已经得到了解决。有一个叫做 APP Cache 的 API 可以提供离线体验，但它的问题比较多。最重要的问题是，仍然没有一个好的统筹机制对资源缓存和自定义的网络请求进行控制。

# Service worker

于是 HTML5 提出了 Service Worker，Service worker 提供了很多新的能力，使得 web app 拥有与 nativeapp 相同的离线体验、消息推送体验。

<!-- more -->

Service worker 是一段脚本，它有能力往我们的浏览器中写入缓存，过滤网络请求，将缓存内容作为网络响应结果输出。
**带来的效果是显而易见的：**
<p id="div-border-top-green">1、当我们缓存了某些资源的时候，当我们再次请求该资源的时候，我们便可以使用缓存的内容，这样的话，就可以减少网络请求了，网站的打开速度明显提升。
2、如果我们将网站所需的资源缓存下来了以后，这个时候即使计算机没有网络，依然可以打开这个网站，即离线访问。
</p>

# Service worker 使用场景

现在很流行基于 GitHub page 和 markdown 的静态 blog ，非常适合技术的思维和习惯，针对不同的语言都有一些优秀的静态 blog 系统出现，如 Jekyll/Ruby，Pelican/Python，Hexo/NodeJs ，由于静态内容的特性非常适合做缓存来加速页面的访问，就利用 Service worker 来实现加速，结果是除了 PageSpeed，CDN 这些常见的服务器和网络加速之外，通过客户端实现了更好的访问体验。

# 示例

你现在可以断开你的网络，或者用浏览器中模拟无网络的情景，继续访问本站。
<i style="color:red;">如何在浏览器中模拟无网络环境？(在 Network 中选择 offline)</i>
![](/images/service-worker-1.png)

# 使用方法

## 注册 Service worker
要安装 Service worker，你需要在你的页面上注册它。下面的代码会告诉浏览器你的 Service worker 脚本放在哪里
``` javascript
<script>
  if (navigator.serviceWorker) {
    // 注册Service Worker scope表示作用的页面的path
    // register函数返回Promise
    navigator.serviceWorker.register('/service-worker.js',{scope: '/'}) 
      .then(function (registration) {
        console.log(registration);
      })
      .catch(function (e) {
        console.error(e);
      })
  } else {
    console.log('Service Worker is not supported in this browser.')
  }
</script>
```
以上代码会先检测 Service worker 在浏览器中是否可用，可用的话一个 Service worker（/service-worker.js）将被注册，如果这个 Service worker 已经注册过了，浏览器这会忽略以上代码。
`{scope: '/'}` 表示 Service worker 作用的范围。
需要说明的是 service-worker.js 文件被放在这个域的根目录下，这意味着 service worker 是跟网站同源的。换句话说，这个 service worker 将会获取到这个域下的所有 fetch 事件。
如果 service worker 文件注册到 /example/service-worker.js ，那么 service worker 只能收到 /example/ 路径下的 fetch 事件（比如： /example/page1/, /example/page2/）。
如果 service worker 文件注册到根目录下 /service-worker.js ，同时 `{scope: '/example'}` ，那么 service worker 也只能收到 /example/ 路径下的 fetch 事件。

service-worker.js 文件，我建议是放在网站的跟目录下，scope 不作修改，这样 service worker 拥有最大的使用范围。

## 安装 Service worker

![](/images/service-worker-2.png)

[我的 service-worker.js](https://neveryu.github.io/service-worker.js)
关于这个 service-worker.js 怎么写，具体可以查看 API ，[MDN Service Worker API](https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API)。

<p id="div-border-left-red">注意：将 service-worker.js 放到域的根目录下哦，这样 Service worker 才能拥有最大的使用范围。</p>

现在你可以到 chrome://inspect/#service-workers 这里，检查 service worker 是否对你的网站启用了。
或者在 chrome://serviceworker-internals/ 中管理你的 Service worker 。
或者在浏览器的开发者工具中也可以详细的查看 service worker 的缓存。
![](/images/service-worker-3.png)

# Service worker 核心 API
![](/images/service-worker-4.png)
## install
![](/images/service-worker-5.png)
install 是安装一个 service worker 缓存，使用方法可以是这样：
``` javascript
// Set the callback for the install step
self.addEventListener('install', function(event) {
  // Perform install steps
});
```
在 install 的 callback 中，我们需要执行一下步骤：
1、开启一个缓存
2、缓存我们的文件
3、确定所有的资源是否要被缓存

## fetch
fetch 用来监听用户的网络请求，并给出回应。
``` javascript
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
```

## activate
你的 Service worker 总会有要更新的时候。在那时，你需要按照一下步骤来更新：
1、更新你 service worker 的 JavaScript 文件。
2、更新后的 service worker 启动并触发 install 事件。
3、此时，当前页面生效的依然是老版本的 service worker ，新的 service worker 会进入“waitting”状态。
4、当页面关闭后，来的 service worker 会被干掉，新的 service worker 接管页面。
5、一旦新的 service worker 生效后会触发 active 事件。

一个典型的 activete 事件：
``` javascript
self.addEventListener('activate', function (event) { 
// 监听worker的activate事件
  event.waitUntil( // 延迟activate事件直到
    caches.keys().then(function(keys){
      return Promise.all(keys.map(function(key, i){ // 清除旧版本缓存
        if(key !== CACHE_VERSION){
          return caches.delete(keys[i]);
        }
      }))
    })
  )
});
```

# 其他使用场景
在网站 A 中，隐藏一个 iframe ，在这个 iframe 中注册一个 service worker ，这个 service worker 会缓存网站 B 所需的资源。
从未访问过网站 B，但网站已经在你的设备上预加载过了，一切仅仅因为你访问过网站 A。
``` html 
<iframe src="https://B.com/iframe.html" style="width: 0; height: 0; border: 0">
</iframe>
```
``` javascript
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>HTML5 For Web Designers</title>
<script>
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/serviceworker.js');
}
</script>
</head>
</html> 
```
