import { MbSample } from './mb-sample';

export const treeNodes: MbSample[] = [
  {
    name: 'Ohlcv chart study', header: 'Ohlcv chart study', route: 'ohlcv-chart-study'
  }, {
    name: 'Synthetic data', header: 'Synthetic data', route: 'synthetic-data'
  }, {
    name: 'Data',
    children: [
      { name: 'Synthetic data', header: 'Synthetic data', route: 'synthetic-data' }
    ]
  }, {
    name: 'Instruments',
    children: [
      { name: 'Instruments table', header: 'Instruments table', route: 'instruments-table' }
    ]
  }, {
    name: 'Components',
    children: [
      {
        name: 'Frequency response',
        children: [
          { name: 'Features', header: 'Frequency response features', route: 'comp-freqresp/s1' }
        ]
      },
      {
        name: 'Ohlcv chart',
        children: [
          { name: 'Candlestick chart', header: 'Candlestick chart', route: 'ohlcv-chart-study' }
        ]
      },
      {
        name: 'Sparkline',
        children: [
          { name: 'Features', header: 'Sparkline features', route: 'comp-sparkline/s1' },
          { name: 'Mat-select', header: 'Sparkline mat-select', route: 'comp-sparkline/s2' },
          { name: 'Mat-list', header: 'Sparkline mat-list', route: 'comp-sparkline/s3' }
        ]
      },
      {
        name: 'Multiline',
        children: [
          { name: 'Features', header: 'Multiline features', route: 'comp-multiline/s1' }
        ]
      },
      {
        name: 'Stackline',
        children: [
          { name: 'Features', header: 'Stackline features', route: 'comp-stackline/s1' }
        ]
      },
      {
        name: 'Sunbrst',
        children: [
          { name: 'Features', header: 'Sunburst features', route: 'comp-sunburst/s1' },
          { name: 'Countries', header: 'Sunburst countries', route: 'comp-sunburst/s2' },
          { name: 'AEX', header: 'Sunburst AEX-index', route: 'comp-sunburst/s3' },
          { name: 'OMXN40', header: 'Sunburst OMXN40', route: 'comp-sunburst/s4' },
          { name: 'JDK', header: 'Sunburst JDK', route: 'comp-sunburst/s5' }
        ]
      },
      {
        name: 'Icicle',
        children: [
          { name: 'Features', header: 'Icicle features', route: 'comp-icicle/s1' },
          { name: 'Countries', header: 'Icicle countries', route: 'comp-icicle/s2' },
          { name: 'AEX', header: 'Icicle AEX-index', route: 'comp-icicle/s3' },
          { name: 'OMXN40', header: 'Icicle OMXN40', route: 'comp-icicle/s4' },
          { name: 'JDK', header: 'Icicle JDK', route: 'comp-icicle/s5' }
        ]
      },
      {
        name: 'Treemap',
        children: [
          { name: 'Features', header: 'Treemap features', route: 'comp-treemap/s1' },
          { name: 'Countries', header: 'Treemap countries', route: 'comp-treemap/s2' },
          { name: 'AEX', header: 'Treemap AEX-index', route: 'comp-treemap/s3' },
          { name: 'OMXN40', header: 'Treemap OMXN40', route: 'comp-treemap/s4' },
          { name: 'JDK', header: 'Treemap JDK', route: 'comp-treemap/s5' }
        ]
      },
      {
        name: 'Circlepack',
        children: [
          { name: 'Features', header: 'Circlepack features', route: 'comp-circlepack/s1' },
          { name: 'Countries', header: 'Circlepack countries', route: 'comp-circlepack/s2' },
          { name: 'AEX', header: 'Circlepack AEX-index', route: 'comp-circlepack/s3' },
          { name: 'OMXN40', header: 'Circlepack OMXN40', route: 'comp-circlepack/s4' },
          { name: 'JDK', header: 'Circlepack JDK', route: 'comp-circlepack/s5' }
        ]
      },
      {
        name: 'Voronoi',
        children: [
          { name: 'Features', header: 'Voronoi features', route: 'comp-voronoi/s1' },
          { name: 'Countries', header: 'Voronoi countries', route: 'comp-voronoi/s2' },
          { name: 'AEX', header: 'Voronoi AEX-index', route: 'comp-voronoi/s3' },
          { name: 'OMXN40', header: 'Voronoi OMXN40', route: 'comp-voronoi/s4' },
          { name: 'JDK', header: 'Voronoi JDK', route: 'comp-voronoi/s5' }
        ]
      },
      {
        name: 'Hilbert curve',
        children: [
          { name: 'Features', header: 'Hilbert curve features', route: 'comp-hilbert-curve/s1' }
        ]
      },
      {
        name: 'Swatches',
        children: [
          { name: 'Features', header: 'Swatches features', route: 'comp-swatches/s1' },
          { name: 'Material palettes', header: 'Material palettes', route: 'comp-swatches/s2' },
          { name: 'Linear interpolated palettes', header: 'Linear interpolated palettes', route: 'comp-swatches/s3' },
          { name: 'Triple interpolated palettes', header: 'Triple interpolated palettes', route: 'comp-swatches/s10' },
          { name: 'Random procedural palettes', header: 'Random procedural', route: 'comp-swatches/s4' },
          { name: 'Parametric procedural palettes', header: 'Parametric procedural', route: 'comp-swatches/s5' },
          { name: 'Coolors.co palettes', header: 'Coolors.co palettes', route: 'comp-swatches/s6' },
          { name: 'Palettes from web', header: 'Palettes from web', route: 'comp-swatches/s7' },
          { name: 'Predefined interpolated palettes', header: 'Predefined interpolated palettes', route: 'comp-swatches/s8' },
          { name: 'Predefined line palettes', header: 'Predefined line palettes', route: 'comp-swatches/s11' },
          { name: 'Color picker', header: 'Color picker', route: 'comp-swatches/s9' }
        ]
      },
      {
        name: 'Data entities',
        children: [
          { name: 'Bar component selector', header: 'Bar component selector', route: 'comp-data-entities/s1' },
          { name: 'Quote component selector', header: 'Quote component selector', route: 'comp-data-entities/s2' }
        ]
      },
      {
        name: 'Ohlcv chart selectors',
        children: [
          { name: 'Line width', header: 'Line width', route: 'comp-ohlcv-chart-selector/s1' },
          { name: 'Line dash', header: 'Line dash', route: 'comp-ohlcv-chart-selector/s2' },
          { name: 'Line interpolation', header: 'Line interpolation', route: 'comp-ohlcv-chart-selector/s3' },
          { name: 'Color', header: 'Color', route: 'comp-ohlcv-chart-selector/s4' },
          { name: 'Line style', header: 'Line style', route: 'comp-ohlcv-chart-selector/s5' },
          { name: 'Line style selector', header: 'Line style selector', route: 'comp-ohlcv-chart-selector/s6' }
        ]
      },
      {
        name: 'Trading',
        children: [
          { name: 'Indicators',
            children: [
              { name: 'Simple Moving Average',
                children: [
                  { name: 'Params', header: 'Simple moving average params', route: 'comp-tra-ind-sma/s1' },
                  { name: 'Selector', header: 'Simple moving average selector', route: 'comp-tra-ind-sma/s2' }
                ]
              },
              { name: 'Triangular Moving Average',
                children: [
                  { name: 'Params', header: 'Triangular moving average params', route: 'comp-tra-ind-trima/s1' },
                  { name: 'Selector', header: 'Triangular moving average selector', route: 'comp-tra-ind-trima/s2' }
                ]
              },
              { name: 'Weighted Moving Average',
                children: [
                  { name: 'Params', header: 'Weighted moving average params', route: 'comp-tra-ind-wma/s1' },
                  { name: 'Selector', header: 'Weighted moving average selector', route: 'comp-tra-ind-wma/s2' }
                ]
              },
              { name: 'Exponential Moving Average',
                children: [
                  { name: 'Params', header: 'Exponential moving average params', route: 'comp-tra-ind-ema/s1' },
                  { name: 'Selector', header: 'Exponential moving average selector', route: 'comp-tra-ind-ema/s2' }
                ]
              },
              { name: 'Statistics',
                children: [
                  { name: 'Variance',
                    children: [
                      { name: 'Params', header: 'Variance params', route: 'comp-tra-ind-statistics-var/s1' },
                      { name: 'Selector', header: 'Variance selector', route: 'comp-tra-ind-statistics-var/s2' }
                    ]
                  },
                  { name: 'Standard Deviation',
                    children: [
                      { name: 'Params', header: 'Standard Deviation params', route: 'comp-tra-ind-statistics-stdev/s1' },
                      { name: 'Selector', header: 'Standard Deviation selector', route: 'comp-tra-ind-statistics-stdev/s2' }
                    ]
                  }
                ]
              },
              { name: 'Patrick Mulloy',
                children: [
                  { name: 'Double Exponential Moving Average',
                    children: [
                      { name: 'Params', header: 'Double Exponential Moving Average params', route: 'comp-tra-ind-patrick-mulloy-dema/s1' },
                      { name: 'Selector', header: 'Double Exponential Moving Average selector', route: 'comp-tra-ind-patrick-mulloy-dema/s2' }
                    ]
                  },
                  { name: 'Triple Exponential Moving Average',
                    children: [
                      { name: 'Params', header: 'Triple Exponential Moving Average params', route: 'comp-tra-ind-patrick-mulloy-tema/s1' },
                      { name: 'Selector', header: 'Triple Exponential Moving Average selector', route: 'comp-tra-ind-patrick-mulloy-tema/s2' }
                    ]
                  }
                ]
              },
              { name: 'Tim Tillson',
                children: [
                  { name: 'T2 Exponential Moving Average',
                    children: [
                      { name: 'Params', header: 'T2 Exponential Moving Average params', route: 'comp-tra-ind-tim-tillson-t2ema/s1' },
                      { name: 'Selector', header: 'T2 Exponential Moving Average selector', route: 'comp-tra-ind-tim-tillson-t2ema/s2' }
                    ]
                  },
                  { name: 'T3 Exponential Moving Average',
                    children: [
                      { name: 'Params', header: 'T3 Exponential Moving Average params', route: 'comp-tra-ind-tim-tillson-t3ema/s1' },
                      { name: 'Selector', header: 'T3 Exponential Moving Average selector', route: 'comp-tra-ind-tim-tillson-t3ema/s2' }
                    ]
                  }
                ]
              },
              { name: 'Mark Jurik',
                children: [
                  { name: 'Jurik Moving Average',
                    children: [
                      { name: 'Params', header: 'Jurik Moving Average params', route: 'comp-tra-ind-mark-jurik-jma/s1' },
                      { name: 'Selector', header: 'Jurik Moving Average selector', route: 'comp-tra-ind-mark-jurik-jma/s2' },
                      { name: 'Dialog', header: 'Jurik Moving Average dialog', route: 'comp-tra-ind-mark-jurik-jma/s3' }
                    ]
                  }
                ]
              },
              { name: 'Perry Kaufman',
                children: [
                  { name: 'Kaufman Adaptive Moving Average',
                    children: [
                      { name: 'Params', header: 'Kaufman Adaptive Moving Average params', route: 'comp-tra-ind-perry-kaufman-kama/s1' },
                      { name: 'Selector', header: 'Kaufman Adaptive Moving Average selector', route: 'comp-tra-ind-perry-kaufman-kama/s2' }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];
