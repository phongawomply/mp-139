window.mock = window.mock || {};

window.mock.context = function(slug) {
  slug = slug || '193';

  window.initialize = null;

  beforeEach(inject(function(ContextService, ContextModel, ProductListModel) {
    var initializedCallback = [];
    spyOn(ContextService, 'initialized').and.callFake(function(fn) {
      initializedCallback.push(fn);
    });

    window.mock.context.contextModel = new ContextModel(context_data);
    window.mock.context.contextModel.merchantSlug(slug);
    window.mock.context.contextModel.products(new ProductListModel(products_data.data));

    window.initialize = function() {
      _.each(initializedCallback, function(cb) {
        cb(window.mock.context.contextModel);
      });
    };

  }));

};