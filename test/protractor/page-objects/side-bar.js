module.exports = function() {
  this.getGcNavigationList = function() {
    return element(by.css('#gc-navigation'));
  };

  this.getGcNavigationItems = function() {
    return element.all(by.css('.gc-navigation-list-item'));
  };

  this.getGcSelectedNavigationItem = function() {
    return element(by.css('.gc-navigation-list-item.is-active'));
  };

  this.getGcNotSelectedNavigationItems = function() {
    return element.all(by.css('.gc-navigation-list-item:not(.is-active)'));
  };

  this.getPageContent = function() {
    return element(by.css('.main-section'));
  };
};
