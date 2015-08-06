describe('Context', function() {
  var service;

  disableModuleRun('womply');
  beforeEach(module('womply'));

  var merchantLocations = [{slug:'x', partner_slug:'x'}];
  var user = {id: 1};
  var rootScope, httpBackend, q;
  beforeEach(inject(function($rootScope, $q, $httpBackend, Context, Environment) {
    service = Context;
    rootScope = $rootScope;
    httpBackend = $httpBackend;
    q = $q;

    var defer = $q.defer();
    defer.resolve('http://local.womply.com:3000/api/0.1');
    spyOn(Environment, 'getApiPath').and.returnValue(defer.promise);
  }));

  it('initializes', function() {

    //Mock the initialize http call
    httpBackend.expectGET('http://local.womply.com:3000/api/0.1/initialize?id=undefined').respond({
      data: {
        merchant_locations: merchantLocations,
        user: user
      }
    });

    service.initialize();
    rootScope.$digest();

    httpBackend.flush();

    httpBackend.verifyNoOutstandingRequest();

  });

  it('gets merchant locations', function() {
    //Mock the initialize http call
    httpBackend.expectGET('http://local.womply.com:3000/api/0.1/initialize?id=undefined').respond({
      data: {
        merchant_locations: merchantLocations,
        user: user
      }
    });

    service.initialize();
    httpBackend.flush();
    rootScope.$digest();

    var spy = jasmine.createSpy('locations');
    service.getMerchantLocations().then(spy);
    rootScope.$digest();

    expect(spy).toHaveBeenCalledWith(merchantLocations);
  });

  it('gets user', function() {
    //Mock the initialize http call
    httpBackend.expectGET('http://local.womply.com:3000/api/0.1/initialize?id=undefined').respond({
      data: {
        merchant_locations: merchantLocations,
        user: user
      }
    });

    service.initialize();
    httpBackend.flush();
    rootScope.$digest();

    var spy = jasmine.createSpy('user');
    service.getUser().then(spy);
    rootScope.$digest();

    expect(spy).toHaveBeenCalledWith(user);
  });

  it('gets the current merchant slug', inject(function($location) {
    $location.path('/1111');
    rootScope.$broadcast('$locationChangeStart');
    rootScope.$digest();

    var spy = jasmine.createSpy('slug');
    service.getCurrentMerchantLocation().then(spy);
    rootScope.$digest();
    expect(spy).toHaveBeenCalledWith('1111');
  }));
});