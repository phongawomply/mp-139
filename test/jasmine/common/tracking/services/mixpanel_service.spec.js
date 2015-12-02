describe('MixPanelService', function() {
  setup();

  window.mixpanel = {
    init: function () {},
    track: function () {}
  };

  var service, rootScope, timeout;
  beforeEach(inject(function($rootScope, $timeout, MixPanelService) {
    service = MixPanelService;
    rootScope = $rootScope;
    timeout = $timeout;
  }));

  describe('initialize', function() {
    it('the first time', function() {
      spyOn(mixpanel, 'init').and.callFake(function(token, options) {
        options.loaded();
      });

      var spy = jasmine.createSpy();
      service.initialize('1234').then(spy);

      timeout.flush();
      rootScope.$digest();

      expect(mixpanel.init).toHaveBeenCalledWith('1234', jasmine.any(Object));
      expect(spy).toHaveBeenCalled();
    });

    it('once only', function() {
      spyOn(mixpanel, 'init').and.callFake(function(token, options) {
        options.loaded();
      });

      service.initialize('1234');

      timeout.flush();
      rootScope.$digest();

      expect(mixpanel.init).toHaveBeenCalledWith('1234', jasmine.any(Object));

      service.initialize('1234');

      rootScope.$digest();

      expect(mixpanel.init.calls.count()).toEqual(1);
    });
  });

  describe('track', function() {

    it('when initialized', function() {
      spyOn(mixpanel, 'init').and.callFake(function(token, options) {
        options.loaded();
      });

      spyOn(mixpanel, 'track').and.callThrough();

      service.initialize('1234');
      timeout.flush();
      rootScope.$digest();

      var data = {someProperty: 'some data'};
      service.track('myEvent', data);

      rootScope.$digest();

      expect(mixpanel.track).toHaveBeenCalledWith('myEvent', data);
    });

    it('sends tracking after initialized', function() {
      spyOn(mixpanel, 'init').and.callFake(function(token, options) {
        options.loaded();
      });

      spyOn(mixpanel, 'track').and.callThrough();

      var data = {someProperty: 'some data'};
      service.track('myEvent', data);
      rootScope.$digest();

      expect(mixpanel.track).not.toHaveBeenCalled();

      service.initialize('1234');
      timeout.flush();
      rootScope.$digest();

      expect(mixpanel.track).toHaveBeenCalledWith('myEvent', data);
    });

    it('performs multiple tracks', function() {
      spyOn(mixpanel, 'init').and.callFake(function(token, options) {
        options.loaded();
      });

      spyOn(mixpanel, 'track').and.callThrough();

      var data = {someProperty: 'some data'};
      service.track('myEvent', data);
      rootScope.$digest();

      expect(mixpanel.track).not.toHaveBeenCalled();

      service.initialize('1234');
      timeout.flush();
      rootScope.$digest();

      expect(mixpanel.track).toHaveBeenCalledWith('myEvent', data);

      mixpanel.track.calls.reset();
      service.track('anotherEvent');
      rootScope.$digest();
      expect(mixpanel.track).toHaveBeenCalledWith('anotherEvent', {});
    });

    it('appends the default properties', function() {
      spyOn(mixpanel, 'init').and.callFake(function(token, options) {
        options.loaded();
      });

      spyOn(mixpanel, 'track').and.callThrough();

      service.initialize('1234', {myProperty: 'hello world'});
      timeout.flush();
      rootScope.$digest();

      var data = {someProperty: 'some data'};
      service.track('myEvent', data);

      rootScope.$digest();

      expect(mixpanel.track).toHaveBeenCalledWith('myEvent', _.extend({myProperty: 'hello world'}, data));
    });

  });


});