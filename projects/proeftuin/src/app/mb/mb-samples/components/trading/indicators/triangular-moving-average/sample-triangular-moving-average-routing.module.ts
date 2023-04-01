import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SampleTriangularMovingAverage1Component} from './sample-1/sample-triangular-moving-average-1.component';
import { SampleTriangularMovingAverage2Component } from './sample-2/sample-triangular-moving-average-2.component';

const routes: Routes = [
  { path: 's1', component: SampleTriangularMovingAverage1Component },
  { path: 's2', component: SampleTriangularMovingAverage2Component } // ,
  // { path: '**', redirectTo: 's1' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SampleTriangularMovingAverageRoutingModule { }
