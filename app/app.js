angular.module('womply')
  /**
   * Set the $http request to allow for XHR
   */
  .config(function($httpProvider, $routeProvider, $mdThemingProvider) {
    $httpProvider.defaults.withCredentials = true;
    // Check the response and redirect to
    $httpProvider.interceptors.push(['$q', '$window', 'EnvironmentService', function($q, $window, EnvironmentService) {
      return {
        responseError: function (resp) {
          if (resp.status === 401) {
            $window.location.replace(EnvironmentService.getInsightsPath());
          }

          return $q.reject(resp);
        }
      }
    }]);

    /**
     * Womply primary palette
     */
    var wombatPrimaryColors = {
      '50': 'cde9f9',
      '100': 'addaf6',
      '200': '6dbeef',
      '300': '4cafec',
      '400': '2ca1e8',
      '500': '0c92e5',
      '600': '0874b7',
      '700': '07507a',
      '800': '053751',
      '900': '042f44',
      'A100': '6dbeef',
      'A200': '4cafec',
      'A400': '0874b7',
      'A700': '053751',
      'contrastDefaultColor': 'light'
    };

    /**
     * Womply accent palette
     */
    var wombatAccentColors = {
      '50': 'bff7c4',
      '100': 'a4ebac',
      '200': '89de95',
      '300': '6fd27d',
      '400': '39b9e4',
      '500': '1ead36',
      '600': '198d2c',
      '700': '136c21',
      '800': '115c1c',
      '900': '0e4c17',
      'A100': '89de95',
      'A200': '6fd27d',
      'A400': '198d2c',
      'A700': '053751',
      'contrastDefaultColor': 'light'
    };

    $mdThemingProvider.definePalette('wombatPalette', wombatPrimaryColors);
    $mdThemingProvider.definePalette('wombatAccentPalette', wombatAccentColors);
    $mdThemingProvider.theme('default')
      .primaryPalette('wombatPalette')
      .accentPalette('wombatAccentPalette', {
        'default': '500',
        'hue-1': '300'
      });
  })
  /**
   * Main application controller which initialize the configuration and sets the
   * controller values
   */
  .controller('AppController', ['$document', 'ConfigLoader', 'ApplicationFacade', 'MixPanelService', 'APPLICATION_EVENTS',
    function($document, ConfigLoader, ApplicationFacade, MixPanelService, APPLICATION_EVENTS) {
      var activeLocation = null;

      ConfigLoader.executeSideBarConfig();

      ApplicationFacade.subscribe(APPLICATION_EVENTS.onActiveMerchantLocationChange, function(location) {
        activeLocation = location;
        if(activeLocation && _.isString(activeLocation.partnerSlug())) {
          $document[0].title = activeLocation.partnerName() + " " + activeLocation.productName() + " - " + activeLocation.name();
        }
      });
  }]);
