import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'features', loadComponent: () => import('./treemap-01-features.component').then(m => m.Treemap01FeaturesComponent) },
  { path: 'countries', loadComponent: () => import('./treemap-02-countries.component').then(m => m.Treemap02CountriesComponent) },
  { path: 'aex', loadComponent: () => import('./treemap-03-aex.component').then(m => m.Treemap03AexComponent) },
  { path: 'omxn40', loadComponent: () => import('./treemap-04-omxn40.component').then(m => m.Treemap04Omxn40Component) },
  { path: 'jdk', loadComponent: () => import('./treemap-05-jdk.component').then(m => m.Treemap05JdkComponent) },
  { path: '**', redirectTo: 'features' }
];
