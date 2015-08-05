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
  .controller('AppController', ['ConfigLoader', 'Context', function(ConfigLoader, Context) {
    ConfigLoader.initialize()
      .then(_.bind(function(config) {
        this.userMenuLinks = config.UserMenuLinks;
        this.applicationId = config.ApplicationId;
      }, this));

    Context.getCurrentMerchantLocation()
      .then(_.bind(function(slug) {
        this.slug = slug;
      }, this));
  }]);