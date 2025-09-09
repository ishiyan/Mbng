import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'features', loadComponent: () => import('./voronoi-01-features.component').then(m => m.Voronoi01FeaturesComponent) },
  { path: 'countries', loadComponent: () => import('./voronoi-02-countries.component').then(m => m.Voronoi02CountriesComponent) },
  { path: 'aex', loadComponent: () => import('./voronoi-03-aex.component').then(m => m.Voronoi03AexComponent) },
  { path: 'omxn40', loadComponent: () => import('./voronoi-04-omxn40.component').then(m => m.Voronoi04Omxn40Component) },
  { path: 'jdk', loadComponent: () => import('./voronoi-05-jdk.component').then(m => m.Voronoi05JdkComponent) },
  { path: '**', redirectTo: 'features' }
];
