module.exports = function(config) {
  config.set({
    basePath: '../../',
    frameworks: ['jasmine'],
    files: [
      'build/lib/angular.min.js',
      'build/lib/angular-material.min.js',
      'build/lib/angular-route.min.js',
      'build/lib/global-components-ui.js',
      'build/lib/underscore-min.js',
      'app/*.module.js',
      'app/*.js',
      'app/**/*.js',
      'test/lib/angular-mocks.js',
      'test/jasmine/**/*spec.js'
    ],
    exclude: [
    ],
    preprocessors: {},
    reporters: ['dots'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['PhantomJS'],
    singleRun: false
  });
};
