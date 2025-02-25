import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'fm', loadChildren: () => import('./fixed-mix/fixed-mix.routes').then(m => m.routes) },
  { path: 'hi', loadChildren: () => import('./hierarchies/hierarchies.routes').then(m => m.routes) },
  { path: '**', redirectTo: 'fm' }
];
