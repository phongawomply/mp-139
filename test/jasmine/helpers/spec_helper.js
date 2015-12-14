/**
 * Set the API local path to local
 */
function setApiPathLocal() {
  beforeEach(inject(function(EnvironmentService) {
    spyOn(EnvironmentService, 'getApiPath').and.returnValue('http://local.womply.com:3000/api/0.1');
  }));
}
/**
 * disable the run modules
 * @param module
 */
function disableModuleRun(module) {
  beforeEach(function() {
    angular.module(module)._runBlocks = [];
  });
}
/**
 * Setup the spec
 */
function setup() {
  disableModuleRun('womply');
  disableModuleRun('womply.gmd-nav');

  beforeEach(module('womply'));
  beforeEach(module('womply.gmd-nav'));

  setApiPathLocal();
}