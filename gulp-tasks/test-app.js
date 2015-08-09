var gulp            = require('gulp');
var Server          = require('karma').Server
var protractor      = require('gulp-protractor').protractor;
var webdriverUpdate = require('gulp-protractor').webdriver_update;

/**
 * Run all karma unit tests
 */
 gulp.task('test:karma', function (done) {
   new Server({
     configFile: __dirname + '/../test/config/karma.config.js',
     singleRun: true
   }, done).start();
});
/**
 * Run all karma unit tests
 */
 gulp.task('test:karma-concat', function (done) {
   new Server({
     configFile: __dirname + '/../test/config/karma.concat.config.js',
     singleRun: true
   }, done).start();
});
/**
 * Run all protractor tests
 */

gulp.task('test:protractor', ['webdriver-update'], function() {
  return gulp.src(['../test/protractor/**/*spec.js'])
    .pipe(protractor({
      'configFile' : __dirname + '/../test/config/protractor.config.js'
    }))
    .on('error', function(e) { throw e; });
});

gulp.task('webdriver-update', webdriverUpdate);
