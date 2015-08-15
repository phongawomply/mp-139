angular.module('womply')
  .service('ChartAPIService', function($q) {

    var apis = {};

    var ChartAPI = function() {
      var chart = null;
      var optionDefer = $q.defer();
      var options = null;
      var pendingData = null;
      var pendingSeriesData = null;
      var pendingSeries = null;
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
        if (this.hasPendingData()) {
          updateData(pendingData);
          pendingData = null;
        }

        if (this.hasPendingSeriesData()) {
          this.setSeriesData(pendingSeriesData, pendingSeries);
          pendingSeriesData = null;
          pendingSeries = null;
        }
      };
      /**
       * Setter for the options value
       *
       * @param {object} opts - the chart options
       */
      this.setOptions = function(opts) {
        options = opts;
        optionDefer.resolve(options);
      };
      /**
       * Get the options value
       * @returns {*}
       */
      this.getOptions = function() {
        return optionDefer.promise;
      };
      /**
       * Check if the chart has pending data
       * @returns {boolean}
       */
      this.hasPendingData = function() {
        return !_.isNull(pendingData);
      };
      /**
       * Check if the chart has series pending data
       * @returns {boolean}
       */
      this.hasPendingSeriesData = function() {
        return !_.isNull(pendingSeriesData);
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
          pendingSeriesData = data;
          pendingSeries = series;
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
          pendingData = data;
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
      },
      register: function(chartId, target) {
        if (!_.has(apis, chartId)) {
          apis[chartId] = new ChartAPI().setRenderTo(target);
        } else {
          apis[chartId].setRenderTo(target);
        }
          apis[chartId].setChart();
      }
    }
  });
