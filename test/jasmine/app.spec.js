describe("AppController", function() {
  var $controller;
  var $rootScope;
  var $httpBackend;
  var $location;
  var $q;

  disableModuleRun('womply');

  beforeEach(module('womply'));

  setApiPathLocal();

  beforeEach(inject(function($injector){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = $injector.get('$controller');
    $rootScope = $injector.get('$rootScope');
    $httpBackend = $injector.get('$httpBackend');
    $location = $injector.get('$location');
    $q = $injector.get('$q');
  }));

  beforeEach(inject(function(ConfigLoader, Context, MixPanelService) {
    var defer = $q.defer();
    defer.resolve({
      UserMenuLinks: 'userMenuLinks',
      ApplicationId: 'applicationId',
      NavigationLinks: 'navigationLinks',
      NavigationSelected: 'navigationSelected',
      LocationChanged: 'locationChanged'
    });

    spyOn(ConfigLoader, 'initialize').and.returnValue(defer.promise);

    var slug = $q.defer();
    slug.resolve({
      id: 1,
      slug: '1111',
      partner_slug: 'partner'
    });
    spyOn(Context, 'getCurrentMerchantLocation').and.returnValue(slug.promise);

    var locations = $q.defer();
    locations.resolve([
      {
        id: 1,
        slug: '1111',
        partner_slug: 'partner'
      }
    ]);
    spyOn(Context, 'getMerchantLocations').and.returnValue(locations.promise);

    spyOn(Context, 'getCurrentMerchantSlug').and.returnValue('1111');

    spyOn(MixPanelService, 'initialize').and.returnValue();
  }));


  it('initializes config loader', inject(function(Context) {
    spyOn(Context, 'initialize').and.returnValue();
    var controller = $controller('AppController');
    $rootScope.$digest();

    expect(controller.applicationId).toEqual('applicationId');
    expect(controller.userMenuLinks).toEqual('userMenuLinks');
    expect(controller.navigationLinks).toEqual('navigationLinks');
    expect(controller.navigationSelected).toEqual('navigationSelected');
    expect(controller.locationChanged).toEqual('locationChanged')
  }));

  it('initializes the merchant slug', inject(function($httpBackend) {
    $httpBackend.expectGET('http://local.womply.com:3000/api/0.1/initialize?id=undefined').respond({data: {merchant_locations: [
      {
        slug: '1111'
      }
    ]}});
    var controller = $controller('AppController');
    $rootScope.$digest();
    $httpBackend.flush();

    expect(controller.slug).toEqual('1111');
  }));

  it('initializes the body id', inject(function($document) {
    $httpBackend.expectGET('http://local.womply.com:3000/api/0.1/initialize?id=undefined').respond({data: {merchant_locations: [
      {
        slug: '1111',
        partner_slug: 'partner'
      }
    ]}});

    var controller = $controller('AppController');
    $rootScope.$digest();
    $httpBackend.flush();

    expect($document[0].body.id).toEqual('partner');
  }));

  it('initializes the title', inject(function($document) {
    $httpBackend.expectGET('http://local.womply.com:3000/api/0.1/initialize?id=undefined').respond({data: {merchant_locations: [
      {
        slug: '1111',
        partner_slug: 'partner',
        partner_name: 'Partner',
        product_name: 'template',
        name: 'myLocation'
      }
    ]}});

    var controller = $controller('AppController');
    $rootScope.$digest();
    $httpBackend.flush();

    expect($document[0].title).toEqual('Partner template - myLocation');
  }));

  it('initializes mix panel', inject(function(MixPanelService) {
    $httpBackend.expectGET('http://local.womply.com:3000/api/0.1/initialize?id=undefined').respond({data: {merchant_locations: [
      {
        slug: '1111',
        partner_slug: 'partner',
        partner_name: 'Partner',
        product_name: 'template',
        name: 'myLocation'
      }
    ],
      mixpanel_token: '1234'
    }});

    var controller = $controller('AppController');
    $rootScope.$digest();
    $httpBackend.flush();

    expect(MixPanelService.initialize).toHaveBeenCalledWith('1234');
  }));

  describe('authentication redirect', function() {
    it('redirects to insights for 401', inject(function($window, $http, $httpBackend, Environment) {
      $httpBackend.expectGET('/test').respond(401);

      spyOn($window.location, 'replace').and.returnValue();

      spyOn(Environment, 'getInsightsPath').and.returnValue('http://insights');

      $http.get('/test');
      $httpBackend.flush();
      expect($window.location.replace).toHaveBeenCalledWith('http://insights');
    }));

    it('does not redirect to insights', inject(function($window, $http, $httpBackend, Environment) {
      $httpBackend.expectGET('/test').respond(200);

      spyOn($window.location, 'replace').and.returnValue();

      spyOn(Environment, 'getInsightsPath').and.returnValue('http://insights');

      $http.get('/test');
      $httpBackend.flush();

      expect($window.location.replace).not.toHaveBeenCalled();
    }));

    it('does not redirect to insights for other errors', inject(function($window, $http, $httpBackend, Environment) {
      $httpBackend.expectGET('/test').respond(503);

      spyOn($window.location, 'replace').and.returnValue();

      spyOn(Environment, 'getInsightsPath').and.returnValue('http://insights');

      $http.get('/test');
      $httpBackend.flush();

      expect($window.location.replace).not.toHaveBeenCalled();
    }));

  });
});
