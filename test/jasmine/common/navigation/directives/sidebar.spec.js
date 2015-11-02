describe('SideBar', function() {
  beforeEach(module('templates'));
  disableModuleRun('womply');
  beforeEach(module('womply'));

  var navigationRenderSpy;
  var setActiveSpy;
  beforeEach(function() {
    navigationRenderSpy = jasmine.createSpy('render');
    setActiveSpy = jasmine.createSpy('setActive');
    womply.ui.Navigation = function() {
      this.render = navigationRenderSpy;
      this.setActive = setActiveSpy;
    }
  });

  var element, scope, rootScope;

  describe('sets up navigation', function() {
    beforeEach(inject(function($rootScope, $compile) {
      rootScope = $rootScope;

      rootScope.navigationLinks = [
        {
          id: '1',
          name: 'nav1',
          route: 'nav1',
          href: 'nav1'
        },
        {
          id: '2',
          name: 'nav2',
          route: 'nav2',
          href: 'nav2'
        }
      ];

      var ele = angular.element('<div><side-bar id="sideBar" data-navigation-links="navigationLinks"></side-bar></div>');
      element = $compile(ele)($rootScope.$new());

      $rootScope.$digest();
      scope = element.find('#sideBar').isolateScope();
    }));

    it('renders the navigation', function() {
      expect(navigationRenderSpy).toHaveBeenCalled();
    });

    it('sets the active navigation', function() {
      expect(setActiveSpy.calls.count()).toEqual(1);
    });

    it('sets active when location changes', inject(function($rootScope) {
      $rootScope.$broadcast('$locationChangeStart');
      $rootScope.$digest();
      expect(setActiveSpy.calls.count()).toEqual(2);
    }));
  });

  it('sets the click function', inject(function($compile) {
    rootScope.navigationLinks = [
      {
        id: '1',
        name: 'nav1',
        route: 'nav1',
        href: 'nav1'
      }
    ];

    rootScope.clickFn = jasmine.createSpy();
    var ele = angular.element('<div><side-bar id="sideBar" data-navigation-links="navigationLinks" data-navigation-selected="clickFn"></side-bar></div>');
    element = $compile(ele)(rootScope.$new());

    rootScope.$digest();
    scope = element.find('#sideBar').isolateScope();

    expect(navigationRenderSpy).toHaveBeenCalled();
  }));

  it('has invalid navigation links', inject(function($compile) {
    rootScope.navigationLinks = [
      {
        id: '1',
        name: 'nav1',
        route: 'nav1'
      }
    ];
    rootScope.clickFn = jasmine.createSpy();
    var ele = angular.element('<div><side-bar id="sideBar" data-navigation-links="navigationLinks"></side-bar></div>');
    element = $compile(ele)(rootScope.$new());

    rootScope.$digest();
    scope = element.find('#sideBar').isolateScope();

    expect(navigationRenderSpy).not.toHaveBeenCalled();
  }));
});
