import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';




const routes: Routes = [
  { path: 's1', loadComponent: () => import('./sample-1/sample-double-exponential-moving-average-1.component').then(m => m.SampleDoubleExponentialMovingAverage1Component) },
  { path: 's2', loadComponent: () => import('./sample-2/sample-double-exponential-moving-average-2.component').then(m => m.SampleDoubleExponentialMovingAverage2Component) } // ,
  // { path: '**', redirectTo: 's1' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SampleDoubleExponentialMovingAverageRoutingModule { }
