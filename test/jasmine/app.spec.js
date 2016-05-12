describe("AppController", function() {
  var $controller;
  var $rootScope;
  var $httpBackend;
  var $location;
  var $q;
  var configLoader;
  var EVENTS;
  var merchantLocationModel;

  setup();
  mock.application();

  beforeEach(inject(function($injector, APPLICATION_EVENTS){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = $injector.get('$controller');
    $rootScope = $injector.get('$rootScope');
    $httpBackend = $injector.get('$httpBackend');
    $location = $injector.get('$location');
    $q = $injector.get('$q');
    EVENTS = APPLICATION_EVENTS;
  }));

  beforeEach(inject(function(ConfigLoader, MerchantLocationModel) {
    merchantLocationModel = MerchantLocationModel;
    configLoader = ConfigLoader;
    spyOn(ConfigLoader, 'executeSideBarConfig');
  }));


  it('initializes config loader', inject(function(ContextService) {
    spyOn(ContextService, 'initialize').and.returnValue();
    var controller = $controller('AppController');
    $rootScope.$digest();
    expect(configLoader.executeSideBarConfig).toHaveBeenCalled();
  }));

  it('initializes the title', inject(function($document, ContextService) {
    var controller = $controller('AppController');
    $rootScope.$digest();
    var model = new merchantLocationModel(context_data.merchant_locations[0]);
    application.initialize(EVENTS.onActiveMerchantLocationChange, model);
    expect($document[0].title).toEqual('Womply Insights - The Ugly Mug TEST');
  }));
});
