angular.module('womply')
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/:slug/example', {
        templateUrl: 'html/components/pages/example/example.html'
      })
      .when('/:slug', {
        redirectTo: '/:slug/example'
      });
  }]);
