angular.module('womply')
  /**
   * Set the $http request to allow for XHR
   */
  .config(function($httpProvider, $routeProvider, $mdThemingProvider) {
    $httpProvider.defaults.withCredentials = true;
    // Check the response and redirect to
    $httpProvider.interceptors.push(['$q', '$window', 'EnvironmentService', function($q, $window, EnvironmentService) {
      return {
        responseError: function (resp) {
          if (resp.status === 401) {
            $window.location.replace(EnvironmentService.getInsightsPath());
          }

          return $q.reject(resp);
        }
      }
    }]);
  })
  /**
   * Main application controller which initialize the configuration and sets the
   * controller values
   */
  .controller('AppController', ['$document', 'ConfigLoader', 'ContextService', 'MixPanelService', function($document, ConfigLoader, ContextService, MixPanelService) {
    var self = this;
    ConfigLoader.executeSideBarConfig();

    ContextService.initialized(function(context) {
      var location = context.locations().find(context.merchantSlug());

      if(location && _.isString(location.partnerSlug())) {
        $document[0].title = location.partnerName() + " " + location.productName() + " - " + location.name();
      }

      var location_info = location.name() + " - " + location.address1() + ", " + location.city() + ", " + location.state();
      var visit_type = location.isFirstVisit() ? 'New visit' : 'Return visit';

      MixPanelService.initialize(context.mixpanelToken(), {
        'Merchant name': location_info,
        'Brand': location.partnerName(),
        'Visit type': visit_type
      });
    });
  }]);
