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

    it('sets the chart options', inject(function($rootScope) {
      var options = {
        hello: 'world'
      };

      api.setOptions(options);
      var optionSpy = jasmine.createSpy();
      api.getOptions().then(optionSpy);
      $rootScope.$digest();
      expect(optionSpy).toHaveBeenCalledWith(options);
    }));

    it('sets the chart instance', function() {
      expect(_.isFunction(api.setChart)).toBeTruthy();
    });

    describe('series data', function() {
      it('sets the data as pending without a chart instance', function() {
        api.setSeriesData({series1: [1, 2, 3]});
        expect(api.hasPendingSeriesData()).toBeTruthy();
      });

      it('sets data on chart instance', function() {
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

      it('sets pending data on chart instance', function() {
        api.setSeriesData([]);

        var series1 = {
          setData: jasmine.createSpy()
        };

        var chart = {
          series: [series1]
        };

        api.setChart(chart);
        expect(series1.setData).toHaveBeenCalled();
        expect(api.hasPendingSeriesData()).toEqual(false);
      });
    });

    describe('data', function() {
      it('sets data', function() {
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
        api.setData([{data: []}, {data: []}]);

        var series1 = {
          setData: jasmine.createSpy()
        };

        var series2 = {
          setData: jasmine.createSpy()
        };

        var chart = {
          series: [series1, series2]
        };

        expect(series1.setData).not.toHaveBeenCalled();
        expect(series2.setData).not.toHaveBeenCalled();

        api.setChart(chart);
        expect(series1.setData).toHaveBeenCalled();
        expect(series2.setData).toHaveBeenCalled();
      });

      it('adds series data', function() {
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