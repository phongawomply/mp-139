var gulp = require('gulp');
var directories = require('./directories.js');

gulp.task('ac', function() {
  return gulp.src('./node_modules/@womply/angular-components/build/js/angular-components.min.js')
    .pipe(gulp.dest(directories.lib));
});
