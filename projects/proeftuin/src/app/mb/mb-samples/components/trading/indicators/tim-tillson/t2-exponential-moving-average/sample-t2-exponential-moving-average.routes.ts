import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 's1', loadComponent: () => import('./sample-1/sample-t2-exponential-moving-average-1.component').then(m => m.SampleT2ExponentialMovingAverage1Component) },
  { path: 's2', loadComponent: () => import('./sample-2/sample-t2-exponential-moving-average-2.component').then(m => m.SampleT2ExponentialMovingAverage2Component) } // ,
  // { path: '**', redirectTo: 's1' }
];
