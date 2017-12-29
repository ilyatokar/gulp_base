var 	gulp = require('gulp'),
	sass = require('gulp-sass'),
	brws = require('browser-sync').create();

gulp.task('browser-sync', function(){
	brws.init({
		server: {
			baseDir: "./dist"	
		},
		notify: false
	});
});

gulp.task('styles', function(){
	return gulp.src('sass/style.scss')
	.pipe(sass())
	.pipe(autoprefixer())
	.pipe(gulp.dest('dist/css'))
	.pipe(brws.stream());
});

gulp.task('watch', function(){
	gulp.watch('./dist/sass/**/*.scss', ['styles']);
});

gulp.task('default', ['browser-sync', 'watch']);
