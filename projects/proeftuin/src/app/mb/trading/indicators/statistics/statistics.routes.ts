import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'var', loadChildren: () => import('./variance/variance.routes').then(m => m.routes) },
  { path: 'stdev', loadChildren: () => import('./standard-deviation/standard-deviation.routes').then(m => m.routes) },
  { path: '**', redirectTo: 'var' }
];
