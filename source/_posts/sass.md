---
title: Sass入门教程
date: 2016-10-23 10:49:15
categories: 前端
tags: [css,sass]
comments: false
---

 <span id="inline-blue" style="font-size:100%;border-radius:3px;">Sass</span>： (Syntactically Awesome StyleSheets)

1.sass简介
---
来自于官网的简介：
Sass is the most mature, stable, and powerful professional grade CSS extension language in the world.
<font color=red>Sass是世界上最成熟的，稳定的，功能强大的专业级CSS扩展语言。</font>

<!-- more -->

2.sass安装
---
因为sass依赖ruby环境，所以装sass之前先确认安装了ruby.
在安装的时候，请勾选Add Ruby executables to your PATH这个选项，添加环境变量，不然以后使用编译软件的时候会提示找不到ruby环境.
![](http://i1.piimg.com/567571/3a876fb3bb575d25.png)

安装完ruby之后，在开始菜单中，打开我们的命令行，输入
```
ruby -v
```
![](http://i1.piimg.com/567571/e5795e583371ce6d.png)
那么我们的ruby就安装成功了。

然后直接在命令行中输入
`gem install sass`
按回车键确认，等待一段时间就会提示你sass安装成功。

如果要安装beta版本的，可以在命令行中输入
`gem install sass --pre`

最近因为墙的比较厉害，如果你没有安装成功，那么请参考下面的淘宝的RubyGems镜像安装sass，如果成功则忽略。
由于国内网络原因（你懂的），导致 rubygems.org 存放在 Amazon S3 上面的资源文件间歇性连接失败。这时候我们可以通过gem sources命令来配置源，先移除默认的https://rubygems.org源，然后添加淘宝的源 `https://ruby.taobao.org/` ，然后查看下当前使用的源是哪个，如果是淘宝的，则表示可以输入sass安装命令gem install sass了.

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

按回车键确认，等待一段时间就会提示你sass安装成功。

如果你熟悉git命令的话，你还可以从sass的Git repository来安装，git的命令行为
```
git clone git://github.com/nex3/sass.git
cd sass
rake install
```

升级sass版本的命令行为
`gem update sass`

如果想要安装sass的某一特定版本，命令行为
`gem install sass --version=3.3.0`

如果想要删除sass的某一特定版本，命令行为
`gem uninstall sass --version=3.3.0`

卸载sass,命令行为
`gem uninstall sass`

查看sass版本的命令行为
`sass -v`

查看ruby安装的所有程序包，命令语句为`gem list`



单文件转换命令
```
sass style.scss style.css
```

单文件监听命令
`sass --watch style.scss:style.css`

文件夹监听命令
`sass --watch sassFileDirectory:cssFileDirectory`

css文件转成sass/scss文件
```
sass-convert style.css style.sass
sass-convert style.css style.scss
```

### sass语法
变量
sass 的变量必须是 $ 开头，后面紧跟变量名，而变量值和变量名之间就需要使用冒号(：)分隔开（就像CSS属性设置一样），如果值后面加上!default则表示默认值。
普通变量
定义之后可以在全局范围内使用。
``` css
$fontSize: 12px;
body {
    font-size: $fontSize;
}
```

默认变量
sass的默认变量仅需要在值后面加上 `!default` 即可。
``` css
$baseLineHeight: 1.5 !default;
body {
    line-height: $baseLineHeight;
}
```

sass的默认变量一般是用来设置默认值，然后根据需求来覆盖的。
``` css
$baseLineHeight: 1.5 !default;
body {
    line-height: 2;
}
p {
    line-height: $baseLineHeight;
}
```

特殊变量
一般我们定义的变量都为属性值，可直接使用，但是如果变量作为属性或在某些特殊情况下等则必须要以 `#{$variables}` 形式使用。
``` css
$borderDirection: top !default;
$baseFontSize: 12px !default;
$baseLineHeight: 1.5 !default;

//应用于class和属性
.border-#{$borderDirection} {
    border-#{$borderDirection}: 1px solid #ccc;
}
//应用于复杂的属性值
body {
    font:#{$baseFontSize}/#{$baseLineHeight};
}
```

多值变量
多值变量分为list类型和map类型，简单来说list类型有点像js中的数组，而map类型有点像js中的对象。
list
list数据可通过空格，逗号或小括号分隔多个值，可用nth($var,$index)取值。关于list数据操作还有很多其他函数如 `length($list)` ， `join($list,$list2,[$separator])` ， `append($list,$value,[$separator])` 等。
demo ：
``` css
$linkColor: #08c #333 !default;
a {
    color: nth($linkColor,1);
    &:hover {
        color: nth($likColor,2);
    }
}

```

map
map数据以key和value成对出现，其中value又可以是list。格式为： `$map:(key1: value1,key2:value2,key3:value3);` 。可通过 `map-get($map,$key)` 取值。关于map数据还有很多其他函数如 `map-merge($map1,$map2)` ， `map-keys($map)` ， `map-values($map)` 等。
``` css
$headings: (h1: 2em, h2: 1.5em, h3: 1.2em);
@each $header,$size in $headings {
  #{$header} {
    font-size: $size;
  }
}
```

全局变量
在变量值后面加上!global即为全局变量。
在选择器中声明的变量会覆盖外面全局声明的变量。
``` css
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

``` css
$fontSize: 12px;
body {
  $fontSize: 14px !global;
  font-size: $fontSize;
}
p {
  font-size: $fontSize;
}
```

与上面的机制对比就会发现默认在选择器里面的变量为局部变量，而只有设置了!global之后才会成为全局变量。


### 嵌套(Nesting)
sass的嵌套包括两种：一种是选择器的嵌套；另一种是属性的嵌套。
##### 选择器嵌套
所谓选择器嵌套指的是在一个选择器中嵌套另一个选择器来实现继承，从而增强了sass文件的结构性和可读性。
在选择器嵌套中，可以使用 `&` 表示父元素选择器
``` css
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

##### 属性嵌套
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

#### @at-root
`@at-root` 用来跳出选择器嵌套的。默认所有的嵌套，继承所有上级选择器，但有了这个就可以跳出所有上级选择器。
###### 普通跳出嵌套
``` css
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

@at-root(without:...)和@at-root(with:...)
默认 `@at-root` 只会跳出选择器嵌套，而不能跳出 `@media` 或 `@support` ，如果要跳出这两种，则需要使用 `@at-root(without:media)` ，`@at-root(without:support)` 。这个语法的关键词有四个： `all` （表示所有），`true`（表示常规CSS）， `media`（表示media）， 'support'（表示support，因为 `@support` 目前还无法广泛使用）。我们默认的 `@at-root` 其实就是 `@at-root(without:rule)` 。
``` css
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
        widht: 200px
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
``` css
.child {
  @at-root .parent & {
    color: #f00;
  }
}
```

应用于`@keyframe`
``` css
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


### 混合(mixin)
sass中使用 `@mixin` 声明混合，可以传递参数，参数名以 `$` 符号开始，多个参数以逗号分开，也可以给参数设置默认值，声明的 `@mixin` 通过 `@include` 来调用。
###### 无参数mixin
``` css
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

###### 有参数mixin
``` css
@mixin opacity($opacity: 50) {
  opacity: $opacity / 100;
  filter: alpha(opacity=$opacity);
}
```

###### 多个参数mixin
调用时可直接传入值，如 `@include` 传入参数的个数小于 `@mixin` 定义参数的个数，则按照顺表示，后面不足的使用默认值，如不足的没有默认值则报错。除此之外还可以选择性的传入参数，使用参数名与值同时传入。
```css
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

###### 多组值参数mixin
如果一个参数可以有多组值，如 `box-shadow` 、`transition` 等，那么参数则需要在变量后加三个点表示，如 `$variables...` 。
``` css
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

#### @content
`@content` 可以用来解决css3的 `@media` 等带来的问题。它可以使 `@mixin` 接受一整块样式，接受的样式从 `@content` 开始。
``` css
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
PS：`@mixin` 通过 `@include` 调用后解析出来的样式是以拷贝形式存在的，而下面的继承则是以联合声明的方式存在的，所以从3.2.0版本以后，建议传递参数的用 `@mixin` ，而非传递参数的使用下面的继承 `%` 。

#### 继承
`sass` 中，选择器继承可以让选择器继承另一个选择器的所有样式，并联合声明。使用选择器的继承，要使用关键词 `@extend` ，后面紧跟需要继承的选择器。
``` css
h1 {
  border: 4px solid #ff9aa9;
}
.speaker {
  @extend h1;
  border-width: 2px;
}
```

##### 继承的工作细节
关于 `@extend` 有两个要点你应该知道。
- 跟混合器相比，继承生成的 `css` 代码相对更少。因为继承仅仅是重复选择器，而不会重复属性，所以使用继承往往比混合器生成的 `css` 体积更小。如果你非常关心你站点的速度，请牢记这一点。
举个例子,使用混合器的时候：
``` css
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
``` css
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
可以看到，继承仅仅是重复选择器，而不会重复属性，所以使用继承往往比混合器生成的 `css` 体积更小。

- 继承遵从 `css` 层叠的规则。当两个不同的 `css` 规则应用到同一个 `html` 元素上时，并且这两个不同的 `css` 规则对同一属性的修饰存在不同的值， `css` 层叠规则会决定应用哪个样式。相当直观：通常权重更高的选择器胜出，如果权重相同，定义在后边的规则胜出。

混合器本身不会引起 `css` 层叠的问题，因为混合器把样式直接放到了 `css` 规则中，而继承存在样式层叠的问题。被继承的样式会保持原有定义位置和选择器权重不变。通常来说这并不会引起什么问题，但是知道这点总没有坏处。

#### 使用继承的最佳实践
通常使用继承会让你的 `css` 美观、整洁。因为继承只会在生成 `css` 时复制选择器，而不会复制大段的 `css` 属性。但是如果你不小心，可能会让生成的 `css` 中包含大量的选择器复制。
避免这种情况出现的最好方法就是不要在 `css` 规则中使用后代选择器（比如 `.foo .bar`）去继承 `css` 规则。如果你这么做，同时被继承的 `css` 规则有通过后代选择器修饰的样式，生成 `css` 中的选择器的数量很快就会失控。
例如：
``` css
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

###### 占位选择器 `%`
从 `sass 3.2.0` 以后就可以定义占位选择器 `%` 。这种选择器的优势在于：如果不调用则不会有任何多余的css文件，避免了以前在一些基础的文件中预定义了很多基础的样式，然后实际应用中不管是否使用了 `@extend` 去继承相应的样式，都会解析出来所有的样式。占位选择器以 `%` 标识定义，通过 `@extend` 调用。
``` css
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
ps:在 `@media` 中暂时不能 `@extend` `@media` 外的代码片段，以后将会可以。

### 函数
`sass` 定义了很多函数可供使用，当然你也可以自己定义函数，以@function开始。`sass` 的官方函数链接为：[sass function](http://sass-lang.com/documentation/Sass/Script/Functions.html) ，实际项目中我们使用最多的应该是颜色函数，而颜色函数中又以 `lighten` 减淡和 `darken` 加深使用最多，其调用方法为 `lighten($color,$amout)` 和 `darken($color,$amount)` ，它们的第一个参数都是颜色值，第二个参数都是百分比。
``` css
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
关于 `@mixin` ，`%` ，`@function` 更多说明可参阅：
[sass文档](http://sass-lang.com/documentation/file.SASS_REFERENCE.html)


### 运算
`sass` 具有运算的特性，可以对数值型的Value（如：数字、颜色、变量等）进行加减乘除四则运算。请注意运算前后请留一个空格，不然会出错。
``` css
$baseFontSize: 14px !default;
$baseLineHeight: 1.5 !default;
$baseGap: $baseFontSize * $baseLineHeight !default;
.balber {
  font-size: $baseGap;    //21px
}
```

### 条件判断及循环
###### @if判断
`@if` 可一个条件单独使用，也可以和 `@else` 结合多条件使用
``` css
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
生成的 `css` 如下：
``` css
.ib {
  display: inline-block;
  *display: inline;
  *zoom: 1;
}
p {
  color: green;
}

```

###### 三目判断
语法为：`if($condition,$if_true,$if_false)`。三个参数分别表示：条件，条件为真的值，条件为假的值。
``` css
if(true,1px,2px) => 1px
if(false,1px,2px) => 2px 
```

###### for循环
for循环有两种形式，分别为：`@for $var from <start> through <end>` 和 `@for $var from <start> to <end>`。`$i` 表示变量，`start` 表示起始值，`end` 表示结束值，这两个的区别是关键字 `through` 表示包括 `end` 这个数，而 `to` 则不包括 `end` 这个数。
``` css
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

##### each循环
语法为：`@each $var in <list or map>`。其中 `$var` 表示变量，而 `list` 和 `map` 表示 list 类型数据和 map 类型数据。sass 3.3.0新加入了多字段循环和map数据循环。
###### 单个字段list数据循环
``` css
$animal-list: puma, sea-slug, egret, salamander;
@each $animal in $animal-list {
  .#{$animal}-icon {
    background-image: url('/images/#{$animal}.png');
  }
}
```

###### 多个字段lsit数据循环
``` css
$animal-data: (puma, black, default),(sea-slug, blue, pointer),(egret, white, move);
@each $animal, $color, $cursor in $animal-data {
  .#{$animal}-icon {
    background-image: url('/images/#{$animal}.png');
    border: 2px solid $color;
    cursor: $cursor;
  }
}
```

###### 多个字段map数据循环
``` css
$headings: (h1: 2em, h2: 1.5em, h3: 1.2em);
@each $header, $size in $headings {
  #{$header} {
    font-size: $size;
  }
}

```


# 小结
本文介绍了 `sass` 最基本部分,你可以轻松地使用 `sass` 编写清晰、无冗余、语义化的 `css` 。对于 `sass` 提供的工具你已经有了一个比较深入的了解，同时也掌握了何时使用这些工具的指导原则。

变量是 `sass` 提供的最基本的工具。通过变量可以让独立的 `css` 值变得可重用，无论是在一条单独的规则范围内还是在整个样式表中。变量、混合器的命名甚至 `sass` 的文件名，可以互换通用 `_` 和 `-` 。同样基础的是 `sass` 的嵌套机制。嵌套允许 `css` 规则内嵌套 `css` 规则，减少重复编写常用的选择器，同时让样式表的结构一眼望去更加清晰。`sass` 同时提供了特殊的父选择器标识符&，通过它可以构造出更高效的嵌套。

你也已经学到了 `sass` 的另一个重要特性，样式导入。通过样式导入可以把分散在多个 `sass` 文件中的内容合并生成到一个 `css` 文件，避免了项目中有大量的 `css` 文件通过原生的 `css @import` 带来的性能问题。通过嵌套导入和默认变量值，导入可以构建更强有力的、可定制的样式。混合器允许用户编写语义化样式的同时避免视觉层面上样式的重复。你不仅学到了如何使用混合器减少重复，同时学习到了如何使用混合器让你的 `css` 变得更加可维护和语义化。最后，我们学习了与混合器相辅相成的选择器继承。继承允许你声明类之间语义化的关系，通过这些关系可以保持你的 `css` 的整洁和可维护性。

[sass文档](http://sass-lang.com/documentation/file.SASS_REFERENCE.html)
[sass函数列表](http://sass-lang.com/documentation/Sass/Script/Functions.html)