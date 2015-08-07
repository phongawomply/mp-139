angular.module('womply')
  /**
   * Side bar directive wrapping the global component sidebar
   */
  .directive('sideBar', ['$rootScope', '$location', 'Context', function($rootScope, $location, Context) {
    return {
      restrict: 'E',
      scope: {
        /**
         * Array of navigation links
         * [
         *  {
         *    id: <string>,
         *    name: <string>,
         *    href: <string>,
         *    route: <string>,
         *    clickFn: Function
         *  }
         * ]
         */
        navigationLinks: '=',
        /**
         * Function called when a selection occurs
         */
        navigationSelected: '&'
      },
      template: '<div id="gc-navigation" class="gc-navigation"></div>',
      link: function($scope) {
        /**
         * Check if the navigation collection is valid, a selection function or href
         * is required on each navigation object for it to be valid
         *
         * @returns {boolean}
         */
        var isNavigationCollectionValid = function() {
          var navigationValid = true;
          if (!_.isFunction($scope.navigationSelected)) {
            navigationValid = _.reduce($scope.navigationLinks, function(valid, nav) {
              if (valid && !nav.hasOwnProperty('href')) {
                return false;
              } else {
                return valid;
              }
            }, true);
          }

          return navigationValid;
        };
        /**
         * Highlight the appropriate navigation
         *
         * @param navigation
         */
        var highlightNavigation = function(navigation) {
          var route = $location.path().split('/')[2] || $scope.navigationLinks[0].route;
          var nav = _.find($scope.navigationLinks, function (nav) {
            return nav.route == route;
          });

          navigation.setActive(nav.name);
        };
        /**
         * Watch the navigation links and selection function
         */
        var deregister = $scope.$watchGroup(['navigationLinks', 'navigationSelected'], function() {
          if (!_.isEmpty($scope.navigationLinks)) {

            if (isNavigationCollectionValid()) {
              if (!_.isUndefined($scope.navigationSelected)) {
                // If the navigation selection function is set, then
                // attach it to the click function on each navigation points
                _.each($scope.navigationLinks, function(nav) {
                  nav.clickFn = $scope.navigationSelected();
                });
              }

              // Instantiate and render the navigation
              var navigation = new womply.ui.Navigation(womply.ui.util.getId('gc-navigation'), $scope.navigationLinks);
              navigation.render();

              $rootScope.$on('$locationChangeStart', function () {
                highlightNavigation(navigation);
              });

              highlightNavigation(navigation);

              deregister();
            }
          }
        });
      }
    };
  }]);