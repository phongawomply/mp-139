angular.module('womply')
  .factory('SideBarConfig', ['ApplicationService', function(ApplicationService) {
    return function() {
      ApplicationService.appNavigationConfig
        .create()
        .id('getStarted')
        .text('Get Started')
        .route('get-started')
        .type('primary-nav')
        .gmdIconName('remove_red_eye')
        .active(true)
        .add()

        .create()
        .id('summary')
        .text('Summary')
        .route('summary')
        .type('primary-nav')
        .gmdIconName('storage')
        .add()

        .create()
        .id('visitFrequency')
        .text('Visit Frequency')
        .route('visit-frequency')
        .type('primary-nav')
        .gmdIconName('directions_walk')
        .add()

        .create()
        .id('newVsRepeat')
        .text('New Vs Repeat')
        .route('new-vs-repeat')
        .type('primary-nav')
        .gmdIconName('swap_vert')
        .add()

        .create()
        .id('ranking')
        .text('Ranking')
        .route('ranking')
        .type('primary-nav')
        .gmdIconName('star_rate')
        .add()

        .create()
        .id('spendBehavior')
        .text('Spend Behavior')
        .route('spend-behavior')
        .type('primary-nav')
        .gmdIconName('attach_money')
        .add()

        .save();
    };
  }]);
