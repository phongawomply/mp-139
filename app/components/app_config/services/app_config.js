angular.module('womply')
  .factory('AppConfig', ['$q', '$rootScope', '$location', 'ContextService', 'EnvironmentService', function($q, $rootScope, $location, ContextService, EnvironmentService) {
    var defer = $q.defer();

    defer.resolve({
      ApplicationId: 'insights',
      UserMenuLinks: [
        {
          text: 'Logout',
          href: EnvironmentService.getInsightsPath() + '/users/sign_out'
        }
      ],
      ApiBase: 'http://local.womply.com:3000',
      ApiPath: '/api/0.1',
      NavigationLinks: [
        {
          id:     'nav1',
          text:   'Nav 1',
          route:  'nav1',
          active: true
        },
        {
          id:     'nav2',
          text:   'Nav 2',
          route:  'nav2'
        }
      ],
      NavigationSelected: function() {
        var self = this;
        ContextService.initialized(function(context) {
          $location.path('/' + context.merchantSlug() + '/' + self.route);
          $rootScope.$apply();
        });
      }
    });

    return defer.promise;
  }]);
