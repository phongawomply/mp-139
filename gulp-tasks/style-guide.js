var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    concat      = require('gulp-concat'),
    directories = require('./directories.js');

/**
 * Copy styleguide assets to publish folder
 */
gulp.task('sg:images', function () {
  return gulp.src('./node_modules/@womply/styleguide-ui/assets/images/browsers/**/*')
    .pipe(gulp.dest(directories.images));
});


/**
 * Copy styleguide fonts to publish folder
 */
gulp.task('sg:fonts', function () {
  return gulp.src('./node_modules/@womply/styleguide-ui/assets/fonts/**/*')
    .pipe(gulp.dest(directories.fonts));
});

gulp.task('sg:css', function() {
  return gulp.src('./node_modules/@womply/styleguide-ui/styleguide.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest(directories.css));
});
