angular.module('womply')
  .controller('BillingDemoController', function() {
    this.hasBillingAccess = true;
    this.billingCardState = function(state) {
      console.log(state);
    }
  });