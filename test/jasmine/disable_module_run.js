function disableModuleRun(module) {
  beforeEach(function() {
    angular.module(module)._runBlocks = [];
  });
}