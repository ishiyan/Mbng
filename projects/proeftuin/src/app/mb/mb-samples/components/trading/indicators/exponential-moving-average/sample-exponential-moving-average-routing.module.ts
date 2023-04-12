import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SampleExponentialMovingAverage1Component} from './sample-1/sample-exponential-moving-average-1.component';
import { SampleExponentialMovingAverage2Component } from './sample-2/sample-exponential-moving-average-2.component';

const routes: Routes = [
  { path: 's1', component: SampleExponentialMovingAverage1Component },
  { path: 's2', component: SampleExponentialMovingAverage2Component } // ,
  // { path: '**', redirectTo: 's1' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SampleExponentialMovingAverageRoutingModule { }
