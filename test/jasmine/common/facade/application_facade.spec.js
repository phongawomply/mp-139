describe('Service: ApplicationFacade', function() {
  setup();

  var service = null;
  var sideBarNavigationAPI = null;
  var contextService = null;
  var contextModel = null;
  var products = null;
  var partner = null;
  var initializedCallback = null;
  var initializingCallback = null;
  var EVENTS = null;
  var setProductPartnerAndSlug;
  var timeout;

  beforeEach(inject(function($injector, $timeout, ContextModel, ProductListModel, PartnerModel, APPLICATION_EVENTS) {
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
    spyOn(contextService, 'initializing').and.callFake(function(cb) {
      initializingCallback = cb;
    });
    service = $injector.get('ApplicationFacade');
    sideBarNavigationAPI = $injector.get('SideBarNavigationAPI');
    timeout = $timeout;
  }));

  it('returns sideBarNavigationConfig', inject(function($injector) {
    expect(service.sideBarNavigationConfig).toBe(sideBarNavigationAPI.appNavigationConfig);
  }));

  it('will not throw error if context has null values', inject(function(ContextModel) {
    var localContextData = angular.copy(context_data);
    localContextData.merchant_locations = null;
    var model = new ContextModel(context_data);
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
        timeout.flush();
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
        timeout.flush();
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
        timeout.flush();
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
        timeout.flush();

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
        timeout.flush();

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
        timeout.flush();

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
        timeout.flush();

        expect(callback).toHaveBeenCalled();
        expect(token).toBe(context_data.mixpanel_token);
      });
    });

    describe('onInitialized', function() {
      var callback;
      var deRegister;

      beforeEach(inject(function($location) {
        callback = jasmine.createSpy('onInitialized');
        deRegister = service.subscribe(EVENTS.onInitialized, callback);
      }));

      it('will get notified when context is in flight after data has been initialized', function() {
        initializedCallback(contextModel);

        initializingCallback();
        expect(callback).toHaveBeenCalledWith(null)
      });

      it('will get notified when context initialized is complete', function() {
        initializedCallback(contextModel);
        expect(callback).toHaveBeenCalledWith(true)
      });

      describe("On active merchant location change", function() {
        var location;
        var mlCallback;
        var deregML;
        var deRegInitialized;

        beforeEach(function() {
          mlCallback = jasmine.createSpy('onActiveMerchantLocationChange').and.callFake(function(l){
            location = l;
            deregML();
            deRegInitialized();
          });
          callback = jasmine.createSpy('onInitialized').and.callFake(function(data) {
            deregML = service.subscribe(EVENTS.onActiveMerchantLocationChange, mlCallback);
            timeout.flush();
          });
          deRegInitialized = service.subscribe(EVENTS.onInitialized, callback);
        });

        it('will update the location id', inject(function(MerchantLocationModel) {
          initializedCallback(contextModel);
          expect(callback).toHaveBeenCalledWith(true);
          expect(mlCallback).toHaveBeenCalledWith(location);
          expect(location.id()).toBe(193);

          initializingCallback();
          deRegInitialized = service.subscribe(EVENTS.onInitialized, callback);

          contextModel.merchantSlug(250);
          initializedCallback(contextModel);
          expect(mlCallback).toHaveBeenCalledWith(location);
          expect(location.id()).toBe(250);
        }));
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

  it('handles nested deregister', function() {
    var onUserChangeCallback = jasmine.createSpy('onUserChangeCallback');

    var unwatch = service.subscribe(EVENTS.onUserChange, function() {
      unwatch();
    });

    var dereg = service.subscribe(EVENTS.onUserChange, onUserChangeCallback);
    initializedCallback(contextModel);
    expect(onUserChangeCallback).toHaveBeenCalled();

    dereg();
  });

  it('handles deregistered immediately', inject(function($timeout) {
    initializedCallback(contextModel);

    var unwatch = service.subscribe(EVENTS.onUserChange, function() {
      expect(_.isFunction(unwatch)).toBe(true);
    });

    $timeout.flush();
  }));

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

  describe('accessors', function() {
    var context;
    beforeEach(inject(function(ContextModel, ProductListModel, PartnerModel) {
      context = new ContextModel(context_data);
      context.products(new ProductListModel(products_data.data));
      context.partner(new PartnerModel(products_data.data.partner));
      context.merchantSlug(193);
    }));

    describe('successful getters', function() {
      beforeEach(function() {
        initializedCallback(context);
      });

      it('gets the active merchant location', function() {
        expect(service.getActiveMerchantLocation()).toEqual(context.activeLocation());
      });

      it('gets the active product', function() {
        expect(service.getActiveProduct()).toEqual(context.activeProduct());
      });

      it('gets the active partner', function() {
        expect(service.getActivePartner()).toEqual(context.partner());
      });

      it('gets the product list', function() {
        expect(service.getProducts()).toEqual(context.products());
      });

      it('gets the merchant locations', function() {
        expect(service.getMerchantLocations()).toEqual(context.locations());
      });

      it('gets the user', function() {
        expect(service.getUser()).toEqual(context.user());
      });

      it('gets the active path', function() {
        expect(service.getActivePath()).toEqual(context.activePath());
      });

      it('gets the mix panel token', function() {
        expect(service.getMixPanelToken()).toEqual(context.mixpanelToken());
      });
    });

    describe('unsuccessful getters', function() {
      it('throws an error an error if context is null for active merchant location', function() {
        expect(function() {
          service.getActiveMerchantLocation();
        }).toThrowError('Accessors can only be used in subscribed callbacks');
      });

      it('throws an error an error if context is null for active product', function() {
        expect(function() {
          service.getActiveProduct();
        }).toThrowError('Accessors can only be used in subscribed callbacks');
      });

      it('throws an error an error if context is null for active partner', function() {
        expect(function() {
          service.getActivePartner();
        }).toThrowError('Accessors can only be used in subscribed callbacks');
      });

      it('throws an error an error if context is null for products', function() {
        expect(function() {
          service.getProducts();
        }).toThrowError('Accessors can only be used in subscribed callbacks');
      });

      it('throws an error an error if context is null for merchant locations', function() {
        expect(function() {
          service.getMerchantLocations();
        }).toThrowError('Accessors can only be used in subscribed callbacks');
      });

      it('throws an error an error if context is null for user', function() {
        expect(function() {
          service.getUser();
        }).toThrowError('Accessors can only be used in subscribed callbacks');
      });

      it('throws an error an error if context is null for active path', function() {
        expect(function() {
          service.getActivePath();
        }).toThrowError('Accessors can only be used in subscribed callbacks');
      });

      it('throws an error an error if context is null for mix panel token', function() {
        expect(function() {
          service.getMixPanelToken();
        }).toThrowError('Accessors can only be used in subscribed callbacks');
      });
    });


  });

});
