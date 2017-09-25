{% if page.comments %}
  <div class="comments" id="comments">
    <div id="gitmentContainer" style="margin-bottom: -19px;"></div>
    <link rel="stylesheet" href="/css/gitment.css">
    <script src="/js/src/gitment.browser.js" type="text/javascript"></script>
    <script type="text/javascript">
      var gitment = new Gitment({
        id: 'blog-guestbook',
        owner: 'Neveryu',
        repo: 'Neveryu.github.io',
        oauth: {
          client_id: 'bbd367cf498321402719',
          client_secret: '5d6b890500a2acaf7705495eee9c5ad12ed1f3d2',
        },
      })
      gitment.render('gitmentContainer')
    </script>

    {% if (theme.duoshuo and theme.duoshuo.shortname) or theme.duoshuo_shortname %}
      <div class="ds-thread" data-thread-key="{{ page.path }}"
           data-title="{{ page.title }}" data-url="{{ page.permalink }}">
      </div>
    {% elseif theme.facebook_sdk.enable and theme.facebook_comments_plugin.enable %}
      <div class="fb-comments"
           data-href="{{ page.permalink }}"
           data-numposts="{{ theme.facebook_comments_plugin.num_of_posts }}"
           data-width="{{ theme.facebook_comments_plugin.width }}"
           data-colorscheme="{{ theme.facebook_comments_plugin.scheme }}">
      </div>
    {% elseif theme.disqus_shortname %}
      <div id="disqus_thread">
        <noscript>
          Please enable JavaScript to view the
          <a href="//disqus.com/?ref_noscript">comments powered by Disqus.</a>
        </noscript>
      </div>
    {% endif %}
  </div>
{% endif %}