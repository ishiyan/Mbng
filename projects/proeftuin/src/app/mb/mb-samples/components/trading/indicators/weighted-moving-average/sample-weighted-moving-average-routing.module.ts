import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SampleWeightedMovingAverage1Component} from './sample-1/sample-weighted-moving-average-1.component';
import { SampleWeightedMovingAverage2Component } from './sample-2/sample-weighted-moving-average-2.component';

const routes: Routes = [
  { path: 's1', component: SampleWeightedMovingAverage1Component },
  { path: 's2', component: SampleWeightedMovingAverage2Component } // ,
  // { path: '**', redirectTo: 's1' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SampleWeightedMovingAverageRoutingModule { }
