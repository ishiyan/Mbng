import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'parameters', loadComponent: () => import('./mesa-adaptive-moving-average-params-01-parameters.component').then(m => m.MesaAdaptiveMovingAverageParams01ParametersComponent) },
  { path: 'selector', loadComponent: () => import('./mesa-adaptive-moving-average-params-02-selector.component').then(m => m.MesaAdaptiveMovingAverageParams02SelectorComponent) },
  { path: 'dialog', loadComponent: () => import('./mesa-adaptive-moving-average-params-03-dialog.component').then(m => m.MesaAdaptiveMovingAverageParams03DialogComponent) },
  { path: '**', redirectTo: 'parameters' }
];
