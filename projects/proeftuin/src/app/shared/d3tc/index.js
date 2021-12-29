'use strict';

var _d3 = require('d3');

module.exports = (function (d3) {
    return {
        // version: require('../build/version'),
        accessor: require('./accessor')(),
        plot: require('./plot')(d3),
        scale: require('./scale')(d3),
        svg: require('./svg')(d3),
        csch: require('./candlestick_chart')(d3),
        horizonChart: require('./horizon_chart')(d3)
    };
})(_d3);