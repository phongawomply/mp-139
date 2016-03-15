var gulp        = require('gulp');
var directories = require('./directories.js');
var vinyl_paths = require('vinyl-paths');
var del         = require('del');


gulp.task('clean:womply-common', function() {
  return gulp.src([directories.lib + '/**/womply-common.min.js'])
    .pipe(vinyl_paths(del));
});

gulp.task('clean:womply-common-css', function() {
  return gulp.src([directories.css + '/**/womply-common.css'])
    .pipe(vinyl_paths(del));
});

gulp.task('clean:womply-common-images', function() {
  return gulp.src([directories.assets + '/**/*.png'])
    .pipe(vinyl_paths(del));
});

gulp.task('womply-common:js', ['clean:womply-common'], function() {
  return gulp.src('./node_modules/@womply/womply-common-js/build/js/womply-common.min.js')
    .pipe(gulp.dest(directories.lib));
});

gulp.task('womply-common:css', ['clean:womply-common-css'], function() {
  return gulp.src('./node_modules/@womply/womply-common-css/build/css/womply-common.css')
    .pipe(gulp.dest(directories.css));
});

gulp.task('womply-common:images', ['clean:womply-common-images'], function() {
  return gulp.src('./node_modules/@womply/womply-common-css/build/assets/**/*.png')
    .pipe(gulp.dest(directories.assets));
});

gulp.task('womply-common', ['womply-common:js', 'womply-common:css', 'womply-common:images']);