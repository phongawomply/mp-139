angular.module('womply')
  /**
   * Service to get the environment settings
   */
  .factory('Environment', ['$location', function($location) {
    var isDevelopmentServer = function() {
      return $location.host().match('localhost') || $location.host().match('local.womply');
    };

    return {
      /**
       * Get the API path
       *
       * @returns {string} - the API path
       */
      getApiPath: function() {
        var path = 'http://local.womply.com:3000';
        if (!isDevelopmentServer()) {
        }

        return path + '/api/0.1';
      },
      /**
       * Get the insights path
       *
       * @returns {string} - the insights path
       */
      getInsightsPath: function() {
        var path = 'http://local.womply.com:5000';
        if (!isDevelopmentServer()) {
        }

        return path;
      }
    }
  }]);