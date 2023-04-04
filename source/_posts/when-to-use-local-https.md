---
title: 何时使用 HTTPS 进行本地开发
date: 2023-05-01 05:20:00
categories: 前端
tags: [NodeJS, HTTPS]
comments: false
summary_img: /images/when-https-1.jpg
---

大多数情况下，使用 http://localhost 进行本地开发是可以的，但在某些特殊情况下除外。之前也介绍过了如何使用 HTTPS 进行本地开发。这篇文章解释了何时需要使用 HTTPS 运行本地开发站点。

<!-- more -->

另请参阅：[如何使用 HTTPS 进行本地开发](/2023/how-to-use-local-https/)。

<i>在这篇文章中，about 语句对和也是`localhost`有效的，因为它们都描述了本地计算机地址，也称为“环回地址”。此外，为简单起见，未指定端口号。`127.0.0.1[::1]` 因此，当您看到时`http://localhost`，请将其读作`http://localhost:{PORT}`或`http://127.0.0.1:{PORT}`。</i>

# 摘要
在本地开发时，默认使用`http://localhost`。Service Workers、Web Authentication API 等都可以使用。**但是，在以下情况下，您需要使用 HTTPS 进行本地开发：**

- 跨浏览器以一致的方式设置安全 cookie
- 调试混合内容问题
- 使用 HTTP/2 及更高版本
- 使用需要 HTTPS 的第三方库或 API
- 使用自定义主机名

<p id="div-border-top-blue"><i>如果您需要 HTTPS 用于上述用例之一，请查看[如何使用 HTTPS 进行本地开发](/2023/how-to-use-local-https/)。</i></p>


# 为什么你的开发网站应该安全运行
为避免遇到意外问题，您希望本地开发网站的行为尽可能像生产网站一样。因此，如果您的生产网站使用 HTTPS，您希望您的本地开发网站**表现得像 HTTPS 网站**。


<p id="div-border-top-yellow"><i>如果您的生产网站不使用 HTTPS，[请将其设为优先级](/2022/why-https-matters/)。</i></p>

# 何时使用 HTTPS 进行本地开发
`http://localhost` 您可能会遇到行为不像 HTTPS 站点的特殊情况，或者您可能只想使用不是 `http://localhost`。

以下情况需要使用HTTPS进行本地开发：
- You need to set a cookie locally that is `Secure`, or `SameSite:none`, or has the `__Host` prefix. `Secure` cookies are set only on HTTPS, but not on `http://localhost` for all browsers. And because `SameSite:none` and `__Host` also require the cookie to be `Secure`, setting such cookies on your local development site requires HTTPS as well.
- You need to debug locally an issue that only occurs on an HTTPS website but not on an HTTP site, not even http://localhost, such as a mixed-content issue.
- You need to locally test or reproduce a behaviour specific to HTTP/2 or newer. For example, if you need to test loading performance on HTTP/2 or newer. Insecure HTTP/2 or newer is not supported, not even on `localhost`.
- You need to locally test third-party libraries or APIs that require HTTPS (for example OAuth).
- You're not using localhost, but a custom host name for local development, for example mysite.example. Typically, this means you've overridden your local hosts file:
![](/images/when-https-2.jpg)
<p style="text-align: center; font-size: 14px; color: #888; font-style: oblique;">Editing a hosts file to add a custom hostname.</p>
In this case, Chrome, Edge, Safari, and Firefox by default do not consider `mysite.example` to be secure, even though it's a local site. So it won't behave like an HTTPS site.
- Other cases! This is not an exhaustive list, but if you encounter a case that's not listed here, you'll know: things will break on http://localhost, or it won't quite behave like your production site. 🙃

在所有这些情况下，您都需要使用 HTTPS 进行本地开发。





