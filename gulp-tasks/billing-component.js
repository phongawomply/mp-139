var gulp        = require('gulp');
var directories = require('./directories.js');
var vinyl_paths = require('vinyl-paths');
var del         = require('del');

gulp.task('clean:billing-component:js', function() {
  return gulp.src([directories.lib + '/**/billing-components.min.js'])
    .pipe(vinyl_paths(del));
});

gulp.task('clean:billing-component:css', function() {
  return gulp.src([directories.lib + '/**/billing-components.css'])
    .pipe(vinyl_paths(del));
});

gulp.task('billing-component:js', ['clean:billing-component:js'], function() {
  return gulp.src('./node_modules/@womply/womply-billing-component/build/js/billing-components.min.js')
    .pipe(gulp.dest(directories.lib));
});

gulp.task('billing-component:css', ['clean:billing-component:css'], function() {
  return gulp.src('./node_modules/@womply/womply-billing-component/build/css/billing-components.css')
    .pipe(gulp.dest(directories.css));
});

gulp.task('billing-component', ['billing-component:js', 'billing-component:css']);