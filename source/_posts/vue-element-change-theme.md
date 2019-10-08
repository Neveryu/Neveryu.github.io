---
title: 基于Vue、ElementUI的换肤解决方案
date: 2019-07-01 03:25:24
categories: 前端
tags: [JavaScript, Vue]
comments: false
---

# 写在前面

换肤这个功能，不能算是很常见，但是也是有需求的，所以这里提供几种前端的换肤解决方案，供大家参考。

本文将介绍几种基于Vue、Element-UI的换肤实现方案，力争通俗易懂，易上手，希望大家喜欢~

<!-- more -->

# 方案一、使用全局的样式覆盖（前端通用）

> 这个应该是最常见，也是大家最容易想到的，也是最容易实现的一种方案。

我们单独写一份样式表（css 文件 [深空蓝.css](https://github.com/Neveryu/vue-cms/blob/master/src/assets/custom-theme/science-blue.css)），以一个特定的命名开头（比如 `.blue-theme`），然后在这个 css 文件中，完成我们第二套皮肤的样式代码，然后当我们点击换肤的时候，就将 `blue-theme` 这个 `class` 添加到 `body` 标签中，那么这个时候，我们的换肤效果就出来了。

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190904142928156.gif)


当我们这里点击深空蓝的时候，将 class `science-blue` 添加到 `body` 上，点击青铜绿的时候，就将 `science-blue` 去掉，因为我们默认的就是青铜绿。


# 方案二、自定义自己的Element-ui配色
默认的 Element 的配色是：

<font color="#409EFF" size="4">**蓝 色**</font>
<font color="#67C23A" size="4">**绿 色**</font>
<font color="#E6A23C" size="4">**橙 色**</font>
<font color="#F56C6C" size="4">**红 色**</font>
<font color="#909399" size="4">**灰 色**</font>

Element-UI 还提供了了一个自定义的 [配色工具](https://github.com/ElementUI/element-theme) 以及 [配置页面](https://element.eleme.cn/#/zh-CN/theme/preview)，通过这个工具或者这个页面，我们可以自定义上面五种主色调以及辅助色。

![](https://img-blog.csdnimg.cn/20190831135330563.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NzZG5feXVkb25n,size_16,color_FFFFFF,t_70)

配好以后，如果是工具就生成，如果是网页就下载。得到一个样式文件，这就是我们配置好的主题样式文件。
![](https://img-blog.csdnimg.cn/2019083114454182.png)

保持 `css`文件与 `fonts` 目录的关系不变（ps：这点很重要），将其放入我们的项目中。（你可以将这个` css` 文件改成你喜欢的名字，比如我改成了叫：`theme-summer.css`）
![](https://img-blog.csdnimg.cn/20190831144837820.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NzZG5feXVkb25n,size_16,color_FFFFFF,t_70)

然后在我们项目的 `main.js` 中，注释掉 `Element-UI` 的原来 css 文件引入，引入我们刚才放进项目中的 css 文件。
![](https://img-blog.csdnimg.cn/2019083115045758.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NzZG5feXVkb25n,size_16,color_FFFFFF,t_70)
这个时候，项目中关于 Element-UI 的颜色，就变成了刚才我们自定义配置的颜色配色了。（<font color="#7ed321">下面是我自定义的一套颜色，你们觉得如何？</font>）

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190831175858923.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NzZG5feXVkb25n,size_16,color_FFFFFF,t_70)

**但是，你发现没，这样只是将我们项目中的 Element-UI 的默认配色改成我们想要的；但是我们要做的是换肤功能，希望颜色是可以切换的。**

![](https://img-blog.csdnimg.cn/2019083117114450.png)

所以，我们还是用上面的方法，给这个生成的css文件里面的每一个 `css` 样式加上一个独特的命名前缀，然后换肤的时候，就将这个 `class` 添加到 `body` 上面，如此一来，也能实现很丰富的换肤功能（因为我们可以自己配很多套好看的配色）

**现在摆在眼前的一个需要解决的问题是：这个 `css` 文件加命名空间怎么加？**
![在这里插入图片描述](https://img-blog.csdnimg.cn/2019083117211126.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NzZG5feXVkb25n,size_16,color_FFFFFF,t_70)

我们看一下这个工具生成的，或者 [配置页面](https://element.eleme.cn/#/zh-CN/theme/preview) 导出的这个 css 文件，混淆压缩的代码，手动给每一个样式外面包裹一个 class 来做命名空间是不现实的，所以这里要用到一个 `gulp` 插件 `gulp-css-wrap` ，可以帮助我们完成这个结果。

首先：
`npm i gulp gulp-clean-css gulp-css-wrap -D`

然后，编写 `gulpfile.js`
```js
// gulpfile.js

var path = require('path')
var gulp = require('gulp')
var cleanCSS = require('gulp-clean-css')
var cssWrap = require('gulp-css-wrap')

var customThemeName = '.theme-summer'

gulp.task('default', function() {
  return gulp.src( path.resolve('./index.css'))
    .pipe(cssWrap({selector: customThemeName}))
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist'))
})
```
然后运行 `gulp`

这样就得到了一个以 `.theme-summer` 为命名空间的自定义主题了。

加完以后，我们按照前面介绍的切换 `body` 元素的 `class` 的方法，就可以实现皮肤切换的功能了。

![](https://img-blog.csdnimg.cn/20190904143459163.gif)


# 方案三、快速改变网站颜色

依据 Element 官网所介绍，Element 使用 SCSS 编写，如果你的项目也使用了 SCSS，那么可以直接在项目中改变 Element 的样式变量。新建一个 `element-variables.scss` 样式文件。（温馨提示：请确保你安装了 `node-sass` 与 `sass-loader`）

`element-variables.scss` 文件，这里就不贴出来了，具体可以看这里：[element-variables.scss](https://github.com/Neveryu/vue-cms/blob/master/src/element-variables.scss)，这个文件里面定义了很多颜色变量

这种方法使用起来是简单的，你只需将其引入
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190831181453850.png)
修改里面的颜色变量即可生效。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190831181844187.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NzZG5feXVkb25n,size_16,color_FFFFFF,t_70)
这种方法是快捷的，修改几个颜色变量即可生效。（然后就可以部署啦~）

<font color="red">这里有一个问题，如何在 js 中修改这个 `element-variables.scss` 文件里面的变量？如果可以实现，那么就可以实现实时动态换色了。</font>

> 补充说明： js 修改 scss 变量是有方案的，但是在我们项目中无法做到动态换颜色，为什么呢？因为我们项目中所有的 css 预编译语言（sass,less,stylus）最终都会编译成 css；也就是说，打包后的项目中只有编译后的 css 文件。那么你 js 改 scss 变量的方法在打包后的项目中是不起作用的。


# 方案四、实时更换主色调
<font color="red">前面已经介绍了几种方法可以做到换肤，但都是在我们的限定提供的几个皮肤范围内换肤；但我们有一个需求是，弹出一个颜色选择器，然后我们选了什么颜色，页面的主色调就立马改成什么颜色。</font>

`ElementUI` 官网中有实现动态换肤，它能让用户自定义颜色值，而且展示效果也更加优雅。 我们来看看他是怎么实现的(这里引用的是官方的 [实现解释](https://github.com/ElemeFE/element/issues/3054))

- 获取当前版本的 `Element-UI` 的样式文件（在线 `XHR` 获取）
- 根据用户选择的主题色，生成一系列对应的颜色（比如，选择绿色，生成不同程度的浅绿，深绿...）
- 颜色替换（用刚刚生成的颜色来替换样式文件中的颜色）
- 直接在页面上加 `style` 标签，把生成的样式填进去

<font color="#1a6">我们一起来看一下技术实现细节吧，强烈建议你打开代码一起来看： [https://github.com/Neveryu/vue-cms/blob/master/src/views/theme/index.vue#L167-L297](https://github.com/Neveryu/vue-cms/blob/master/src/views/theme/index.vue#L167-L297)）</font>

1、首先我们需要拿到通过 package.json 拿到 `element-ui` 的版本号，根据该版本号去请求相应的样式。
```js
// 如果没有chalk就是第一次换颜色，需要远程获取css文件，赋值给chalk
// 后续的换颜色操作，就不用远程获取了
if (!this.chalk) {
    const url = `https://unpkg.com/element-ui@${version}/lib/theme-chalk/index.css`
    await this.getCSSString(url, 'chalk')
}
```
`getCSSString` 方法是一个常用 `XHR`，用来获取远程 `css` 资源文件。


2、根据用户选择的颜色，生成相应的颜色
```js
/**
 * 传入一个颜色的HEX，得到这个颜色的深浅颜色数组
 * 我们知道，我们默认的主色调蓝色，在实际使用中，还需要对应的浅蓝和深蓝
 * @param  {[string]]} theme [color]
 * @return {[array]}       [对应的深浅颜色数组]
 */
getThemeCluster(theme) {
    // 具体看代码，这里就不写了
    // ...
}
```


3、颜色替换
```js
/* 更新样式 - 使用新的颜色变量替换之前的 */
updateStyle(style, oldCluster, newCluster) {
  let newStyle = style
  oldCluster.forEach((color, index) => {
    newStyle = newStyle.replace(new RegExp(color, 'ig'), newCluster[index])
  })
  return newStyle
}
```

4、在页面上加 `style` 标签，把生成的样式填进去
```js
let styleTag = document.getElementById(id)
if (!styleTag) {
  styleTag = document.createElement('style')
  styleTag.setAttribute('id', id)
  document.head.appendChild(styleTag)
}
styleTag.innerText = newStyle
```
第一次换颜色的时候，需要创建一个 `style` 标签，添加到 `body` 中，后面的换颜色，就不用了。

OK啦，看下效果：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190904185728363.gif)

<p id="div-border-left-blue">【在线演示：[vue-cms](https://neveryu.github.io/vue-cms/index.html)】
【源代码：[github.com/Neveryu/vue-cms](https://github.com/Neveryu/vue-cms/blob/master/src/views/theme/index.vue)】
</p>

