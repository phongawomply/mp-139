var gulp            = require('gulp');
var Server          = require('karma').Server
//var protractor      = require('gulp-protractor').protractor;
//var webdriverUpdate = require('gulp-protractor').webdriver_update;

/**
 * Run all karma unit tests
 */
 gulp.task('test:karma', function (done) {
   new Server({
     configFile: __dirname + '/../test/testConfig/karma.config.js',
     singleRun: true
   }, done).start();
});
/**
 * Run all karma unit tests
 */
 gulp.task('test:karma-concat', function (done) {
   new Server({
     configFile: __dirname + '/../test/testConfig/karma.concat.config.js',
     singleRun: true
   }, done).start();
});

/**
 *
 */

// gulp.task('test:protractor', ['webdriver-update'], function() {
//   return gulp.src(['./src/tests/*.js'])
//     .pipe(protractor({
//       'configFile' : __dirname + '/tests/config/protractor.conf.js'
//     }))
//     .on('error', function(e) { throw e; });
// });
//
// gulp.task('webdriver-update', webdriverUpdate);
