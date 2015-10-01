angular.module('womply')
  .service('MixPanelService', ['$q', '$timeout', function($q, $timeout) {

    var initializeDefer = $q.defer();
    var initialized = false;

    return {
      initialize: function(token) {
        if (!initialized) {
          initialized = true;
          mixpanel.init(token, {loaded: function() {
            $timeout(function() {
              initializeDefer.resolve();
            });
          }});
        }

        return initializeDefer.promise;
      },

      track: function(name, properties) {
        return initializeDefer.promise.then(function() {
          mixpanel.track(name, properties);
        });
      }
    }

  }]);