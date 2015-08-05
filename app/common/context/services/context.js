angular.module('womply')
  /**
   * Context service to provide the application with data
   */
  .factory('Context', ['$rootScope', '$http', '$q', '$route', '$location', 'Environment', function($rootScope, $http, $q, $route, $location, Environment) {

    var merchantLocationsDefer = $q.defer();
    var userDefer = $q.defer();

    var merchantSlug = $location.path().split('/')[1];

    $rootScope.$on('$locationChangeStart', function() {
      merchantSlug = $location.path().split('/')[1];
    });

    return {
      /**
       * Initializes the Context Service
       * @returns {Q.Promise}
       */
      initialize: function() {
        return $http.get(Environment.getApiPath() + '/initialize?id=197330')
                .then(function(response) {
                  merchantLocationsDefer.resolve(response.data.data.merchant_locations);
                  userDefer.resolve(response.data.data.user);
                });
      },
      /**
       * Get the merchant locations
       * @returns {Q.Promise}
       */
      getMerchantLocations: function() {
        return merchantLocationsDefer.promise;
      },
      /**
       * Get the current merchant location
       * @returns {Q.Promise}
       */
      getCurrentMerchantLocation: function() {
        var defer = $q.defer();

        defer.resolve(merchantSlug);

        return defer.promise;
      },
      /**
       * Get the user data
       * @returns {Q.Promise}
       */
      getUser: function() {
        return userDefer.promise;
      }
    }
  }]);