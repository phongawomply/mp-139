angular.module('womply')
  .factory('SideBarConfig', ['SideBarNavigationAPI', function(SideBarNavigationAPI) {
    return function() {
      SideBarNavigationAPI.appNavigationConfig
        .create()
        .id('example')
        .text('Example')
        .route('example')
        .type('primary-nav')
        .gmdIconName('remove_red_eye')
        .add()

        .create()
        .id('billing')
        .text('Billing')
        .route('billing')
        .type('primary-nav')
        .gmdIconName('remove_red_eye')
        .add()

        .save();
    };
  }]);
