import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 't2', loadChildren: () => import('./t2-exponential-moving-average/t2-exponential-moving-average.routes').then(m => m.routes) },
  { path: 't3', loadChildren: () => import('./t3-exponential-moving-average/t3-exponential-moving-average.routes').then(m => m.routes) },
  { path: '**', redirectTo: 't3' }
];
