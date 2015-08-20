describe("AppController", function() {
  var $controller;
  var $rootScope;
  var $httpBackend;
  var $location;
  var $q;

  disableModuleRun('womply');

  beforeEach(module('womply'));

  beforeEach(inject(function($injector){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = $injector.get('$controller');
    $rootScope = $injector.get('$rootScope');
    $httpBackend = $injector.get('$httpBackend');
    $location = $injector.get('$location');
    $q = $injector.get('$q');
  }));

  beforeEach(inject(function(ConfigLoader, Context) {
    var defer = $q.defer();
    defer.resolve({
      UserMenuLinks: 'userMenuLinks',
      ApplicationId: 'applicationId',
      NavigationLinks: 'navigationLinks',
      NavigationSelected: 'navigationSelected'
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
  }));


  it('initializes config loader', inject(function(Context) {
    spyOn(Context, 'initialize').and.returnValue();
    var controller = $controller('AppController');
    $rootScope.$digest();

    expect(controller.applicationId).toEqual('applicationId');
    expect(controller.userMenuLinks).toEqual('userMenuLinks');
    expect(controller.navigationLinks).toEqual('navigationLinks');
    expect(controller.navigationSelected).toEqual('navigationSelected');
  }));

  it('initializes the merchant slug', inject(function($httpBackend) {
    $httpBackend.expectGET('http://server:80/api/0.1/initialize?id=undefined').respond({data: {}});
    var controller = $controller('AppController');
    $rootScope.$digest();
    $httpBackend.flush();

    expect(controller.slug).toEqual('1111');
  }));

  it('initializes the body id', inject(function($document) {
    $httpBackend.expectGET('http://server:80/api/0.1/initialize?id=undefined').respond({data: {merchant_locations: [
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
    $httpBackend.expectGET('http://server:80/api/0.1/initialize?id=undefined').respond({data: {merchant_locations: [
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


});
