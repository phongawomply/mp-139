angular.module('womply')
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/:slug/nav1', {
        template: '<p style="height:600px">Nav 1</p><chart data-chart-id="myId"></chart>'
      })
      .when('/:slug/nav2', {
        template: '<p>Nav 2</p>'
      })
      .when('/:slug', {
        redirectTo: '/:slug/nav1'
      });
  }]);
