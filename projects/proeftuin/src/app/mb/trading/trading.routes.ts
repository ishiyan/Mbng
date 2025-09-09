import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'indicators', loadChildren: () => import('./indicators/indicators.routes').then(m => m.routes) },
  { path: '**', redirectTo: 'indicators' }
];
