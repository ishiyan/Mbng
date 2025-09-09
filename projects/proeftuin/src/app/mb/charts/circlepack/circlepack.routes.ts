import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'features', loadComponent: () => import('./circlepack-01-features.component').then(m => m.Circlepack01FeaturesComponent) },
  { path: 'countries', loadComponent: () => import('./circlepack-02-countries.component').then(m => m.Circlepack02CountriesComponent) },
  { path: 'aex', loadComponent: () => import('./circlepack-03-aex.component').then(m => m.Circlepack03AexComponent) },
  { path: 'omxn40', loadComponent: () => import('./circlepack-04-omxn40.component').then(m => m.Circlepack04Omxn40Component) },
  { path: 'jdk', loadComponent: () => import('./circlepack-05-jdk.component').then(m => m.Circlepack05JdkComponent) },
  { path: '**', redirectTo: 'features' }
];
