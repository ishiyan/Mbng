import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'parameters', loadComponent: () => import('./variance-01-parameters.component').then(m => m.Variance01ParametersComponent) },
  { path: 'selector', loadComponent: () => import('./variance-02-selector.component').then(m => m.Variance02SelectorComponent) },
  { path: '**', redirectTo: 'selector' }
];
