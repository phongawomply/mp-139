angular.module('womply')
  /**
   * Set the $http request to allow for XHR
   */
  .config(function($httpProvider, $routeProvider) {
    $httpProvider.defaults.withCredentials = true;
    $routeProvider
      .when('/:slug/nav1', {
        template: '<p>Nav 1</p><chart data-chart-id="myId"></chart>'
      })
      .when('/:slug/nav2', {
        template: '<p>Nav 2</p>'
      });

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

    Context.initialized(function(data) {
      self.slug = Context.getCurrentMerchantSlug();
      var location = _.find(data.merchant_locations, function(loc) {
        return loc.slug == self.slug || loc.id == self.slug;
      });

      if(location && _.isString(location.partner_slug)) {
        $document[0].body.id = location.partner_slug.toLowerCase();
        $document[0].title = location.partner_name + " " + location.product_name + " - " + location.name;
      }

      MixPanelService.initialize(data.mixpanel_token);
    });

    Context.initialize();
  }]);