describe('Directive: Chart', function() {
  beforeEach(module('womply'));

  var rootScope, optionDefer, setChartSpy, apiService;
  beforeEach(inject(function($rootScope, $compile, $q, ChartAPIService) {
    optionDefer = $q.defer();
    setChartSpy = jasmine.createSpy('setChart');
    spyOn(ChartAPIService, 'getAPI').and.returnValue({
      getOptions: function() {
        return optionDefer.promise;
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

    var option = {
      chart: {}
    };

    optionDefer.resolve(option);
    rootScope.$digest();
    expect(option.chart.renderTo).toBeDefined();
    expect(setChartSpy).toHaveBeenCalled();
  });
});