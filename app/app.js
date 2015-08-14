angular.module('womply')
  /**
   * Set the $http request to allow for XHR
   */
  .config(function($httpProvider, $routeProvider) {
    $httpProvider.defaults.withCredentials = true;
    $routeProvider
      .when('/:slug/nav1', {
        template: '<p>Nav 1</p><chart data-chart-id="myId"></chart>',
        controller: 'ChartController'
      })
      .when('/:slug/nav2', {
        template: '<p>Nav 2</p>'
      });
  })
  /**
   * Main application controller which initialize the configuration and sets the
   * controller values
   */
  .controller('AppController', ['$document', 'ConfigLoader', 'Context', function($document, ConfigLoader, Context) {
    var self = this;
    ConfigLoader.initialize()
      .then(function(config) {
        self.userMenuLinks = config.UserMenuLinks;
        self.applicationId = config.ApplicationId;
        self.navigationLinks = config.NavigationLinks;
        self.navigationSelected = config.NavigationSelected;
      });

    Context.initialized(function(data) {
      Context.getCurrentMerchantLocation()
        .then(function(slug) {
          self.slug = slug;
          return self.slug;
        })
        .then(function(slug) {
          var location = _.find(data.merchant_locations, function(loc) {
            return loc.slug == self.slug || loc.id == self.slug;
          });

          if(location && _.isString(location.partner_slug)) {
            $document[0].body.id = location.partner_slug.toLowerCase();
            $document[0].title = location.partner_name + " " + location.product_name + " - " + location.name;
          }
        });

    });

    Context.initialize();
  }])
  .controller('ChartController', ['ChartAPIService', function(ChartAPIService) {
    var api = ChartAPIService.getAPI('myId');
    api.setTitle('Yay Chart').setType('column').setXAxis(['Jan', 'Feb', 'Mar']);
    api.setSeriesData({name: 'Customers', data: [10, 20, 30]});
  }]);
