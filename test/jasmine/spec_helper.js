/**
 * Set the API local path to local
 */
function setApiPathLocal() {
  beforeEach(inject(function($q, Environment) {
    var defer = $q.defer();
    defer.resolve('http://local.womply.com:3000/api/0.1');
    spyOn(Environment, 'getApiPath').and.returnValue(defer.promise);
  }));
}