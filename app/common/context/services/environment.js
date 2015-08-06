angular.module('womply')
  /**
   * Service to get the environment settings
   */
  .factory('Environment', ['$location', '$q', 'ConfigLoader', function($location, $q, ConfigLoader) {
    var isDevelopmentServer = function() {
      return $location.host().match('localhost') || $location.host().match('local.womply');
    };

    return {
      /**
       * Get the API path
       *
       * @returns {Q.Promise} - the API path
       */
      getApiPath: function() {
        return ConfigLoader.initialize()
          .then(function(config) {
            var path = 'http://local.womply.com:3000';
            if (!isDevelopmentServer()) {
              path = config.ApiBase || $location. protocol() + '://' + $location.host() + ($location.port() ? ':' + $location.port() : '');
            }

            return path + (config.ApiPath || '/api/0.1');
          });
      },
      /**
       * Get the insights path
       *
       * @returns {string} - the insights path
       */
      getInsightsPath: function() {
        var path = 'http://local.womply.com:5000';
        if (!isDevelopmentServer()) {
          path = 'http://womply.com';
        }

        return path;
      }
    }
  }]);