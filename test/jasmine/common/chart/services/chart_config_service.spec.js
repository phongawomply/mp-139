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

    it('should save', function() {
      var config = service.create('column');
      var spy = jasmine.createSpy();
      config.saved(spy);
      config.save();
      expect(spy).toHaveBeenCalled();
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

    it('gets the title', function() {
      config.title('hello world');
      expect(config.title()).toEqual('hello world');
    });

    it('sets the series data', function() {
      var data = 'myData';
      config.data(data);

      expect(config.data()).toEqual('myData');
    });

    it('adds to the series data', function() {
      var data = 'myData';

      config.seriesData(data);
      expect(config.data()).toEqual(['myData']);
    });

    it('hides the legend', function() {
      config.hideLegend();
      expect(config.toJSON().legend.enabled).toEqual(false);
    });

    it('hides the tooltip', function() {
      config.hideTooltip();

      expect(config.toJSON().tooltip.enabled).toEqual(false);
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

    it('sets the guideline width', function() {
      axis.guideLineWidth(10);
      expect(config.toJSON().xAxis.gridLineWidth).toEqual(10);
    });

    it('gets the guideLine width', function() {
      axis.guideLineWidth(10);
      expect(axis.guideLineWidth()).toEqual(10);
    });

    it('sets the tick width', function() {
      axis.tickWidth(10);
      expect(config.toJSON().xAxis.tickWidth).toEqual(10);
    });

    it('gets the tick width', function() {
      axis.tickWidth(10);
      expect(axis.tickWidth()).toEqual(10);
    });

    it('sets the line color', function() {
      axis.color('hello');
      expect(config.toJSON().xAxis.lineColor).toEqual('hello');
    });

    it('hides the labels', function() {
      axis.hideLabels();
      expect(config.toJSON().xAxis.labels.enabled).toEqual(false);
    });

    it('hides the ticks', function() {
      axis.hideTicks();

      expect(config.toJSON().xAxis.tickLength).toEqual(0);
    });

    describe('title', function() {
      it('hides the title', function() {
        axis.title().hide();

        expect(config.toJSON().xAxis.title.text).toEqual('');
      });

      it('sets the title', function() {
        axis.title().text('hello');
        expect(config.toJSON().xAxis.title.text).toEqual('hello');
      });

      it('gets the title', function() {
        axis.title().text('hello');
        expect(axis.title().text()).toEqual('hello');
      });

      it('sets the title horizontal', function() {
        axis.title().horizontal();
        expect(config.toJSON().xAxis.title.rotation).toEqual(0);
      });

      it('sets the title vertical', function() {
        axis.title().vertical();
        expect(config.toJSON().xAxis.title.rotation).toEqual(270);
      });

      it('sets the margin', function() {
        axis.title().margin(40);
        expect(config.toJSON().xAxis.title.margin).toEqual(40);
      });

      it('gets the margin', function() {
        axis.title().margin(40);
        expect(axis.title().margin()).toEqual(40);
      });

      it('sets the style', function() {
        axis.title().style('hello');
        expect(config.toJSON().xAxis.title.style).toEqual('hello');
      });

      it('sets the x position', function() {
        axis.title().x(5);
        expect(config.toJSON().xAxis.title.x).toEqual(5);
      });

      it('sets the y position', function() {
        axis.title().y(5);
        expect(config.toJSON().xAxis.title.y).toEqual(5);
      });
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