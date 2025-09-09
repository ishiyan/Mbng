import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'features', loadComponent: () => import('./multiline-01-features.component').then(m => m.Multiline01FeaturesComponent) },
  { path: '**', redirectTo: 'features' }
];
