describe('TopBar', function() {
  beforeEach(module('templates'));
  disableModuleRun('womply');
  beforeEach(module('womply'));
  setApiPathLocal();

  var businessMenuRenderSpy = null;

  var locationMenuCallback = null;
  var renderLocationSpy = null;

  var userSetUsernameSpy = null;

  var applicationLauncherRenderSpy = null;
  beforeEach(function() {
    businessMenuRenderSpy = jasmine.createSpy();

    womply.ui.ListMenu = function() {
      this.render = businessMenuRenderSpy;
      this.updateTitle = userSetUsernameSpy;
    };

    renderLocationSpy = jasmine.createSpy();
    womply.ui.SelectMenu = function(params) {
      locationMenuCallback = params.changeCallback;

      this.render = renderLocationSpy;
    };

    userSetUsernameSpy = jasmine.createSpy();

    applicationLauncherRenderSpy = jasmine.createSpy();

    womply.ui.ApplicationLauncher = function() {
      this.render = applicationLauncherRenderSpy;
    };

  });

  var element, scope, rootScope;
  beforeEach(inject(function($rootScope, $compile, $q, Context) {
    rootScope = $rootScope;

    $rootScope.applicationId = 'appId';
    $rootScope.userMenuLinks = [
      {
        name: 'userMenu1',
        href: 'userMenu1href'
      }
    ];
    $rootScope.businessMenuLinks = [
      {
        name: 'businessMenu1',
        route: 'businessMenu1Route'
      }
    ];

    var defer = $q.defer();
    defer.resolve([
      {
        slug: 'test',
        partner_slug: 'slug'
      }
    ]);
    spyOn(Context, 'getMerchantLocations').and.returnValue(defer.promise);

    var userDefer = $q.defer();
    userDefer.resolve({
      name: 'bob'
    });
    spyOn(Context, 'getUser').and.returnValue(userDefer.promise);

    var ele = angular.element('<top-bar data-application-id="applicationId" data-user-menu-links="userMenuLinks" data-business-menu-links="businessMenuLinks"></top-bar>');
    element = $compile(ele)($rootScope.$new());
    $rootScope.$digest();
    scope = element.isolateScope();
  }));

  it('renders business menu', function() {
    expect(businessMenuRenderSpy).toHaveBeenCalled();
  });

  it('renders the location menu', inject(function($rootScope, $httpBackend, Context) {
    $httpBackend.expectGET('http://local.womply.com:3000/api/0.1/initialize?id=undefined').respond({data: {merchant_locations: [
      {
        slug: '1111'
      }
    ]}});
    Context.initialize();
    $rootScope.$digest();
    $httpBackend.flush();
    expect(renderLocationSpy).toHaveBeenCalled();
  }));

  it('sets the url on location change', inject(function($rootScope, $document, $location, $httpBackend, Context) {
    $httpBackend.expectGET('http://local.womply.com:3000/api/0.1/initialize?id=undefined').respond({data: {merchant_locations: [
      {
        slug: '1111'
      }
    ]}});
    spyOn($location, 'path').and.callThrough();

    Context.initialize();

    $rootScope.$digest();
    $httpBackend.flush();

    $httpBackend.expectGET('http://local.womply.com:3000/api/0.1/initialize?id=test').respond({data: {merchant_locations: [
      {
        slug: '1111'
      }
    ]}});
    locationMenuCallback({id: 'test'});

    expect($location.path).toHaveBeenCalled();
  }));

  it('renders the user menu', function() {
    expect(businessMenuRenderSpy).toHaveBeenCalled();
    expect(userSetUsernameSpy).toHaveBeenCalledWith('bob');
  });
});