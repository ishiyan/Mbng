import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SampleMultiline1Component } from './sample-1/sample-multiline-1.component';

const routes: Routes = [
  { path: 's1', component: SampleMultiline1Component },
  { path: '**', redirectTo: 's1' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SampleMultilineRoutingModule { }
