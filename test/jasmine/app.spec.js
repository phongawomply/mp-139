describe("AppController", function() {
  var $controller;
  var $rootScope;
  var $httpBackend;
  var $location;
  var $q;

  setup();

  beforeEach(inject(function($injector){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = $injector.get('$controller');
    $rootScope = $injector.get('$rootScope');
    $httpBackend = $injector.get('$httpBackend');
    $location = $injector.get('$location');
    $q = $injector.get('$q');
  }));

  mock.context();

  beforeEach(inject(function($q, ConfigLoader, Context, ContextModel, MixPanelService) {
    var defer = $q.defer();
    defer.resolve({
      UserMenuLinks: 'userMenuLinks',
      ApplicationId: 'applicationId',
      NavigationLinks: 'navigationLinks',
      NavigationSelected: 'navigationSelected',
      LocationChanged: 'locationChanged'
    });

    spyOn(ConfigLoader, 'initialize').and.returnValue(defer.promise);

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

  it('initializes the title', inject(function($document, Context) {
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

    initialize();

    expect($document[0].title).toEqual('Womply Insights - The Ugly Mug TEST');
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

    initialize();

    expect(MixPanelService.initialize).toHaveBeenCalledWith('a5a297cbb4f0ba1d02ae09c33e5e5053', { 'Merchant name': 'The Ugly Mug TEST - 723 8th St SE, Washington, DC', Brand: 'Womply', 'Visit type': 'Return visit' });
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
