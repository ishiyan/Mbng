import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SampleTripleExponentialMovingAverage1Component }
  from './sample-1/sample-triple-exponential-moving-average-1.component';
import { SampleTripleExponentialMovingAverage2Component }
  from './sample-2/sample-triple-exponential-moving-average-2.component';

const routes: Routes = [
  { path: 's1', component: SampleTripleExponentialMovingAverage1Component },
  { path: 's2', component: SampleTripleExponentialMovingAverage2Component } // ,
  // { path: '**', redirectTo: 's1' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SampleTripleExponentialMovingAverageRoutingModule { }
