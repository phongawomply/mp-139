angular.module('womply')
  .factory('AppConfig', ['$q', '$location', 'Context', 'Environment', function($q, $location, Context, Environment) {
    var defer = $q.defer();


    Context.getCurrentMerchantLocation()
      .then(function(slug) {
        defer.resolve({
          ApplicationId: 'customer-analytics',
          UserMenuLinks: [
            {
              name: 'Logout',
              href: Environment.getInsightsPath() + '/users/sign_out'
            }
          ],
          NavigationLinks: [
            {
              id:     'summary',
              name:   'Summary',
              route:  'summary',
              active: true
            },
            {
              id:     'merchant',
              name:   'Merchant',
              route:  'merchant'
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