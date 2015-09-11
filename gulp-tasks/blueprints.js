var gulp        = require('gulp'),
    concat      = require('gulp-concat'),
    directories = require('./directories.js'),
    ApiMock     = require('api-mock'),
    vinyl_paths = require('vinyl-paths'),
    del         = require('del'),
    config      = require('./_config.js');

/**
 * Remove the old blueprints concatenated file
 */
gulp.task('clean:blueprint', function() {
  return gulp.src(directories.blueprint + '/blueprint.concat.md')
    .pipe(vinyl_paths(del));
});
/**
 * Concat the blueprints files together
 **/
gulp.task('concat:blueprint', ['clean:blueprint'], function() {
  return gulp.src([directories.blueprint + '/**/*.md', '!' + directories.blueprint + '/blueprint.concat.md', '!' + directories.blueprint + '/readme.md'])
    .pipe(concat('blueprint.concat.md'))
    .pipe(gulp.dest(directories.blueprint));
});
/**
 * Serve the blueprints
 */
gulp.task('serve:blueprints', ['concat:blueprint'], function () {
  var mockServer = new ApiMock ( {
    blueprintPath: 'test/blueprints/blueprint.concat.md',
    options: {
      'port': 3000,
      'cors-disable': true
    }
  });
  mockServer.app.all('*', function(req, res, next){
    if (!req.get('Origin')) return next();
    res.set('Access-Control-Allow-Origin', 'http://local.womply.com:' + config.server_port);
    res.set('Access-Control-Allow-Methods', 'GET, POST');
    res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    res.set('Access-Control-Allow-Credentials', 'true');
    if ('OPTIONS' == req.method) return res.send(200);
    next();
  });

  mockServer.run();

});