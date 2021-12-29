import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SampleIcicle1Component } from './sample-1/sample-icicle-1.component';
import { SampleIcicle2Component } from './sample-2/sample-icicle-2.component';
import { SampleIcicle3Component } from './sample-3/sample-icicle-3.component';
import { SampleIcicle4Component } from './sample-4/sample-icicle-4.component';
import { SampleIcicle5Component } from './sample-5/sample-icicle-5.component';

const routes: Routes = [
  { path: 's1', component: SampleIcicle1Component },
  { path: 's2', component: SampleIcicle2Component },
  { path: 's3', component: SampleIcicle3Component },
  { path: 's4', component: SampleIcicle4Component },
  { path: 's5', component: SampleIcicle5Component },
  { path: '**', redirectTo: 's1' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SampleIcicleRoutingModule { }
