describe('TopBar', function() {
  beforeEach(module('templates'));
  disableModuleRun('womply');
  beforeEach(module('womply'));

  var businessMenuRenderSpy = null;
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
  });

  var element, scope, rootScope;
  beforeEach(inject(function($rootScope, $compile) {
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

    var ele = angular.element('<top-bar data-application-id="applicationId" data-user-menu-links="userMenuLinks" data-business-menu-links="businessMenuLinks"></top-bar>');
    element = $compile(ele)($rootScope.$new());
    $rootScope.$digest();
    scope = element.isolateScope();
  }));



  it('renders business menu', function() {
    expect(businessMenuRenderSpy).toHaveBeenCalled();
  });
});