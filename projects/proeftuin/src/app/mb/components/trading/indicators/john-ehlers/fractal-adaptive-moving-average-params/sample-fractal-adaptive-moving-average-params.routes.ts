import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 's1', loadComponent: () => import('./sample-1/sample-fractal-adaptive-moving-average-params-1.component').then(m => m.SampleFractalAdaptiveMovingAverageParams1Component) },
  { path: 's2', loadComponent: () => import('./sample-2/sample-fractal-adaptive-moving-average-params-2.component').then(m => m.SampleFractalAdaptiveMovingAverageParams2Component) },
  { path: 's3', loadComponent: () => import('./sample-3/sample-fractal-adaptive-moving-average-params-3.component').then(m => m.SampleFractalAdaptiveMovingAverageParams3Component) }
  // { path: '**', redirectTo: 's1' }
];
