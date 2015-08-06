describe('Service: ConfigLoader', function() {

  var appConfig = {
    message: 'hello world'
  };

  angular.module('womply.mock', [])
    .factory('AppConfig', function() {
      return appConfig;
    });

  disableModuleRun('womply');
  beforeEach(module('womply'));
  beforeEach(module('womply.mock'));

  var service = null;
  beforeEach(inject(function($httpBackend, ConfigLoader) {
    service = ConfigLoader;
  }));

  it('throws an error if AppConfig service not defined', inject(function($injector) {

    spyOn($injector, 'has').and.returnValue(false);

    expect(function() {
      service.initialize();
    }).toThrowError('AppConfig service must exist.');
  }));

  it('returns gets the configuration', inject(function($rootScope) {
    var spy = jasmine.createSpy('ConfigResolve');

    service.initialize().then(spy);
    $rootScope.$digest();

    expect(spy).toHaveBeenCalledWith(appConfig);
  }));
});