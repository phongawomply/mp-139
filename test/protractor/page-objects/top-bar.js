module.exports = function() {

  this.getGcLogo = function() {
    return element(by.css('.gc-logo'))
  };

  this.getGcAppLauncher = function() {
    return element(by.css('#gc-app-launcher-toggle'))
  };

  this.getGcLocationList = function() {
    return element(by.css('#gc-location-menu-list'))
  };

  this.getGcSelectedLocation = function() {
    return element(by.css('#gc-location-menu-list .is-selected'))
  };
};
