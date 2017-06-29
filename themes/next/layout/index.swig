{% extends '_layout.swig' %}
{% import '_macro/post.swig' as post_template %}
{% import '_macro/sidebar.swig' as sidebar_template %}

{% block title %} {{ config.title }} {% endblock %}

{% block page_class %}
  {% if is_home() %} page-home {% endif %}
{% endblock %}

{% block content %}
  <section id="posts" class="posts-expand">
    {% for post in page.posts %}
      {{ post_template.render(post, true) }}
    {% endfor %}
  </section>

  {% include '_partials/pagination.swig' %}
{% endblock %}

{% block sidebar %}
  {{ sidebar_template.render(false) }}

  <script>
    if (navigator.serviceWorker) {
      // 注册Service Worker scope表示作用的页面的path
      // register函数返回Promise
      navigator.serviceWorker.register('/service-worker.js',{scope: './'}) 
        .then(function (registration) {
          console.log(registration);
        })
        .catch(function (e) {
          console.error(e);
        })
    } else {
      console.log('Service Worker is not supported in this browser.')
    }
  </script>
{% endblock %}