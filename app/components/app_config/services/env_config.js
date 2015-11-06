angular.module('womply')
  .factory('EnvConfig', ['$location', function($location) {
    var protocol = $location.protocol() + '://';
    /**
     * In test and prod environments we need to cut off
     * the first part of the host to hit the API server
     * ex app2.tsys.testing => tsys.testing
     **/
    var getHost = function() {
      return $location.host().split('.').slice(1).join('.');
    };

    return {
      API: {
        default: {
          host: protocol + getHost(),
          path: '/api/0.1'
        }
      }
    };
  }]);
