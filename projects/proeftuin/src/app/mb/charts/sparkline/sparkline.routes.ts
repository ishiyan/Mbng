import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'features', loadComponent: () => import('./sparkline-01-features.component').then(m => m.Sparkline01FeaturesComponent) },
  { path: 'mat-select', loadComponent: () => import('./sparkline-02-mat-select.component').then(m => m.Sparkline02MatSelectComponent) },
  { path: 'mat-list', loadComponent: () => import('./sparkline-03-mat-list.component').then(m => m.Sparkline03MatListComponent) },
  { path: '**', redirectTo: 'features' }
];
