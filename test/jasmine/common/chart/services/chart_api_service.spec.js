describe('ChartAPIService', function() {
  beforeEach(module('womply'));

  var service;
  beforeEach(inject(function(ChartAPIService) {
    service = ChartAPIService;
  }));

  describe('initialization', function() {
    it('gets an api instance', function() {
      var api = service.getAPI('myId');
      expect(api).toBeDefined();
    });

    it('gets the same api instance', function() {
      var api1 = service.getAPI('myId');
      var api2 = service.getAPI('myId');

      expect(api1).toBe(api2);
    });
  });

  describe('chart api', function() {
    var api;
    beforeEach(function() {
      api = service.getAPI('myId');
    });

    it('sets the chart instance', function() {
      expect(_.isFunction(api.setChart)).toBeTruthy();
    });

    describe('config', function() {
      it('gets config data', function() {
        var config = api.config();

        expect(config).toBeDefined();
      });

      it('gets the config object', inject(function($rootScope) {
        var config = api.config('column');
        var spy = jasmine.createSpy();

        api.getConfig().then(spy);
        $rootScope.$digest();
        expect(spy).toHaveBeenCalledWith(config);
      }));
    });

    describe('series data', function() {
      it('throws an error if config not set without chart', function() {
        expect(function() {
          expect(api.setSeriesData([1,2,3]));
        }).toThrowError('Configuration must be set via config().');
      });

      it('sets the data as pending without a chart instance', function() {
        api.config('column');
        var data = {series1: [1, 2, 3]};
        api.setSeriesData(data);
        expect(api.config().data()).toEqual([data])
      });

      it('sets data on chart instance', function() {
        api.config('column');
        var series1 = {
          setData: jasmine.createSpy()
        };

        var chart = {
          series: [series1]
        };

        api.setChart(chart);
        api.setSeriesData([]);
        expect(series1.setData).toHaveBeenCalled();
      });

      it('sets data on the specific series', function() {
        api.config('column');
        var series1 = {
          setData: jasmine.createSpy()
        };

        var series2 = {
          setData: jasmine.createSpy()
        };

        var chart = {
          series: [series1, series2]
        };

        api.setChart(chart);
        api.setSeriesData([], 2);
        expect(series2.setData).toHaveBeenCalled();
      });
    });

    describe('data', function() {

      it('throws an error if config and chart not set', function() {
        expect(function() {
          api.setData([1,2,3]);
        }).toThrowError('Configuration must be set via config().');
      });

      it('sets data', function() {
        api.config('column');
        var series1 = {
          setData: jasmine.createSpy()
        };

        var series2 = {
          setData: jasmine.createSpy()
        };

        var chart = {
          series: [series1, series2]
        };

        api.setChart(chart);
        api.setData([{data: []}, {data: []}]);

        expect(series1.setData).toHaveBeenCalled();
        expect(series2.setData).toHaveBeenCalled();
      });

      it('sets pending data', function() {
        api.config('column');

        var data = [{data: []}, {data: []}];
        api.setData(data);

        expect(api.config().data()).toBeDefined();
        expect(api.config().data()).toEqual(data);
      });

      it('adds series data', function() {
        api.config('column');

        var chart = {
          addSeries: jasmine.createSpy()
        };

        api.setChart(chart);
        api.setData([{data: []}, {data: []}]);

        expect(chart.addSeries).toHaveBeenCalled();
      });

    });
  });
});
