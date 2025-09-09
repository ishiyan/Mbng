import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'dema', loadChildren: () => import('./double-exponential-moving-average/double-exponential-moving-average.routes').then(m => m.routes) },
  { path: 'tema', loadChildren: () => import('./triple-exponential-moving-average/triple-exponential-moving-average.routes').then(m => m.routes) },
  { path: '**', redirectTo: 'tema' }
];
