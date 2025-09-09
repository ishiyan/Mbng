import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'statistics', loadChildren: () => import('./statistics/statistics.routes').then(m => m.routes) },
  { path: 'sma', loadChildren: () => import('./simple-moving-average/simple-moving-average.routes').then(m => m.routes) },
  { path: 'ema', loadChildren: () => import('./exponential-moving-average/exponential-moving-average.routes').then(m => m.routes) },
  { path: 'trima', loadChildren: () => import('./triangular-moving-average/triangular-moving-average.routes').then(m => m.routes) },
  { path: 'wma', loadChildren: () => import('./weighted-moving-average/weighted-moving-average.routes').then(m => m.routes) },
  { path: 'john-ehlers', loadChildren: () => import('./john-ehlers/john-ehlers.routes').then(m => m.routes) },
  { path: 'mark-jurik', loadChildren: () => import('./mark-jurik/mark-jurik.routes').then(m => m.routes) },
  { path: 'perry-kaufman', loadChildren: () => import('./perry-kaufman/perry-kaufman.routes').then(m => m.routes) },
  { path: 'patrick-mulloy', loadChildren: () => import('./patrick-mulloy/patrick-mulloy.routes').then(m => m.routes) },
  { path: 'tim-tillson', loadChildren: () => import('./tim-tillson/tim-tillson.routes').then(m => m.routes) },
  { path: '**', redirectTo: 'statistics' }
];
