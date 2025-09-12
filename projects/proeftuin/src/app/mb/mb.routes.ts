import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '', loadComponent: () => import('./mb.component').then(m => m.MbComponent), children: [
      { path: '', redirectTo: 'charts', pathMatch: 'full' },
      { path: 'charts', loadChildren: () => import('./charts/charts.routes').then(m => m.routes) },
      { path: 'colors', loadChildren: () => import('./colors/colors.routes').then(m => m.routes) },
      { path: 'data', loadChildren: () => import('./data/data.routes').then(m => m.routes) },
      { path: 'trading', loadChildren: () => import('./trading/trading.routes').then(m => m.routes) },
      { path: '**', redirectTo: 'charts' }
    ]
  },
  { path: '**', redirectTo: 'charts' , pathMatch: 'full' }
];
