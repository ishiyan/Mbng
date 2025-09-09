import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 's1', loadComponent: () => import('./sample-1/sample-triple-exponential-moving-average-1.component').then(m => m.SampleTripleExponentialMovingAverage1Component) },
  { path: 's2', loadComponent: () => import('./sample-2/sample-triple-exponential-moving-average-2.component').then(m => m.SampleTripleExponentialMovingAverage2Component) } // ,
  // { path: '**', redirectTo: 's1' }
];
