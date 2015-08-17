module.exports = function(config) {
  config.set({
    basePath: '../../',
    frameworks: ['jasmine'],
    files: [
      'build/lib/angular.min.js',
      'build/lib/angular-material.min.js',
      'build/lib/angular-route.min.js',
      'build/lib/angular-aria.min.js',
      'build/lib/angular-animate.min.js',
      'build/lib/global-components-ui.js',
      'build/lib/underscore-min.js',
      'build/html/**/*.html',
      'app/*.module.js',
      'app/*.js',
      'app/**/*.js',
      'test/jasmine/disable_module_run.js',
      'test/lib/angular-mocks.js',
      'test/jasmine/**/*spec.js'
    ],
    exclude: [
    ],
    preprocessors: {
      'build/html/**/*.html': 'ng-html2js',
      'app/**/*.js'         : 'coverage'
    },
    ngHtml2JsPreprocessor: {
      moduleName: 'templates',
      stripPrefix: 'build'
    },
    coverageReporter: {
      type: 'lcov',
      dir:  'coverage/',
      subdir: '.'
    },
    reporters: ['dots', 'coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['PhantomJS'],
    singleRun: true
  });
};
