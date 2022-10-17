import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SampleSimpleMovingAverage1Component} from './sample-1/sample-simple-moving-average-1.component';
import { SampleSimpleMovingAverage2Component } from './sample-2/sample-simple-moving-average-2.component';

const routes: Routes = [
  { path: 's1', component: SampleSimpleMovingAverage1Component },
  { path: 's2', component: SampleSimpleMovingAverage2Component } // ,
  // { path: '**', redirectTo: 's1' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SampleSimpleMovingAverageRoutingModule { }
