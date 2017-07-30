var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

// 代理
gulp.task('browser-sync', function() {
	browserSync.init({
		proxy: 'localhost:4000'
	});
	gulp.watch('source/**/*.*').on('change', reload);
});

gulp.task('default', ['browser-sync']);