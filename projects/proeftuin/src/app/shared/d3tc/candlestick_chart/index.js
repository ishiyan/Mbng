'use strict';

module.exports = function (d3) {
    /*var zoomable = require('../scale/zoomable')(),
        util = require('../util')(),
        accessors = require('../accessor')(),
        financetime = require('../scale/financetime')(d3.scaleLinear, d3, d3.bisect, util.rebindCallback, widen, zoomable);*/

    const lengthToPx = function (value, reference) {
        if (typeof value == 'number' || (typeof value == 'object' && value.constructor === Number)) {
            return +value;
        }
        const length = value.length;
        const numeric = value.match(/\d+/);
        if (value.endsWith('%')) {
            return +numeric / 100 * reference;
        }
        //if (value.endsWith('px')) {
        //    return +numeric;
        //}
        return +numeric;
    }

    const convertLayout = function(config, referenceWidth) {
        const layout = {
            totalWidth: 0, // inclusive margin
            totalHeight: 0, // inclusive margin
            left: config.margin.left, // left margin
            width: lengthToPx(config.width, referenceWidth) - config.margin.left - config.margin.right, // content width
            chart: { top: config.margin.top }
        };
        const width = layout.width;
        layout.totalWidth = width + config.margin.left + config.margin.right;
        let height = lengthToPx(config.heightChart, width);    
        layout.chart.height = height;
        let top = layout.chart.top + height;

        if (config.heightIndicatorPanes && config.heightIndicatorPanes.length > 0) {
          const length = config.heightIndicatorPanes.length;
          layout.indicatorPanes = [];
          for (let i = 0; i < length; ++i) {
              height = lengthToPx(config.heightIndicatorPanes[i], width);
              const pane = {};
              pane.top = top;
              pane.height = height;
              layout.indicatorPanes.push(pane);
              top += height;
          }
        }

        if (config.heightNavigation) {
            layout.navigation = {
                top: top,
                height: lengthToPx(config.heightNavigation, width)
            };
            top += layout.navigation.height;
        }

        top += config.margin.bottom;
        layout.totalHeight = top;
        return layout;
    };
    
    return {
        convertLayout: convertLayout
    };
};
