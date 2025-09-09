import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'parameters', loadComponent: () => import('./fractal-adaptive-moving-average-params-01-parameters.component').then(m => m.FractalAdaptiveMovingAverageParams01ParametersComponent) },
  { path: 'selector', loadComponent: () => import('./fractal-adaptive-moving-average-params-02-selector.component').then(m => m.FractalAdaptiveMovingAverageParams02SelectorComponent) },
  { path: 'dialog', loadComponent: () => import('./fractal-adaptive-moving-average-params-03-dialog.component').then(m => m.FractalAdaptiveMovingAverageParams03DialogComponent) },
  { path: '**', redirectTo: 'parameters' }
];
