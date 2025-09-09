import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'parameters', loadComponent: () => import('./t2-exponential-moving-average-01-parameters.component').then(m => m.T2ExponentialMovingAverage01ParametersComponent) },
  { path: 'selector', loadComponent: () => import('./t2-exponential-moving-average-02-selector.component').then(m => m.T2ExponentialMovingAverage02SelectorComponent) },
  { path: '**', redirectTo: 'parameters' }
];
