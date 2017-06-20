---
title: Hexo-NexT搭建个人博客（二）
date: 2016-09-30 22:18:22
categories: Hexo
tags: [Hexo, Next]
comments: false
---

本篇文章将介绍基于NexT主题下的一些扩展功能的实现。
首先，我们需要明白：
<p id="div-border-left-yellow">在 Hexo 中有两份主要的配置文件，其名称都是 _config.yml 。其中，一份位于站点根目录下，主要包含 Hexo 本身的配置；另一份位于主题目录下，这份配置由主题作者提供，主要用于配置主题相关的选项。
  我们约定，将前者称为 <span id="inline-blue">站点配置文件</span>，后者称为 <span id="inline-purple">主题配置文件</span></p>

#### 1.设置侧栏的位置
修改 <span id="inline-purple">主题配置文件</span> 中 `sidebar.position` 的值，支持的选项有：**left** **right**
目前仅 Pisces Scheme 支持 position 配置，也就是说NexT主题的侧栏位置是不能设置的，设置了也没用，反正都在右边。

<!-- more -->

#### 2. 关于添加居中模块
<blockquote class="blockquote-center">优秀的人，不是不合群，而是他们合群的人里面没有你</blockquote>
代码如下：
``` html
<blockquote class="blockquote-center">优秀的人，不是不合群，而是他们合群的人里面没有你</blockquote>
```

#### 3. 添加High一下
打开博客根目录 `\themes\next\layout\_partials\header.swig` ，在
`<ul> ... /ul>` 标签之间加入以下代码：
``` javascript
<li> <a title="把这个链接拖到你的Chrome收藏夹工具栏中" href='javascript:(function() {
    function c() {
        var e = document.createElement("link");
        e.setAttribute("type", "text/css");
        e.setAttribute("rel", "stylesheet");
        e.setAttribute("href", f);
        e.setAttribute("class", l);
        document.body.appendChild(e)
    }

    function h() {
        var e = document.getElementsByClassName(l);
        for (var t = 0; t < e.length; t++) {
            document.body.removeChild(e[t])
        }
    }

    function p() {
        var e = document.createElement("div");
        e.setAttribute("class", a);
        document.body.appendChild(e);
        setTimeout(function() {
            document.body.removeChild(e)
        }, 100)
    }

    function d(e) {
        return {
            height : e.offsetHeight,
            width : e.offsetWidth
        }
    }

    function v(i) {
        var s = d(i);
        return s.height > e && s.height < n && s.width > t && s.width < r
    }

    function m(e) {
        var t = e;
        var n = 0;
        while (!!t) {
            n += t.offsetTop;
            t = t.offsetParent
        }
        return n
    }

    function g() {
        var e = document.documentElement;
        if (!!window.innerWidth) {
            return window.innerHeight
        } else if (e && !isNaN(e.clientHeight)) {
            return e.clientHeight
        }
        return 0
    }

    function y() {
        if (window.pageYOffset) {
            return window.pageYOffset
        }
        return Math.max(document.documentElement.scrollTop, document.body.scrollTop)
    }

    function E(e) {
        var t = m(e);
        return t >= w && t <= b + w
    }

    function S() {
        var e = document.createElement("audio");
        e.setAttribute("class", l);
        e.src = i;
        e.loop = false;
        e.addEventListener("canplay", function() {
            setTimeout(function() {
                x(k)
            }, 500);
            setTimeout(function() {
                N();
                p();
                for (var e = 0; e < O.length; e++) {
                    T(O[e])
                }
            }, 15500)
        }, true);
        e.addEventListener("ended", function() {
            N();
            h()
        }, true);
        e.innerHTML = " <p>If you are reading this, it is because your browser does not support the audio element. We recommend that you get a new browser.</p> <p>";
        document.body.appendChild(e);
        e.play()
    }

    function x(e) {
        e.className += " " + s + " " + o
    }

    function T(e) {
        e.className += " " + s + " " + u[Math.floor(Math.random() * u.length)]
    }

    function N() {
        var e = document.getElementsByClassName(s);
        var t = new RegExp("\\b" + s + "\\b");
        for (var n = 0; n < e.length; ) {
            e[n].className = e[n].className.replace(t, "")
        }
    }

    var e = 30;
    var t = 30;
    var n = 350;
    var r = 350;
    var i = "//7xuupy.com1.z0.glb.clouddn.com/tongxingSibel%20-%20Im%20Sorry.mp3";
    var s = "mw-harlem_shake_me";
    var o = "im_first";
    var u = ["im_drunk", "im_baked", "im_trippin", "im_blown"];
    var a = "mw-strobe_light";
    var f = "//s3.amazonaws.com/moovweb-marketing/playground/harlem-shake-style.css";
    var l = "mw_added_css";
    var b = g();
    var w = y();
    var C = document.getElementsByTagName("*");
    var k = null;
    for (var L = 0; L < C.length; L++) {
        var A = C[L];
        if (v(A)) {
            if (E(A)) {
                k = A;
                break
            }
        }
    }
    if (A === null) {
        console.warn("Could not find a node of the right size. Please try a different page.");
        return
    }
    c();
    S();
    var O = [];
    for (var L = 0; L < C.length; L++) {
        var A = C[L];
        if (v(A)) {
            O.push(A)
        }
    }
    })()    '>High一下</a> </li>
    ```



#### 4. 添加最近访客
在需要添加最近访客的网页对应的 markdown 文件中添加如下代码：
```
最近访客
<div class="ds-recent-visitors" data-num-items="39" data-avatar-size="40" id="ds-recent-visitors"></div>
```


#### 5. 鼠标点击小红心的设置
  1. 将 [love.js](https://github.com/Neveryu/Neveryu.github.io/blob/master/js/src/love.js) 文件添加到 \themes\next\source\js\src 文件目录下。
  2. 找到 `\themes\next\layout\_layout.swing` 文件，** 在文件的后面，`</body>` 标签之前 ** 添加以下代码：
  ``` html
  <!-- 页面点击小红心 -->
  <script type="text/javascript" src="/js/src/love.js"></script>
  ```

#### 6. 背景的设置
  1. 将 [particle.js](https://github.com/Neveryu/Neveryu.github.io/blob/master/js/src/particle.js) 文件添加到 \themes\next\source\js\src 文件目录下。
  2. 找到 `\themes\next\layout\_layout.swing` 文件，** 在文件的后面，`</body>`标签之前 ** 添加以下代码：
  ``` html
  <!-- 背景动画 -->
  <script type="text/javascript" src="/js/src/particle.js"></script>
  ```

#### 7.修改文章内链接文本样式
将链接文本设置为蓝色，鼠标划过时文字颜色加深，并显示下划线。
找到文件 `themes\next\source\css\_custom\custom.styl` ，添加如下 css 样式：
``` css
.post-body p a {
  color: #0593d3;
  border-bottom: none;
  &:hover {
    color: #0477ab;
    text-decoration: underline;
  }
}
```

#### 8. 多说评论不稳定，加载速度慢怎么办？
把多说评论依赖的 embed.js 放置底部，这里需要修改的文件是 duoshuo.swig。
将
```
(document.getElementsByTagName('head')[0]
```
修改成下面的代码
```
(document.getElementById('footer')
```


#### 9. 给 Github 添加 README
默认情况下，Github中每一个项目，我们希望有一份 README.md 的文件来作为项目的说明，但是我们在项目根目录下的 blog\source 目录下创建一份 README.md 文件，写好说明介绍，部署的时候，这个 README.md 会被 hexo 解析掉，而不会被解析到 Github 中去的。
正确的解决方法其实很简单：
** 把 README.md 文件的后缀名改成 "MDOWN" 然后扔到`blog/source`文件夹下即可，这样 hexo 不会解析，Github 也会将其作为 MD 文件解析。 **

#### 10. 给 Blog 添加 LICENSE
在 <span id="inline-purple">主题配置文件</span> 中的 160 行左右：
```
# Creative Commons 4.0 International License.
# http://creativecommons.org/
# Available: by | by-nc | by-nc-nd | by-nc-sa | by-nd | by-sa | zero
creative_commons: by-nc-sa
#creative_commons:
```
将其中第 4 行的注释放开，然后选择你想使用的 LICENSE 即可，可选项参照第 3 行。

<h5 style="color:#f63;"><i>最后要说的是：</i></h5>
<p id="div-border-top-green"><i>[博客源码](https://github.com/Neveryu/Neveryu.github.io) ， 欢迎 star
</i></p>