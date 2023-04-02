import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SampleStandardDeviation1Component} from './sample-1/sample-standard-deviation-1.component';
import { SampleStandardDeviation2Component } from './sample-2/sample-standard-deviation-2.component';

const routes: Routes = [
  { path: 's1', component: SampleStandardDeviation1Component },
  { path: 's2', component: SampleStandardDeviation2Component } // ,
  // { path: '**', redirectTo: 's1' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SampleStandardDeviationRoutingModule { }
