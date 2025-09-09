import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'features', loadComponent: () => import('./hilbert-curve-01-features.component').then(m => m.HilbertCurve01FeaturesComponent) },
  { path: '**', redirectTo: 'features' }
];
