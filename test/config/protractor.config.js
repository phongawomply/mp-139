exports.config = {
  framework: 'jasmine2',
  baseUrl: 'http://local.womply.com:9999',
  seleniumServerJar: '../../node_modules/protractor/selenium/selenium-server-standalone-2.45.0.jar',
  // seleniumAddress: 'http://localhost:4444/wd/hub',
  // Comment out 2 browsers to speed up testing
  multiCapabilities: [
    { 'browserName': 'chrome' },
    //{ 'browserName': 'firefox' }
    //{ 'browserName': 'safari' } //Please note that Safari driver doesn't currently run the tests properly.
  ],

  maxSessions: 1,

  specs: ['../protractor/**/*spec.js'],

  jasmineNodeOpts: {
    showColors: true
  }
};
