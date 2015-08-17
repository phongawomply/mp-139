describe('Directive: Chart', function() {
  beforeEach(module('womply'));

  var rootScope, configDefer, setChartSpy, apiService;
  beforeEach(inject(function($rootScope, $compile, $q, ChartAPIService) {
    configDefer = $q.defer();
    setChartSpy = jasmine.createSpy('setChart');
    spyOn(ChartAPIService, 'getAPI').and.returnValue({
      getConfig: function() {
        return configDefer.promise;
      },
      setChart: setChartSpy
    });

    var element = angular.element('<chart data-chart-id="myId"></chart>');
    $compile(element)($rootScope.$new());
    $rootScope.$digest();
    rootScope = $rootScope;
    apiService = ChartAPIService;
  }));

  it('gets the chart api from the service', function() {
    expect(apiService.getAPI).toHaveBeenCalledWith('myId');
  });

  it('sets the chart when options resolve', function() {
    window.Highcharts = {
      Chart: function() {}
    };

    var config = {
      renderTo: function() {
        this.chart.renderTo = 'element';
      },
      toJSON: function() {
      },
      chart: {}
    };

    configDefer.resolve(config);
    rootScope.$digest();
    expect(config.chart.renderTo).toBeDefined();
    expect(setChartSpy).toHaveBeenCalled();
  });
});
