import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'parameters', loadComponent: () => import('./hilbert-transformer-cycle-estimator-type-01-parameters.component').then(m => m.HilbertTransformerCycleEstimatorType01ParametersComponent) },
  { path: '**', redirectTo: 'parameters' }
];
