import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'features', loadComponent: () => import('./icicle-01-features.component').then(m => m.Icicle01FeaturesComponent) },
  { path: 'countries', loadComponent: () => import('./icicle-02-countries.component').then(m => m.Icicle02CountriesComponent) },
  { path: 'aex', loadComponent: () => import('./icicle-03-aex.component').then(m => m.Icicle03AexComponent) },
  { path: 'omxn40', loadComponent: () => import('./icicle-04-omxn40.component').then(m => m.Icicle04Omxn40Component) },
  { path: 'jdk', loadComponent: () => import('./icicle-05-jdk.component').then(m => m.Icicle05JdkComponent) },
  { path: '**', redirectTo: 'features' }
];
