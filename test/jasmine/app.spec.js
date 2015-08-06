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
    slug.resolve('1111');
    spyOn(Context, 'getCurrentMerchantLocation').and.returnValue(slug.promise);

    var locations = $q.defer();
    locations.resolve([
      {
        slug: '1111',
        partner_slug: 'partner'
      }
    ]);
    spyOn(Context, 'getMerchantLocations').and.returnValue(locations.promise);
  }));


  it('initializes config loader', inject(function() {
    var controller = $controller('AppController');
    $rootScope.$digest();

    expect(controller.applicationId).toEqual('applicationId');
    expect(controller.userMenuLinks).toEqual('userMenuLinks');
    expect(controller.navigationLinks).toEqual('navigationLinks');
    expect(controller.navigationSelected).toEqual('navigationSelected');
  }));

  it('initializes the merchant slug', inject(function(Context) {
    var controller = $controller('AppController');
    $rootScope.$digest();

    expect(controller.slug).toEqual('1111');
  }));

  it('initializes the body id', inject(function($document) {
    var controller = $controller('AppController');
    $rootScope.$digest();

    expect($document[0].body.id).toEqual('partner');
  }));


});
