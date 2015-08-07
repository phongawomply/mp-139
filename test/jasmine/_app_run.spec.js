describe('ApplicationRun', function() {

  beforeEach(module('womply'));

  it('initializes the context on module run', inject(function($rootScope, $httpBackend) {
    $httpBackend.expectGET('http://local.womply.com:3000/api/0.1/initialize?id=undefined').respond(200);
    $rootScope.$digest();

    $httpBackend.verifyNoOutstandingExpectation();
  }));
});