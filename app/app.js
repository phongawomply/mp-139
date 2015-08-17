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
  .controller('ChartController', ['ChartConfigService', 'ChartAPIService', 'CHART_TYPE', function(ChartConfigService, ChartAPIService, CHART_TYPE) {
    var api = ChartAPIService.getAPI('myId');

    api.config(CHART_TYPE.COLUMN)
      .title('YAY!').hideLegend();

    var xAxis = api.config().getXAxis().hideTicks().color('#000');
    var yAxis = api.config().getYAxis()
      .guideLineWidth(0)
      .color('#000')
      .tickWidth(0).hideLabels().title().horizontal().margin(0).text('Visits')
      .style({
        fontWeight: 'bold',
        fontSize: '16px'
      })
      .x(0);

    var customers = [{
      "customerCount": 23,
      "customerType": "+",
      "revenuePerVisit": 39.17,
      "week": 1,
      "revenue": 1136.00,
      "visitCount": 29,
      "startDate": 1437091200000
    }, {
      "customerCount": 19,
      "customerType": "+",
      "revenuePerVisit": 36.29,
      "week": 2,
      "revenue": 762.00,
      "visitCount": 21,
      "startDate": 1437696000000
    }, {
      "customerCount": 24,
      "customerType": "+",
      "revenuePerVisit": 31.67,
      "week": 3,
      "revenue": 1140.00,
      "visitCount": 36,
      "startDate": 1438300800000
    }, {
      "customerCount": 22,
      "customerType": "+",
      "revenuePerVisit": 41.34,
      "week": 4,
      "revenue": 1323.00,
      "visitCount": 32,
      "startDate": 1438905600000
    }];

    var visits = {
      name: 'Visits',
      dataLabels: {
        enabled: true,
        style: {
          fontSize: '14px'
        },
        y: 0
      },
      data: []
    };

    _.each(customers, function(customer) {
      var start = moment(customer.startDate).startOf('day');
      var startString = start.format('MMM') + ' ' + start.format('D') + '<br>';
      start.add(7, 'days');
      var endString = start.format('MMM') + ' ' + start.format('D');
      var cat = startString + endString;
      xAxis.setCategory(cat);
      visits.data.push(customer.visitCount);
    });

    api.setData([visits]);
  }]);
