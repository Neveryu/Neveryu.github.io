const { series, src, dest, watch } = require("gulp");
const browserSync = require("browser-sync").create();

var minifycss = require("gulp-minify-css");
var uglify = require("gulp-uglify");
var htmlmin = require("gulp-htmlmin");

// 代理
function browserSyncTask(cb) {
  browserSync.init({
    reloadDebounce: 500, // 单位：毫秒
    proxy: "http://0.0.0.0:4000/",
    files: ["source/**/**.md", "public/**/*"],
  });
  cb();
}

// 压缩css
function minifycss(cb) {
  return src("public/**/*.css")
    .pipe(
      minifycss().on("error", function (e) {
        console.log(e);
      })
    )
    .pipe(dest("public"));
  cb();
}

// 压缩html
function minifyhtml(cb) {
  var option = {
    removeComments: true,
    minifyJS: true,
    minifyCSS: true,
    collapseWhitespace: true,
  };
  return src("public/**/*.html").pipe(htmlmin(option)).pipe(dest("public"));
  cb();
}

// 压缩js
function minifyjs() {
  return src("public/js/**/*.js")
    .pipe(
      uglify().on("error", function (e) {
        console.log(e);
      })
    )
    .pipe(dest("public/js"));
}

exports.default = browserSyncTask;
exports.min = series(minifyhtml, minifycss, minifyjs);
