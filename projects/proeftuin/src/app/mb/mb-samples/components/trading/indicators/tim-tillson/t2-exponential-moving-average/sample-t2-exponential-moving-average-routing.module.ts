import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SampleT2ExponentialMovingAverage1Component }
  from './sample-1/sample-t2-exponential-moving-average-1.component';
import { SampleT2ExponentialMovingAverage2Component }
  from './sample-2/sample-t2-exponential-moving-average-2.component';

const routes: Routes = [
  { path: 's1', component: SampleT2ExponentialMovingAverage1Component },
  { path: 's2', component: SampleT2ExponentialMovingAverage2Component } // ,
  // { path: '**', redirectTo: 's1' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SampleT2ExponentialMovingAverageRoutingModule { }
