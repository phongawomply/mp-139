var gulp        = require('gulp');
var concat      = require('gulp-concat');
var directories = require('./directories.js');
var ApiMock     = require('api-mock');
var vinyl_paths = require('vinyl-paths');
var del         = require('del');
var protagonist = require('protagonist');
var fs          = require('fs');
var _           = require('underscore');
var express     = require('express');
var colors      = require('colors');
var util        = require('util');
var config      = require('./_config.js');
var bpOverrides = require('./blueprints-overrides.js');

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
  return gulp.src([
    directories.blueprint + '/**/*.override.md',
    directories.blueprint + '/**/*.md',
    '!' + directories.blueprint + '/blueprint.concat.md',
    '!' + directories.blueprint + '/readme.md'])
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

    // Express matching currently does not function as expected, temporarily removing this.
    // server.all('*', function(req, res, next) {
    //   if (req.query != {}) {
    //     req.url = req.originalUrl.replace('?', '!');
    //   }
    //   next();
    // });

    server.all('*', function(req, res, next) {
      if (!req.get('Origin')) return next();
      res.set('Access-Control-Allow-Origin', 'http://local.womply.com:' + config.server_port);
      res.set('Access-Control-Allow-Methods', 'GET, POST');
      res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
      res.set('Access-Control-Allow-Credentials', 'true');
      if ('OPTIONS' == req.method) return res.send(200);
      next();
    });

    // Execute all overrides in the optional blueprints-overrides.js file
    for(var i=0; i<bpOverrides.length; i++) {
      bpOverrides[i](server);
    }

    var pad = function(value, len) {
      var p = ' ';
      return value + Array(len + 1 - value.length).join(p);
    };

    _.each(resources, function(resource) {
      _.each(resource.actions, function(action) {
        var fn = server[action.method.toLowerCase()];
        util.log(pad('[' + action.method + ']', 10).green + ' ' + resource.uri);
        // Express does not match correctly
        // fn.call(server, resource.uri.replace('?', '!'), handler(action));
        fn.call(server, resource.uri, handler(action));
      });
    });

    server.listen(3000);
  } catch (e) {
    console.log(e);
  }
});
