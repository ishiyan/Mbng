'use strict';

// Provide IDs for all accessors. Default to date, but at least provide an option
module.exports = function() {
  return {
    crosshair: require('./crosshair'),
    ohlc: require('./ohlc'),
    trendline: require('./trendline'),
    value: require('./value'),
    volume: require('./volume'),
    tick: require('./tick'),
    trade: require('./trade'),
    supstance: require('./supstance')
  };
};
