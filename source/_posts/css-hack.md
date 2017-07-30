---
title: CSS 各种Hack手段
date: 2017-06-25 03:25:24
categories: 前端
tags: [CSS]
comments: false
summary_img: /images/css-hack-1.png
---
<!-- <img src="/images/css-hack-1.png" alt="css-hack"> -->

<!-- more -->

随着浏览器的发展，css hack 技术的使用应该越来越少了，但是在某些关键时刻以及综合的WEB应用或者老项目中，可能还需要使用 css hack 技术来解决一些问题。

# css hack 分类
css hack 分类大致有 3 种表现形式：**IE条件注释法**、**CSS属性前缀法**以及**选择器前缀法**。

IE 条件注释法（即 HTML 条件注释 Hack）：
针对所有IE(注：IE10+ 已经不再支持条件注释)： 
`<!--[if IE]>IE浏览器显示的内容 <![endif]-->`；

针对 IE6 及以下版本： 
`<!--[if lt IE 6]>只在IE6-显示的内容 <![endif]-->`。
这类 Hack 不仅对 CSS 生效，对写在判断语句里面的所有代码都会生效。

属性前缀法（即类内部 Hack）：例如 IE6 能识别下划线 `_` 和星号 `*`，IE7 能识别星号 `*`，但不能识别下划线 `_`，IE6~IE10 都认识 `\9`，但 firefox 前述三个都不能认识。

选择器前缀法（即选择器 Hack）：例如 IE6 能识别 `*html .class{}`，IE7 能识别 `*+html .class{}` 或者 `*:first-child+html .class{}`。

css hack 书写顺序，一般是将适用范围广、被识别能力强的 CSS 定义在前面。

# 条件注释法
**语法：**
``` html
<!-- [if <keywords>? IE <version> ?]>
HTML 代码块
<![endif]-->
```
**取值：**
`<keywords>`
if 条件共包含 6 种选择方式：是否、大于、大于或等于、小于、小于或等于、非指定版本
**是否**：指定是否 IE 或 IE 某个版本。关键字：空
**大于**：选择大鱼指定版本的 IE 版本。关键字：gt
**大于或等于**：选择大于或等于指定版本的 IE 版本。关键字：gte
**小于**：选择小于指定版本的IE版本。关键字：lt
**小于或等于**：选择小于或等于指定版本的IE版本。关键字：lte
**非指定版本**：选择除指定版本外的所有IE版本。关键字：!

**说明：**
用于选择 IE 浏览器及IE的不同版本

**示例：**

```
只在IE下生效
<!--[if IE]>
这段文字只在IE浏览器显示
<![endif]-->

只在IE6下生效
<!--[if IE 6]>
这段文字只在IE6浏览器显示
<![endif]-->

只在IE6以上版本生效
<!--[if gte IE 6]>
这段文字只在IE6以上(包括)版本IE浏览器显示
<![endif]-->

只在IE8上不生效
<!--[if ! IE 8]>
这段文字在非IE8浏览器显示
<![endif]-->

非IE浏览器生效
<!--[if !IE]>
这段文字只在非IE浏览器显示
<![endif]-->
```


需要说明的是，IE10和11已经不支持这种条件注释法了。<a href="/yu/css-hack.html" target="_blank">运行上面示例</a>

# CSS 属性前缀法
**语法：**
selector {<hack>?property:value<hack>?;}

**取值：**
`_`：选择 IE6 及以下。连接线（中划线）（-）亦可使用，为了避免与某些带中划线的属性混淆，所以使用下划线（_）更为合适。
`*`：选择 IE7 及以下。诸如：（+）与（#）之类的均可使用，不过业界对（*）的认知度更高。
`\9`：选择 IE6+。
`\0`：选择 IE8+ 和 Opera。
`[;property:value;];`：选择 webkit 核心浏览器（Chrome,Safari）。IE7 及以下也能识别。中括号内外的 3 个分号必须保留，第一个分号前可以是任意规则或任意多个规则。
`[;color:#f00;];` 与 `[color:#f00;color:#f00;];` 与 `[margin:0;padding:0;color:#f00;];` 是等价的。生效的始终是中括号内的最后一条规则，所以通常选用第一种写法最为简洁。

**说明：**
**选择不同的浏览器及版本**尽可能减少对 CSS Hack 的使用。Hack 有风险，谨慎使用。
一些 CSS Hack 由于浏览器存在交叉认识，所以需要通过层层覆盖的方式来实现对不同浏览器进行 Hack 的。如下面这个例子：
``` css
.test{
  color:#090\9; /* For IE8+ */
  *color:#f00;  /* For IE7 and earlier */
  _color:#ff0;  /* For IE6 and earlier */
}
```

<p id="div-border-left-yellow">上述 Hack 均需运行在标准模式下，若在怪异模式下运行，这些 Hack 将会被不同版本的 IE 相互识别，导致失效。</p>


# 选择器前缀法
**语法：**
`<hack>selector{sRules}`

**说明：**
``` css
* html .test{color:#090;}       /* For IE6 and earlier */
* + html .test{color:#ff0;}     /* For IE7 */
.test:lang(zh-cn){color:#f00;}  /* For IE8+ and not IE */
.test:nth-child(1){color:#0ff;} /* For IE9+ and not IE */
```
<p id="div-border-left-yellow">上述代码中的3,4两行就是典型的利用能力来进行选择的 CSS Hack。</p>
