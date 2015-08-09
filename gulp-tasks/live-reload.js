var gulp        = require('gulp'),
    tinylr      = require('tiny-lr')(),
    directories = require('./directories.js'),
    config      = require('./_config.js');

gulp.task('livereload', function() {
  tinylr.listen(config.livereload_port);

  console.log('live reload on: ' + config.livereload_port);

  gulp.watch(directories.build + '/**/*.*', function(event) {
    var fileName = require('path').relative(__dirname, event.path);

    tinylr.changed({
      body: {
        files: [fileName]
      }
    });
  });


});