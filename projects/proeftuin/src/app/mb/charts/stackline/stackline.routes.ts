import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'features', loadComponent: () => import('./stackline-01-features.component').then(m => m.Stackline01FeaturesComponent) },
  { path: '**', redirectTo: 'features' }
];
