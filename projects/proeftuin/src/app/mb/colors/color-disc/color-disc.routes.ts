import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'features', loadComponent: () => import('./color-disc-01-features.component').then(m => m.ColorDisc01FeaturesComponent) },
  { path: 'picker', loadComponent: () => import('./color-disc-02-picker.component').then(m => m.ColorDisc02PickerComponent) },
  { path: '**', redirectTo: 'features' }
];
