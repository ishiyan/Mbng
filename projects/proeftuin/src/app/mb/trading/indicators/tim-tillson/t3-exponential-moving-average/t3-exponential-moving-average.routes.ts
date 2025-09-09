import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'parameters', loadComponent: () => import('./t3-exponential-moving-average-01-parameters.component').then(m => m.T3ExponentialMovingAverage01ParametersComponent) },
  { path: 'selector', loadComponent: () => import('./t3-exponential-moving-average-02-selector.component').then(m => m.T3ExponentialMovingAverage02SelectorComponent) },
  { path: '**', redirectTo: 'parameters' }
];
