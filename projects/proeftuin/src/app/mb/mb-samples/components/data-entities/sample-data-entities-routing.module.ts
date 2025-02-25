import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';




const routes: Routes = [
  { path: 's1', loadComponent: () => import('./sample-1/sample-data-entities-1.component').then(m => m.SampleDataEntities1Component) },
  { path: 's2', loadComponent: () => import('./sample-2/sample-data-entities-2.component').then(m => m.SampleDataEntities2Component) } // ,
  // { path: '**', redirectTo: 's1' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SampleDataEntitiesRoutingModule { }
