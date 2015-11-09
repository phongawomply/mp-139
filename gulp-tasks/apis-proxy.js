var gulp = require('gulp');
var express = require('express');
var proxy = require('express-http-proxy');
var util = require('util');
var url = require('url');

// Configures the requests to proxy.  These should match the paths in env_config.js
var apiServers = [
  {
    apiPath: '/api/0.1/*',
    apiHost: 'local.womply.com:3001'
  }
];

gulp.task('apis-proxy', function() {
  try {
    var server = express();
    server.listen(3000);
    apiServers.forEach(function(s) {
      server.use(s.apiPath, proxy(s.apiHost, {
        forwardPath: function(req) {
          return url.parse(req.originalUrl).path;
        }
      }));
      util.log("Proxy ".green + s.apiPath + " to " + s.apiHost);
    });
  }catch(e) {
    console.log(e);
  }
});
