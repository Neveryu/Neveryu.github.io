const { series, src, dest, watch } = require("gulp");
const browserSync = require("browser-sync").create();

var minifycss = require("gulp-minify-css");
var uglify = require("gulp-uglify");
var htmlmin = require("gulp-htmlmin");

/**
 * 这个文件（gulp-right-file.js）的主要作用是介绍：
 * 1、gulp中watch的用法
 * 2、browser-sync中watch的用法
 * 3、使用browser-sync开启一个本地服务
 * 4、使用browser-sync代理一个网站，同时监听并刷新
 * @param {*} cb
 */

// 任务过早结束：当你在watch监听器之后直接调用cb()时，任务会被标记为已完成，导致后续监听失效
// 单次监听机制：某些watch实现（如gulp的早期版本）默认只监听一次文件变化事件
function browserSyncTask(cb) {
  browserSync.init({
    server: {
      baseDir: "test",
    },
  });
  // 这是gulp中watch的语法
  watch("test/*.html").on("change", (path) => {
    console.log(`[${new Date().toLocaleTimeString()}] 文件变化:`, path);
    browserSync.reload(); // 触发浏览器刷新
  });
  cb();
}

// 代理
function browserSyncTask1(cb) {
  browserSync.init({
    reloadDebounce: 500,
    reloadDelay: 1500,
    proxy: "http://0.0.0.0:4000",
    files: ["source/**/**.md", "public/**/*"],
  });

  // 这个 browser-sync中watch的语法
  // 需要监听的文件模式数组
  const watchPatterns = [
    "./*.html", // HTML文件
    "./*.css", // CSS文件
    "./*.js", // JS文件
  ];
  // 忽略规则配置
  const ignoreRules = ["**/node_modules/**", "**/.git/**", "**/dist/**"];
  watchPatterns.forEach((pattern) => {
    browserSync
      .watch(pattern, {
        ignoreInitial: true, // 忽略启动时的初始扫描
        ignored: ignoreRules,
      })
      .on("change", (path) => {
        console.log(`[${new Date().toLocaleTimeString()}] 文件变化:`, path);
        browserSync.reload(); // 触发浏览器刷新
      })
      .on("error", (err) => {
        console.error(`监听错误:`, err.message);
        // 可添加自定义错误恢复逻辑
        // browserSync.reload();
      });
  });

  // return () => {
  //   cb();
  // };
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
  // cb();
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
