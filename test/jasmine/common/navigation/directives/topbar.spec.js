describe('TopBar', function() {
  beforeEach(module('templates'));
  disableModuleRun('womply');
  beforeEach(module('womply'));

  var businessMenuRenderSpy = null;

  var locationMenuCallback = null;
  var updateLocationSpy = null;

  var userMenuRenderSpy = null;
  var userSetUsernameSpy = null;
  beforeEach(function() {
    businessMenuRenderSpy = jasmine.createSpy();

    womply.ui.BusinessMenu = function() {
      return {
        setId: function() {
          return {
            render: businessMenuRenderSpy
          };
        }
      }
    };

    updateLocationSpy = jasmine.createSpy();
    womply.ui.LocationMenu = function(ele, callback) {
      locationMenuCallback = callback;

      this.updateLocations = updateLocationSpy;
    };

    userMenuRenderSpy = jasmine.createSpy();
    userSetUsernameSpy = jasmine.createSpy();

    womply.ui.UserMenu = function() {
      this.render = userMenuRenderSpy;
      this.setUsername = userSetUsernameSpy;
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

  it('renders the location menu', function() {
    expect(updateLocationSpy).toHaveBeenCalled();
  });

  it('sets the url on location change', inject(function($rootScope, $document, $location, $httpBackend) {
    $httpBackend.expectGET('http://local.womply.com:3000/api/0.1/initialize?id=test').respond(200);
    spyOn($location, 'path').and.callThrough();

    locationMenuCallback('test');

    $rootScope.$digest();

    expect($document[0].body.id).toEqual('slug');
    expect($location.path).toHaveBeenCalled();
  }));

  it('renders the user menu', function() {
    expect(userMenuRenderSpy).toHaveBeenCalled();
    expect(userSetUsernameSpy).toHaveBeenCalledWith('bob');
  });
});