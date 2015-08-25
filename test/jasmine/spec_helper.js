/**
 * Set the API local path to local
 */
function setApiPathLocal() {
  beforeEach(inject(function(Environment) {
    spyOn(Environment, 'getApiPath').and.returnValue('http://local.womply.com:3000/api/0.1');
  }));
}