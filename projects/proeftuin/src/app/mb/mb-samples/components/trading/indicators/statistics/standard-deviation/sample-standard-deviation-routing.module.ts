import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';




const routes: Routes = [
  { path: 's1', loadComponent: () => import('./sample-1/sample-standard-deviation-1.component').then(m => m.SampleStandardDeviation1Component) },
  { path: 's2', loadComponent: () => import('./sample-2/sample-standard-deviation-2.component').then(m => m.SampleStandardDeviation2Component) } // ,
  // { path: '**', redirectTo: 's1' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SampleStandardDeviationRoutingModule { }
