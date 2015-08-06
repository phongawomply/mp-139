function disableModuleRun(module) {
  angular.module(module)._runBlocks = [];
}