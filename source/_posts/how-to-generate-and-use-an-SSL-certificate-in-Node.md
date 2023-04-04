---
title: 如何在 NodeJS 中生成和使用 SSL 证书
date: 2023-01-01 06:25:24
categories: 前端
tags: [NodeJS, SSL]
comments: false
summary_img: /images/https-ssl-1.jpg
---

在本文中，我们将了解如何为我们的开发服务器生成 SSL 证书。稍后，我们将看到如何在我们的应用程序中使用该证书。

<!-- more -->

先进入到项目中去，假设项目名为：`node-ssl-server`。
```bash
cd node-ssl-server
```

# 让我们生成 SSL 证书

要生成 SSL 证书，我们需要按照以下步骤操作：

- 生成私钥
- 使用私钥创建 CSR（证书签名请求）
- 从 CSR 生成 SSL 证书


## 生成私钥
要生成私钥，我们将运行此命令，如下所示：
```bash
openssl genrsa -out key.pem
```

运行上述命令后，它将生成私钥并将其保存在生成的 `key.pem` 文件中，并在终端中提供此类消息：
```bash
Generating RSA private key, 2048 bit long modulus
...+++
.................+++
e is 65537 (0x10001)
```

## 创建 CSR（证书签名请求）
由于我们是自己的证书颁发机构，因此我们需要使用 `CSR` 来生成我们的证书。为此，我们需要运行以下命令：
```bash
openssl req -new -key key.pem -out csr.pem
```

运行此命令后，它会询问几个问题，如下所示：
```bash
You are about to be asked to enter information that will be incorporated
into your certificate request.
What you are about to enter is what is called a Distinguished Name or a DN.
There are quite a few fields but you can leave some blank
For some fields, there will be a default value,
If you enter '.', the field will be left blank.
-----
Country Name (2 letter code) [XX]:CH
State or Province Name (full name) []:
Locality Name (eg, city) [Default City]:
Organization Name (eg, company) [Default Company Ltd]:
Organizational Unit Name (eg, section) []:
Common Name (eg, your name or your server's hostname) []:
Email Address []:

Please enter the following 'extra' attributes
to be sent with your certificate request
A challenge password []:
An optional company name []:
```
除了 `Country Name` 是必须填写的之外（我填写的是 `CN`），如果您不想提供其他的详细信息，只需按回车键即可跳过任何问题，这完全取决于您。

完成这些问题后，它将在文件夹内的 `csr.pem` 文件中生成 `CSR` 。

## 生成 SSL 证书
现在进行最后的步骤，我们需要使用 `key.pem` 和 `crs.pem` 文件来生成我们的 SSL 证书。

让我们运行下面的命令来生成它：
```bash
openssl x509 -req -days 365 -in csr.pem -signkey key.pem -out cert.pem
```

### 笔记：
- 我们使用x509，因为它是定义公钥证书格式的标准。
- 我们将证书的有效期设置为 365 天。

运行上述命令后，它将证书保存在项目文件夹内的 `cert.pem` 文件中。现在您可以删除 `csr.pem` 文件，也可以保留它。


# 在 NodeJS 中集成 SSL 证书
现在让我们使用文件系统 (fs) 和路径模块在我们的应用程序中使用这些证书。为此，我们需要在我们的应用程序中编辑测试，如下所述：
```js
const https = require('https') // https module to create a ssl enabled server
const path = require('path') // path module 
const fs = require('fs') //file system module

const options ={
  key:fs.readFileSync(path.join(__dirname,'./certs/key.pem')),
  cert:fs.readFileSync(path.join(__dirname,'./certs/cert.pem')) 
}

const sslserver = https.createServer(options, (req, res) => {
  res.writeHead(200)
  res.end('hello https\n')
})

sslserver.listen(8088, () => { console.log('Secure Server is listening on port 8088') })
```

您可以通过从这个 URL 访问它来检查 HTTPS 是否正常工作：
```bash
https://localhost:8088
```

或者，

你也可以在终端使用命令：
```bash
curl -k https://localhost:8088/
```
> `-k` 参数指定跳过 SSL 检测；上面命令不会检查服务器的 SSL 证书是否正确，仅测试连通性。

# 结论：
虽然我们有一个有效的证书，但您可能会在浏览器中看到不安全，这只是因为我们已经生成了证书，而它不是由某些已知的证书颁发机构生成的，因此，您的浏览器不信任您作为有效的证书颁发机构。但是我们通常应该将此过程用于开发目的，而对于生产，我们应该使用由证书颁发机构（如Let's Encrypt）生成的证书。


[原文链接](https://deviloper.in/ssl-certificate-in-nodejs)

