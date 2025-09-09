import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'parameters', loadComponent: () => import('./triple-exponential-moving-average-01-parameters.component').then(m => m.TripleExponentialMovingAverage01ParametersComponent) },
  { path: 'selector', loadComponent: () => import('./triple-exponential-moving-average-02-selector.component').then(m => m.TripleExponentialMovingAverage02SelectorComponent) },
  { path: '**', redirectTo: 'parameters' }
];
