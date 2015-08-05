describe("AppController", function() {
  var $controller;
  var $rootScope;
  var $httpBackend;
  var $location;
  var $q;


  beforeEach(module('womply'));

  beforeEach(inject(function($injector){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = $injector.get('$controller');
    $rootScope = $injector.get('$rootScope');
    $httpBackend = $injector.get('$httpBackend');
    $location = $injector.get('$location');
    $q = $injector.get('$q');
  }));

  it('should be setup', function() {
    var $scope = {};
    //Mock the Context factory
    var Context = function($q) {
      return {
        getCurrentMerchantLocation: function() {
          var def = $q.defer();
          def.resolve('x');
          return def.promise;
        },
        getMerchantLocations: function() {
          var def = $q.defer();
          def.resolve([{slug:'x', partner_slug:'y'}]);
          return def.promise;
        }
      }
    };

    //Mock the initialize http call
    $httpBackend.expectGET('http://local.womply.com:3000/api/0.1/initialize?id=197330').respond({
      data:{
        data: {
          merchant_locations:[{slug:'x', partner_slug:'x'}]
        }
      }
    });

    var controller = $controller('AppController', { $scope: $scope, Context: new Context($q)});
    $rootScope.$digest();
    $httpBackend.flush();
    expect(controller.applicationId).toEqual('customer-analytics');
  });
});
