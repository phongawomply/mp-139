var gulp        = require('gulp'),
    del         = require('del'),
    require_dir = require('require-dir'),
    vinyl_paths = require('vinyl-paths'),
    directories = require('./gulp-tasks/directories.js'),
    sequence    = require('run-sequence');

require_dir('./gulp-tasks');
/**
 * Copy all global component assets
 */
gulp.task('gc', ['gc:js', 'gc:css', 'gc:images', 'gc:logos']);
/**
 * Copy all styleguide assets
 */
gulp.task('sg', ['sg:images', 'sg:fonts', 'sg:css']);
/**
 * Copy all assets
 */
gulp.task('asset', ['gc', 'sg']);
/**
 * Copy all third party libraries
 */
gulp.task('libraries', ['library:angular', 'library:angular-route', 'library:angular-material', 'library:underscore']);
/**
 * Clean up the build directories
 */
gulp.task('clean', function() {
  return gulp.src([directories.build])
    .pipe(vinyl_paths(del));
});
/**
 * Watch the files to biuld
 */
gulp.task('watch', ['build:watch']);
/**
 * Build the JS and HTML
 */
gulp.task('build', ['build:js', 'build:html', 'build:css']);
/**
 * Setup the test environment
 */
gulp.task('test:karma:setup', function(cb) {
  sequence('clean', 'build', 'gc', 'libraries', 'library:angular-mocks', cb);
});
/**
 * Test the files for development
 * which test unconcat files
 */
gulp.task('test:karma:dev', function() {
  sequence('test:karma:setup', 'test:karma');
});
/**
 * Test the files for release
 * which tests the concat file
 */
gulp.task('test:karma:prod', function() {
  sequence('test:karma:setup', 'test:karma-concat');
});
/**
 * Serve the files
 */
gulp.task('serve', function() {
  sequence('clean', 'asset', 'build', 'libraries', 'web-server', 'watch');
});
/**
 * Serve the files with live reload
 */
gulp.task('serve:livereload', function() {
  sequence('clean', 'asset', 'build', 'libraries', 'web-server:livereload', 'watch', 'livereload');
});
