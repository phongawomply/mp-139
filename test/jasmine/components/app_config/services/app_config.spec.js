describe('AppConfig', function() {
  beforeEach(module('womply'));

  var service;
  beforeEach(inject(function(AppConfig) {
    service = AppConfig;
  }));

  it('returns a promise', function() {
    expect(_.isFunction(service.then)).toEqual(true);
  });

  it('resolves to an object', inject(function($rootScope) {
    var config;
    service.then(function(conf) {
      config = conf;
    });

    $rootScope.$digest();

    expect(_.isObject(config)).toEqual(true);
  }));

  it('gets the current merchant slug on navigation selected', inject(function($rootScope, $location, Context) {
    spyOn($location, 'path').and.returnValue('');
    spyOn(Context, 'getCurrentMerchantSlug').and.returnValue('mySlug');

    var config;
    service.then(function(conf) {
      config = conf;
    });

    $rootScope.$digest();

    config.NavigationSelected.apply({route: 'myRoute'});
    expect(Context.getCurrentMerchantSlug).toHaveBeenCalled();
  }));

  it('sets the path on navigation selected', inject(function($rootScope, $location, Context) {
    spyOn($location, 'path').and.returnValue('');
    spyOn(Context, 'getCurrentMerchantSlug').and.returnValue('mySlug');

    var config;
    service.then(function(conf) {
      config = conf;
    });

    $rootScope.$digest();

    config.NavigationSelected.apply({route: 'myRoute'});
    expect($location.path).toHaveBeenCalledWith('/mySlug/myRoute');
  }));
});
