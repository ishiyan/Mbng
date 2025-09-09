import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'parameters', loadComponent: () => import('./exponential-moving-average-01-parameters.component').then(m => m.ExponentialMovingAverage01ParametersComponent) },
  { path: 'selector', loadComponent: () => import('./exponential-moving-average-02-selector.component').then(m => m.ExponentialMovingAverage02SelectorComponent) },
  { path: '**', redirectTo: 'selector' }
];
