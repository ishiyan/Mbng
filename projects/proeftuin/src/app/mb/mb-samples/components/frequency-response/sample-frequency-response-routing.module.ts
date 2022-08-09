import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SampleFrequencyResponse1Component } from './sample-1/sample-frequency-response-1.component';

const routes: Routes = [
  { path: 's1', component: SampleFrequencyResponse1Component },
  { path: '**', redirectTo: 's1' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SampleFrequencyResponseRoutingModule { }
