var gulp        = require('gulp'),
    express     = require('express'),
    livereload  = require('connect-livereload'),
    directories = require('./directories.js'),
    config      = require('./_config.js');

gulp.task('web-server', function() {
  var server = express();

  server.use(express.static(directories.build));
  server.listen(config.server_port);

  console.log('http://localhost:' + config.server_port);

  server.all('/*', function(req, resp) {
    resp.sendFile('html/index.html', {root: directories.build});
  });
});

gulp.task('web-server:livereload', function() {
  var server = express();

  server.use(livereload({port: config.livereload_port}));
  server.use(express.static(directories.build));
  server.listen(config.server_port);

  console.log('http://localhost:' + config.server_port);

  server.all('/*', function(req, resp) {
    resp.sendFile('html/index.html', {root: directories.build});
  });
});
