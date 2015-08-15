describe('ChartConfigService', function() {
  var service;

  beforeEach(module('womply'));

  beforeEach(inject(function(ChartConfigService) {
    service = ChartConfigService;
  }));

  describe('initialization', function() {
    it('should get a config object for chart type', function() {
      var config = service.create('column');
      expect(config).toBeDefined();
    });

    it('should throw an exception without a chart type', function() {
      expect(function() {
        service.create();
      }).toThrowError('Chart type must be defined.');
    });

    it('throws an exception for invalid chart type', function() {
      expect(function() {
        service.create('hello');
      }).toThrowError('Chart type not supported.');
    });

    it('returns a JSON object', function() {
      var config = service.create('column');
      expect(config.toJSON()).toBeDefined();
      expect(config.toJSON().chart.type).toEqual('column');
    });
  });

  describe('chart', function() {
    var config;
    beforeEach(function() {
      config = service.create('column');
    });

    it('sets the renderTo', function() {
      config.renderTo('myId');
      expect(config.toJSON().chart.renderTo).toEqual('myId');
    });

    it('sets the title', function() {
      config.title('hello world');
      expect(config.toJSON().title.text).toEqual('hello world');
    });
  });

  describe('x-axis', function() {
    var config, axis;
    beforeEach(function() {
      config = service.create('column');
      axis = config.getXAxis();
    });

    it('gets an axis object', function() {
      expect(axis).toBeDefined();
      expect(config.toJSON().xAxis).toBeDefined();
    });

    it('sets the category', function() {
      axis.setCategory('cat1');
      axis.setCategory('cat2');
      expect(config.toJSON().xAxis.categories).toBeDefined();
      expect(config.toJSON().xAxis.categories).toEqual(['cat1', 'cat2']);
    });
  });

  describe('y-axis', function() {
    var config, axis;
    beforeEach(function() {
      config = service.create('column');
      axis = config.getYAxis();
    });

    it('gets an axis object', function() {
      expect(axis).toBeDefined();
      expect(config.toJSON().yAxis).toBeDefined();
    });

    it('sets the category', function() {
      axis.setCategory('cat1');
      axis.setCategory('cat2');
      expect(config.toJSON().yAxis.categories).toBeDefined();
      expect(config.toJSON().yAxis.categories).toEqual(['cat1', 'cat2']);
    });
  });

});