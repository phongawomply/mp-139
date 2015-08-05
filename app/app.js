angular.module('womply')
  /**
   * Set the $http request to allow for XHR
   */
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
  }])
  /**
   * Initialize the context
   */
  .run(['Context', function(Context) {
    Context.initialize();
  }])
  /**
   * Main application controller which initialize the configuration and sets the
   * controller values
   */
  .controller('AppController', ['$document', 'ConfigLoader', 'Context', function($document, ConfigLoader, Context) {
    var self = this;
    ConfigLoader.initialize()
      .then(function(config) {
        self.userMenuLinks = config.UserMenuLinks;
        self.applicationId = config.ApplicationId;
        self.navigationLinks = config.NavigationLinks;
        self.navigationSelected = config.NavigationSelected;
      });

    Context.getCurrentMerchantLocation()
      .then(function(slug) {
        self.slug = slug;
        return self.slug;
      })
      .then(Context.getMerchantLocations)
      .then(function(locations) {
        var location = _.find(locations, function(loc) {
          return loc.slug == self.slug || loc.id == self.slug;
        });
        if(_.isString(location.partner_slug)) {
          $document[0].body.id = location.partner_slug.toLowerCase();
        }
      });
  }]);
