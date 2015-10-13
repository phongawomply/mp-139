describe('Context', function() {
  var service;

  disableModuleRun('womply');
  beforeEach(module('womply'));

  var merchantLocations = [{id: 1, slug:'x', partner_slug:'x'}, {id: 5, slug: 'y', partner_slug: 'y'}];
  var user = {id: 1};
  var token = '123456';
  var rootScope, httpBackend, q, location;
  beforeEach(inject(function($rootScope, $q, $httpBackend, $location, Context, Environment) {
    service = Context;
    rootScope = $rootScope;
    httpBackend = $httpBackend;
    q = $q;
    location = $location;

    spyOn(Environment, 'getApiPath').and.returnValue('http://local.womply.com:3000/api/0.1');
  }));

  it('initializes', function() {

    //Mock the initialize http call
    httpBackend.expectGET('http://local.womply.com:3000/api/0.1/initialize?id=1').respond({
      data: {
        merchant_locations: merchantLocations,
        user: user
      }
    });

    location.path('/1');
    rootScope.$digest();

    httpBackend.flush();

    httpBackend.verifyNoOutstandingRequest();

  });

  it('does not initialize when location does not exist', inject(function(Environment, $window) {

    spyOn($window.location, 'replace').and.returnValue();
    spyOn(Environment, 'getInsightsPath').and.returnValue('/hello');

    //Mock the initialize http call
    httpBackend.expectGET('http://local.womply.com:3000/api/0.1/initialize?id=2').respond({
      data: {
        merchant_locations: merchantLocations,
        user: user
      }
    });

    location.path('/2');
    rootScope.$digest();

    httpBackend.flush();

    expect($window.location.replace).toHaveBeenCalledWith('/hello');
  }));

  it('gets merchant locations', function() {
    //Mock the initialize http call
    httpBackend.expectGET('http://local.womply.com:3000/api/0.1/initialize?id=1').respond({
      data: {
        merchant_locations: merchantLocations,
        user: user
      }
    });

    location.path('/1');
    httpBackend.flush();
    rootScope.$digest();

    var spy = jasmine.createSpy('locations');
    service.getMerchantLocations().then(spy);
    rootScope.$digest();

    expect(spy).toHaveBeenCalledWith(merchantLocations);
  });

  it('gets user', function() {
    //Mock the initialize http call
    httpBackend.expectGET('http://local.womply.com:3000/api/0.1/initialize?id=1').respond({
      data: {
        merchant_locations: merchantLocations,
        user: user
      }
    });

    location.path('/1');
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

      location.path('/1');
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

    it('finds the merchant location by id', inject(function($httpBackend) {
      $httpBackend.expectGET('http://local.womply.com:3000/api/0.1/initialize?id=1').respond({
        data: {
          merchant_locations: merchantLocations,
          user: user
        }
      });

      location.path('/1');
      rootScope.$broadcast('$locationChangeStart');
      $httpBackend.flush();
      rootScope.$digest();

      var spy = jasmine.createSpy();
      service.findMerchantLocation(5).then(spy);

      rootScope.$digest();

      expect(spy).toHaveBeenCalledWith(merchantLocations[1]);

    }));

    it('finds the merchant location by slug', inject(function($httpBackend) {
      $httpBackend.expectGET('http://local.womply.com:3000/api/0.1/initialize?id=1').respond({
        data: {
          merchant_locations: merchantLocations,
          user: user
        }
      });

      location.path('/1');
      rootScope.$broadcast('$locationChangeStart');
      $httpBackend.flush();
      rootScope.$digest();

      var spy = jasmine.createSpy();
      service.findMerchantLocation('y').then(spy);

      rootScope.$digest();

      expect(spy).toHaveBeenCalledWith(merchantLocations[1]);

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

    describe('callback', function() {
      it('executes on initialized', inject(function($httpBackend) {
        var spy = jasmine.createSpy('initialized');
        var multiSpy = jasmine.createSpy();
        $httpBackend.expectGET('http://local.womply.com:3000/api/0.1/initialize?id=1').respond({
          data: {
            mixpanel_token: token,
            merchant_locations: merchantLocations,
            user: user
          }
        });

        service.initialized(spy);
        service.initialized(multiSpy);

        location.path('/1');
        $httpBackend.flush();
        rootScope.$digest();

        expect(spy).toHaveBeenCalledWith({
          mixpanel_token: token,
          merchant_locations: merchantLocations,
          user: user
        });
        expect(multiSpy).toHaveBeenCalled();
      }));

      it('executes if initialized', inject(function($httpBackend) {
        var spy = jasmine.createSpy('initialized');
        var multiSpy = jasmine.createSpy();
        $httpBackend.expectGET('http://local.womply.com:3000/api/0.1/initialize?id=1').respond({
          data: {
            mixpanel_token: token,
            merchant_locations: merchantLocations,
            user: user
          }
        });

        location.path('/1');
        $httpBackend.flush();
        rootScope.$digest();

        service.initialized(spy);
        service.initialized(multiSpy);

        rootScope.$digest();

        expect(spy).toHaveBeenCalledWith({
          mixpanel_token: token,
          merchant_locations: merchantLocations,
          user: user
        });
        expect(multiSpy).toHaveBeenCalled();
      }));
    });
  });
});