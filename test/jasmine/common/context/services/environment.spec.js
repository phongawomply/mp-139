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

      var spy = jasmine.createSpy('api');
      service.getApiPath().then(spy);
      rootScope.$digest();

      expect(spy).toHaveBeenCalledWith('http://local.womply.com:3000/api/0.1');
    }));

    it('gets the production api path from the config', inject(function($location, ConfigLoader) {
      var defer = q.defer();
      defer.resolve({
        ApiBase: '/hello/world',
        ApiPath: '/api/2'
      });
      spyOn(ConfigLoader, 'initialize').and.returnValue(defer.promise);

      var spy = jasmine.createSpy('api');
      service.getApiPath().then(spy);
      rootScope.$digest();

      expect(spy).toHaveBeenCalledWith('/hello/world/api/2');
    }));

    it('gets the production api path', inject(function($location, ConfigLoader) {
      var defer = q.defer();
      defer.resolve({});
      spyOn(ConfigLoader, 'initialize').and.returnValue(defer.promise);

      spyOn($location, 'host').and.returnValue('hello');
      spyOn($location, 'port').and.returnValue('');

      var spy = jasmine.createSpy('api');
      service.getApiPath().then(spy);
      rootScope.$digest();

      expect(spy).toHaveBeenCalledWith('http://hello/api/0.1');
    }));
  });

  describe('getInsightsPath', function() {
    it('gets the develop api path', inject(function($location, ConfigLoader) {
      var defer = q.defer();
      defer.resolve({});
      spyOn(ConfigLoader, 'initialize').and.returnValue(defer.promise);

      spyOn($location, 'host').and.returnValue('localhost');

      expect(service.getInsightsPath()).toEqual('http://local.womply.com:5000');
    }));

    it('gets the production insights path', inject(function($location, ConfigLoader) {
      var defer = q.defer();
      defer.resolve({});
      spyOn(ConfigLoader, 'initialize').and.returnValue(defer.promise);

      expect(service.getInsightsPath()).toEqual('http://womply.com');
    }));
  });
});