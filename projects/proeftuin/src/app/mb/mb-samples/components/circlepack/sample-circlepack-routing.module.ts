import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SampleCirclepack1Component } from './sample-1/sample-circlepack-1.component';
import { SampleCirclepack2Component } from './sample-2/sample-circlepack-2.component';
import { SampleCirclepack3Component } from './sample-3/sample-circlepack-3.component';
import { SampleCirclepack4Component } from './sample-4/sample-circlepack-4.component';
import { SampleCirclepack5Component } from './sample-5/sample-circlepack-5.component';

const routes: Routes = [
  { path: 's1', component: SampleCirclepack1Component },
  { path: 's2', component: SampleCirclepack2Component },
  { path: 's3', component: SampleCirclepack3Component },
  { path: 's4', component: SampleCirclepack4Component },
  { path: 's5', component: SampleCirclepack5Component },
  { path: '**', redirectTo: 's1' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SampleCirclepackRoutingModule { }
