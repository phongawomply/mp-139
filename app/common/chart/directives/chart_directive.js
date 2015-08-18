angular.module('womply')
  /**
   * Create a high chart instance on the page
   */
  .directive('chart', ['ChartAPIService', function(ChartAPIService) {
    return {
      restrict: 'E',
      scope: {
        /**
         * {string} the chart identifier
         */
        chartId: '@'
      },
      template: '<div class="chart"></div>',
      link: function($scope, $ele, $attr) {

        $attr.$observe('chartId', function() {
          var target = $ele[0].children[0];
          var api = ChartAPIService.getAPI($attr.chartId);
          var chart = null;
          // Get the configuration and render the chart
          api.getConfig().then(function(config) {
            config.renderTo(target);
            chart = new Highcharts.Chart(config.toJSON());
            api.setChart(chart);
          });

          // When destroyed, clean up the API and the chart
          $scope.$on('$destroy', function() {
            ChartAPIService.removeAPI($attr.chartId);
            if (chart) {
              chart.destroy();
            }
          });
        });
      }
    }
  }]);
