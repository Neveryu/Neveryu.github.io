---
title: 如何使用 HTTPS 进行本地开发
date: 2023-03-01 06:25:24
categories: 前端
tags: [NodeJS, HTTPS]
comments: false
summary_img: /images/use-https-1.jpg
---

有时，您需要使用 HTTPS 运行本地开发网站。本文介绍了安全快速地执行此操作的工具和技巧。

<!-- more -->

<p id="div-border-top-red"><i>在大多数情况下，`http://localhost` 就可以满足您的需求：在浏览器中，它的行为与 HTTPS 🔒 非常类似。因此，部分无法在部署的 HTTP 网站上运行的 API 可以在 `http://localhost` 上运行。 **这意味着您只需要在特殊情况下才需要在本地使用 HTTPS**（[请参阅何时使用 HTTPS 进行本地开发]()），例如自定义主机名或跨浏览器的安全 cookie。如果您有这种需求，请继续阅读！</i></p>

<i style="color: #df3e3e;">如果你使用了一种简单（非正规）的操作，开启的 HTTPS 环境，那么，很可能，你会遇到下面的情况</i>
![](/images/use-https-3.png)
> 当然，你可以选择：高级 -> 继续访问。
但浏览器依然会提示我们，这是一个不安全的访问。

**本文介绍一些安全快速地使用 HTTPS 运行本地开发网站的工具和技巧；浏览器不再提示告警！**

在本文中，关于 `localhost` 的声明也适用于 `127.0.0.1` 和 `[::1]` ，因为它们都描述了本地计算机地址，也称为“环回地址”。此外，为简单起见，未指定端口号。因此，请将 `http://localhost` 解读为 `http://localhost:{PORT}` 或 `http://127.0.0.1:{PORT}`。


如果您在生产网站使用了 HTTPS，并希望本地开发网站的行为可以接近 HTTPS 网站（如果您的生产网站还没有使用 HTTPS，请优先切换到 HTTPS ）。在大多数情况下，您可以认为 http://localhost 的行为类似于 HTTPS 网站。但在某些情况下，您需要使用 HTTPS 在本地运行网站。现在来看看如何做到这一点。



# 使用 mkcert 为本地网站开启 HTTPS（推荐）

要为本地开发网站开启 HTTPS 并访问 https://localhost ，您需要 [TLS 证书](/2023/how-to-generate-and-use-an-SSL-certificate-in-Node/)。**但并非任何证书都会被浏览器接受：证书需要由您的浏览器信任的实体签名，这些实体称之为[可信证书颁发机构(CA)](https://en.wikipedia.org/wiki/Certificate_authority)** 。

您需要创建一个证书，并使用受您的设备和浏览器**本地信任的CA**对其进行签名。您可以使用工具 **[mkcert](https://github.com/FiloSottile/mkcert)** 通过几个命令来实现这个目的。下面介绍了它的工作原理：

- 如果您使用 HTTPS 在浏览器中打开本地运行的网站，浏览器将检查本地开发服务器的证书。
- 在看到证书已由 mkcert 生成的证书颁发机构签名后，浏览器会检查它是否已注册为受信任的证书颁发机构。
- mkcert 已被列为受信任的颁发机构，所以浏览器会信任该证书并创建 HTTPS 连接。

![](/images/use-https-2.jpg)
<p style="text-align: center; font-size: 14px; color: #888; font-style: oblique;"> mkcert 工作原理图</p>

mkcert（和类似工具）具备下列几种优势：

- mkcert 专门用于创建**与浏览器认为有效相兼容的证书**。它会保持更新，来满足需求和最佳实践。因此您无需运行具备复杂配置或参数的 mkcert 命令，就可以生成正确的证书！

- mkcert 是跨平台的工具。团队中的任何人都可以使用。
我们推荐使用 mkcert 为本地开发创建 TLS 证书。您也可以查看其他选择。

许多操作系统可能会提供用于生成证书的库，例如 [openssl](https://www.openssl.org/)。与 mkcert 和类似工具不同，此类库可能无法始终生成正确的证书，或可能需要运行复杂的命令，并且不一定能够跨平台使用。

<p id="div-border-top-red"><i>1、运行 `mkcert -install` 时，切勿导出或分享由 mkcert 自动创建的 `rootCA-key.pem` 。获得此文件的攻击者可以对您可能正在访问的任何网站进行路径攻击。他们可以拦截从您的电脑到任何网站（银行、医保供应商或社交网络）的安全请求。如果您需要知道 `rootCA-key.pem` 的位置以确保其安全，请运行 `mkcert -CAROOT`。 
2、仅将 mkcert 用于**开发目的**，并且永远不要要求最终用户运行 mkcert 命令。
3、开发团队：所有团队成员都应该单独安装和运行 mkcert（而不是存储和共享 CA 和证书）。</i></p>


## 设置
1、安装 mkcert（仅一次）。
按照[操作说明](https://github.com/FiloSottile/mkcert#installation)在操作系统上安装 mkcert。例如，在 macOS 上：

```bash
brew install mkcert
brew install nss # if you use Firefox
```

2、将 mkcert 添加到本地根 CA。
在终端运行以下命令：
```bash
mkcert -install
```
这会生成本地证书颁发机构 (CA)。mkcert 生成的本地 CA 仅在您的设备上**本地**受信。


3、为网站生成一个由 mkcert 签名的证书。
在终端中，导航到网站的根目录或用来保存证书的任何目录。
然后运行：
```bash
mkcert localhost
```

如果您的自定义主机名是 `mysite.example`，请运行：

```
mkcert mysite.example
```

上面的命令执行了两个操作：

- 为您指定的主机名生成证书
- 让 mkcert（您在步骤 2 中添加为本地 CA）签署此证书。

现在证书已准备就绪，并且已由您的浏览器在本地信任的证书颁发机构签名。大部分步骤已经完成，但您的服务器现在还不了解这个证书！

4、配置服务器。
您现在需要告诉服务器使用 HTTPS（因为默认情况下开发服务器倾向使用 HTTP）并使用您刚刚创建的 TLS 证书。
具体的操作取决于您的服务器。下面列出了几个例子：

### 👩🏻‍💻 使用节点：

`server.js` （替换`{PATH/TO/CERTIFICATE...}`和`{PORT}` ）：
```bash
const https = require('https');
const fs = require('fs');
const options = {
  key: fs.readFileSync('{PATH/TO/CERTIFICATE-KEY-FILENAME}.pem'),
  cert: fs.readFileSync('{PATH/TO/CERTIFICATE-FILENAME}.pem'),
};
https
  .createServer(options, function (req, res) {
    // server code
  })
  .listen({PORT});
```

### 👩🏻‍💻 使用 http-server：（【推荐前端同学用这个】）
按如下方式启动服务器（替换{PATH/TO/CERTIFICATE...} ）：
```bash
http-server -S -C {PATH/TO/CERTIFICATE-FILENAME}.pem -K {PATH/TO/CERTIFICATE-KEY-FILENAME}.pem
```
`-S` 会用 HTTPS 运行服务器，`-C` 用来设置证书，`-K` 用来设置密钥。

### 👩🏻‍💻 使用 React 开发服务器：

按下列方式编辑 `package.json` ，并替换`{PATH/TO/CERTIFICATE...}` ：
```json
"scripts": {
  "start": "HTTPS=true SSL_CRT_FILE={PATH/TO/CERTIFICATE-FILENAME}.pem SSL_KEY_FILE={PATH/TO/CERTIFICATE-KEY-FILENAME}.pem react-scripts start"
}
```
例如，如果您按照下列操作在网站根目录中为 localhost 创建了证书：
```
|-- my-react-app
  |-- package.json
  |-- localhost.pem
  |-- localhost-key.pem
  |--...
```
那么 `start` 脚本应该是这样的：
```json
"scripts": {
  "start": "HTTPS=true SSL_CRT_FILE=localhost.pem SSL_KEY_FILE=localhost-key.pem react-scripts start"
}
```

### 👩🏻‍💻 其他例子：

- [Angular 开发服务器](https://angular.io/cli/serve)
- [Python](https://blog.anvileight.com/posts/simple-python-http-server/)

5、✨全部搞定！在浏览器中打开 `https://localhost` 或 `https://mysite.example` ：这时就在使用 HTTPS 在本地运行您的网站。**您不会看到任何浏览器警告**，因为浏览器已将 mkcert 认作是本地证书颁发机构。

<p id="div-border-left-green"><i>服务器可以使用不同的 HTTPS 端口。</i></p>

<p id="div-border-left-green"><i>请仅用于开发目的，切勿导出或分享 `rootCA-key.pem` 文件（如果您需要知道此文件的位置以确保其安全，请运行 `mkcert -CAROOT` ）。</i></p>



> 关于生成证书这一步，openssl 也可以做到，mkcert 也可以做到；但光有证书还不够。
mkcert 更关键的一步是：可以生成本地证书颁发机构 (CA)。mkcert 生成的本地 CA 仅在您的设备上本地受信。


# 在本地网站开启 HTTPS：其他方法
## 自签名证书
您也可以不使用 mkcert 这样的本地证书颁发机构，而是**自己签署证书**。

请注意这种方法的一些缺点：
- 浏览器不信任您的证书颁发机构身份，因此会显示警告，您需要手动绕过。在 Chrome 中，您可以使用标志 `#allow-insecure-localhost` `localhost` 自动绕过此警告。这确实有些麻烦。
- 如果您的网络环境不安全，此举会带来潜在风险。
- 自签名证书的行为方式与受信任证书的行为方式不同。
- 它不一定比使用 mkcert 这样的本地 CA 更方便或更快捷。
- 如果您没有在浏览器上下文中使用此技术，则可能需要禁用服务器的证书验证。在生产中忘记重新启用它会带来潜在风险。

![](/images/use-https-4.jpg)
<p style="text-align: center; font-size: 14px; color: #888; font-style: oblique;"> 使用自签名证书时浏览器显示的警告。 </p>


<p id="div-border-top-blue"><i>如果您没有指定任何证书，那么 React 和 Vue 的开发服务器 HTTPS 选项会在后台创建一个自签名证书。这样虽然很快捷，但您会收到浏览器警告，并遇到与上面列出的与自签名证书相关的其他问题。幸运的是，您可以使用前端框架的内置 HTTPS 选项并指定由 mkcert 或类似工具创建的本地可信证书。请前往React 与 mkcert 示例查看如何执行此操作。</i></p>

## 为什么浏览器不信任自签名证书？
如果您使用 HTTPS 在浏览器中打开本地运行的网站，浏览器将检查本地开发服务器的证书。当它看到证书由您签名时，它会检查您是否已注册为受信任的证书颁发机构。因为您不是，所以浏览器不能信任此证书；它会警告您的连接不安全。您可以自行承担风险。如果选择这样，那么将创建 HTTPS 连接。

![](/images/use-https-5.jpg)
<p style="text-align: center; font-size: 14px; color: #888; font-style: oblique;">为什么浏览器不信任自签名证书。</p>

# 由常规证书颁发机构签署的证书
您还可以找到基于由实际证书颁发机构（而不是本地机构）签署证书的技术。
如果您在考虑使用这些技术，请记住以下几点：
- 与 mkcert 这样的本地 CA 技术相比，您需要投入更多的设置工作。
- 您需要使用由自己控制且有效的域名。这表示实际的证书颁发机构无法用于：
  - `localhost` 和其他[保留](https://www.iana.org/assignments/special-use-domain-names/special-use-domain-names.xhtml)域名，例如 `example` 或 `test` 。
  - 您无法控制的任何域名。
  - 无效的顶级域。请参阅[有效顶级域](https://www.iana.org/domains/root/db)的列表。


# 反向代理
使用 HTTPS 访问本地运行网站的另一种方法是使用[反向代理](https://en.wikipedia.org/wiki/Reverse_proxy)，例如 [ngrok](https://ngrok.com/) 。

需要考虑的几点：

- 一旦您与任何用户分享了使用反向代理创建的 URL，他们都可以访问您的本地开发网站。这在向客户演示您的项目时非常方便！但如果您的项目很敏感，这可能是一个缺点。
- 您可能需要考虑定价。
- 浏览器新引入的安全措施可能会影响这些工具的表现。

# 标志法（不推荐） #
如果您使用了 `mysite.example` 这样的自定义主机名，那么可以在 Chrome 中使用标志来强制将 `mysite.example` 认作是安全的。**请避免使用这种方法**，因为：

- 您需要 100% 确定 `mysite.example` 始终解析为本地地址，否则可能会泄露生产凭据。
- 此方法不支持跨浏览器调试 🙀


[原文链接](https://web.dev/i18n/zh/how-to-use-local-https/#running-your-site-locally-with-https-other-options)
