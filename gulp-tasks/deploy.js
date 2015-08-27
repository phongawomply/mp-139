var gulp        = require('gulp'),
    util        = require('gulp-util'),
    rename      = require('gulp-rename'),
    aws         = require('gulp-awspublish'),
    directories = require('./directories.js');

var showError = function() {
  util.log(util.colors.bgRed('ERROR: aws_env.js must be present'));
  util.log(util.colors.bgRed('{'));
  util.log(util.colors.bgRed('  key:       <aws access key>'));
  util.log(util.colors.bgRed('  secret:    <aws secret>'));
  util.log(util.colors.bgRed('  bucket:    <aws bucket>'));
  util.log(util.colors.bgRed('  directory: <aws base directory>'));
  util.log(util.colors.bgRed('}'));
};

// Task to deploy the current build to aws testing
gulp.task('aws:deploy', function() {
  try {
    var aws_env = require('../aws_env.js');
    var key = aws_env.key;
    var secret = aws_env.secret;
    var bucket = aws_env.bucket;
    var directory = aws_env.directory || '';

    if (!key || !secret || !bucket) {
      throw new Error();
    }

    var headers = {
      'Cache-Control' : 'max-age=600'
    };

    var awsBucket = aws.create({
                      params:  {
                        Bucket: bucket
                      },
                      accessKeyId: key,
                      secretAccessKey: secret
                    });


      gulp.src(directories.build + '/**/*')
          .pipe(rename(function(path) {
            if (directory) {
              path.dirname = '/testing/' + directory + '/' + path.dirname;
            } else {
              path.dirname = '/testing/' + path.dirname;
            }
          }))
          .pipe(awsBucket.publish(headers))
          .pipe(awsBucket.sync('/testing/' + directory))
          .pipe(aws.reporter());

  } catch(err) {
    showError();
  }
});