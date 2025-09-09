import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'parameters', loadComponent: () => import('./hilbert-transformer-cycle-estimator-params-01-parameters.component').then(m => m.HilbertTransformerCycleEstimatorParams01ParametersComponent) },
  { path: 'selector', loadComponent: () => import('./hilbert-transformer-cycle-estimator-params-02-selector.component').then(m => m.HilbertTransformerCycleEstimatorParams02SelectorComponent) },
  { path: 'dialog', loadComponent: () => import('./hilbert-transformer-cycle-estimator-params-03-dialog.component').then(m => m.HilbertTransformerCycleEstimatorParams03DialogComponent) },
  { path: '**', redirectTo: 'parameters' }
];
