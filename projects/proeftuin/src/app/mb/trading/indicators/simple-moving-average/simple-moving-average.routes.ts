import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'parameters', loadComponent: () => import('./simple-moving-average-01-parameters.component').then(m => m.SimpleMovingAverage01ParametersComponent) },
  { path: 'selector', loadComponent: () => import('./simple-moving-average-02-selector.component').then(m => m.SimpleMovingAverage02SelectorComponent) },
  { path: '**', redirectTo: 'selector' }
];
