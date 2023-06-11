import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SampleT3ExponentialMovingAverage1Component }
  from './sample-1/sample-t3-exponential-moving-average-1.component';
import { SampleT3ExponentialMovingAverage2Component }
  from './sample-2/sample-t3-exponential-moving-average-2.component';

const routes: Routes = [
  { path: 's1', component: SampleT3ExponentialMovingAverage1Component },
  { path: 's2', component: SampleT3ExponentialMovingAverage2Component } // ,
  // { path: '**', redirectTo: 's1' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SampleT3ExponentialMovingAverageRoutingModule { }
