import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'parameters', loadComponent: () => import('./standard-deviation-01-parameters.component').then(m => m.StandardDeviation01ParametersComponent) },
  { path: 'selector', loadComponent: () => import('./standard-deviation-02-selector.component').then(m => m.StandardDeviation02SelectorComponent) },
  { path: '**', redirectTo: 'selector' }
];
