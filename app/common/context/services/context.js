angular.module('womply')
  /**
   * Context service to provide the application with data
   */
  .factory('Context', ['$rootScope', '$http', '$q', '$route', '$location', 'Environment', function($rootScope, $http, $q, $route, $location, Environment) {

    var merchantLocationsDefer = $q.defer();
    var userDefer = $q.defer();

    var merchantSlug = $location.path().split('/')[1];
    var callbacks = [];

    var initialize = function() {
      merchantLocationsDefer = $q.defer();
      userDefer = $q.defer();
      return Environment.getApiPath()
        .then(function(apiPath) {
          return $http.get(apiPath + '/initialize?id=' + merchantSlug)
            .then(function(response) {
              merchantLocationsDefer.resolve(response.data.data.merchant_locations);
              userDefer.resolve(response.data.data.user);

              _.each(callbacks, function(cb) {
                if (_.isFunction(cb)) {
                  cb({
                    merchant_locations: response.data.data.merchant_locations,
                    user: response.data.data.user
                  })
                }
              });
            });
        });
    };

    $rootScope.$on('$locationChangeStart', function() {
      var currentSlug = merchantSlug;
      merchantSlug = $location.path().split('/')[1];
      var changed = currentSlug !== merchantSlug;

      if (merchantSlug && changed) {
        initialize();
      }
    });

    return {
      /**
       * Initializes the Context Service
       * @returns {Q.Promise}
       */
      initialize: initialize,
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
      },
      /**
       * Add the callback to the initialized callback
       * @param {Function} callback - the function to call when initialized
       */
      initialized: function(callback) {
        callbacks.push(callback);
      }
    }
  }]);