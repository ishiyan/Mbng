import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 's1', loadComponent: () => import('./sample-1/sample-triangular-moving-average-1.component').then(m => m.SampleTriangularMovingAverage1Component) },
  { path: 's2', loadComponent: () => import('./sample-2/sample-triangular-moving-average-2.component').then(m => m.SampleTriangularMovingAverage2Component) } // ,
  // { path: '**', redirectTo: 's1' }
];
