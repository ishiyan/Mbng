import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MbComponent } from './mb.component';
import { OhlcvChartStudyComponent } from './mb-samples/ohlcv-chart-study/ohlcv-chart-study.component';
import { SyntheticDataComponent } from './mb-samples/synthetic-data/synthetic-data.component';
import { InstrumentsTableComponent } from './mb-samples/instruments-table/instruments-table.component';

const routes: Routes = [
  {
    path: '', component: MbComponent, children: [
      { path: 'ohlcv-chart-study', component: OhlcvChartStudyComponent },
      { path: 'synthetic-data', component: SyntheticDataComponent },
      { path: 'instruments-table', component: InstrumentsTableComponent },
      {
        path: 'comp-freqresp', loadChildren: () =>
          import('./mb-samples/components/frequency-response/sample-frequency-response.module').then(m => m.SampleFrequencyResponseModule)
      },
      {
        path: 'comp-sparkline', loadChildren: () =>
          import('./mb-samples/components/sparkline/sample-sparkline.module').then(m => m.SampleSparklineModule)
      },
      {
        path: 'comp-multiline', loadChildren: () =>
          import('./mb-samples/components/multiline/sample-multiline.module').then(m => m.SampleMultilineModule)
      },
      {
        path: 'comp-stackline', loadChildren: () =>
          import('./mb-samples/components/stackline/sample-stackline.module').then(m => m.SampleStacklineModule)
      },
      {
        path: 'comp-sunburst', loadChildren: () =>
          import('./mb-samples/components/sunburst/sample-sunburst.module').then(m => m.SampleSunburstModule)
      },
      {
        path: 'comp-icicle', loadChildren: () =>
          import('./mb-samples/components/icicle/sample-icicle.module').then(m => m.SampleIcicleModule)
      },
      {
        path: 'comp-treemap', loadChildren: () =>
          import('./mb-samples/components/treemap/sample-treemap.module').then(m => m.SampleTreemapModule)
      },
      {
        path: 'comp-circlepack', loadChildren: () =>
          import('./mb-samples/components/circlepack/sample-circlepack.module').then(m => m.SampleCirclepackModule)
      },
      {
        path: 'comp-voronoi', loadChildren: () =>
          import('./mb-samples/components/voronoi/sample-voronoi.module').then(m => m.SampleVoronoiModule)
      },
      {
        path: 'comp-swatches', loadChildren: () =>
          import('./mb-samples/components/swatches/sample-swatches.module').then(m => m.SampleSwatchesModule)
      },
      {
        path: 'comp-data-entities', loadChildren: () =>
          import('./mb-samples/components/data-entities/sample-data-entities.module').then(m => m.SampleDataEntitiesModule)
      },
      {
        path: 'comp-tra-ind-sma', loadChildren: () =>
          import('./mb-samples/components/trading/indicators/simple-moving-average/sample-simple-moving-average.module')
            .then(m => m.SampleSimpleMovingAverageModule)
      },
      {
        path: 'comp-tra-ind-trima', loadChildren: () =>
          import('./mb-samples/components/trading/indicators/triangular-moving-average/sample-triangular-moving-average.module')
            .then(m => m.SampleTriangularMovingAverageModule)
      },
      {
        path: 'comp-tra-ind-wma', loadChildren: () =>
          import('./mb-samples/components/trading/indicators/weighted-moving-average/sample-weighted-moving-average.module')
            .then(m => m.SampleWeightedMovingAverageModule)
      },
      {
        path: 'comp-tra-ind-ema', loadChildren: () =>
          import('./mb-samples/components/trading/indicators/exponential-moving-average/sample-exponential-moving-average.module')
            .then(m => m.SampleExponentialMovingAverageModule)
      },
      {
        path: 'comp-tra-ind-statistics-var', loadChildren: () =>
          import('./mb-samples/components/trading/indicators/statistics/variance/sample-variance.module')
            .then(m => m.SampleVarianceModule)
      },
      {
        path: 'comp-tra-ind-statistics-stdev', loadChildren: () =>
          import('./mb-samples/components/trading/indicators/statistics/standard-deviation/sample-standard-deviation.module')
            .then(m => m.SampleStandardDeviationModule)
      },
      {
        path: 'comp-tra-ind-patrick-mulloy-dema', loadChildren: () =>
          import('./mb-samples/components/trading/indicators/patrick-mulloy/double-exponential-moving-average/sample-double-exponential-moving-average.module')
            .then(m => m.SampleDoubleExponentialMovingAverageModule)
      },
      {
        path: 'comp-tra-ind-patrick-mulloy-tema', loadChildren: () =>
          import('./mb-samples/components/trading/indicators/patrick-mulloy/triple-exponential-moving-average/sample-triple-exponential-moving-average.module')
            .then(m => m.SampleTripleExponentialMovingAverageModule)
      },
      {
        path: 'comp-tra-ind-tim-tillson-t2ema', loadChildren: () =>
          import('./mb-samples/components/trading/indicators/tim-tillson/t2-exponential-moving-average/sample-t2-exponential-moving-average.module')
            .then(m => m.SampleT2ExponentialMovingAverageModule)
      },
      {
        path: 'comp-tra-ind-tim-tillson-t3ema', loadChildren: () =>
          import('./mb-samples/components/trading/indicators/tim-tillson/t3-exponential-moving-average/sample-t3-exponential-moving-average.module')
            .then(m => m.SampleT3ExponentialMovingAverageModule)
      },
      {
        path: 'comp-ohlcv-chart-selector', loadChildren: () =>
          import('./mb-samples/components/ohlcv-chart-selector/sample-ohlcv-chart-selector.module').then(m => m.SampleOhlcvChartSelectorModule)
      },
      { path: '', component: OhlcvChartStudyComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MbRoutingModule { }
