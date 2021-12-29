import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SampleStackline1Component } from './sample-1/sample-stackline-1.component';

const routes: Routes = [
  { path: 's1', component: SampleStackline1Component },
  { path: '**', redirectTo: 's1' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SampleStacklineRoutingModule { }
