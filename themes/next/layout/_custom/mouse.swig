<!-- 鼠标移动特效 -->
{% if theme.mouse_move_icon %}
  <script type="text/javascript" src="/js/src/jquery-stars.js?v={{theme.version}}"></script>
  <script type="text/javascript">
  jQuery('body').jstars({
  	image_path: '/images',
  	image: 'candy-cane-stars.png',
  	style: 'white',
  	width: 34,
  	height: 34,
  	delay: 700,
  	frequency: 5
  });
  </script>
{% endif %}
