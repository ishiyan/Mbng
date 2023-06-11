import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SampleDoubleExponentialMovingAverage1Component }
  from './sample-1/sample-double-exponential-moving-average-1.component';
import { SampleDoubleExponentialMovingAverage2Component }
  from './sample-2/sample-double-exponential-moving-average-2.component';

const routes: Routes = [
  { path: 's1', component: SampleDoubleExponentialMovingAverage1Component },
  { path: 's2', component: SampleDoubleExponentialMovingAverage2Component } // ,
  // { path: '**', redirectTo: 's1' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SampleDoubleExponentialMovingAverageRoutingModule { }
