import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SampleVariance1Component} from './sample-1/sample-variance-1.component';
import { SampleVariance2Component } from './sample-2/sample-variance-2.component';

const routes: Routes = [
  { path: 's1', component: SampleVariance1Component },
  { path: 's2', component: SampleVariance2Component } // ,
  // { path: '**', redirectTo: 's1' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SampleVarianceRoutingModule { }
