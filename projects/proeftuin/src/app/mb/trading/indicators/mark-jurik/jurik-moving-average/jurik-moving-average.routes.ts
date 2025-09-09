import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'parameters', loadComponent: () => import('./jurik-moving-average-01-parameters.component').then(m => m.JurikMovingAverage01ParametersComponent) },
  { path: 'selector', loadComponent: () => import('./jurik-moving-average-02-selector.component').then(m => m.JurikMovingAverage02SelectorComponent) },
  { path: 'dialog', loadComponent: () => import('./jurik-moving-average-03-dialog.component').then(m => m.JurikMovingAverage03DialogComponent) },
  { path: '**', redirectTo: 'parameters' }
];
