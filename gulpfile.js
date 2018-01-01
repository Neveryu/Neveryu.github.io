var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

var minifycss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');

// 代理
gulp.task('browser-sync', function() {
	browserSync.init({
		reloadDebounce: 500,
		proxy: 'localhost:4000'
	});
	gulp.watch('source/**/*.*').on('change', reload);
});

// 压缩css
gulp.task('minify-css', function() {
	return gulp.src('public/**/*.css')
		.pipe(minifycss().on('error', function(e) {
			console.log(e)
		}))
		.pipe(gulp.dest('public'));
});
// 压缩html
gulp.task('minify-html', function() {
	var option = {
		removeComments: true,
		minifyJS: true,
		minifyCSS: true,
		collapseWhitespace: true
	}
	return gulp.src('public/**/*.html')
		.pipe(htmlmin(option))
		.pipe(gulp.dest('public'));
});
// 压缩js
gulp.task('minify-js', function() {
	return gulp.src('public/js/**/*.js')
		.pipe(uglify().on('error', function(e){
			console.log(e)
		}))
		.pipe(gulp.dest('public/js'));
});

gulp.task('default', ['browser-sync']);
gulp.task('min', ['minify-html','minify-css','minify-js']);