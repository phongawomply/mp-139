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
       * Get the API path as a default or as a named configuration
       *
       * @returns {String} - fluent api object which extends a String
       */
      getApiPath: function() {
        var override = getOverrides();
        var path = 'http://local.womply.com:3000';
        override.API = override.API || {};

        var apiPath = function(apiName) {
          return function() {
            override.API[apiName] = override.API[apiName] || {};

            if (!isDevelopmentServer()) {
              path = override.API[apiName].host || $location. protocol() + '://' + $location.host() + ($location.port() ? ':' + $location.port() : '');
            }

            return path + (override.API[apiName].path || '/api/0.1');
          }
        };

        var by = {
          default: apiPath('default')
        };

        _.each(override.API, function(value, key) {
          by[key] = apiPath(key);
        });

        var str = new String(apiPath('default')());

        str.by = by;

        return str;

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