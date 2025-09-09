import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'parameters', loadComponent: () => import('./weighted-moving-average-01-parameters.component').then(m => m.WeightedMovingAverage01ParametersComponent) },
  { path: 'selector', loadComponent: () => import('./weighted-moving-average-02-selector.component').then(m => m.WeightedMovingAverage02SelectorComponent) },
  { path: '**', redirectTo: 'selector' }
];
