
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
gulp.task('libraries', ['library:angular',
                        'library:angular-route',
                        'library:angular-aria',
                        'library:angular-animate',
                        'library:angular-material',
                        'library:underscore',
                        'library:moment']);
/**
 * Clean up the build directories
 */
gulp.task('clean', function() {
  return gulp.src([directories.build])
    .pipe(vinyl_paths(del));
});
/**
 * Clean the coverage report directory
 */
gulp.task('clean:coverage', function() {
  return gulp.src([directories.coverage])
    .pipe(vinyl_paths(del));
});
/**
 * Watch the files to build
 */
gulp.task('watch', ['build:watch']);
/**
 * Clean and build all app assets
 */
gulp.task('build', function(cb) {
  sequence('clean',
    [
      'build:js',
      'build:html',
      'build:index',
      'build:css',
      'build:images:common',
      'build:images:components',
      'build:favicon',
      'asset',
      'libraries'
    ],
    cb);
});
/**
 * Setup the test environment
 */
gulp.task('test:karma:setup', function(cb) {
  sequence('build', ['clean:coverage', 'library:angular-mocks'], cb);
});
/**
 * Test the files for development
 * which test unconcat files
 */
gulp.task('test:karma:dev', function() {
  sequence('test:karma:setup', 'test:karma');
});
/**
 * Run protractor tests
 */
gulp.task('protractor', ['test:protractor']);
/**
 * Setup the serve tasks
 */
gulp.task('serve:setup', function(cb) {
  sequence('build', cb);
});
/**
 * Serve the files
 * Must kill and restart on blueprints change
 */
gulp.task('serve', function() {
  sequence('serve:setup', 'web-server', 'watch');
});
/**
 * Serve the files with live reload
 */
gulp.task('serve:livereload', function() {
  sequence('serve:setup', 'web-server:livereload', 'watch', 'livereload');
});
/**
 * Serve the api blueprints
 */
gulp.task('serve:blueprints', function() {
  sequence('serve:setup', 'blueprints', 'web-server', 'watch');
});
/**
 * Deploy the current branch build to testing
 */
gulp.task('deploy', function() {
  sequence('build', 'aws:deploy');
});
