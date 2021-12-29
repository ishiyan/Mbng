import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SampleSparkline1Component } from './sample-1/sample-sparkline-1.component';
import { SampleSparkline2Component } from './sample-2/sample-sparkline-2.component';
import { SampleSparkline3Component } from './sample-3/sample-sparkline-3.component';

const routes: Routes = [
  { path: 's1', component: SampleSparkline1Component },
  { path: 's2', component: SampleSparkline2Component },
  { path: 's3', component: SampleSparkline3Component },
  { path: '**', redirectTo: 's1' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SampleSparklineRoutingModule { }
