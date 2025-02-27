import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 's1', loadComponent: () => import('./sample-1/sample-sparkline-1.component').then(m => m.SampleSparkline1Component) },
  { path: 's2', loadComponent: () => import('./sample-2/sample-sparkline-2.component').then(m => m.SampleSparkline2Component) },
  { path: 's3', loadComponent: () => import('./sample-3/sample-sparkline-3.component').then(m => m.SampleSparkline3Component) },
  { path: '**', redirectTo: 's1' }
];
