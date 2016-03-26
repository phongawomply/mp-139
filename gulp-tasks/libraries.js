var gulp        = require('gulp'),
    directories = require('./directories.js');

gulp.task('library:angular', function() {
  return gulp.src('./node_modules/angular/angular.min.js')
    .pipe(gulp.dest(directories.lib));
});

gulp.task('library:angular-messages', function() {
  return gulp.src('./node_modules/angular-messages/angular-messages.min.js')
    .pipe(gulp.dest(directories.lib));
});

gulp.task('library:angular-route', function() {
  return gulp.src('./node_modules/angular-route/angular-route.min.js')
    .pipe(gulp.dest(directories.lib));
});

gulp.task('library:angular-aria', function() {
  return gulp.src('./node_modules/angular-aria/angular-aria.min.js')
    .pipe(gulp.dest(directories.lib));
});

gulp.task('library:angular-animate', function() {
  return gulp.src('./node_modules/angular-animate/angular-animate.min.js')
    .pipe(gulp.dest(directories.lib));
});

gulp.task('library:angular-material:js', function() {
  return gulp.src('./node_modules/angular-material/angular-material.min.js')
    .pipe(gulp.dest(directories.lib));
});

gulp.task('library:angular-material:css', function() {
  return gulp.src('./node_modules/angular-material/angular-material.min.css')
    .pipe(gulp.dest(directories.css));
});

gulp.task('library:angular-material', ['library:angular-material:js', 'library:angular-material:css']);

gulp.task('library:underscore', function() {
  return gulp.src('./node_modules/underscore/underscore-min.js')
    .pipe(gulp.dest(directories.lib));
});

gulp.task('library:moment', function() {
  return gulp.src('./node_modules/moment/min/moment.min.js')
    .pipe(gulp.dest(directories.lib));
});

gulp.task('library:angular-mocks', function() {
  return gulp.src('./node_modules/angular-mocks/angular-mocks.js')
    .pipe(gulp.dest(directories.test_lib));
});

gulp.task('library:bowser', function() {
  return gulp.src(['./node_modules/bowser/bowser.min.js'])
    .pipe(gulp.dest(directories.lib));
});

