describe('SideBarConfig', function() {
  beforeEach(module('womply'));

  var service, navItems;
  beforeEach(inject(function(SideBarConfig, SideBarNavigationAPI) {
    service = SideBarConfig;
    service.call();
    SideBarNavigationAPI.onAppNavigationItemsChange(function(items) {
      navItems = items;
    });
  }));

  it('sets up nav item', function() {
    expect(navItems.length).toBe(6);
    expect(navItems[0].id()).toBe('getStarted');
    expect(navItems[1].id()).toBe('summary');
    expect(navItems[2].id()).toBe('visitFrequency');
    expect(navItems[3].id()).toBe('newVsRepeat');
    expect(navItems[4].id()).toBe('ranking');
    expect(navItems[5].id()).toBe('spendBehavior');
  });
});
