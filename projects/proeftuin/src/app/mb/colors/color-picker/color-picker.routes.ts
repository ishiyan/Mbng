import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'features', loadComponent: () => import('./color-picker-01-features.component').then(m => m.ColorPicker01FeaturesComponent) },
  { path: '**', redirectTo: 'features' }
];
