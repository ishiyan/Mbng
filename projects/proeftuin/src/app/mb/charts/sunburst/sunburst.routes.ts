import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'features', loadComponent: () => import('./sunburst-01-features.component').then(m => m.Sunburst01FeaturesComponent) },
  { path: 'countries', loadComponent: () => import('./sunburst-02-countries.component').then(m => m.Sunburst02CountriesComponent) },
  { path: 'aex', loadComponent: () => import('./sunburst-03-aex.component').then(m => m.Sunburst03AexComponent) },
  { path: 'omxn40', loadComponent: () => import('./sunburst-04-omxn40.component').then(m => m.Sunburst04Omxn40Component) },
  { path: 'jdk', loadComponent: () => import('./sunburst-05-jdk.component').then(m => m.Sunburst05JdkComponent) },
  { path: '**', redirectTo: 'features' }
];
