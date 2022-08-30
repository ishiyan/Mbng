import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SampleDataEntities1Component } from './sample-1/sample-data-entities-1.component';

const routes: Routes = [
  { path: 's1', component: SampleDataEntities1Component } // ,
  // { path: '**', redirectTo: 's1' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SampleDataEntitiesRoutingModule { }
