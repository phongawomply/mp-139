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
    it('gets the develop api path', inject(function($rootScope, $location, ConfigLoader) {
      spyOn($location, 'host').and.returnValue('localhost');

      expect(service.getInsightsPath()).toEqual('http://local.womply.com:5000');
    }));

    it('gets the production insights path', inject(function($rootScope, $location, ConfigLoader) {
     spyOn($location, 'host').and.returnValue('hello');
      spyOn($location, 'port').and.returnValue('');

      expect(service.getInsightsPath()).toEqual('http://hello');
    }));

    it('gets the url from passed in param', inject(function($rootScope, ConfigLoader) {
      expect(service.getInsightsPath('http://mybase.com')).toEqual('http://mybase.com');
    }));
  });
});