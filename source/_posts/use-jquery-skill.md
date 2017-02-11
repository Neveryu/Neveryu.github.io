---
title: jQuery使用技巧
date: 2016-11-22 11:54:55
categories: 前端
tags: [JavaScript, jQuery]
comments: false
---
### 禁用页面的右键菜单
``` javascript
$(document).ready(function(){  
  $(document).bind("contextmenu",function(e){  
    return false;  
  });  
});
```

### 新窗口打开页面
``` html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <script src="jquery.js"></script>
</head>
<body>
  <a href="https://www.google.com">google_新窗口</a>
  <a href="https://www.google.com" rel="external">google_新窗口</a>
  <a href="demo1.html">当前窗口</a>
<script>
  $(function(){
    $('a[href^="http://"]').attr("target","_blank");
  });
</script>
</body>
</html>
```

### <font color='#099'>输入框文字获取和失去焦点【推荐】</font>

<!-- more -->

``` html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <script src="jquery.js"></script>
</head>
<body>
  <input type="text" class="text1" />
<script>
$(document).ready(function() {  
  $("input.text1").val("Enter your search text here.");  
  textFill( $('input.text1') );  
});
function textFill(input){ //input focus text function  
  var originalvalue = input.val();  
  input.focus( function(){  
    if( $.trim(input.val()) == originalvalue ){
      input.val(''); 
    }  
  }).blur( function(){  
    if( $.trim(input.val()) == '' ){ 
      input.val(originalvalue); 
    }  
  });  
}
</script>
</body>
</html>
```

### 返回头部滑动动画
``` html
<script>
jQuery.fn.scrollTo = function(speed) {
  var targetOffset = $(this).offset().top;
  $('html,body').stop().animate({scrollTop: targetOffset}, speed);
  return this;
}; 
// use
$("#goheader").click(function(){
  $("body").scrollTo(500);
  return false;
}); 
</script>
```

### 获取鼠标位置
``` html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <script src="jquery.js"></script>
</head>
<body>
  <div id="XY" ></div>
<script>
$(function(){
  $(document).mousemove(function(e){  
    $('#XY').html("X : " + e.pageX + " | Y : " + e.pageY);  
  });
});
</script>
</body>
</html>
```

### 关闭所有 jQuery 动画效果
``` javascript
jQuery.fx.off = true;
```

### 检测鼠标的右键和左键
``` javascript
$('#box').mousedown(function(e) {
  alert(e.which);
});

```

### 回车提交表单
``` javascript
$(function() {
  $('input').keyup(function(e) {
    if(e.which == '13') {
      alert('回车提交');
    }
  });
});
```

### 切换复选框
``` javascript
var tog = false;
$('button').click(function() {
  $("input[type=checkbox]").attr("checked",!tog);
  tog = !tog;
});
```

### 使用 siblings() 来选择同辈元素
``` javascript
//不这样做
$('#nav li').click(function(){
  $('#nav li').removeClass('active');
  $(this).addClass('active');
});
//替代做法是
$('#nav li').click(function() {
  $(this).addClass('active').siblings().removeClass('active');
});
```

### 为任何与选择器相匹配的元素绑定事件
``` javascript
$("table").on("click","td",function(){ 
  $(this).toggleClass("hover"); 
});
```

### $.proxy 的使用
使用回调方法的缺点之一是当执行类库中的方法后，上下文对象被设置到另外一个元素，比如，执行下面代码：
``` html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <style>
    #panel {
      width: 300px;
      height: 300px;
      background-color: #ccc;
    }
  </style>
  <script src="jquery.js"></script>
</head>
<body>
  <div id="panel" style="display:none">
    <button>Close</button>
  </div>
  <script>
  $('#panel').fadeIn(function(){
    $('#panel button').click(function(){
      $(this).fadeOut();
    });
  });
  </script>
</body>
</html>
```
你将遇到问题，button 元素会消失，而不是 panel 元素。可以使用 `$.proxy` 方法解决这个问题，代码如下：
``` html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <style>
    #panel {
      width: 300px;
      height: 300px;
      background-color: #ccc;
    }
  </style>
  <script src="jquery.js"></script>
</head>
<body>
  <div id="panel" style="display:none">
    <button>Close</button>
  </div>
  <script>
  $('#panel').fadeIn(function(){
    $('#panel button').click($.proxy(function(){
      $(this).fadeOut();
    },this));
  });
  </script>
</body>
</html>
```
这样才正确执行。

### 限制 Text-Area 域中的字符的个数
``` html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <script src="jquery.js"></script>
</head>
<body>
  <textarea id="mytextarea"></textarea>
  <script>
    jQuery.fn.maxLength = function(max){
      this.each(function(){
        var type = this.tagName.toLowerCase();
          var inputType = this.type? this.type.toLowerCase() : null;
            if(type == "input" && inputType == "text" || inputType == "password"){
              //应用标准的maxLength
              this.maxLength = max;
            }else if(type == "textarea"){
              this.onkeypress = function(e){
                var ob = e || event;
                var keyCode = ob.keyCode;
                var hasSelection = document.selection? document.selection.createRange().text.length > 0 : this.selectionStart != this.selectionEnd;
                return !(this.value.length >= max && (keyCode > 50 || keyCode == 32 || keyCode == 0 || keyCode == 13) && !ob.ctrlKey && !ob.altKey && !hasSelection);
              };
              this.onkeyup = function(){
                if(this.value.length > max){
                  this.value = this.value.substring(0,max);
                }
              };
            }
      });
    };
    //use
    $('#mytextarea').maxLength(10);
  </script>    
</body>
</html>
```

### 解析 json 数据时报 parseError 错误
jQuery 在 1.4 版本后，采用了更为严格的 json 解析方式，即所有内容都必须要有双引号，如果升级 jQuery 版本后，ajax 加载 json 报错，有可能就是这个原因。比如：
``` json
// 1.4之前版本，key没引号，这样没问题
{
  key:"coco",
  status:"0"
}
```
但升级成jQuery1.4后，都必须加上双引号，格式如下：
``` json
{
  "key":"coco",
  "status":"0"
}
```

### 从元素中除去 HTML
``` html
<script>
(function($) { 
$.fn.stripHtml = function() { 
　var regexp = /<("[^"]*"|'[^']*'|[^'">])*>/gi; 
　this.each(function() { 
  　$(this).html( $(this).html().replace(regexp,'') ); 
　});
　return $(this); 
} 
})(jQuery); 
//用法： 
$('div').stripHtml(); 
</script>
```

### 扩展 String 对象的方法
``` html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <script src="jquery.js"></script>
</head>
<body>
  <div>
    <input type="text" /><button >check</button>
  </div>
  <script>
  $.extend(String.prototype, {
  isPositiveInteger:function(){
    return (new RegExp(/^[1-9]\d*$/).test(this));
  },
  isInteger:function(){
    return (new RegExp(/^\d+$/).test(this));
  },
  isNumber: function(value, element) {
    return (new RegExp(/^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/).test(this));
  },
  trim:function(){
    return this.replace(/(^\s*)|(\s*$)|\r|\n/g, "");
  },
  trans:function() {
    return this.replace(/&lt;/g, '<').replace(/&gt;/g,'>').replace(/&quot;/g, '"');
  },
  replaceAll:function(os, ns) {
    return this.replace(new RegExp(os,"gm"),ns);
  },
  skipChar:function(ch) {
    if (!this || this.length===0) {return '';}
    if (this.charAt(0)===ch) {return this.substring(1).skipChar(ch);}
    return this;
  },
  isValidPwd:function() {
    return (new RegExp(/^([_]|[a-zA-Z0-9]){6,32}$/).test(this)); 
  },
  isValidMail:function(){
    return(new RegExp(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/).test(this.trim()));
  },
  isSpaces:function() {
    for(var i=0; i<this.length; i+=1) {
    var ch = this.charAt(i);
    if (ch!=' '&& ch!="\n" && ch!="\t" && ch!="\r") {return false;}
    }
    return true;
  },
  isPhone:function() {
    return (new RegExp(/(^([0-9]{3,4}[-])?\d{3,8}(-\d{1,6})?$)|(^\([0-9]{3,4}\)\d{3,8}(\(\d{1,6}\))?$)|(^\d{3,8}$)/).test(this));
  },
  isUrl:function(){
    return (new RegExp(/^[a-zA-z]+:\/\/([a-zA-Z0-9\-\.]+)([-\w .\/?%&=:]*)$/).test(this));
  },
  isExternalUrl:function(){
    return this.isUrl() && this.indexOf("://"+document.domain) == -1;
  }
  });

  $("button").click(function(){
    alert(   $("input").val().isInteger()  );
  });
  </script>
</body>
</html>
```

