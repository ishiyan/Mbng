import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'parameters', loadComponent: () => import('./triangular-moving-average-01-parameters.component').then(m => m.TriangularMovingAverage01ParametersComponent) },
  { path: 'selector', loadComponent: () => import('./triangular-moving-average-02-selector.component').then(m => m.TriangularMovingAverage02SelectorComponent) },
  { path: '**', redirectTo: 'selector' }
];
