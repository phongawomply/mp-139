angular.module('womply')
  /**
   * Top bar directive wrapper around the global component to make the top bar
   *
   * @directive
   */
  .directive('topBar', ['$rootScope', '$document', '$location', 'Context', function($rootScope, $document, $location, Context) {
    return {
      restrict: 'E',
      scope: {
        /**
         * The application identifier
         */
        applicationId: '@',
        /**
         * The user menu links
         * [
         *  {
         *    name: <string>,
         *    href: <string>
         *  }
         * ]
         */
        userMenuLinks: '=',
        /**
         * Array of business menu links
         * [
         *  {
         *    name: <string>,
         *    route: <string>
         *  }
         *  ...
         * ]
         */
        businessMenuLinks: '='
      },
      templateUrl: '/html/common/navigation/directives/topbar.html',
      link: function ($scope, $element, $attr) {

        $attr.$observe('applicationId', function() {
          // Initialize the global component application launcher
          var appLauncher = new womply.ui.ApplicationLauncher({
              element: womply.ui.util.getId('gc-app-launcher-toggle'),
              overlay: womply.ui.util.getId('gc-app-launcher-overlay'),
              app: $attr.applicationId
          });

          appLauncher.render();
        });


        // Initialize the business links
        var businessMenuDeregister = $scope.$watch('businessMenuLinks', function(value) {
          if (!_.isEmpty(value)) {
            var business = new womply.ui.ListMenu({
              type: 'business-menu',
              element: womply.ui.util.getId('gc-business-menu'),
              links: value
            });
            business.render();

            businessMenuDeregister();
          }
        });

        // Set the location menu
        var _locationChangeCallback = function(slug) {
          $rootScope.$apply(function() {
            $location.path('/' + slug.id);
          });
        };

        Context.initialized(function(data) {
          var locations = data.merchant_locations;
          var slug = Context.getCurrentMerchantSlug();
          var merchants = _.map(locations, function(location) {
            return {
              id: location.slug,
              text: location.name,
              href: '#',
              slug: location.slug,
              subtext: location.address1 + ' ' + location.city,
              selected: location.id == slug || location.slug == slug
            };
          });

          var locationMenu = new womply.ui.SelectMenu({
            type: 'location-menu',
            element: womply.ui.util.getId('gc-location-menu-list'),
            changeCallback: _locationChangeCallback,
            collection: merchants
          });

          locationMenu.render();
        });

        // Set the user menu
        var deregister = $scope.$watch('userMenuLinks', function(value) {
          if (!_.isEmpty(value)) {
            Context.getUser().then(function(user) {
              var UserMenu = new womply.ui.ListMenu({
                type: 'user-menu',
                element: womply.ui.util.getId('gc-user-menu'),
                links: value,
                title: true
              });
              UserMenu.render();
              UserMenu.updateTitle(user.name);
            });

            deregister();
          }
        });
      }
    }
  }]);