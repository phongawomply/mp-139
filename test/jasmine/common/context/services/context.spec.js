describe('Context', function() {
  var service;

  disableModuleRun('womply');
  beforeEach(module('womply'));

  var merchantLocations = [{id: 1, slug:'x', partner_slug:'x'}];
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

  describe('initialize', function() {
    beforeEach(function() {
      rootScope.$on('$routeChangeStart', function(evt) {
        evt.preventDefault();
      });
    });

    it('gets the current merchant slug', inject(function($httpBackend, $location) {
      $httpBackend.expectGET('http://local.womply.com:3000/api/0.1/initialize?id=1111').respond(200);

      $location.path('/1111');
      rootScope.$broadcast('$locationChangeStart');
      rootScope.$digest();

      expect(service.getCurrentMerchantSlug()).toEqual('1111');
    }));

    it('gets the current merchant location by id', inject(function($httpBackend, $location) {
      $httpBackend.expectGET('http://local.womply.com:3000/api/0.1/initialize?id=1').respond({
        data: {
          merchant_locations: merchantLocations,
          user: user
        }
      });

      $location.path('/1');
      rootScope.$broadcast('$locationChangeStart');
      $httpBackend.flush();
      rootScope.$digest();

      var spy = jasmine.createSpy();
      service.getCurrentMerchantLocation().then(spy);

      rootScope.$digest();
      expect(spy).toHaveBeenCalledWith(merchantLocations[0]);
    }));

    it('gets the current merchant location by slug', inject(function($httpBackend, $location) {
      $httpBackend.expectGET('http://local.womply.com:3000/api/0.1/initialize?id=x').respond({
        data: {
          merchant_locations: merchantLocations,
          user: user
        }
      });

      $location.path('/x');
      rootScope.$broadcast('$locationChangeStart');
      $httpBackend.flush();
      rootScope.$digest();

      var spy = jasmine.createSpy();
      service.getCurrentMerchantLocation().then(spy);

      rootScope.$digest();
      expect(spy).toHaveBeenCalledWith(merchantLocations[0]);
    }));

    it('calls initialize when slug changes', inject(function($httpBackend, $location) {
      $httpBackend.expectGET('http://local.womply.com:3000/api/0.1/initialize?id=1111').respond(200);

      $location.path('/1111');
      rootScope.$broadcast('$locationChangeStart');
      rootScope.$digest();

      $httpBackend.expectGET('http://local.womply.com:3000/api/0.1/initialize?id=2222').respond(200);
      $location.path('/2222');
      rootScope.$broadcast('$locationChangeStart');
      rootScope.$digest();

      $httpBackend.verifyNoOutstandingExpectation();
    }));

    it('executes callback on initialized', inject(function($httpBackend) {
      var spy = jasmine.createSpy('initialized');
      var multiSpy = jasmine.createSpy();
      $httpBackend.expectGET('http://local.womply.com:3000/api/0.1/initialize?id=undefined').respond({
        data: {
          merchant_locations: merchantLocations,
          user: user
        }
      });

      service.initialized(spy);
      service.initialized(multiSpy);

      service.initialize();
      $httpBackend.flush();
      rootScope.$digest();

      expect(spy).toHaveBeenCalledWith({
        merchant_locations: merchantLocations,
        user: user
      });
      expect(multiSpy).toHaveBeenCalled();
    }));
  });
});