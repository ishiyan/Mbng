import { Sample } from '../shared/samples/sample';

export const treeNodes: Sample[] = [
  {
    name: 'Charts',
    children: [
      {
        name: 'Ohlcv chart',
        children: [
          { name: 'Study', header: 'Ohlcv chart: study', route: 'charts/ohlcv-chart/study' },
          {
            name: 'Selectors',
            children: [
              { name: 'Line width', header: 'Ohlcv chart: line width', route: 'charts/ohlcv-chart/selectors/line-width' },
              { name: 'Line dash', header: 'Ohlcv chart: line dash', route: 'charts/ohlcv-chart/selectors/line-dash' },
              { name: 'Line interpolation', header: 'Ohlcv chart: line interpolation', route: 'charts/ohlcv-chart/selectors/line-interpolation' },
              { name: 'Color', header: 'Ohlcv chart: color', route: 'charts/ohlcv-chart/selectors/color' },
              { name: 'Line style', header: 'Ohlcv chart: line style', route: 'charts/ohlcv-chart/selectors/line-style' },
              { name: 'Line selector', header: 'Ohlcv chart: line selector', route: 'charts/ohlcv-chart/selectors/line-selector' }
            ]
          }
        ]
      },
      {
        name: 'Sparkline',
        children: [
          { name: 'Features', header: 'Sparkline features', route: 'charts/sparkline/features' },
          { name: 'Mat-select', header: 'Sparkline mat-select', route: 'charts/sparkline/mat-select' },
          { name: 'Mat-list', header: 'Sparkline mat-list', route: 'charts/sparkline/mat-list' }
        ]
      },
      {
        name: 'Frequency response',
        children: [
          { name: 'Features', header: 'Frequency response features', route: 'charts/frequency-response/features' }
        ]
      },
      {
        name: 'Multiline',
        children: [
          { name: 'Features', header: 'Multiline features', route: 'charts/multiline/features' }
        ]
      },
      {
        name: 'Stackline',
        children: [
          { name: 'Features', header: 'Stackline features', route: 'charts/stackline/features' }
        ]
      },
      {
        name: 'Sunburst',
        children: [
          { name: 'Features', header: 'Sunburst features', route: 'charts/sunburst/features' },
          { name: 'Countries', header: 'Sunburst countries', route: 'charts/sunburst/countries' },
          { name: 'AEX', header: 'Sunburst AEX-index', route: 'charts/sunburst/aex' },
          { name: 'OMXN40', header: 'Sunburst OMXN40-index', route: 'charts/sunburst/omxn40' },
          { name: 'JDK', header: 'Sunburst JDK', route: 'charts/sunburst/jdk' }
        ]
      },
      {
        name: 'Icicle',
        children: [
          { name: 'Features', header: 'Icicle features', route: 'charts/icicle/features' },
          { name: 'Countries', header: 'Icicle countries', route: 'charts/icicle/countries' },
          { name: 'AEX', header: 'Icicle AEX-index', route: 'charts/icicle/aex' },
          { name: 'OMXN40', header: 'Icicle OMXN40', route: 'charts/icicle/omxn40' },
          { name: 'JDK', header: 'Icicle JDK', route: 'charts/icicle/jdk' }
        ]
      },
      {
        name: 'Treemap',
        children: [
          { name: 'Features', header: 'Treemap features', route: 'charts/treemap/features' },
          { name: 'Countries', header: 'Treemap countries', route: 'charts/treemap/countries' },
          { name: 'AEX', header: 'Treemap AEX-index', route: 'charts/treemap/aex' },
          { name: 'OMXN40', header: 'Treemap OMXN40', route: 'charts/treemap/omxn40' },
          { name: 'JDK', header: 'Treemap JDK', route: 'charts/treemap/jdk' }
        ]
      },
      {
        name: 'Circlepack',
        children: [
          { name: 'Features', header: 'Circlepack features', route: 'charts/circlepack/features' },
          { name: 'Countries', header: 'Circlepack countries', route: 'charts/circlepack/countries' },
          { name: 'AEX', header: 'Circlepack AEX-index', route: 'charts/circlepack/aex' },
          { name: 'OMXN40', header: 'Circlepack OMXN40', route: 'charts/circlepack/omxn40' },
          { name: 'JDK', header: 'Circlepack JDK', route: 'charts/circlepack/jdk' }
        ]
      },
      {
        name: 'Voronoi',
        children: [
          { name: 'Features', header: 'Voronoi features', route: 'charts/voronoi/features' },
          { name: 'Countries', header: 'Voronoi countries', route: 'charts/voronoi/countries' },
          { name: 'AEX', header: 'Voronoi AEX-index', route: 'charts/voronoi/aex' },
          { name: 'OMXN40', header: 'Voronoi OMXN40', route: 'charts/voronoi/omxn40' },
          { name: 'JDK', header: 'Voronoi JDK', route: 'charts/voronoi/jdk' }
        ]
      },
      {
        name: 'Hilbert curve',
        children: [
          { name: 'Features', header: 'Hilbert curve features', route: 'charts/hilbert-curve/features' }
        ]
      }

    ]
  }, {
    name: 'Colors',
    children: [
      {
        name: 'Color disc',
        children: [
          { name: 'Features', header: 'Color disc features', route: 'colors/color-disc/features' },
          { name: 'Picker', header: 'Color disc picker', route: 'colors/color-disc/picker' }
        ]
      },
      {
        name: 'Color picker',
        children: [
          { name: 'Features', header: 'Color picker features', route: 'colors/color-picker/features' },
        ]
      },
      {
        name: 'Swatches',
        children: [
          { name: 'Material Design 3 color tokens', header: 'Material Design 3 color tokens', route: 'colors/swatches/md3-color-tokens' },
          { name: 'Features', header: 'Swatches features', route: 'colors/swatches/features' },
          { name: 'Material palettes', header: 'Material palettes', route: 'colors/swatches/material-palettes' },
          { name: 'Linear interpolated palettes', header: 'Linear interpolated palettes', route: 'colors/swatches/linear-interpolated-palettes' },
          { name: 'Triple interpolated palettes', header: 'Triple interpolated palettes', route: 'colors/swatches/triple-interpolated-palettes' },
          { name: 'Random procedural palettes', header: 'Random procedural', route: 'colors/swatches/random-procedural-palettes' },
          { name: 'Parametric procedural palettes', header: 'Parametric procedural', route: 'colors/swatches/parametric-procedural-palettes' },
          { name: 'Colors.co palettes', header: 'Colors.co palettes', route: 'colors/swatches/colors-co-palettes' },
          { name: 'Palettes from web', header: 'Palettes from web', route: 'colors/swatches/palettes-from-web' },
          { name: 'Predefined interpolated palettes', header: 'Predefined interpolated palettes', route: 'colors/swatches/predefined-interpolated-palettes' },
          { name: 'Predefined line palettes', header: 'Predefined line palettes', route: 'colors/swatches/predefined-line-palettes' }
        ]
      }
    ]
  }, {
    name: 'Data',
    children: [
      {
        name: 'Entities',
        children: [
          { name: 'Bar component selector', header: 'Bar component selector', route: 'data/entities/bar-component-selector' },
          { name: 'Quote component selector', header: 'Quote component selector', route: 'data/entities/quote-component-selector' }
        ]
      },
      {
        name: 'Generators',
        children: [
          { name: 'Chirp features', header: 'Chirp features', route: 'data/generators/chirp-features' },
          { name: 'Chirp parameters', header: 'Chirp parameters', route: 'data/generators/chirp-parameters' }
        ]
      },
      { name: 'Synthetic data', header: 'Synthetic data', route: 'data/synthetic-data' },
      { name: 'Instruments table', header: 'Instruments table', route: 'data/instruments-table' }
    ]
  }, {
    name: 'Trading',
    children: [
      {
        name: 'Indicators',
        children: [
          {
            name: 'Simple Moving Average',
            children: [
              { name: 'Params', header: 'Simple moving average params', route: 'trading/indicators/sma/parameters' },
              { name: 'Selector', header: 'Simple moving average selector', route: 'trading/indicators/sma/selector' }
            ]
          },
          {
            name: 'Triangular Moving Average',
            children: [
              { name: 'Params', header: 'Triangular moving average params', route: 'trading/indicators/trima/parameters' },
              { name: 'Selector', header: 'Triangular moving average selector', route: 'trading/indicators/trima/selector' }
            ]
          },
          {
            name: 'Weighted Moving Average',
            children: [
              { name: 'Params', header: 'Weighted moving average params', route: 'trading/indicators/wma/parameters' },
              { name: 'Selector', header: 'Weighted moving average selector', route: 'trading/indicators/wma/selector' }
            ]
          },
          {
            name: 'Exponential Moving Average',
            children: [
              { name: 'Params', header: 'Exponential moving average params', route: 'trading/indicators/ema/parameters' },
              { name: 'Selector', header: 'Exponential moving average selector', route: 'trading/indicators/ema/selector' }
            ]
          },
          {
            name: 'Statistics',
            children: [
              {
                name: 'Variance',
                children: [
                  { name: 'Params', header: 'Variance params', route: 'trading/indicators/statistics/var/parameters' },
                  { name: 'Selector', header: 'Variance selector', route: 'trading/indicators/statistics/var/selector' }
                ]
              },
              {
                name: 'Standard Deviation',
                children: [
                  { name: 'Params', header: 'Standard Deviation params', route: 'trading/indicators/statistics/stdev/parameters' },
                  { name: 'Selector', header: 'Standard Deviation selector', route: 'trading/indicators/statistics/stdev/selector' }
                ]
              }
            ]
          },
          {
            name: 'Patrick Mulloy',
            children: [
              {
                name: 'Double Exponential Moving Average',
                children: [
                  { name: 'Params', header: 'Double Exponential Moving Average params', route: 'trading/indicators/patrick-mulloy/dema/parameters' },
                  { name: 'Selector', header: 'Double Exponential Moving Average selector', route: 'trading/indicators/patrick-mulloy/dema/selector' }
                ]
              },
              {
                name: 'Triple Exponential Moving Average',
                children: [
                  { name: 'Params', header: 'Triple Exponential Moving Average params', route: 'trading/indicators/patrick-mulloy/tema/parameters' },
                  { name: 'Selector', header: 'Triple Exponential Moving Average selector', route: 'trading/indicators/patrick-mulloy/tema/selector' }
                ]
              }
            ]
          },
          {
            name: 'Tim Tillson',
            children: [
              {
                name: 'T2 Exponential Moving Average',
                children: [
                  { name: 'Params', header: 'T2 Exponential Moving Average params', route: 'trading/indicators/tim-tillson/t2/parameters' },
                  { name: 'Selector', header: 'T2 Exponential Moving Average selector', route: 'trading/indicators/tim-tillson/t2/selector' }
                ]
              },
              {
                name: 'T3 Exponential Moving Average',
                children: [
                  { name: 'Params', header: 'T3 Exponential Moving Average params', route: 'trading/indicators/tim-tillson/t3/parameters' },
                  { name: 'Selector', header: 'T3 Exponential Moving Average selector', route: 'trading/indicators/tim-tillson/t3/selector' }
                ]
              }
            ]
          },
          {
            name: 'Mark Jurik',
            children: [
              {
                name: 'Jurik Moving Average',
                children: [
                  { name: 'Params', header: 'Jurik Moving Average params', route: 'trading/indicators/mark-jurik/jma/parameters' },
                  { name: 'Selector', header: 'Jurik Moving Average selector', route: 'trading/indicators/mark-jurik/jma/selector' },
                  { name: 'Dialog', header: 'Jurik Moving Average dialog', route: 'trading/indicators/mark-jurik/jma/dialog' }
                ]
              }
            ]
          },
          {
            name: 'Perry Kaufman',
            children: [
              {
                name: 'Kaufman Adaptive Moving Average',
                children: [
                  { name: 'Params', header: 'Kaufman Adaptive Moving Average params', route: 'trading/indicators/perry-kaufman/kama/parameters' },
                  { name: 'Selector', header: 'Kaufman Adaptive Moving Average selector', route: 'trading/indicators/perry-kaufman/kama/selector' }
                ]
              }
            ]
          },
          {
            name: 'John Ehlers',
            children: [
              {
                name: 'Hilbert Transformer Cycle Estimator type',
                children: [
                  { name: 'Selector', header: 'Hilbert Transformer Cycle Estimator type selector', route: 'trading/indicators/john-ehlers/htce-t/selector' }
                ]
              },
              {
                name: 'Hilbert Transformer Cycle Estimator params',
                children: [
                  { name: 'Params', header: 'Hilbert Transformer Cycle Estimator params', route: 'trading/indicators/john-ehlers/htce/parameters' },
                  { name: 'Selector', header: 'Hilbert Transformer Cycle Estimator selector', route: 'trading/indicators/john-ehlers/htce/selector' },
                  { name: 'Dialog', header: 'Hilbert Transformer Cycle Estimator dialog', route: 'trading/indicators/john-ehlers/htce/dialog' }
                ]
              },
              {
                name: 'Mesa Adaptive Moving Average params',
                children: [
                  { name: 'Params', header: 'Mesa Adaptive Moving Average params', route: 'trading/indicators/john-ehlers/mama/parameters' },
                  { name: 'Selector', header: 'Mesa Adaptive Moving Average selector', route: 'trading/indicators/john-ehlers/mama/selector' },
                  { name: 'Dialog', header: 'Mesa Adaptive Moving Average dialog', route: 'trading/indicators/john-ehlers/mama/dialog' }
                ]
              },
              {
                name: 'Fractal Adaptive Moving Average params',
                children: [
                  { name: 'Params', header: 'Fractal Adaptive Moving Average params', route: 'trading/indicators/john-ehlers/frama/parameters' },
                  { name: 'Selector', header: 'Fractal Adaptive Moving Average selector', route: 'trading/indicators/john-ehlers/frama/selector' },
                  { name: 'Dialog', header: 'Fractal Adaptive Moving Average dialog', route: 'trading/indicators/john-ehlers/frama/dialog' }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];
