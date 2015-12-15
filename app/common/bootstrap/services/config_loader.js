angular.module('womply')
/**
 * Service to load the application level configuration, if the application configuration service
 * does not exist, an error will be thrown
 */
  .factory('ConfigLoader', ['$injector', function($injector) {
    return {
      /**
       * Gets the side bar config from the side bar config service
       * and if not found an error will be thrown.
       *
       */
      executeSideBarConfig: function() {
        if (!$injector.has('SideBarConfig')) {
          throw new Error('SideBarConfig service must exist.');
        }
        $injector.get('SideBarConfig').call();
      }
    };
  }]);