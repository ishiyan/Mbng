import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';




const routes: Routes = [
  { path: 's1', loadComponent: () => import('./sample-1/sample-variance-1.component').then(m => m.SampleVariance1Component) },
  { path: 's2', loadComponent: () => import('./sample-2/sample-variance-2.component').then(m => m.SampleVariance2Component) } // ,
  // { path: '**', redirectTo: 's1' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SampleVarianceRoutingModule { }
