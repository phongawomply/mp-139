describe('EnvConfig', function() {
  disableModuleRun('womply');

  beforeEach(module('womply'));
  beforeEach(module(function($provide) {
    $provide.factory('$location', function() {
      return {
        host: jasmine.createSpy().and.returnValue('app2.tsys.testing.com'),
        protocol: jasmine.createSpy().and.returnValue('http')
      }
    });
  }));

  var config;
  beforeEach(inject(function(EnvConfig) {
    config = EnvConfig;
  }));

  it('configures the api default host', function() {
    expect(config.API.default.host).toEqual('http://tsys.testing.com');
  });
});
