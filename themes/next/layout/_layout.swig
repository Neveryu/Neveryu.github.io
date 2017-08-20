<!doctype html>

{% set html_class = 'theme-next ' + theme.scheme %}
{% if theme.use_motion %}
  {% set html_class = html_class + ' use-motion' %}
{% endif %}

<html class="{{ html_class | lower }}">
<head>
  {% include '_partials/head.swig' %}
  <title>{% block title %}{% endblock %}</title>
</head>

<body itemscope itemtype="http://schema.org/WebPage" lang="{{ config.language }}">

  {% include '_scripts/third-party/analytics.swig' %}

  {% set container_class = "container one-collumn " %}
  {% if theme.sidebar.position %}
    {% set container_class = container_class + 'sidebar-position-' + theme.sidebar.position %}
  {% endif %}

  <div class="{{ container_class }} {% block page_class %}{% endblock %} ">
    <div class="headband"></div>

    <header id="header" class="header" itemscope itemtype="http://schema.org/WPHeader">
      <div class="header-inner"> {%- include '_partials/header.swig' %} </div>
    </header>

    <main id="main" class="main">
      <div class="main-inner">
        <div class="content-wrap">
          <div id="content" class="content">
            {% block content %}{% endblock %}
          </div>
          {% include '_partials/duoshuo-hot-articles.swig' %}
          {% include '_partials/comments.swig' %}
        </div>
        {% if theme.sidebar.display !== 'remove' %}
          {% block sidebar %}{% endblock %}
        {% endif %}
      </div>
    </main>

    <footer id="footer" class="footer">
      <div class="footer-inner">
        {% include '_scripts/third-party/analytics/busuanzi-counter.swig' %}
        {% include '_partials/footer.swig' %}
        {% block footer %}{% endblock %}
      </div>
    </footer>

    <div class="back-to-top">
      <i class="fa fa-arrow-up"></i>
    </div>
  </div>

  {% include '_scripts/vendors.swig' %}
  {% include '_scripts/commons.swig' %}

  {% set scheme_script = '_scripts/schemes/' + theme.scheme | lower + '.swig' %}
  {% include scheme_script %}

  {% block script_extra %}{% endblock %}

  {% include '_scripts/boostrap.swig' %}

  {% include '_scripts/third-party/comments.swig' %}
  {% include '_scripts/third-party/tinysou.swig' %}
  {% include '_scripts/third-party/localsearch.swig' %}
  {% include '_scripts/third-party/mathjax.swig' %}
  {% include '_scripts/third-party/lean-analytics.swig' %}
  {% include '_scripts/baidu-push.swig' %}

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
        $.getScript("/js/src/particle.js");
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

  <!-- 背景动画 -->
  <!-- <script type="text/javascript" src="/js/src/particle.js"></script> -->
  <!-- 页面点击小红心 -->
  <script type="text/javascript" src="/js/src/love.js"></script>

  <script type="text/javascript">var OriginTitile=document.title,st;document.addEventListener("visibilitychange",function(){document.hidden?(document.title="≡[。。]≡ 回不去了吗？!",clearTimeout(st)):(document.title="(ฅ>ω<*ฅ) Thank Vue~ "+OriginTitile,st=setTimeout(function(){document.title=OriginTitile},4e3))})</script>
</body>
</html>
