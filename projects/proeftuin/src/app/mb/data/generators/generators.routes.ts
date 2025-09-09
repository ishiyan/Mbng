import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'chirp-features', loadComponent: () => import('./generators-01-chirp-features.component').then(m => m.Generators01ChirpFeaturesComponent) },
  { path: 'chirp-parameters', loadComponent: () => import('./generators-02-chirp-parameters.component').then(m => m.Generators02ChirpParametersComponent) },
  { path: '**', redirectTo: 'chirp-features' }
];
