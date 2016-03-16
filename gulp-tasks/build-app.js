var gulp        = require('gulp'),
  concat      = require('gulp-concat'),
  uglify      = require('gulp-uglify'),
  babel       = require('gulp-babel'),
  sass        = require('gulp-sass'),
  sourcemaps  = require('gulp-sourcemaps'),
  directories = require('./directories.js');

gulp.task('build:js', function() {
  return gulp.src([directories.src + '/**/*.module.js', directories.src + '/**/*.js'])
    .pipe(sourcemaps.init())
    .pipe(babel())
    //.pipe(uglify())
    .pipe(concat('./js/womply.min.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(directories.build));
});

gulp.task('build:html', function() {
  return gulp.src([directories.src + '/**/*.html', '!' + directories.src + '/index.html'],
    {base: directories.src})
    .pipe(gulp.dest(directories.html));
});

gulp.task('build:css', function() {
  return gulp.src([directories.src + '/components/assets/stylesheets/app.scss'])
    .pipe(sass({indentedSyntax: false}).on('error', sass.logError))
    .pipe(concat('app-styles.css'))
    .pipe(gulp.dest(directories.css));
});

gulp.task('build:images', function() {
  return gulp.src([directories.src + '/components/**/*.png'], {base: directories.src + '/components'})
    .pipe(gulp.dest(directories.build));
});

gulp.task('build:index', function() {
  return gulp.src([directories.src + '/index.html'], {base: directories.src})
    .pipe(gulp.dest(directories.build));
});

gulp.task('build:watch', function() {
  gulp.watch(directories.src + '/**/*.js', ['build:js']);
  gulp.watch(directories.src + '/**/*.html', ['build:html']);
  gulp.watch(directories.src + '/**/*.scss', ['build:css']);
  gulp.watch(directories.src + '/**/*.png', ['build:images']);
});
