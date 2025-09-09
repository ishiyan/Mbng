import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'parameters', loadComponent: () => import('./double-exponential-moving-average-01-parameters.component').then(m => m.DoubleExponentialMovingAverage01ParametersComponent) },
  { path: 'selector', loadComponent: () => import('./double-exponential-moving-average-02-selector.component').then(m => m.DoubleExponentialMovingAverage02SelectorComponent) },
  { path: '**', redirectTo: 'parameters' }
];
