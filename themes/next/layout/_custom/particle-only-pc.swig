<!-- 按需加载背景 -->
<!-- 识别手机或电脑的js开始 -->  
<script type="text/javascript">   
(function(){  
var res = GetRequest();  
var par = res['index'];  
if(par!='gfan'){  
  var ua=navigator.userAgent.toLowerCase();  
  var contains=function (a, b){  
      if(a.indexOf(b)!=-1){return true;}  
  };   
  if((contains(ua,"android") && contains(ua,"mobile"))||(contains(ua,"android") && contains(ua,"mozilla"))||(contains(ua,"android") && contains(ua,"opera"))||contains(ua,"ucweb7")||contains(ua,"iphone")){
    return false;
  } else {
    $.getScript("/js/src/particle.js?v={{theme.version}}");
  }
}  
})();  
function GetRequest() {  
var url = location.search;
var theRequest = new Object();  
if (url.indexOf("?") != -1) {  
  var str = url.substr(1);  
  strs = str.split("&");  
  for(var i = 0; i < strs.length; i ++) {  
    theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);  
  }  
}  
return theRequest;  
}  
</script>  
<!-- 识别手机或电脑的js结束 -->  