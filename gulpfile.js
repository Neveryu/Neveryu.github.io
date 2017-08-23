var gulp = require('gulp');
var browserSync = require('browser-sync').create({open: 'http://yudong.com'});
var reload = browserSync.reload;

// 代理
gulp.task('browser-sync', function() {
	browserSync.init({
		open: 'ui-external',
		reloadDebounce: 600,
		proxy: 'localhost:4000'
	});
	gulp.watch('source/**/*.*').on('change', reload);
});

gulp.task('default', ['browser-sync']);