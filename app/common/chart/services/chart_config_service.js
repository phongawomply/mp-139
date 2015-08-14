angular.module('womply')
  .service('ChartConfigService', function(CHART_TYPE) {
    /**
     * Class to define axis category configuration
     *
     * @param {string} name - the name of the axis
     * @param {object} config - the current config object
     * @constructor
     */
    var Axis = function(name, config) {
      config[name] = config[name] || {};

      this.setCategory = function(category) {
        config[name].categories = config[name].categories || [];

        if (!_.contains(config[name].categories, category)) {
          config[name].categories.push(category);
        }
      }
    };
    /**
     * Define a chart configuration object
     *
     * @param {string} type - the chart type of CHART_TYPE
     * @constructor
     */
    var ChartConfig = function(type) {
      var config = {
        chart: {
          type: type
        }
      };

      var xAxis = new Axis('xAxis', config);
      var yAxis = new Axis('yAxis', config);
      /**
       * Get the configuration object representation
       * @returns {object}
       */
      this.toJSON = function() {
        return config;
      };
      /**
       * Set the render to
       * @param ele
       */
      this.renderTo = function(ele) {
        config.chart.renderTo = ele;
      };
      /**
       * Get the xAxis configuration object
       * @returns {Axis}
       */
      this.getXAxis = function() {
        return xAxis;
      };
      /**
       * Get the yAxis configuration object
       * @returns {Axis}
       */
      this.getYAxis = function() {
        return yAxis;
      };
    };

    return {
      create: function(chartType) {
        if (_.isEmpty(chartType)) {
          throw new Error('Chart type must be defined.');
        }

        if (!_.contains(CHART_TYPE, chartType)) {
          throw new Error('Chart type not supported.');
        }

        return new ChartConfig(chartType);
      }
    }
  })
  .constant('CHART_TYPE', {
    COLUMN      : 'column'
  });