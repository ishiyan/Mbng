import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'kama', loadChildren: () => import('./kaufman-adaptive-moving-average/kaufman-adaptive-moving-average.routes').then(m => m.routes) },
  { path: '**', redirectTo: 'kama' }
];
