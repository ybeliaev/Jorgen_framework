const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const notify = require("gulp-notify");// отлавливает ошибки
const rimraf = require('rimraf');// удаляет файлы
const rename = require('gulp-rename');


// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./app"
    });

    gulp.watch("app/scss/*.scss", ['sass']);
    gulp.watch("app/*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("app/scss/*.scss")
        .pipe(sass())
		.pipe(notify())
        .pipe(gulp.dest("app/css"))
        .pipe(browserSync.stream());
});

gulp.task('build', () =>
	gulp.src('./app/css/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
		.pipe(csso())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('dist/css'))
);

gulp.task('clean', function del(cb) {
  return rimraf('dist', cb);
});

gulp.task('production', ['clean','build'] );
gulp.task('default', ['serve']);


