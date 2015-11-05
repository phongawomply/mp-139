describe('Side-bar page validation', function () {
  var sideBarPage;

  var nav1 = {
    linkId: 'gc-navigation-link-nav1',
    linkText: 'NAV 1',
    bodyText: 'Nav 1'
  };
  var nav2 = {
    linkId: 'gc-navigation-link-nav2',
    linkText: 'NAV 2',
    bodyText: 'Nav 2'
  };

  beforeEach(function () {
    var SideBarPage = require('../protractor/page-objects/side-bar.js');
    sideBarPage = new SideBarPage();
  });

  describe('default route', function () {
    beforeEach(function () {
      browser.get('#/197330');
    });

    it('redirects to /:slug/nav1', function () {
      expect(browser.getCurrentUrl()).toEqual('http://local.womply.com:9999/#/197330/nav1');
    });

    it('navigation list is present', function () {
      expect(sideBarPage.getGcNavigationList().isPresent()).toBeTruthy();
    });

    it('navigation list has 2 items', function () {
      expect(sideBarPage.getGcNavigationItems().count()).toEqual(2);
    });

    it('a navigation item is selected', function () {
      expect(sideBarPage.getGcSelectedNavigationItem().isPresent()).toBeTruthy();
    });

    it('correct navigation item is selected', function () {
      expect(sideBarPage.getGcSelectedNavigationItem().getText()).toEqual(nav1.linkText);
      expect(sideBarPage.getGcSelectedNavigationItem().getAttribute('id')).toEqual(nav1.linkId);
    });

    it('all other navigation items are not selected', function () {
      expect(sideBarPage.getGcNotSelectedNavigationItems().count()).toEqual(1);
    });

    it('page content displays Nav 1', function () {
      expect(sideBarPage.getPageContent().getText()).toEqual(nav1.bodyText);
    });

    it('clicking the selected navigation item does nothing', function () {
      sideBarPage.getGcSelectedNavigationItem().click();
      browser.sleep(1200);
      expect(sideBarPage.getGcSelectedNavigationItem().getText()).toEqual(nav1.linkText);
      expect(sideBarPage.getGcSelectedNavigationItem().getAttribute('id')).toEqual(nav1.linkId);
    });

    it('clicking the unselected navigation item switches to that item', function () {
      sideBarPage.getGcNotSelectedNavigationItems().first().click();
      expect(sideBarPage.getGcSelectedNavigationItem().getText()).toEqual(nav2.linkText);
      expect(sideBarPage.getGcSelectedNavigationItem().getAttribute('id')).toEqual(nav2.linkId);
      expect(sideBarPage.getPageContent().getText()).toEqual(nav2.bodyText);
    });
  });

  describe('side bar elements when on Nav 1', function () {
    beforeEach(function () {
      browser.get('#/197330/nav1');
    });

    it('the url path is /:slug/nav1', function () {
      expect(browser.getCurrentUrl()).toEqual('http://local.womply.com:9999/#/197330/nav1');
    });

    it('navigation list is present', function () {
      expect(sideBarPage.getGcNavigationList().isPresent()).toBeTruthy();
    });

    it('navigation list has 2 items', function () {
      expect(sideBarPage.getGcNavigationItems().count()).toEqual(2);
    });

    it('a navigation item is selected', function () {
      expect(sideBarPage.getGcSelectedNavigationItem().isPresent()).toBeTruthy();
    });

    it('correct navigation item is selected', function () {
      expect(sideBarPage.getGcSelectedNavigationItem().getText()).toEqual(nav1.linkText);
      expect(sideBarPage.getGcSelectedNavigationItem().getAttribute('id')).toEqual(nav1.linkId);
    });

    it('all other navigation items are not selected', function () {
      expect(sideBarPage.getGcNotSelectedNavigationItems().count()).toEqual(1);
    });

    it('page content displays Nav 1', function () {
      expect(sideBarPage.getPageContent().getText()).toEqual(nav1.bodyText);
    });

    it('clicking the selected navigation item does nothing', function () {
      sideBarPage.getGcSelectedNavigationItem().click();
      browser.sleep(1200);
      expect(sideBarPage.getGcSelectedNavigationItem().getText()).toEqual(nav1.linkText);
      expect(sideBarPage.getGcSelectedNavigationItem().getAttribute('id')).toEqual(nav1.linkId);
    });

    it('clicking the unselected navigation item switches to that item', function () {
      sideBarPage.getGcNotSelectedNavigationItems().first().click();
      expect(sideBarPage.getGcSelectedNavigationItem().getText()).toEqual(nav2.linkText);
      expect(sideBarPage.getGcSelectedNavigationItem().getAttribute('id')).toEqual(nav2.linkId);
      expect(sideBarPage.getPageContent().getText()).toEqual(nav2.bodyText);
    });
  });

  describe('side bar elements when on Nav 2', function () {
    beforeEach(function () {
      browser.get('#/197330/nav2');
    });

    it('the url path is /:slug/nav2', function () {
      expect(browser.getCurrentUrl()).toEqual('http://local.womply.com:9999/#/197330/nav2');
    });

    it('navigation list is present', function () {
      expect(sideBarPage.getGcNavigationList().isPresent()).toBeTruthy();
    });

    it('navigation list has 2 items', function () {
      expect(sideBarPage.getGcNavigationItems().count()).toEqual(2);
    });

    it('a navigation item is selected', function () {
      expect(sideBarPage.getGcSelectedNavigationItem().isPresent()).toBeTruthy();
    });

    it('correct navigation item is selected', function () {
      expect(sideBarPage.getGcSelectedNavigationItem().getText()).toEqual(nav2.linkText);
      expect(sideBarPage.getGcSelectedNavigationItem().getAttribute('id')).toEqual(nav2.linkId);
    });

    it('all other navigation items are not selected', function () {
      expect(sideBarPage.getGcNotSelectedNavigationItems().count()).toEqual(1);
    });

    it('page content displays Nav 2', function () {
      expect(sideBarPage.getPageContent().getText()).toEqual(nav2.bodyText);
    });

    it('clicking the selected navigation item does nothing', function () {
      sideBarPage.getGcSelectedNavigationItem().click();
      browser.sleep(1200);
      expect(sideBarPage.getGcSelectedNavigationItem().getText()).toEqual(nav2.linkText);
      expect(sideBarPage.getGcSelectedNavigationItem().getAttribute('id')).toEqual(nav2.linkId);
    });

    it('clicking the unselected navigation item switches to that item', function () {
      sideBarPage.getGcNotSelectedNavigationItems().first().click();
      expect(sideBarPage.getGcSelectedNavigationItem().getText()).toEqual(nav1.linkText);
      expect(sideBarPage.getGcSelectedNavigationItem().getAttribute('id')).toEqual(nav1.linkId);
      expect(sideBarPage.getPageContent().getText()).toEqual(nav1.bodyText);
    });
  });
});
