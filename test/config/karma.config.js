module.exports = function(config) {
  config.set({
    basePath: '../../',
    frameworks: ['jasmine'],
    files: [
      'build/lib/angular.min.js',
      'build/lib/angular-messages.min.js',
      'build/lib/angular-material.min.js',
      'build/lib/angular-route.min.js',
      'build/lib/angular-aria.min.js',
      'build/lib/angular-animate.min.js',
      'build/lib/underscore-min.js',
      'build/lib/moment.min.js',
      'build/lib/bowser.min.js',
      'build/lib/gmd-nav.min.js',
      'build/lib/womply-common.min.js',
      'build/html/**/*.html',
      'test/jasmine/helpers/**/*.js',
      'test/jasmine/mocks/**/*.js',
      'app/*.module.js',
      'app/*.js',
      'app/**/*.js',
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
      stripPrefix: 'build/'
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
