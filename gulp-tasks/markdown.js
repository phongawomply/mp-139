var gulp = require('gulp');
var markdown = require('gulp-markdown');
var fs = require('fs');
var path = require('path');
var del = require('del');
var concat = require('gulp-concat-util');
var merge = require('merge-stream');
var directories = require('./directories.js');

function getFolders(dir) {
  return fs.readdirSync(dir)
    .filter(function(file) {
      return fs.statSync(path.join(dir, file)).isDirectory();
    });
}

var folders = getFolders(directories.pages);

gulp.task('markdown', function() {
  var map = folders.map(function(folder) {
    return gulp.src(path.join(directories.pages, folder, folder + '.md'))
      .pipe(markdown())
      .pipe(concat.header('<div class="markdown">\n'))
      .pipe(concat.footer('\n</div>'))
      .pipe(gulp.dest(path.join(directories.html, 'components/pages', folder, folder + '.md')));
  });

  return merge(map);
});

gulp.task('concat:markdown', ['markdown'], function() {
  var map = folders.map(function(folder) {
    return gulp.src([path.join(directories.html, 'components/pages', folder, folder + '.html'), path.join(directories.html, 'components/pages', folder, folder + '.md', folder + '.html')])
      .pipe(concat(folder + '.html'))
      .pipe(gulp.dest(path.join(directories.html, 'components/pages', folder)));
  });

  return merge(map);
});

gulp.task('build:markdown', ['concat:markdown'], function() {
  return del(path.join(directories.html, 'components/pages/**/*.md'))
});