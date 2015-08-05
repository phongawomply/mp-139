var gulp        = require('gulp'),
    directories = require('./directories.js');
/**
 * Copy global components js to src folder
 *
 * @class gcCopyJs
 */
gulp.task('gc:js', function () {
  return gulp.src('./node_modules/@womply/global-component-ui/dist/global-components-ui.js')
    .pipe(gulp.dest(directories.lib));
});

gulp.task('gc:css', function() {
  return gulp.src('./node_modules/@womply/global-component-ui/dist/global-components-ui.css')
    .pipe(gulp.dest(directories.css));
});


/**
 * Copy global components browser images to src folder
 *
 * @class gcCopyBrowserImages
 */
gulp.task('gc:images', function () {
  return gulp.src('./node_modules/@womply/global-component-ui/assets/images/browsers/**/*')
    .pipe(gulp.dest(directories.images + '/browsers/'));
});


/**
 * Copy global components partner logos to src folder
 *
 * @class gcCopyPartnerLogos
 */
gulp.task('gc:logos', function () {
  return gulp.src('./node_modules/@womply/global-component-ui/assets/images/logos/**/*')
    .pipe(gulp.dest(directories.images + '/logos/'));
});