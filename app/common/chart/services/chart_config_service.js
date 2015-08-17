angular.module('womply')
  .service('ChartConfigService', function(CHART_TYPE) {
    /**
     * Axis title configuration class
     *
     * @param {object} config - the axis configuration
     * @constructor
     */
    var AxisTitle = function(config) {
      config.title = config.title || {};
      /**
       * Set the test for the title
       *
       * @param {string} title - the text for the title
       * @returns {*}
       */
      this.text = function(title) {
        if (_.isUndefined(title)) {
          return config.title.text;
        }
        config.title.text = title;
        return this;
      };
      /**
       * Hide the title
       *
       * @returns {*}
       */
      this.hide = function() {
        return this.text('');
      };
      /**
       * Rotate the title to be horizontal
       * @returns {AxisTitle}
       */
      this.horizontal = function() {
        config.title.rotation = 0;
        return this;
      };
      /**
       * Rotate the title to be vertical
       *
       * @returns {AxisTitle}
       */
      this.vertical = function() {
        config.title.rotation = 270;
        return this;
      };
      /**
       * Set the margin for the title
       *
       * @param {Number} margin - the margin from the title to the axis
       * @returns {*}
       */
      this.margin = function(margin) {
        if (_.isUndefined(margin)) {
          return config.title.margin;
        }

        config.title.margin = margin;
        return this;
      };
      /**
       * Set the style of the title
       *
       * @param {object} style - css object for the style
       * @returns {AxisTitle}
       */
      this.style = function(style) {
        config.title.style = style;
        return this;
      };
      /**
       * Set the x position for the title
       *
       * @param {number} xpos - the x position
       * @returns {AxisTitle}
       */
      this.x = function(xpos) {
        config.title.x = xpos;
        return this;
      };
      /**
       * Set the y position for the title
       *
       * @param {Number} pos - the position to set the y axis for
       * @returns {AxisTitle}
       */
      this.y = function(pos) {
        config.title.y = pos;
        return this;
      };
    };
    /**
     * Class to define axis category configuration
     *
     * @param {string} name - the name of the axis
     * @param {object} config - the current config object
     * @constructor
     */
    var Axis = function(name, config) {
      config[name] = config[name] || {};

      var title = null;
      /**
       * Add a category to the axis
       *
       * @param {string} category - the category to add
       * @returns {Axis}
       */
      this.setCategory = function(category) {
        config[name].categories = config[name].categories || [];

        if (!_.contains(config[name].categories, category)) {
          config[name].categories.push(category);
        }

        return this;
      };
      /**
       * Set the guideline width
       * @param {Number} width - the width for the guideline
       * @returns {*}
       */
      this.guideLineWidth = function(width) {
        if (_.isUndefined(width)) {
          return config[name].gridLineWidth;
        }

        config[name].gridLineWidth = width;
        return this;
      };
      /**
       * Set the tick width
       *
       * @param {Number} width - the tick width
       * @returns {*}
       */
      this.tickWidth = function(width) {
        if (_.isUndefined(width)) {
          return config[name].tickWidth;
        }

        config[name].tickWidth = width;
        return this;
      };
      /**
       * Get the title definition
       *
       * @returns {AxisTitle} - the title definition for the axis
       */
      this.title = function() {
        if (_.isNull(title)) {
          title = new AxisTitle(config[name]);
        }

        return title;
      };
      /**
       * Set the line color for the axis
       *
       * @param {string} color - css color definition to set
       * @returns {Axis}
       */
      this.color = function(color) {
        config[name].lineColor = color;
        return this;
      };
      /**
       * Hide the labels for the axis
       *
       * @returns {Axis}
       */
      this.hideLabels = function() {
        config[name].labels = config[name].labels || {};
        config[name].labels.enabled = false;
        return this;
      };
      /**
       * Hide the ticks for the label
       * @returns {Axis}
       */
      this.hideTicks = function() {
        config[name].tickLength = 0;
        return this;
      };
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
       * Getter and Setter for the title
       * @param title
       */
      this.title = function(title) {
        if (_.isUndefined(title)) {
          return config.title.text;
        }

        config['title'] = config['title'] || {};
        config['title'].text = title;

        return this;
      };
      /**
       * Set the render to
       * @param ele
       */
      this.renderTo = function(ele) {
        config.chart.renderTo = ele;
        return this;
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
      /**
       * Set the series data for the chart
       *
       * @param {Array<Series>} data - the series data to set
       */
      this.data = function(data) {
        if (_.isUndefined(data)) {
          return config.series;
        }

        config['series'] = data;
        return this;
      };
      /**
       * Add series data
       * @param data
       */
      this.seriesData = function(data) {
        config.series = config.series || [];
        config.series.push(data);
        return this;
      };
      /**
       * Hides the legend
       */
      this.hideLegend = function() {
        config.legend = config.legend || {};
        config.legend.enabled = false;
        return this;
      };
      /**
       * Hides the tooltip
       */
      this.hideTooltip = function() {
        config.tooltip = config.tooltip || {};
        config.tooltip.enabled = false;
        return this;
      };
    };

    return {
      /**
       * Create a chart configuration object
       *
       * @param {string} chartType - the chart type to create the configuration for
       * @returns {ChartConfig}
       */
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