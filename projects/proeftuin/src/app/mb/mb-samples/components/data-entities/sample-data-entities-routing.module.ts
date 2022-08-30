import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SampleDataEntities1Component } from './sample-1/sample-data-entities-1.component';
import { SampleDataEntities2Component } from './sample-2/sample-data-entities-2.component';

const routes: Routes = [
  { path: 's1', component: SampleDataEntities1Component },
  { path: 's2', component: SampleDataEntities2Component } // ,
  // { path: '**', redirectTo: 's1' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SampleDataEntitiesRoutingModule { }
