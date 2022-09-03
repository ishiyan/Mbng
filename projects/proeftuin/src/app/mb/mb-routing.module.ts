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
