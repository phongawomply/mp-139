angular.module('womply')
  /**
   * Context service to provide the application with data
   */
  .factory('Context', ['$rootScope', '$http', '$q', '$route', '$location', '$window', 'Environment', function($rootScope, $http, $q, $route, $location, $window, Environment) {

    var merchantLocationsDefer = $q.defer();
    var userDefer = $q.defer();

    var merchantSlug = $location.path().split('/')[1];
    var callbacks = [];
    var initialized = false;

    var initialize = function() {
      initialized = false;
      merchantLocationsDefer = $q.defer();
      userDefer = $q.defer();
      var apiPath = Environment.getApiPath();
      return $http.get(apiPath + '/initialize?id=' + merchantSlug)
        .then(function(response) {

          initialized = true;

          var location = _.find(response.data.data.merchant_locations, function (l) {
            return l.id == merchantSlug || l.slug == merchantSlug;
          });

          if (_.isUndefined(location)) {
            $window.location.replace(Environment.getInsightsPath());
          }

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
        return this.getMerchantLocations()
          .then(function(locations) {
            return _.find(locations, function (l) {
              return l.id == merchantSlug || l.slug == merchantSlug;
            });
          });
      },
      /**
       * Get the current merchant slug
       * @returns {*}
       */
      getCurrentMerchantSlug: function() {
        return merchantSlug;
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

        if (initialized) {
          var user;
          var self = this;
          this.getUser()
            .then(function(u) {
              user = u;
              return self.getMerchantLocations();
            })
            .then(function(locations) {
              callback({
                merchant_locations: locations,
                user: user
              })
            });
        }
      }
    }
  }]);