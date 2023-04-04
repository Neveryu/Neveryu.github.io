{# 天气 #}
{# 固定在页面右上角 #}
{% if theme.weather.on === true %}
  <div id="weather-wrapper">
    <div id="he-plugin-simple"></div>
    <script>
      WIDGET = {
        CONFIG: {
          "modules": "012",
          "background": 5,
          "tmpColor": "4A4A4A",
          "tmpSize": 16,
          "cityColor": "4A4A4A",
          "citySize": 16,
          "aqiSize": 16,
          "weatherIconSize": 24,
          "alertIconSize": 18,
          "padding": "10px 10px 10px 10px",
          "shadow": "1",
          "language": "auto",
          "borderRadius": 5,
          "fixed": "false",
          "vertical": "middle",
          "horizontal": "center",
          "key": "2784dd3fcb1e4f0f9a9b579bf69641f2"
        }
      }
    </script>
    <script src="{{ theme.CDN.weather }}"></script>
  </div>
{% endif %}
