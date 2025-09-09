import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'parameters', loadComponent: () => import('./kaufman-adaptive-moving-average-01-parameters.component').then(m => m.KaufmanAdaptiveMovingAverage01ParametersComponent) },
  { path: 'selector', loadComponent: () => import('./kaufman-adaptive-moving-average-02-selector.component').then(m => m.KaufmanAdaptiveMovingAverage02SelectorComponent) },
  { path: '**', redirectTo: 'parameters' }
];
