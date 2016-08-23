angular.module('womply')
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/:slug/example', {
        templateUrl: 'html/components/pages/example/example.html'
      })
      .when('/:slug/billing', {
        templateUrl: 'html/components/pages/billing/billing.html',
        controller: 'BillingDemoController',
        controllerAs: '$ctrl'
      })
      .when('/:slug', {
        redirectTo: '/:slug/example'
      });
  }]);
