import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';




const routes: Routes = [
  { path: 's1', loadComponent: () => import('./sample-1/sample-weighted-moving-average-1.component').then(m => m.SampleWeightedMovingAverage1Component) },
  { path: 's2', loadComponent: () => import('./sample-2/sample-weighted-moving-average-2.component').then(m => m.SampleWeightedMovingAverage2Component) } // ,
  // { path: '**', redirectTo: 's1' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SampleWeightedMovingAverageRoutingModule { }
