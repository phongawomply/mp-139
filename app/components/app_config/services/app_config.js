angular.module('womply')
  .factory('AppConfig', ['$q', '$location', 'Context', 'Environment', function($q, $location, Context, Environment) {
    var defer = $q.defer();


    Context.getCurrentMerchantLocation()
      .then(function(slug) {
        defer.resolve({
          ApplicationId: 'insights',
          UserMenuLinks: [
            {
              name: 'Logout',
              href: Environment.getInsightsPath() + '/users/sign_out'
            }
          ],
          NavigationLinks: [
            {
              id:     'nav1',
              name:   'Nav 1',
              route:  'nav1',
              active: true
            },
            {
              id:     'nav2',
              name:   'Nav 2',
              route:  'nav2'
            }
          ],
          NavigationSelected: function() {
            var self = this;
            Context.getCurrentMerchantLocation()
              .then(function(slug) {
                $location.path('/' + slug + '/' + self.route)
              });
          }
        });
      });

    return defer.promise;
  }]);