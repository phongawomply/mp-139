var gulp        = require('gulp'),
  concat      = require('gulp-concat'),
  directories = require('./directories.js'),
  ApiMock     = require('api-mock'),
  vinyl_paths = require('vinyl-paths'),
  del         = require('del'),
  protagonist = require('protagonist'),
  fs          = require('fs'),
  _           = require('underscore'),
  express     = require('express'),
  colors      = require('colors'),
  util        = require('util'),
  config      = require('./_config.js');

/**
 * Remove the old blueprints concatenated file
 */
gulp.task('clean:blueprint', function() {
  return gulp.src(directories.blueprint + '/blueprint.concat.md')
    .pipe(vinyl_paths(del));
});
/**
 * Concat the blueprints files together
 **/
gulp.task('concat:blueprint', ['clean:blueprint'], function() {
  return gulp.src([directories.blueprint + '/**/*.md', '!' + directories.blueprint + '/blueprint.concat.md', '!' + directories.blueprint + '/readme.md'])
    .pipe(concat('blueprint.concat.md'))
    .pipe(gulp.dest(directories.blueprint));
});
/**
 * Serve the blueprints
 */
gulp.task('blueprints', ['concat:blueprint'], function() {
  var processResource = function(resource) {
    var path = resource.uriTemplate.split('{?')[0].replace(new RegExp("}", "g"), "").replace(new RegExp("{", "g"), ":");

    var res = {
      uri: path,
      actions: []
    };

    _.each(resource.actions, function(action) {
      var act = {
        method: action.method,
        headers: [],
        response: '',
        status: 200
      };

      if (!_.isEmpty(action.examples)) {
        act.response = action.examples[0].responses[0].body;
        act.headers = action.examples[0].responses[0].headers;
        act.status = action.examples[0].responses[0].name || act.status;
      }

      res.actions.push(act);
    });

    return res;
  };

  var processGroup = function(group) {
    var actions = [];
    _.each(group.resources, function(resource) {
      actions = actions.concat(processResource(resource));
    });

    return actions;
  };

  var processResourceGroups = function(groups) {
    var actions = [];
    _.each(groups, function(group) {
      actions = actions.concat(processGroup(group));
    });

    return actions
  };

  var handler = function(action) {
    return function(req, res) {
      _.each(action.headers, function(header) {
        res.set(header.name, header.value);
      });

      res.status(action.status).send(action.response);
    };
  };

  try {
    var data = fs.readFileSync(directories.blueprint + '/blueprint.concat.md', 'utf8');

    var processed = protagonist.parseSync(data, {type: 'ast'});

    var resources = processResourceGroups(processed.ast.resourceGroups);

    var server = express();

    server.all('*', function(req, res, next) {
      if (!req.get('Origin')) return next();
      res.set('Access-Control-Allow-Origin', 'http://local.womply.com:' + config.server_port);
      res.set('Access-Control-Allow-Methods', 'GET, POST');
      res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
      res.set('Access-Control-Allow-Credentials', 'true');
      if ('OPTIONS' == req.method) return res.send(200);

      //Only works for Irish Channel Slug/ID
      if(req.params[0].split('/')[4] === '250') {
        res.json({data: null});
      } else {
        // Uncomment this to test slow loading
        setTimeout(function() {
          next();
        }, 1000)
        //next();
      }
    });

    var pad = function(value, len) {
      var p = ' ';
      return value + Array(len + 1 - value.length).join(p);
    };

    _.each(resources, function(resource) {
      _.each(resource.actions, function(action) {
        var fn = server[action.method.toLowerCase()];
        util.log(pad('[' + action.method + ']', 10).green + ' ' + resource.uri);
        fn.call(server, resource.uri, handler(action));
      });
    });

    server.listen(3000);
  } catch (e) {
    console.log(e);
  }
});