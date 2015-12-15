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
  .controller('AppController', ['$document', 'ConfigLoader', 'ApplicationFacade', 'MixPanelService', 'APPLICATION_EVENTS',
    function($document, ConfigLoader, ApplicationFacade, MixPanelService, APPLICATION_EVENTS) {
      var activeLocation = null;
      var mixPanelToken = null;
      var mixPanelInitialized = false;

      var initializeMixPanel = function() {
        if (activeLocation && mixPanelToken && !mixPanelInitialized) {
          var location_info = activeLocation.name() + " - " + activeLocation.address1() + ", " + activeLocation.city() + ", " + activeLocation.state();
          var visit_type = activeLocation.isFirstVisit() ? 'New visit' : 'Return visit';

          MixPanelService.initialize(mixPanelToken, {
            'Merchant name': location_info,
            'Brand': activeLocation.partnerName(),
            'Visit type': visit_type
          });

          mixPanelInitialized = true;
        }
      };

      ConfigLoader.executeSideBarConfig();

      ApplicationFacade.subscribe(APPLICATION_EVENTS.onActiveMerchantLocationChange, function(location) {
        activeLocation = location;
        if(activeLocation && _.isString(activeLocation.partnerSlug())) {
          $document[0].title = activeLocation.partnerName() + " " + activeLocation.productName() + " - " + activeLocation.name();
        }
        initializeMixPanel();
      });

      ApplicationFacade.subscribe(APPLICATION_EVENTS.onMixPanelTokenChange, function(token) {
        mixPanelToken = token;
        initializeMixPanel();
      });
  }]);
