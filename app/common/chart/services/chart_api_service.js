angular.module('womply')
  .service('ChartAPIService', ['$q', 'ChartConfigService', function($q, ChartConfigService) {

    var apis = {};

    var ChartAPI = function() {
      var chart = null;
      var optionDefer = $q.defer();
      var options = null;
      var pendingData = null;
      var pendingSeriesData = null;
      var pendingSeries = null;
      var config = null;
      /**
       * Set the chart instance
       * @param {HighChart.Chart} chrt - the high chart instance
       */
      this.setChart = function(chrt) {
        /**
        * NOTE: Idea: Check if the chart is capable of being setup by checking
        * the config object for completeness.  Generally attempt to make chart
        * creation independent of timing issues in controllers or directives
        **/

        chart = chrt;
      };
      /**
       * Getter and setter for the configuration object
       * @param {string} type - the chart type
       */
      this.config = function(type) {
        if (!_.isUndefined(type)) {
          config = ChartConfigService.create(type);
          optionDefer.resolve(config.toJSON());
        }

        return config;
      };
      /**
       * Get the options value
       * @returns {*}
       */
      this.getOptions = function() {
        return optionDefer.promise;
      };
      /**
       * Set the series data
       *
       * @param {Array} data - the data array to set on the series
       * @param {Number} series - the series to update
       */
      this.setSeriesData = function(data, series) {
        series = series || 1;
        if (_.isNull(chart)) {
          if (_.isNull(config)) {
            throw new Error('Configuration must be set via config().');
          }
          config.seriesData(data);
        } else {
          series -= 1;
          updateSeriesData(data, series);
        }
        return this;
      };
      /**
       * Set the data for all series
       * @param {Array<Series>} data - array of series information
       */
      this.setData = function(data) {
        if (_.isNull(chart)) {
          if (_.isNull(config)) {
            throw new Error('Configuration must be set via config().');
          }
          config.data(data);
        } else {
          updateData(data);
        }
        return this;
      };

      var updateData = function(data) {
        _.each(data, function(datum, index) {
          if (_.isObject(datum)) {
            updateSeriesData(datum, index);
          }
        });
      };

      var updateSeriesData = function(data, series) {
        if (_.isUndefined(chart.series) || _.isUndefined(chart.series[series])) {
          chart.addSeries(data);
        } else {
          chart.series[series].setData(data);
        }
      };
    };

    return {
      /**
       * Get the API for a given chart
       *
       * @param {string} chartId - the chart id
       * @returns {*}
       */
      getAPI: function(chartId) {
        if (!_.has(apis, chartId)) {
          apis[chartId] = new ChartAPI();
        }

        return apis[chartId];
      }
    }
  }
]);
