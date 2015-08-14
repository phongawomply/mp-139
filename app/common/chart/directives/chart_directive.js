angular.module('womply')
  .directive('chart', ['ChartAPIService', function(ChartAPIService) {
    return {
      restrict: 'E',
      scope: {
        chartId: '@'
      },
      template: '<div class="chart"></div>',
      link: function($scope, $ele, $attr) {
        $attr.$observe('chartId', function() {
          var target = $ele[0].children[0];
          ChartAPIService.register($attr.chartId, target);
        });
      }
    }
  }]);
