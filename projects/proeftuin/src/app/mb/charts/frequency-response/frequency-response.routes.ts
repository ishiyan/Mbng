import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'features', loadComponent: () => import('./frequency-response-01-features.component').then(m => m.FrequencyResponse01FeaturesComponent) },
  { path: '**', redirectTo: 'features' }
];
