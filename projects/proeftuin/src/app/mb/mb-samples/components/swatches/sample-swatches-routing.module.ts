import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SampleSwatches1Component } from './sample-1/sample-swatches-1.component';
import { SampleSwatches2Component } from './sample-2/sample-swatches-2.component';
import { SampleSwatches3Component } from './sample-3/sample-swatches-3.component';
import { SampleSwatches4Component } from './sample-4/sample-swatches-4.component';
import { SampleSwatches5Component } from './sample-5/sample-swatches-5.component';
import { SampleSwatches6Component } from './sample-6/sample-swatches-6.component';
import { SampleSwatches7Component } from './sample-7/sample-swatches-7.component';

const routes: Routes = [
  { path: 's1', component: SampleSwatches1Component },
  { path: 's2', component: SampleSwatches2Component },
  { path: 's3', component: SampleSwatches3Component },
  { path: 's4', component: SampleSwatches4Component },
  { path: 's5', component: SampleSwatches5Component },
  { path: 's6', component: SampleSwatches6Component },
  { path: 's7', component: SampleSwatches7Component } // ,
  // { path: '**', redirectTo: 's1' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SampleSwatchesRoutingModule { }
