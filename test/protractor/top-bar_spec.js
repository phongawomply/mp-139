describe('Top-bar page validation', function () {
  var topBarPage;
  beforeEach(function () {
    var TopBarPage = require('../protractor/page-objects/top-bar.js');
    topBarPage = new TopBarPage();
  });

  describe('top bar elements all present', function () {
    beforeEach(function () {
      browser.get('#/197330/nav1');
    });
    it('gc logo is present', function () {
      expect(topBarPage.getGcLogo().isPresent()).toBeTruthy();
    });

    it('App Launcher is present', function () {
      expect(topBarPage.getGcAppLauncher().isPresent()).toBeTruthy();
    });

    it('location list is present', function () {
      expect(topBarPage.getGcLocationList().isPresent()).toBeTruthy();
    });

    it('correct location is selected', function () {
      expect(topBarPage.getGcSelectedLocation().isPresent()).toBeTruthy();
    });
  });
});
