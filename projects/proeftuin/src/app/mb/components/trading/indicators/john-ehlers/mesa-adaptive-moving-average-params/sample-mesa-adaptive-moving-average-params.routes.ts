import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 's1', loadComponent: () => import('./sample-1/sample-mesa-adaptive-moving-average-params-1.component').then(m => m.SampleMesaAdaptiveMovingAverageParams1Component) },
  { path: 's2', loadComponent: () => import('./sample-2/sample-mesa-adaptive-moving-average-params-2.component').then(m => m.SampleMesaAdaptiveMovingAverageParams2Component) },
  { path: 's3', loadComponent: () => import('./sample-3/sample-mesa-adaptive-moving-average-params-3.component').then(m => m.SampleMesaAdaptiveMovingAverageParams3Component) }
  // { path: '**', redirectTo: 's1' }
];
