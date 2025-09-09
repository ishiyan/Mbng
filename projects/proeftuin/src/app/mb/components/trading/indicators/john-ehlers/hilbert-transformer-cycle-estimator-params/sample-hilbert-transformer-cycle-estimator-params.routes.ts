import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 's1', loadComponent: () => import('./sample-1/sample-hilbert-transformer-cycle-estimator-params-1.component').then(m => m.SampleHilbertTransformerCycleEstimatorParams1Component) },
  { path: 's2', loadComponent: () => import('./sample-2/sample-hilbert-transformer-cycle-estimator-params-2.component').then(m => m.SampleHilbertTransformerCycleEstimatorParams2Component) },
  { path: 's3', loadComponent: () => import('./sample-3/sample-hilbert-transformer-cycle-estimator-params-3.component').then(m => m.SampleHilbertTransformerCycleEstimatorParams3Component) }
  // { path: '**', redirectTo: 's1' }
];
