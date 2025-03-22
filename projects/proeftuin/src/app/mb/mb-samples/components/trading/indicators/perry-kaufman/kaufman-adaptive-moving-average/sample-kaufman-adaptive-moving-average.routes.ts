import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 's1', loadComponent: () => import('./sample-1/sample-kaufman-adaptive-moving-average-1.component').then(m => m.SampleKaufmanAdaptiveMovingAverage1Component) },
  { path: 's2', loadComponent: () => import('./sample-2/sample-kaufman-adaptive-moving-average-2.component').then(m => m.SampleKaufmanAdaptiveMovingAverage2Component) } // ,
  // { path: '**', redirectTo: 's1' }
];
