import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


//import { SampleHilbertCurve2Component } from './sample-2/sample-hilbert-curve-2.component';
//import { SampleHilbertCurve3Component } from './sample-3/sample-hilbert-curve-3.component';

const routes: Routes = [
  { path: 's1', loadComponent: () => import('./sample-1/sample-hilbert-curve-1.component').then(m => m.SampleHilbertCurve1Component) },
  //{ path: 's2', component: SampleHilbertCurve2Component },
  //{ path: 's3', component: SampleHilbertCurve3Component },
  { path: '**', redirectTo: 's1' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SampleHilbertCurveRoutingModule { }
