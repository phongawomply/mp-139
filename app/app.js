angular.module('womply')
  /**
   * Set the $http request to allow for XHR
   */
  .config(function($httpProvider, $routeProvider, $mdThemingProvider) {
    $httpProvider.defaults.withCredentials = true;
    // Check the response and redirect to
    $httpProvider.interceptors.push(['$q', '$window', 'Environment', function($q, $window, Environment) {
      return {
        responseError: function (resp) {
          if (resp.status === 401) {
            $window.location.replace(Environment.getInsightsPath());
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
  .controller('AppController', ['$document', 'ConfigLoader', 'Context', 'MixPanelService', function($document, ConfigLoader, Context, MixPanelService) {
    var self = this;
    ConfigLoader.initialize()
      .then(function(config) {
        self.userMenuLinks = config.UserMenuLinks;
        self.applicationId = config.ApplicationId;
        self.navigationLinks = config.NavigationLinks;
        self.navigationSelected = config.NavigationSelected;
        self.businessMenuLinks = config.BusinessMenuLinks;
        self.locationChanged = config.LocationChanged;
      });

    Context.initialized(function(context) {
      var location = context.findLocation(context.merchantSlug());

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
