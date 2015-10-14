describe('Environment', function() {
  disableModuleRun('womply');

  beforeEach(module('womply'));

  var service, q, rootScope;
  beforeEach(inject(function($q, $rootScope, Environment) {
    service = Environment;
    q = $q;
    rootScope = $rootScope;
  }));

  describe('getApiPath', function() {
    it('gets the development api path', inject(function($location, ConfigLoader) {
      var defer = q.defer();
      defer.resolve({});
      spyOn(ConfigLoader, 'initialize').and.returnValue(defer.promise);

      spyOn($location, 'host').and.returnValue('localhost');

      var apiPath = service.getApiPath();
      rootScope.$digest();

      expect(apiPath).toEqual('http://local.womply.com:3000/api/0.1');
    }));

    it('gets the production api path', inject(function($injector, $location, ConfigLoader) {
      var iGet = $injector.get;

      spyOn($injector, 'get').and.callFake(function(param) {
        if (param == 'EnvConfig') {
          return {
          };
        } else {
          return iGet(param);
        }
      });

      var defer = q.defer();
      defer.resolve({});
      spyOn(ConfigLoader, 'initialize').and.returnValue(defer.promise);

      spyOn($location, 'host').and.returnValue('hello');
      spyOn($location, 'port').and.returnValue('');

      rootScope.$digest();

      expect(service.getApiPath()).toEqual('http://hello/api/0.1');
    }));

    describe('config', function() {
      it('gets the default production api path from the config', inject(function($injector) {

        spyOn($injector, 'has').and.returnValue(true);
        var iGet = $injector.get;

        spyOn($injector, 'get').and.callFake(function(param) {
          if (param == 'EnvConfig') {
            return {
              API: {
                default: {
                  host: '/hello/world',
                  path: '/api/2'
                }
              }
            };
          } else {
            return iGet(param);
          }
        });

        expect(service.getApiPath()).toEqual('/hello/world/api/2');
      }));

      it('gets the named production api path from the config', inject(function($injector) {

        spyOn($injector, 'has').and.returnValue(true);
        var iGet = $injector.get;

        spyOn($injector, 'get').and.callFake(function(param) {
          if (param == 'EnvConfig') {
            return {
              API: {
                default: {
                  host: '/hello/world',
                  path: '/api/2'
                },
                talk: {
                  host: 'talk.to.me',
                  path: '/say/something'
                }
              }
            };
          } else {
            return iGet(param);
          }
        });

        expect(service.getApiPath().for.talk()).toEqual('talk.to.me/say/something');
      }));
    });

  });

  describe('getInsightsPath', function() {
    it('gets the develop api path', inject(function($rootScope, $location) {
      spyOn($location, 'host').and.returnValue('localhost');

      expect(service.getInsightsPath()).toEqual('http://local.womply.com:5000');
    }));

    it('gets the production insights path', inject(function($rootScope, $location) {
     spyOn($location, 'host').and.returnValue('hello');
      spyOn($location, 'port').and.returnValue('');

      expect(service.getInsightsPath()).toEqual('http://hello');
    }));

    it('gets the url from override', inject(function($injector) {
      spyOn($injector, 'has').and.returnValue(true);
      var iGet = $injector.get;

      spyOn($injector, 'get').and.callFake(function(param) {
        if (param == 'EnvConfig') {
          return {
            InsightsBase: 'http://mybase.com'
          };
        } else {
          return iGet(param);
        }
      });
      expect(service.getInsightsPath()).toEqual('http://mybase.com');
    }));
  });
});