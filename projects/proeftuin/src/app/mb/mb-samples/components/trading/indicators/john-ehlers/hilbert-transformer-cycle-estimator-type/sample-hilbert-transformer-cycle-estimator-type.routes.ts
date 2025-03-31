import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 's1', loadComponent: () => import('./sample-1/sample-hilbert-transformer-cycle-estimator-type-1.component').then(m => m.SampleHilbertTransformerCycleEstimatorType1Component) }
  // { path: '**', redirectTo: 's1' }
];
