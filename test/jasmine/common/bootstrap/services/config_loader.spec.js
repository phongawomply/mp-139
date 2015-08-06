describe('Service: ConfigLoader', function() {

  var appConfig = {
    message: 'hello world'
  };

  angular.module('womply.mock', [])
    .factory('AppConfig', function() {
      return appConfig;
    });

  beforeEach(module('womply'));
  beforeEach(module('womply.mock'));

  var service = null;
  beforeEach(inject(function($httpBackend, ConfigLoader) {
    service = ConfigLoader;

    //Mock the initialize http call
    $httpBackend.expectGET('http://local.womply.com:3000/api/0.1/initialize?id=197330').respond({
      data:{
        data: {
          merchant_locations:[{slug:'x', partner_slug:'x'}]
        }
      }
    });
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