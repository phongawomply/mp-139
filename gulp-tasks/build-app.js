var gulp        = require('gulp'),
    concat      = require('gulp-concat'),
    babel       = require('gulp-babel'),
    sourcemaps  = require('gulp-sourcemaps'),
    directories = require('./directories.js');

gulp.task('build:js', function() {
  return gulp.src([directories.src + '/**/app.module.js', directories.src + '/**/*.js'])
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat('./js/womply.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(directories.build));
});

gulp.task('build:html', function() {
  return gulp.src([directories.src + '/**/*.html'], {base: directories.src})
    .pipe(gulp.dest(directories.html));
});

gulp.task('build:watch', function() {
  gulp.watch(directories.src + '/**/*.js', ['build:js']);
  gulp.watch(directories.src + '/**/*.html', ['build:html']);
});