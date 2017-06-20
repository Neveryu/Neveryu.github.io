---
title: Sass 教程
date: 2016-10-23 10:49:15
categories: 前端
tags: [css, sass]
comments: false
---

<span id="inline-blue" style="font-size:100%;border-radius:3px;">Sass</span>： (Syntactically Awesome StyleSheets)

# sass简介
来自于官网的简介：
Sass is the most mature, stable, and powerful professional grade CSS extension language in the world.
<font color=red> Sass 是世界上最成熟的，稳定的，功能强大的专业级 CSS 扩展语言。</font>

<!-- more -->

# sass 安装
因为 sass 依赖 ruby 环境，所以装 sass 之前先确认安装了 ruby .
在安装的时候，请勾选 Add Ruby executables to your PATH 这个选项，添加环境变量，不然以后使用编译软件的时候会提示找不到 ruby 环境.
![](http://i1.piimg.com/567571/3a876fb3bb575d25.png)

安装完 ruby 之后，在开始菜单中，打开我们的命令行，输入
`ruby -v`

![](http://i1.piimg.com/567571/e5795e583371ce6d.png)
那么我们的 ruby 就安装成功了。

然后直接在命令行中输入
`gem install sass`
按回车键确认，等待一段时间就会提示你 sass 安装成功。

如果要安装 beta 版本的，可以在命令行中输入
`gem install sass --pre`

最近因为墙的比较厉害，如果你没有安装成功，那么请参考下面的淘宝的 RubyGems 镜像安装 sass ，如果成功则忽略。
由于国内网络原因（你懂的），导致 rubygems.org 存放在 Amazon S3 上面的资源文件间歇性连接失败。这时候我们可以通过 gem sources 命令来配置源，先移除默认的 https://rubygems.org 源，然后添加淘宝的源 `https://ruby.taobao.org/` ，然后查看下当前使用的源是哪个，如果是淘宝的，则表示可以输入 sass 安装命令 gem install sass 了.

```
gem sources --remove https://rubygems.org/
gem sources -a https://ruby.taobao.org/
gem sources -l
```
如果输出：
```
*** CURRENT SOURCES ***
https://ruby.taobao.org
```
则表示镜像替换成功，下一步
```
gem install sass
```

按回车键确认，等待一段时间就会提示你 sass 安装成功。

如果你熟悉 git 命令的话，你还可以从 sass 的 Git repository 来安装，git 的命令行为：
```
git clone git://github.com/nex3/sass.git
cd sass
rake install
```

# 如何升级 sass 版本

我们可以使用命令 `gem update sass` 来升级我们的 sass 版本。

如果想要安装sass的某一特定版本，命令行为
`gem install sass --version=3.3.0`

如果想要删除sass的某一特定版本，命令行为
`gem uninstall sass --version=3.3.0`

卸载sass,命令行为
`gem uninstall sass`

查看sass版本的命令行为
`sass -v`

查看ruby安装的所有程序包，命令语句为 `gem list` 。


# sass 命令
安装成功 sass 以后，我们来写个 demo 测试一下：
创建一个 `style.scss` 文件：
``` scss
$fontSize: 14px;
body {
  font-size: $fontSize;
}
```

单文件转换
``` 
sass style.scss style.css
```

单文件监听
```
sass --watch style.scss:style.css
```

文件夹监听
```
sass --watch sassFileDirectory:cssFileDirectory
```

css 文件转成 sass/scss 文件
```
sass-convert style.css style.sass
sass-convert style.css style.scss
```

## sass 命令配置选项
运行命令行帮助文档，可以获得所有的配置选项
```
sass -h
```

配置选项 `--style`
```
sass style.scss:style.css --style compact
```
`--style` 表示解析后的 css 是什么格式，有四种取值分别为：expanded ，nested ，compact ，compressed 。

配置选项 `--sourcemap`
```
sass style.scss:style.css --sourcemap
```
`--sourcemap` 表示开启 sourcemap 调试。开启 sourcemap 调试后，会生成一个后缀名为 .css.map 文件。

配置选项 `--debug-info`
```
sass style.scss:style.css --debug-info
```
`--debug-info` 表示开启 debug 信息，升级到 3.3.0 之后因为 sourcemap 更高级，这个 debug-info 就不太用了。



# sass语法

## 注释
在介绍 sass 语法之前，最有必要的是先来了解一下 sass 中的注释。
sass 有两种注释方式，一种是标准的 css 注释方式 `/* */`，另一种则是 `//` 双斜杆形式的单行注释，不过这种单行注释不会被转译出来，也就是说 `//` 这种注释不会转译到编译后的 css 文件中。

需要说明的是：如果你的注释中有中文的话，请务必在 scss 文件开头加上：
``` css
@charset "UTF-8";
```

如果没有这个的话，会报错。

## 变量
sass 的变量必须是 $ 开头，后面紧跟变量名，而变量值和变量名之间就需要使用冒号(：)分隔开（就像 CSS 属性设置一样），如果值后面加上 !default 则表示默认值。
普通变量
定义之后可以在全局范围内使用。

``` scss
$fontSize: 12px;
body {
    font-size: $fontSize;
}
```

### 默认变量
sass 的默认变量仅需要在值后面加上 `!default` 即可。

``` scss
$baseLineHeight: 1.5 !default;
body {
    line-height: $baseLineHeight;
}
```

sass 的默认变量一般是用来设置默认值，然后根据需求来覆盖的。
``` scss
$baseLineHeight: 1.5 !default;
body {
    line-height: $baseLineHeight;
}
$baseLineHeight: 2;
p {
    line-height: $baseLineHeight;
}
```
这个相当于给 $baseLineHeight 设置了一个默认值，如果你想重新设置的话，可以再写一个 $baseLineHeight 的属性值来覆盖它。

### 特殊变量
一般我们定义的变量都为属性值，可直接使用，但是如果变量作为属性或在某些特殊情况下等则必须要以 `#{$variables}` 形式使用。
``` scss
$borderDirection: top !default;
$baseFontSize: 12px !default;
$baseLineHeight: 1.5 !default;

//应用于 class 和属性
.border-#{$borderDirection} {
    border-#{$borderDirection}: 1px solid #ccc;
}
//应用于复杂的属性值
body {
    font:#{$baseFontSize}/#{$baseLineHeight};
}
```


这个地方我们如果不用 `#{$variables}` 形式的话，那么结果中 body 的样式就是：
``` css
body {
  font: 8px;
}
```
这显然不是我们想要的。

### 多值变量
多值变量分为 list 类型和 map 类型，简单来说 list 类型有点像 js 中的数组，而 map 类型有点像 js 中的对象。

#### list
list 数据可通过空格，逗号或小括号分隔多个值，可用 nth($var,$index) 取值。关于 list 数据操作还有很多其他函数如 `length($list)` ， `join($list,$list2,[$separator])` ， `append($list,$value,[$separator])` 等。

定义
``` scss
//一维数组
$px: 5px 10px 20px 30px;
//二维数组
$px: 5px 10px, 20px 30px;
$px: (5px 10px) (20px 30px);
```

使用
``` scss
$linkColor: #08c #333 !default;//第一个值为默认值，第二个鼠标滑过值
a{
  color:nth($linkColor,1);

  &:hover{
    color:nth($linkColor,2);
  }
}
```
生成
``` css
a{
  color:#08c;
}
a:hover{
  color:#333;
}
```


#### map
map 数据以 key和 value 成对出现，其中 value 又可以是 list 。格式为： `$map:(key1: value1,key2:value2,key3:value3);` 。可通过 `map-get($map,$key)` 取值。关于map数据还有很多其他函数如 `map-merge($map1,$map2)` ， `map-keys($map)` ， `map-values($map)` 等。

定义
``` scss
$heading: (h1: 2em, h2: 1.5em, h3: 1.2em);
```
使用
``` scss
$headings: (h1: 2em, h2: 1.5em, h3: 1.2em);
@each $header, $size in $headings {
  #{$header} {
    font-size: $size;
  }
}
```
生成
```css
h1 {
  font-size: 2em; 
}
h2 {
  font-size: 1.5em; 
}
h3 {
  font-size: 1.2em; 
}
```


## 全局变量
在变量值后面加上 !global 即为全局变量。
在选择器中声明的变量会覆盖外面全局声明的变量。
``` scss
$fontSize: 12px;
body {
  $fontSize: 14px;
  font-size: $fontSize;
}
p {
  font-size: $fontSize;
}
```

启用global之后的机制

``` scss
$fontSize: 12px;
body {
  $fontSize: 14px !global;
  font-size: $fontSize;
}
p {
  font-size: $fontSize;
}
```

与上面的机制对比就会发现默认在选择器里面的变量为局部变量，而只有设置了 !global 之后才会成为全局变量。


## 嵌套(Nesting)

sass 的嵌套包括两种：一种是选择器的嵌套；另一种是属性的嵌套。

### 选择器嵌套
所谓选择器嵌套指的是在一个选择器中嵌套另一个选择器来实现继承，从而增强了 sass 文件的结构性和可读性。
在选择器嵌套中，可以使用 `&` 表示父元素选择器

``` scss
#top_nav {
  line-height: 30px;
  text-transform: capitalize;
  background-color: #333;
  li {
    display: block;
  }
  a {
    display: block;
    padding: 0 10px;
    color: #fff;
    &:hover {
      color: #ddd;
    }
  }
}
```

### 属性嵌套
所谓属性嵌套指的是有些属性拥有同一个开始单词，如border-width，border-color都是以border开头。
``` css
.fakeshadow {
  border: {
    style: solid;
    left: {
      width: 4px;
      color: #888;
    }
    right: {
      width: 2px;
      color: #ccc;
    }
  }
}
```
当然这个只是属性嵌套的一个例子，在实际中这样来写 `border` 的样式或许有些复杂了，但在属性嵌套在别的地方肯定用得到。

## @at-root
sass3.3.0 中新增的功能，用来跳出选择器嵌套的。默认所有的嵌套，继承所有上级选择器，但有了这个就可以跳出所有上级选择器。
### 普通跳出嵌套
``` scss
/*没有跳出*/
.parent-1 {
  color: #f00;
  .child {
    width: 100px
  }
}

/*单个选择器跳出*/
.parent-2 {
  color: #f00;
  @at-root .child {
    width: 200px;
  }
}


/*多个选择器跳出*/
.parent-3 {
  background: #f00;
  @at-root {
    .child1 {
      width: 300px;
    }
    .child2 {
      width: 400px;
    }
  }
}
```


默认 `@at-root` 只会跳出选择器嵌套，而不能跳出 `@media` 或 `@support` ，如果要跳出这两种，则需要使用 `@at-root(without:media)` ，`@at-root(without:support)` 。这个语法的关键词有四个： `all` （表示所有），`true`（表示常规CSS）， `media`（表示media）， 'support'（表示support，因为 `@support` 目前还无法广泛使用）。我们默认的 `@at-root` 其实就是 `@at-root(without:rule)` 。
``` scss
@media print {
  .parent1 {
    color: #000;
    @at-root .child1 {
      width: 200px
    }
  }
}
//跳出media嵌套，父级有效
@media print {
  .parent2 {
    color: #f00;
    @at-root (without:media) {
      .child2 {
        width: 200px;
      }
    }
  }
}
//跳出media和父级
@media print {
  .parent3 {
    color: #f00;
    @at-root (without:all) {
      .child3 {
        width: 200px;
      }
    }
  }
}
```

`@at-root` 与 `&` 配合使用
``` scss
.child {
  @at-root .parent & {
    color: #f00;
  }
}
```

应用于`@keyframe`
``` scss
.demo {
  ...
  animation: motion 3s infinite;
  @at-root {
    @keyframes motion {
      ...
    }
  }
}
```

生成
``` scss
.demo {
    ...   
    animation: motion 3s infinite;
}
@keyframes motion {
    ...
}
```

我认为 `@at-root` 应用于 `@keyframe` 或许是 `@at-root` 最好的实践。
跳出嵌套，我们为什么要用 `@at-root` 来实现呢？我们完全可以在写样式的时候，不使用嵌套的写法。
但是 `@keyframe` 就不一样了，这个动画应用于当前选择器，所以把动画样式写入这个选择器的结构里，方便修改与查看。
相比于之前在 css 中使用 @keyframe 来定义动画，然后在元素中调用，如果一个文件中 @keyframe 比较多的话，在我们想要调用动画的时候，动画与元素之间的关联性比较差。

## 混合(mixin)
sass 中使用 `@mixin` 声明混合，可以传递参数，参数名以 $ 符号开始，多个参数以逗号分开，也可以给参数设置默认值，声明的 @mixin 通过 @include 来调用。
### 无参数mixin
``` scss
@mixin center-block {
  margin: {
    left: auto;
    right: auto;
  }
}
.demo {
  @include center-block;
}
```

生成
``` css
.demo{
    margin-left:auto;
    margin-right:auto;
}
```


### 有参数mixin
``` scss
@mixin opacity($opacity: 50) {
  opacity: $opacity / 100;
  filter: alpha(opacity=$opacity);
}
.opacity{
  @include opacity; //参数使用默认值
}
.opacity-80{
  @include opacity(80); //传递参数
}
```

### 多个参数mixin
调用时可直接传入值，如 `@include` 传入参数的个数小于 `@mixin` 定义参数的个数，则按照顺序表示，后面不足的使用默认值，如不足的没有默认值则报错。除此之外还可以选择性的传入参数，使用参数名与值同时传入。
``` scss
@mixin horizontal-line($border:1px dashed #ccc,$padding:10px) {
  border-bottom: $border;
  padding-top: $padding;
  padding-bottom: $padding;
}
.imgtext-h li {
  @include horizontal-line(1px solid #ccc);
}
.imgtext-h-product li {
  @include horizontal-line($padding:15px);
}
```

生成
``` css
.imgtext-h li {
    border-bottom: 1px solid #cccccc;
    padding-top: 10px;
    padding-bottom: 10px;
}
.imgtext-h--product li {
    border-bottom: 1px dashed #cccccc;
    padding-top: 15px;
    padding-bottom: 15px;
}
```

### 多组值参数mixin
如果一个参数可以有多组值，如 `box-shadow` 、`transition` 等，那么参数则需要在变量后加三个点表示，如 `$variables...` 。
``` scss
//box-shadow可以有多组值，所以在变量参数后面添加...
@mixin box-shadow($shadow...) {
  -webkit-box-shadow: $shadow;
  box-shadow: $shadow;
}
.box {
  border: 1px solid #ccc;
  @include box-shadow (0 2px 2px rgba(0,0,0,.3),0 3px 3px rgba(0,0,0,.3),0 4px 4px rgba(0,0,0,.3));
}
```

## @content
@content 可以用来解决 css3 的 @media 等带来的问题。它可以使 @mixin 接受一整块样式，接受的样式从 @content 开始。
``` scss
@mixin max-screen($res) {
  @media only screen and (max-width:$res) {
    @content;
  }
}
@include max-screen(480px) {
  body {
    color: red;
  }
}
```
PS：@mixin 通过 @include 调用后解析出来的样式是以拷贝形式存在的，而下面的继承则是以联合声明的方式存在的，所以从 3.2.0 版本以后，建议传递参数的用 @mixin ，而非传递参数的使用下面的继承 % 。

## 继承
sass 中，选择器继承可以让选择器继承另一个选择器的所有样式，并联合声明。使用选择器的继承，要使用关键词 @extend ，后面紧跟需要继承的选择器。

使用
``` scss
h1 {
  border: 4px solid #ff9aa9;
}
.speaker {
  @extend h1;
  border-width: 2px;
}
```

生成
``` css
h1,.speaker{
  border: 4px solid #ff9aa9;
}
.speaker{
  border-width: 2px;
}
```

可以看出，选择器继承生成的样式不是拷贝的形式，而是以联合声明的方式存在的。


### 继承的工作细节
关于 @extend 有两个要点你应该知道：

1、跟混合器相比，继承生成的 css 代码相对更少。因为继承仅仅是重复选择器，而不会重复属性，所以使用继承往往比混合器生成的 css 体积更小。如果你非常关心你站点的速度，请牢记这一点。
举个例子，使用混合器的时候：
``` scss
@mixin border-colors {
  width: 200px;
  height: 200px;
  border: 1px solid #333;
}
.demo1 {
  @include border-colors;
}
.demo2 {
  @include border-colors; 
}
```
它生成的 `css` 如下：
``` css
.demo1 {
  width: 200px;
  height: 200px;
  border: 1px solid #333;
}
.demo2 {
  width: 200px;
  height: 200px;
  border: 1px solid #333;
}
```
使用继承的时候：
``` scss
.demo1 {
  width: 200px;
  height: 200px;
  border: 1px solid #333;
}
.demo2 {
  @extend .demo1; 
}
```
它生成的 `css` 如下：
``` css
.demo1, .demo2 {
  width: 200px;
  height: 200px;
  border: 1px solid #333;
}
```
可以看到，继承仅仅是重复选择器，而不会重复属性，所以使用继承往往比混合器生成的 css 体积更小。

2、继承遵从 css 层叠的规则。当两个不同的 css 规则应用到同一个 html 元素上时，并且这两个不同的 css 规则对同一属性的修饰存在不同的值， css 层叠规则会决定应用哪个样式。相当直观：通常权重更高的选择器胜出，如果权重相同，定义在后边的规则胜出。

混合器本身不会引起 css 层叠的问题，因为混合器把样式直接放到了 css 规则中，而继承存在样式层叠的问题。被继承的样式会保持原有定义位置和选择器权重不变。通常来说这并不会引起什么问题，但是知道这点总没有坏处。

### 使用继承的最佳实践
通常使用继承会让你的 css 美观、整洁。因为继承只会在生成 css 时复制选择器，而不会复制大段的 css 属性。但是如果你不小心，可能会让生成的 css 中包含大量的选择器复制。
避免这种情况出现的最好方法就是不要在 css 规则中使用后代选择器（比如 .foo .bar）去继承 css 规则。如果你这么做，同时被继承的 css 规则有通过后代选择器修饰的样式，生成 css 中的选择器的数量很快就会失控。
例如：
``` scss
.bip .baz {
  color: red;
}
.foo .bar {
  @extend .baz;
}
```
生成的css如下：
``` css
.bip .baz, .bip .foo .bar, .foo .bip .bar {
  color: red;
}
```
所以如果允许，尽可能避免这种用法。
** 值得一提的是，只要你想，你完全可以放心地继承有后代选择器修饰规则的选择器，不管后代选择器多长，但有一个前提就是，不要用后代选择器去继承。 **

## 占位选择器 %
从 sass 3.2.0 以后就可以定义占位选择器 % 。这种选择器的优势在于：如果不调用则不会有任何多余的css文件，避免了以前在一些基础的文件中预定义了很多基础的样式，然后实际应用中不管是否使用了 @extend 去继承相应的样式，都会解析出来所有的样式。占位选择器以 % 标识定义，通过 @extend 调用。
``` scss
%ir {
  color: transparent;
  text-shadow: none;
  background-color: transparent;
  border: 0;
}
$lte7:true !default;
%clearfix {
  @if $lte7 {
    *zoom: 1;
  }
  &:before,&:after {
    content: '';
    display: table;
    font: 0/0;
  }
  &:after {
    clear: both;
  }
}
#header {
  h1 {
    @extend %ir;
    width: 300px
  }
}
.ir {
  @extend %ir;
}
```
如上代码，定义了两个占位选择器 `%ir` 和 `%clearfix` ，其中 `%clearfix` 这个没有调用，所以解析出来的css样式也就没有clearfix部分。占位选择器的出现，使css文件更加简练可控，没有多余。所以可以用其定义一些基础的样式文件，然后根据需要调用产生相应的css。
ps:在 @media 中暂时不能 @extend ， @media 外的代码片段，以后将会可以。

## 函数
sass 定义了很多函数可供使用，当然你也可以自己定义函数，以 @function 开始。sass 的官方函数链接为：[sass function](http://sass-lang.com/documentation/Sass/Script/Functions.html) ，实际项目中我们使用最多的应该是颜色函数，而颜色函数中又以 lighten 减淡和 darken 加深使用最多，其调用方法为 `lighten($color,$amout)` 和 `darken($color,$amount)` ，它们的第一个参数都是颜色值，第二个参数都是百分比。
``` scss
$baseFontSize: 10px !default;
$gray: #ccc !default;

@function pxToRem($px) {
  @return $px / $baseFontSize * 1rem;
}
body {
  font-size: $baseFontSize;
  color: lighten($gray,10%);
}
.test {
  font-size: pxToRem(16px);
  color: darken($gray,10%);
}
```
关于 @mixin ，% ，@function 更多说明可参阅：
[sass文档](http://sass-lang.com/documentation/file.SASS_REFERENCE.html)


## 运算
sass 具有运算的特性，可以对数值型的 Value（如：数字、颜色、变量等）进行加减乘除四则运算。请注意运算前后请留一个空格，不然会出错。
``` scss
$baseFontSize: 14px !default;
$baseLineHeight: 1.5 !default;
$baseGap: $baseFontSize * $baseLineHeight !default;
.balber {
  font-size: $baseGap;    //21px
}
```

## 条件判断及循环
### @if判断
@if 可一个条件单独使用，也可以和 @else 结合多条件使用。
``` scss
$lte7: true;
$type: monster;
.ib{
    display:inline-block;
    @if $lte7 {
        *display:inline;
        *zoom:1;
    }
}
p {
  @if $type == ocean {
    color: blue;
  } @else if $type == matador {
    color: red;
  } @else if $type == monster {
    color: green;
  } @else {
    color: black;
  }
}
```
生成的 css 如下：

``` scss
.ib {
  display: inline-block;
  *display: inline;
  *zoom: 1;
}
p {
  color: green;
}

```

### 三目判断
语法为：`if($condition,$if_true,$if_false)`。
三个参数分别表示：条件，条件为真的值，条件为假的值。
``` scss
if(true,1px,2px) => 1px
if(false,1px,2px) => 2px 
```

### for循环
for 循环有两种形式，分别为：
`@for $var from <start> through <end>` 和 `@for $var from <start> to <end>` 。
$i 表示变量，start 表示起始值，end 表示结束值，这两个的区别是关键字 through 表示包括 end 这个数，而 to 则不包括 end 这个数。
使用
``` scss
@for $i from 1 through 3 {
  .item-#{$i} {
    width: 2em * $i;
  }
}
@for $i from 5 to 7 {
  .item-#{$i} {
    width: 2em * $i;
  }
}
```

生成
``` css
.item-1 {
  width: 2em;
}

.item-2 {
  width: 4em;
}

.item-3 {
  width: 6em;
}

.item-5 {
  width: 10em;
}

.item-6 {
  width: 12em;
}
```

### each循环
语法为：`@each $var in <list or map>` 。
其中 $var 表示变量，而 list 和 map 表示 list 类型数据和 map 类型数据。sass 3.3.0 新加入了多字段循环和 map 数据循环。
#### 单个字段 list 数据循环
使用
``` scss
$animal-list: puma, sea-slug, egret, salamander;
@each $animal in $animal-list {
  .#{$animal}-icon {
    background-image: url('/images/#{$animal}.png');
  }
}
```

生成
``` css
.puma-icon {
  background-image: url("/images/puma.png");
}

.sea-slug-icon {
  background-image: url("/images/sea-slug.png");
}

.egret-icon {
  background-image: url("/images/egret.png");
}

.salamander-icon {
  background-image: url("/images/salamander.png");
}
```

#### 多个字段 list 数据循环
使用
``` scss
$animal-data: (puma, black, default),(sea-slug, blue, pointer),(egret, white, move);
@each $animal, $color, $cursor in $animal-data {
  .#{$animal}-icon {
    background-image: url('/images/#{$animal}.png');
    border: 2px solid $color;
    cursor: $cursor;
  }
}
```

生成
``` css
.puma-icon {
  background-image: url('/images/puma.png');
  border: 2px solid black;
  cursor: default; 
}
.sea-slug-icon {
  background-image: url('/images/sea-slug.png');
  border: 2px solid blue;
  cursor: pointer; 
}
.egret-icon {
  background-image: url('/images/egret.png');
  border: 2px solid white;
  cursor: move; 
}
```

#### 多个字段 map 数据循环
``` scss
$headings: (h1: 2em, h2: 1.5em, h3: 1.2em);
@each $header, $size in $headings {
  #{$header} {
    font-size: $size;
  }
}

```

生成
``` css
h1 {
  font-size: 2em; 
}
h2 {
  font-size: 1.5em; 
}
h3 {
  font-size: 1.2em; 
}
```

# 小结
本文介绍了 sass 最基本部分,你可以轻松地使用 sass 编写清晰、无冗余、语义化的 css 。对于 sass 提供的工具你已经有了一个比较深入的了解，同时也掌握了何时使用这些工具的指导原则。

[sass文档](http://sass-lang.com/documentation/file.SASS_REFERENCE.html)
[sass函数列表](http://sass-lang.com/documentation/Sass/Script/Functions.html)
[sass guidelines](https://sass-guidelin.es/zh/)