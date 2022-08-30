import { MbSample } from './mb-sample';

export const treeNodes: MbSample[] = [
  {
    name: 'Ohlcv chart study', header: 'Ohlcv chart study', route: 'ohlcv-chart-study'
  }, {
    name: 'Synthetic data', header: 'Synthetic data', route: 'synthetic-data'
  }, {
    name: 'Data',
    children: [
      {name: 'Synthetic data', header: 'Synthetic data', route: 'synthetic-data'}
    ]
  }, {
    name: 'Instruments',
    children: [
      {name: 'Instruments table', header: 'Instruments table', route: 'instruments-table'}
    ]
  }, {
    name: 'Components',
    children: [
      {
        name: 'Frequency response',
        children: [
          {name: 'Features', header: 'Frequency response features', route: 'comp-freqresp/s1'}
        ]
      },
      {
        name: 'Ohlcv chart',
        children: [
          {name: 'Candlestick chart', header: 'Candlestick chart', route: 'ohlcv-chart-study'}
        ]
      },
      {
        name: 'Sparkline',
        children: [
          {name: 'Features', header: 'Sparkline features', route: 'comp-sparkline/s1'},
          {name: 'Mat-select', header: 'Sparkline mat-select', route: 'comp-sparkline/s2'},
          {name: 'Mat-list', header: 'Sparkline mat-list', route: 'comp-sparkline/s3'}
        ]
      },
      {
        name: 'Multiline',
        children: [
          {name: 'Features', header: 'Multiline features', route: 'comp-multiline/s1'}
        ]
      },
      {
        name: 'Stackline',
        children: [
          {name: 'Features', header: 'Stackline features', route: 'comp-stackline/s1'}
        ]
      },
      {
        name: 'Sunbrst',
        children: [
          {name: 'Features', header: 'Sunburst features', route: 'comp-sunburst/s1'},
          {name: 'Countries', header: 'Sunburst countries', route: 'comp-sunburst/s2'},
          {name: 'AEX', header: 'Sunburst AEX-index', route: 'comp-sunburst/s3'},
          {name: 'OMXN40', header: 'Sunburst OMXN40', route: 'comp-sunburst/s4'},
          {name: 'JDK', header: 'Sunburst JDK', route: 'comp-sunburst/s5'}
        ]
      },
      {
        name: 'Icicle',
        children: [
          {name: 'Features', header: 'Icicle features', route: 'comp-icicle/s1'},
          {name: 'Countries', header: 'Icicle countries', route: 'comp-icicle/s2'},
          {name: 'AEX', header: 'Icicle AEX-index', route: 'comp-icicle/s3'},
          {name: 'OMXN40', header: 'Icicle OMXN40', route: 'comp-icicle/s4'},
          {name: 'JDK', header: 'Icicle JDK', route: 'comp-icicle/s5'}
        ]
      },
      {
        name: 'Treemap',
        children: [
          {name: 'Features', header: 'Treemap features', route: 'comp-treemap/s1'},
          {name: 'Countries', header: 'Treemap countries', route: 'comp-treemap/s2'},
          {name: 'AEX', header: 'Treemap AEX-index', route: 'comp-treemap/s3'},
          {name: 'OMXN40', header: 'Treemap OMXN40', route: 'comp-treemap/s4'},
          {name: 'JDK', header: 'Treemap JDK', route: 'comp-treemap/s5'}
        ]
      },
      {
        name: 'Circlepack',
        children: [
          {name: 'Features', header: 'Circlepack features', route: 'comp-circlepack/s1'},
          {name: 'Countries', header: 'Circlepack countries', route: 'comp-circlepack/s2'},
          {name: 'AEX', header: 'Circlepack AEX-index', route: 'comp-circlepack/s3'},
          {name: 'OMXN40', header: 'Circlepack OMXN40', route: 'comp-circlepack/s4'},
          {name: 'JDK', header: 'Circlepack JDK', route: 'comp-circlepack/s5'}
        ]
      },
      {
        name: 'Voronoi',
        children: [
          {name: 'Features', header: 'Voronoi features', route: 'comp-voronoi/s1'},
          {name: 'Countries', header: 'Voronoi countries', route: 'comp-voronoi/s2'},
          {name: 'AEX', header: 'Voronoi AEX-index', route: 'comp-voronoi/s3'},
          {name: 'OMXN40', header: 'Voronoi OMXN40', route: 'comp-voronoi/s4'},
          {name: 'JDK', header: 'Voronoi JDK', route: 'comp-voronoi/s5'}
        ]
      },
      {
        name: 'Swatches',
        children: [
          {name: 'Features', header: 'Swatches features', route: 'comp-swatches/s1'},
          {name: 'Material palettes', header: 'Material palettes', route: 'comp-swatches/s2'},
          {name: 'Linear interpolated palettes', header: 'Linear interpolated palettes', route: 'comp-swatches/s3'},
          {name: 'Random procedural palettes', header: 'Random procedural', route: 'comp-swatches/s4'},
          {name: 'Parametric procedural palettes', header: 'Parametric procedural', route: 'comp-swatches/s5'},
          {name: 'Coolors.co palettes', header: 'Coolors.co palettes', route: 'comp-swatches/s6'},
          {name: 'Palettes from web', header: 'Palettes from web', route: 'comp-swatches/s7'},
          {name: 'Predefined interpolated palettes', header: 'Predefined interpolated palettes', route: 'comp-swatches/s8'}
        ]
      },
      {
        name: 'Data entities',
        children: [
          {name: 'Bar component selector', header: 'Bar component selector', route: 'comp-data-entities/s1'}
        ]
      }
    ]
  }
];
