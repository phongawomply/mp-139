var gulp        = require('gulp');
var directories = require('./directories.js');
var vinyl_paths = require('vinyl-paths');
var del         = require('del');


gulp.task('clean:gmd-nav:js', function() {
  return gulp.src([directories.lib + '/**/gmd-nav.min.js'])
    .pipe(vinyl_paths(del));
});

gulp.task('clean:gmd-nav:css', function() {
  return gulp.src([directories.css + '/**/gmd-nav.css'])
    .pipe(vinyl_paths(del));
});

gulp.task('gmd-nav:js', ['clean:gmd-nav:js'], function() {
  return gulp.src('./node_modules/@womply/gmd-nav/build/js/gmd-nav.min.js')
    .pipe(gulp.dest(directories.lib));
});

gulp.task('gmd-nav:css', ['clean:gmd-nav:css'], function() {
  return gulp.src('./node_modules/@womply/gmd-nav/build/css/gmd-nav.css')
    .pipe(gulp.dest(directories.css));
});

gulp.task('gmd-nav', ['gmd-nav:js', 'gmd-nav:css'])
