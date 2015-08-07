var gulp        = require('gulp'),
    express     = require('express'),
    livereload  = require('connect-livereload'),
    directories = require('./directories.js'),
    config      = require('./_config.js'),
    ApiMock     = require('api-mock');

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

gulp.task('serve:blueprints', function () {
  var mockServer = new ApiMock ( {
    blueprintPath: 'test/blueprints/exampleAPI.md',
    options: {
      'port': 3000,
      'cors-disable': true
    }
  });
  mockServer.app.all('*', function(req, res, next){
    if (!req.get('Origin')) return next();
    res.set('Access-Control-Allow-Origin', 'http://localhost:9999');
    res.set('Access-Control-Allow-Methods', 'GET, POST');
    res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    res.set('Access-Control-Allow-Credentials', 'true');
    if ('OPTIONS' == req.method) return res.send(200);
    next();
  });

  mockServer.run();

});
