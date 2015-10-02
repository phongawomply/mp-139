angular.module('womply')
  .service('MixPanelService', ['$q', '$timeout', function($q, $timeout) {

    var initializeDefer = $q.defer();
    var initialized = false;
    var defaultTrackProperties = null;

    return {
      /**
       * Initialize the mixpanel with a token and default properties
       *
       * @param {string} token - the token
       * @param {object} defaultProperties - the default properties
       * @returns {Function|promise}
       */
      initialize: function(token, defaultProperties) {
        if (!initialized) {
          initialized = true;
          defaultTrackProperties = defaultProperties || {};
          mixpanel.init(token, {loaded: function() {
            $timeout(function() {
              initializeDefer.resolve();
            });
          }});
        }

        return initializeDefer.promise;
      },
      /**
       * Track an event via mix panel
       * @param {string} name - the event name
       * @param {object} properties - the properties in combination with the default properties
       * @returns {*}
       */
      track: function(name, properties) {
        return initializeDefer.promise.then(function() {
          mixpanel.track(name, _.extend(_.clone(defaultTrackProperties), properties));
        });
      }
    }

  }]);