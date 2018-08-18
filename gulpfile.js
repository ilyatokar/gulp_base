var gulp = require('gulp'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	csso = require('gulp-csso'),
	ejs = require("gulp-ejs"),
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
	return gulp.src('./dist/sass/style.scss')
	.pipe(sass())
	.pipe(autoprefixer())
	.pipe(csso())
	.pipe(gulp.dest('dist/css'))
	.pipe(brws.stream());
});

gulp.task('html', function () {
	return gulp.src('./dist/*.html')
	.pipe(brws.stream());
})

gulp.task('ejs', function(){
	gulp.src('dist/pages/*.ejs')
    .pipe(ejs({ msg: 'Hello Gulp!'}, {}, { ext: '.html' }))
    .pipe(gulp.dest("dist"))
    .pipe(brws.stream());
});

gulp.task('watch', function(){
	gulp.watch('./dist/sass/**/*.scss', ['styles']);
	gulp.watch('./dist/*.html', ['html']);
	gulp.watch('./dist/pages/*.ejs', ['ejs']);
});

gulp.task('default', ['ejs','browser-sync', 'watch']);
