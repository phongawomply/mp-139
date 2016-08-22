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
        .active(true)
        .add()


        .save();
    };
  }]);
