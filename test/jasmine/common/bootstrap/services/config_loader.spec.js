describe('Service: ConfigLoader', function() {

  var sideBarConfig = jasmine.createSpy('sideBarConfig');

  angular.module('womply.mock', [])
    .factory('SideBarConfig', function() {
      return sideBarConfig;
    });

  disableModuleRun('womply');
  beforeEach(module('womply'));
  beforeEach(module('womply.mock'));

  var service = null;
  beforeEach(inject(function($httpBackend, ConfigLoader) {
    service = ConfigLoader;
  }));

  it('throws an error if sideBarConfig service not defined', inject(function($injector) {

    spyOn($injector, 'has').and.returnValue(false);

    expect(function() {
      service.executeSideBarConfig();
    }).toThrowError('SideBarConfig service must exist.');
  }));

  it('call the SideBarConfig function', inject(function($injector) {
    service.executeSideBarConfig();
    expect(sideBarConfig).toHaveBeenCalled();
  }));

});