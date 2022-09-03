import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SampleOhlcvChartSelector1Component } from './sample-1/sample-ohlcv-chart-selector-1.component';
import { SampleOhlcvChartSelector2Component } from './sample-2/sample-ohlcv-chart-selector-2.component';
import { SampleOhlcvChartSelector3Component } from './sample-3/sample-ohlcv-chart-selector-3.component';
import { SampleOhlcvChartSelector4Component } from './sample-4/sample-ohlcv-chart-selector-4.component';
import { SampleOhlcvChartSelector5Component } from './sample-5/sample-ohlcv-chart-selector-5.component';

const routes: Routes = [
  { path: 's1', component: SampleOhlcvChartSelector1Component },
  { path: 's2', component: SampleOhlcvChartSelector2Component },
  { path: 's3', component: SampleOhlcvChartSelector3Component },
  { path: 's4', component: SampleOhlcvChartSelector4Component },
  { path: 's5', component: SampleOhlcvChartSelector5Component } // ,
  // { path: '**', redirectTo: 's1' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SampleOhlcvChartSelectorRoutingModule { }
