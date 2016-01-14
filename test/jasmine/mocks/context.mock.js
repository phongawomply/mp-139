window.mock = window.mock || {};

window.mock.application = function(slug) {
  slug = slug || '193';
  window.application = window.application || {};

  window.application.initialize = null;

  beforeEach(inject(function(ApplicationFacade, ContextModel, ProductListModel) {
    var initializedCallback = {};
    spyOn(ApplicationFacade, 'subscribe').and.callFake(function(event, fn) {
      initializedCallback[event] = initializedCallback[event] || [];
      initializedCallback[event].push(fn);
      return function() {};
    });

    window.mock.application.contextModel = new ContextModel(context_data);
    window.mock.application.contextModel.merchantSlug(slug);
    window.mock.application.contextModel.products(new ProductListModel(products_data.data));

    window.application.initialize = function(event, data) {
      _.each(initializedCallback[event], function(cb) {
        cb(data);
      });
    };

  }));

};