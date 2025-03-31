import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '', loadComponent: () => import('./mb.component').then(m => m.MbComponent), children: [
      { path: 'ohlcv-chart-study', loadComponent: () => import('./mb-samples/ohlcv-chart-study/ohlcv-chart-study.component').then(m => m.OhlcvChartStudyComponent) },
      { path: 'synthetic-data', loadComponent: () => import('./mb-samples/synthetic-data/synthetic-data.component').then(m => m.SyntheticDataComponent) },
      { path: 'instruments-table', loadComponent: () => import('./mb-samples/instruments-table/instruments-table.component').then(m => m.InstrumentsTableComponent) },
      {
        path: 'comp-freqresp', loadChildren: () =>
          import('./mb-samples/components/frequency-response/sample-frequency-response.routes').then(m => m.routes)
      },
      {
        path: 'comp-sparkline', loadChildren: () =>
          import('./mb-samples/components/sparkline/sample-sparkline.routes').then(m => m.routes)
      },
      {
        path: 'comp-multiline', loadChildren: () =>
          import('./mb-samples/components/multiline/sample-multiline.routes').then(m => m.routes)
      },
      {
        path: 'comp-stackline', loadChildren: () =>
          import('./mb-samples/components/stackline/sample-stackline.routes').then(m => m.routes)
      },
      {
        path: 'comp-sunburst', loadChildren: () =>
          import('./mb-samples/components/sunburst/sample-sunburst.routes').then(m => m.routes)
      },
      {
        path: 'comp-icicle', loadChildren: () =>
          import('./mb-samples/components/icicle/sample-icicle.routes').then(m => m.routes)
      },
      {
        path: 'comp-treemap', loadChildren: () =>
          import('./mb-samples/components/treemap/sample-treemap.routes').then(m => m.routes)
      },
      {
        path: 'comp-circlepack', loadChildren: () =>
          import('./mb-samples/components/circlepack/sample-circlepack.routes').then(m => m.routes)
      },
      {
        path: 'comp-voronoi', loadChildren: () =>
          import('./mb-samples/components/voronoi/sample-voronoi.routes').then(m => m.routes)
      },
      {
        path: 'comp-hilbert-curve', loadChildren: () =>
          import('./mb-samples/components/hilbert-curve/sample-hilbert-curve.routes').then(m => m.routes)
      },
      {
        path: 'comp-swatches', loadChildren: () =>
          import('./mb-samples/components/swatches/sample-swatches.routes').then(m => m.routes)
      },
      {
        path: 'comp-data-entities', loadChildren: () =>
          import('./mb-samples/components/data-entities/sample-data-entities.routes').then(m => m.routes)
      },
      {
        path: 'comp-tra-ind-sma', loadChildren: () =>
          import('./mb-samples/components/trading/indicators/simple-moving-average/sample-simple-moving-average.routes')
            .then(m => m.routes)
      },
      {
        path: 'comp-tra-ind-trima', loadChildren: () =>
          import('./mb-samples/components/trading/indicators/triangular-moving-average/sample-triangular-moving-average.routes')
            .then(m => m.routes)
      },
      {
        path: 'comp-tra-ind-wma', loadChildren: () =>
          import('./mb-samples/components/trading/indicators/weighted-moving-average/sample-weighted-moving-average.routes')
            .then(m => m.routes)
      },
      {
        path: 'comp-tra-ind-ema', loadChildren: () =>
          import('./mb-samples/components/trading/indicators/exponential-moving-average/sample-exponential-moving-average.routes')
            .then(m => m.routes)
      },
      {
        path: 'comp-tra-ind-statistics-var', loadChildren: () =>
          import('./mb-samples/components/trading/indicators/statistics/variance/sample-variance.routes')
            .then(m => m.routes)
      },
      {
        path: 'comp-tra-ind-statistics-stdev', loadChildren: () =>
          import('./mb-samples/components/trading/indicators/statistics/standard-deviation/sample-standard-deviation.routes')
            .then(m => m.routes)
      },
      {
        path: 'comp-tra-ind-patrick-mulloy-dema', loadChildren: () =>
          import('./mb-samples/components/trading/indicators/patrick-mulloy/double-exponential-moving-average/sample-double-exponential-moving-average.routes')
            .then(m => m.routes)
      },
      {
        path: 'comp-tra-ind-patrick-mulloy-tema', loadChildren: () =>
          import('./mb-samples/components/trading/indicators/patrick-mulloy/triple-exponential-moving-average/sample-triple-exponential-moving-average.routes')
            .then(m => m.routes)
      },
      {
        path: 'comp-tra-ind-tim-tillson-t2ema', loadChildren: () =>
          import('./mb-samples/components/trading/indicators/tim-tillson/t2-exponential-moving-average/sample-t2-exponential-moving-average.routes')
            .then(m => m.routes)
      },
      {
        path: 'comp-tra-ind-tim-tillson-t3ema', loadChildren: () =>
          import('./mb-samples/components/trading/indicators/tim-tillson/t3-exponential-moving-average/sample-t3-exponential-moving-average.routes')
            .then(m => m.routes)
      },
      {
        path: 'comp-tra-ind-mark-jurik-jma', loadChildren: () =>
          import('./mb-samples/components/trading/indicators/mark-jurik/jurik-moving-average/sample-jurik-moving-average.routes')
            .then(m => m.routes)
      },
      {
        path: 'comp-tra-ind-perry-kaufman-kama', loadChildren: () =>
          import('./mb-samples/components/trading/indicators/perry-kaufman/kaufman-adaptive-moving-average/sample-kaufman-adaptive-moving-average.routes')
            .then(m => m.routes)
      },
      {
        path: 'comp-tra-ind-john-ehlers', loadChildren: () =>
          import('./mb-samples/components/trading/indicators/john-ehlers/john-ehlers.routes')
            .then(m => m.routes)
      },
      {
        path: 'comp-ohlcv-chart-selector', loadChildren: () =>
          import('./mb-samples/components/ohlcv-chart-selector/sample-ohlcv-chart-selector.routes').then(m => m.routes)
      },
      { path: '', loadComponent: () => import('./mb-samples/ohlcv-chart-study/ohlcv-chart-study.component').then(m => m.OhlcvChartStudyComponent) }
    ]
  },
  { path: '**', redirectTo: '' }
];
