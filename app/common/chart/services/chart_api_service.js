angular.module('womply')
  .service('ChartAPIService', function() {

    var apis = {};

    var ChartAPI = function() {
      var chart = null;
      var options = {
        chart: {
          renderTo: null,
          type: null
        },
        title: {
          text: null
        },
        xAxis: {
          categories: null
        },
        series: []
      };
      /**
       * Set the chart instance
       * @param {HighChart.Chart} chrt - the high chart instance
       */
      this.setChart = function() {
        /**
        * NOTE: Idea: Check if the chart is capable of being setup by checking
        * the config object for completeness.  Generally attempt to make chart
        * creation independent of timing issues in controllers or directives
        **/

        chart = new Highcharts.Chart(options);
      };
      /**
       * Setter for the options value
       *
       * @param {object} opts - the chart options
       */
      this.setOptions = function(opts) {
        options = opts;
      };
      /**
       * Get the options value
       * @returns {*}
       */
      this.getOptions = function() {
        return options;
      };
      /**
       * Check if the chart has pending data
       * @returns {boolean}
       */
      this.hasPendingData = function() {
        return !_.isNull(pendingData);
      };
      this.hasPendingSeriesData = function() {
        return !_.isNull(pendingSeriesData);
      }
      /**
       * Set the series data
       *
       * @param {Array} data - the data array to set on the series
       * @param {Number} series - the series to update
       */
      this.setSeriesData = function(data) {
        if (_.isNull(chart)) {
          options.series.push(data);
        } else {
          updateSeriesData(data);
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

      /**
       * Set the target element for Highcharts config
       * @param {DOMElement} target - target DOM node
       */
      this.setRenderTo = function(target) {
        options.chart.renderTo = target;
        return this;
      };

      /**
       * Set the title for the Highcharts config
       * @param {String} chartTitle - string for the chart title
       */
      this.setTitle = function(chartTitle) {
        options.title.text = chartTitle;
        return this;
      };

      /**
       * Set the type of chart in Highcharts config
       * @param {String} chartType - string for the chart type
       */
      this.setType = function(chartType) {
        options.chart.type = chartType;
        return this;
      };

      /**
       * Set the xAxis information in Highcharts config
       * @param {Array<Labels> chartXAxis an array of xAxis labels
       */
      this.setXAxis = function(chartXAxis) {
        options.xAxis.categories = chartXAxis;
        return this;
      };

      var updateData = function(data) {
        _.each(data, function(datum) {
          if (_.isObject(datum)) {
            updateSeriesData(datum);
          }
        });
      };

      var updateSeriesData = function(data) {
        if (!_.isUndefined(chart)) {
          chart.addSeries(data);
        } else {
          options.series.push(data);
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
