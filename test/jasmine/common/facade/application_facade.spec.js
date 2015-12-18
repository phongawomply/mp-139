describe('Service: ApplicationFacade', function() {
  disableModuleRun('womply');
  beforeEach(module('womply'));
  beforeEach(module('womply.mock'));
  beforeEach(module('womply.gmd-nav'));

  var service = null;
  var sideBarNavigationAPI = null;
  var contextService = null;
  var contextModel = null;
  var products = null;
  var partner = null;
  var initializedCallback = null;
  var EVENTS = null;
  var setProductPartnerAndSlug;

  beforeEach(inject(function($injector, ContextModel, ProductListModel, PartnerModel, APPLICATION_EVENTS) {
    setProductPartnerAndSlug = function(model) {
      model.products(new ProductListModel(products_data.data));
      model.partner(new PartnerModel(products_data.data.partner));
      model.merchantSlug(193);
    };

    EVENTS = APPLICATION_EVENTS;
    contextModel = new ContextModel(context_data);
    setProductPartnerAndSlug(contextModel);
    contextService = $injector.get('ContextService');
    spyOn(contextService, 'initialized').and.callFake(function(cb) {
      initializedCallback = cb;
    });
    service = $injector.get('ApplicationFacade');
    sideBarNavigationAPI = $injector.get('SideBarNavigationAPI');
  }));

  it('returns sideBarNavigationConfig', inject(function($injector) {
    expect(service.sideBarNavigationConfig).toBe(sideBarNavigationAPI.appNavigationConfig);
  }));

  it('will not throw error if context has null values', inject(function(ContextModel) {
    var model = new ContextModel({});
    setProductPartnerAndSlug(model);
    initializedCallback(model);
  }));

  describe('can subscribe to', function() {

    describe('onActiveMerchantLocationChange', function() {
      var location;
      var callback;
      var deRegister;

      beforeEach(function() {
        callback = jasmine.createSpy('onActiveMerchantLocationChange').and.callFake(function(l) {
          location = l;
        });
        deRegister = service.subscribe(EVENTS.onActiveMerchantLocationChange, callback);
        initializedCallback(contextModel);
      });

      it('will get notified when it changes', inject(function(MerchantLocationModel) {
        expect(callback).toHaveBeenCalled();
        expect(location instanceof MerchantLocationModel).toBe(true);
        expect(location.id()).toBe(193);

        contextModel.merchantSlug(250);
        initializedCallback(contextModel);
        expect(location instanceof MerchantLocationModel).toBe(true);
        expect(location.id()).toBe(250);
      }));

      it('will not get notified when it does not change', function() {
        callback.calls.reset();
        expect(callback).not.toHaveBeenCalled();
        initializedCallback(contextModel);
        expect(callback).not.toHaveBeenCalled();
      });

      it('will get notified when subscribing if the value is present', function() {
        callback.calls.reset();
        expect(callback).not.toHaveBeenCalled();
        deRegister();
        initializedCallback(contextModel);
        callback = jasmine.createSpy('onActiveMerchantLocationChange').and.callFake(function(l) {
          location = l;
        });
        service.subscribe(EVENTS.onActiveMerchantLocationChange, callback);
        expect(callback).toHaveBeenCalled();
        expect(location.id()).toBe(193);
      });
    });

    describe('onActiveProductChange', function() {
      var product;
      var callback;
      var deRegister;
      var locationHost;

      beforeEach(inject(function($location) {
        locationHost = 'app2.womply.com';
        spyOn($location, 'host').and.callFake(function() {
          return locationHost;
        });
        callback = jasmine.createSpy('onActiveProductChange').and.callFake(function(l) {
          product = l;
        });
        deRegister = service.subscribe(EVENTS.onActiveProductChange, callback);
        initializedCallback(contextModel);
      }));

      it('will get notified when it changes', inject(function(ProductModel) {
        expect(callback).toHaveBeenCalled();
        expect(product instanceof ProductModel).toBe(true);
        expect(product.id()).toBe(104);

        locationHost = 'app6.womply.com';
        initializedCallback(contextModel);
        expect(product instanceof ProductModel).toBe(true);
        expect(product.id()).toBe(5);
      }));

      it('will not get notified when it does not change', function() {
        callback.calls.reset();
        expect(callback).not.toHaveBeenCalled();
        initializedCallback(contextModel);
        expect(callback).not.toHaveBeenCalled();
      });

      it('will get notified when subscribing if the value is present', function() {
        callback.calls.reset();
        expect(callback).not.toHaveBeenCalled();
        deRegister();
        initializedCallback(contextModel);
        callback = jasmine.createSpy('onActiveProductChange').and.callFake(function(l) {
          product = l;
        });
        service.subscribe(EVENTS.onActiveProductChange, callback);
        expect(callback).toHaveBeenCalled();
        expect(product.id()).toBe(104);
      });
    });

    describe('onActivePartnerChange', function() {
      var partner;
      var callback;
      var deRegister;

      beforeEach(function() {
        callback = jasmine.createSpy('onActivePartnerChange').and.callFake(function(l) {
          partner = l;
        });
        deRegister = service.subscribe(EVENTS.onActivePartnerChange, callback);
        initializedCallback(contextModel);
      });

      it('will get notified when it changes', inject(function(PartnerModel) {
        expect(callback).toHaveBeenCalled();
        expect(partner instanceof PartnerModel).toBe(true);
        expect(partner.id()).toBe(10);

        var newModel = new PartnerModel({
          id: 11
        });
        contextModel.partner(newModel);
        initializedCallback(contextModel);
        expect(partner instanceof PartnerModel).toBe(true);
        expect(partner.id()).toBe(11);
      }));

      it('will not get notified when it does not change', function() {
        callback.calls.reset();
        expect(callback).not.toHaveBeenCalled();
        initializedCallback(contextModel);
        expect(callback).not.toHaveBeenCalled();
      });

      it('will get notified when subscribing if the value is present', function() {
        callback.calls.reset();
        expect(callback).not.toHaveBeenCalled();
        deRegister();
        initializedCallback(contextModel);
        callback = jasmine.createSpy('onActivePartnerChange').and.callFake(function(l) {
          partner = l;
        });
        service.subscribe(EVENTS.onActivePartnerChange, callback);
        expect(callback).toHaveBeenCalled();
        expect(partner.id()).toBe(10);
      });
    });

    describe('onProductsChange', function() {
      var products;
      var callback;
      var deRegister;

      beforeEach(function() {
        callback = jasmine.createSpy('onProductsChange').and.callFake(function(l) {
          products = l;
        });
        deRegister = service.subscribe(EVENTS.onProductsChange, callback);
        initializedCallback(contextModel);
      });

      it('will get notified when it changes', inject(function(ProductListModel, ProductModel) {
        expect(callback).toHaveBeenCalled();
        expect(products instanceof ProductListModel).toBe(true);
        expect(products.products().length).toBe(7);
        var data = angular.copy(products_data.data);
        data.jointProducts.push({
          id: 999
        });
        var newModel = new ProductListModel(data);
        contextModel.products(newModel);
        initializedCallback(contextModel);
        expect(products instanceof ProductListModel).toBe(true);
        expect(products.products().length).toBe(8);
      }));

      it('will not get notified when it does not change', function() {
        callback.calls.reset();
        expect(callback).not.toHaveBeenCalled();
        initializedCallback(contextModel);
        expect(callback).not.toHaveBeenCalled();
      });

      it('will get notified when subscribing if the value is present', function() {
        callback.calls.reset();
        expect(callback).not.toHaveBeenCalled();
        deRegister();
        initializedCallback(contextModel);
        callback = jasmine.createSpy('onProductsChange').and.callFake(function(l) {
          products = l;
        });
        service.subscribe(EVENTS.onProductsChange, callback);
        expect(callback).toHaveBeenCalled();
        expect(products.products().length).toBe(7);
      });
    });

    describe('onMerchantLocationsChange', function() {
      var locations;
      var callback;
      var deRegister;

      beforeEach(function() {
        callback = jasmine.createSpy('onMerchantLocationsChange').and.callFake(function(l) {
          locations = l;
        });
        deRegister = service.subscribe(EVENTS.onMerchantLocationsChange, callback);
        initializedCallback(contextModel);
      });

      it('will get notified when it changes', inject(function(MerchantLocationListModel, ContextModel) {
        expect(callback).toHaveBeenCalled();
        expect(locations instanceof MerchantLocationListModel).toBe(true);
        expect(locations.list().length).toBe(4);

        var data = angular.copy(context_data);
        data.merchant_locations.push({
          id: 999
        });
        var newModel = new ContextModel(data);
        setProductPartnerAndSlug(newModel);
        initializedCallback(newModel);
        expect(locations instanceof MerchantLocationListModel).toBe(true);
        expect(locations.list().length).toBe(5);
      }));

      it('will not get notified when it does not change', function() {
        callback.calls.reset();
        expect(callback).not.toHaveBeenCalled();
        initializedCallback(contextModel);
        expect(callback).not.toHaveBeenCalled();
      });

      it('will get notified when subscribing if the value is present', function() {
        callback.calls.reset();
        expect(callback).not.toHaveBeenCalled();
        deRegister();
        initializedCallback(contextModel);
        callback = jasmine.createSpy('onMerchantLocationsChange').and.callFake(function(l) {
          locations = l;
        });
        service.subscribe(EVENTS.onMerchantLocationsChange, callback);
        expect(callback).toHaveBeenCalled();
        expect(locations.list().length).toBe(4);
      });
    });

    describe('onPathChange', function() {
      var path;
      var callback;
      var deRegister;
      var mockedPath;

      beforeEach(inject(function($location) {
        callback = jasmine.createSpy('onPathChange').and.callFake(function(l) {
          path = l;
        });
        mockedPath = '/slug/path1';
        spyOn($location, 'path').and.callFake(function() {
          return mockedPath;
        });
        deRegister = service.subscribe(EVENTS.onPathChange, callback);
        initializedCallback(contextModel);
      }));

      it('will get notified when it changes', inject(function(UserModel, ContextModel) {
        expect(callback).toHaveBeenCalled();
        expect(path).toBe(mockedPath);
        mockedPath = '/slug/path2';
        initializedCallback(contextModel);
        expect(path).toBe('/slug/path2');
      }));

      it('will not get notified when it does not change', function() {
        callback.calls.reset();
        expect(callback).not.toHaveBeenCalled();
        initializedCallback(contextModel);
        expect(callback).not.toHaveBeenCalled();
      });

      it('will get notified when subscribing if the value is present', function() {
        callback.calls.reset();
        expect(callback).not.toHaveBeenCalled();
        deRegister();
        initializedCallback(contextModel);
        callback = jasmine.createSpy('onPathChange').and.callFake(function(l) {
          path = l;
        });
        service.subscribe(EVENTS.onPathChange, callback);
        expect(callback).toHaveBeenCalled();
        expect(path).toBe(mockedPath);
      });
    });

    describe('onMixPanelTokenChange', function() {
      var token;
      var callback;
      var deRegister;

      beforeEach(inject(function($location) {
        callback = jasmine.createSpy('onMixPanelTokenChange').and.callFake(function(l) {
          token = l;
        });
        deRegister = service.subscribe(EVENTS.onMixPanelTokenChange, callback);
        initializedCallback(contextModel);
      }));

      it('will get notified when it changes', inject(function(UserModel, ContextModel) {
        expect(callback).toHaveBeenCalled();
        expect(token).toBe(context_data.mixpanel_token);
      }));

      it('will not get notified when it does not change', function() {
        callback.calls.reset();
        expect(callback).not.toHaveBeenCalled();
        initializedCallback(contextModel);
        expect(callback).not.toHaveBeenCalled();
      });

      it('will get notified when subscribing if the value is present', function() {
        callback.calls.reset();
        expect(callback).not.toHaveBeenCalled();
        deRegister();
        initializedCallback(contextModel);
        callback = jasmine.createSpy('onMixPanelTokenChange').and.callFake(function(l) {
          token = l;
        });
        service.subscribe(EVENTS.onMixPanelTokenChange, callback);
        expect(callback).toHaveBeenCalled();
        expect(token).toBe(context_data.mixpanel_token);
      });
    });

    it('can register to multiple events by passing an array', function() {
      var onActiveMerchantLocationChangeCallback = jasmine.createSpy('onActiveMerchantLocationChangeCallback');
      var onActiveProductChangeCallback = jasmine.createSpy('onActiveProductChangeCallback');
      var onActivePartnerChangeCallback = jasmine.createSpy('onActivePartnerChangeCallback');
      var onProductsChangeCallback = jasmine.createSpy('onProductsChangeCallback');
      var onMerchantLocationsChangeCallback = jasmine.createSpy('onMerchantLocationsChangeCallback');
      var onUserChangeCallback = jasmine.createSpy('onUserChangeCallback');
      var onPathChangeCallback = jasmine.createSpy('onPathChangeCallback');
      service.subscribe([
        EVENTS.onActiveMerchantLocationChange,
        EVENTS.onActiveProductChange,
        EVENTS.onActivePartnerChange,
        EVENTS.onProductsChange,
        EVENTS.onMerchantLocationsChange,
        EVENTS.onUserChange,
        EVENTS.onPathChange
      ],[
        onActiveMerchantLocationChangeCallback,
        onActiveProductChangeCallback,
        onActivePartnerChangeCallback,
        onProductsChangeCallback,
        onMerchantLocationsChangeCallback,
        onUserChangeCallback,
        onPathChangeCallback
      ]);
      initializedCallback(contextModel);
      expect(onActiveMerchantLocationChangeCallback).toHaveBeenCalled();
      expect(onActiveProductChangeCallback).toHaveBeenCalled();
      expect(onActivePartnerChangeCallback).toHaveBeenCalled();
      expect(onProductsChangeCallback).toHaveBeenCalled();
      expect(onMerchantLocationsChangeCallback).toHaveBeenCalled();
      expect(onUserChangeCallback).toHaveBeenCalled();
      expect(onPathChangeCallback).toHaveBeenCalled();
    });
  });

  it('can deregister multiple subscriptions made through array', function() {
    var onActiveMerchantLocationChangeCallback = jasmine.createSpy('onActiveMerchantLocationChangeCallback');
    var onActiveProductChangeCallback = jasmine.createSpy('onActiveProductChangeCallback');
    var onActivePartnerChangeCallback = jasmine.createSpy('onActivePartnerChangeCallback');
    var onProductsChangeCallback = jasmine.createSpy('onProductsChangeCallback');
    var onMerchantLocationsChangeCallback = jasmine.createSpy('onMerchantLocationsChangeCallback');
    var onUserChangeCallback = jasmine.createSpy('onUserChangeCallback');
    var onPathChangeCallback = jasmine.createSpy('onPathChangeCallback');
    var deReg = service.subscribe([
      EVENTS.onActiveMerchantLocationChange,
      EVENTS.onActiveProductChange,
      EVENTS.onActivePartnerChange,
      EVENTS.onProductsChange,
      EVENTS.onMerchantLocationsChange,
      EVENTS.onUserChange,
      EVENTS.onPathChange
    ],[
      onActiveMerchantLocationChangeCallback,
      onActiveProductChangeCallback,
      onActivePartnerChangeCallback,
      onProductsChangeCallback,
      onMerchantLocationsChangeCallback,
      onUserChangeCallback,
      onPathChangeCallback
    ]);
    deReg();
    initializedCallback(contextModel);
    expect(onActiveMerchantLocationChangeCallback).not.toHaveBeenCalled();
    expect(onActiveProductChangeCallback).not.toHaveBeenCalled();
    expect(onActivePartnerChangeCallback).not.toHaveBeenCalled();
    expect(onProductsChangeCallback).not.toHaveBeenCalled();
    expect(onMerchantLocationsChangeCallback).not.toHaveBeenCalled();
    expect(onUserChangeCallback).not.toHaveBeenCalled();
    expect(onPathChangeCallback).not.toHaveBeenCalled();
  });

  describe('it will throw error if', function() {
    it('registered for an invalid event', function() {
      expect(function() {
        service.subscribe('invalid_event', function() {})
      }).toThrowError('event:invalid_event is not a valid event');
    });

    it('callback is not function', function() {
      expect(function() {
        service.subscribe(EVENTS.onActiveMerchantLocationChange)
      }).toThrowError('callback should be a function');
    });

    it('if no of events and callback does not match during subscription through array', function() {
      expect(function() {
        service.subscribe([EVENTS.onActiveMerchantLocationChange], [])
      }).toThrowError('No of events and callbacks does not match');
    });
  });

});