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
          api.getOptions().then(function(options) {
            options.chart.renderTo = target;
            var chart = new Highcharts.Chart(options);
            api.setChart(chart);
          });
        });
      }
    }
  }]);