var aws         = require('gulp-awspublish');
var gulp        = require('gulp');
var rename      = require('gulp-rename');
var directories = require('./directories.js');
var config      = require('./_config.js');
var confirm     = require('gulp-confirm');

var aws_env = {
  key:        process.env.AWS_ACCESS_KEY_ID,
  secret:     process.env.AWS_SECRET_ACCESS_KEY,
  bucket:     config.aws.bucket,
  region:     config.aws.region || process.env.AWS_REGION,
  directory:  config.aws.directory || ''
};

var deploy = function(directory) {
  directory = directory || aws_env.directory;

  try {
    var key = aws_env.key;
    var secret = aws_env.secret;
    var bucket = aws_env.bucket;

    if (!key || !secret || !bucket) {
      throw new Error('Requires AWS_KEY, AWS_SECRET and AWS_BUCKET environment settings');
    }

    var headers = {
      'Cache-Control' : 'max-age=600'
    };

    var awsBucket = aws.create({
      region: aws_env.region || 'us-west-2',
      params:  {
        Bucket: bucket
      },
      accessKeyId: key,
      secretAccessKey: secret
    });

    console.log('BUCKET: ' + aws_env.bucket);

    return gulp.src(directories.build + '/**/*.*')
      .pipe(confirm({
        question: 'AWS push to *** ' + directory + ' ***, continue?',
        input: '_key:yY'
      }))
      .pipe(rename(function (path) {
        path.dirname = directory + '/dashboard/' + path.dirname;
      }))
      .pipe(awsBucket.publish(headers))
      .pipe(aws.reporter());

  } catch(err) {
    console.log(err);
  }
};

gulp.task('aws:push:testing', function() {
  deploy('testing');
});