import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'jma', loadChildren: () => import('./jurik-moving-average/jurik-moving-average.routes').then(m => m.routes) },
  { path: '**', redirectTo: 'jma' }
];
