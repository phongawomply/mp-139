angular.module('womply')
  /**
   * Service to load the application level configuration, if the application configuration service
   * does not exist, an error will be thrown
   */
  .factory('ConfigLoader', ['$injector', '$q', function($injector, $q) {
    return {
      /**
       * Initialize the configuration loader to get the application configuration
       * service, if not found an error will be thrown.
       *
       * @returns {Q.Promise}
       */
      initialize: function() {
        var defer = $q.defer();
        if (!$injector.has('AppConfig')) {
          throw new Error('AppConfig service must exist.');
        }

        defer.resolve($injector.get('AppConfig'));

        return defer.promise;
      }
    };
  }]);