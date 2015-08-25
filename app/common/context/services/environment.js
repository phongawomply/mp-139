angular.module('womply')
  /**
   * Service to get the environment settings
   */
  .factory('Environment', ['$location', '$injector', function($location, $injector) {
    var isDevelopmentServer = function() {
      return $location.host().match('localhost') || $location.host().match('local.womply');
    };

    /**
     * Get the override from the env configuration
     *
     * @returns {{}}
     */
    var getOverrides = function() {
      var override = {};

      if ($injector.has('EnvConfig')) {
        override = $injector.get('EnvConfig');
      }

      return override;
    };


    return {
      /**
       * Get the API path
       *
       * @returns {string} - the API path
       */
      getApiPath: function() {
        var override = getOverrides();

        var path = 'http://local.womply.com:3000';
        if (!isDevelopmentServer()) {
          path = override.ApiBase || $location. protocol() + '://' + $location.host() + ($location.port() ? ':' + $location.port() : '');
        }

        return path + (override.ApiPath || '/api/0.1');
      },
      /**
       * Get the insights path
       *
       * @returns {string} - the insights path
       */
      getInsightsPath: function() {
        var override = getOverrides();

        var path = 'http://local.womply.com:5000';
        if (!isDevelopmentServer()) {
          path = override.InsightsBase || $location. protocol() + '://' + $location.host() + ($location.port() ? ':' + $location.port() : '');
        }

        return path;
      }
    }
  }]);