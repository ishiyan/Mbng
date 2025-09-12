import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'frequency-response', loadChildren: () => import('./frequency-response/frequency-response.routes').then(m => m.routes) },
  { path: 'ohlcv-chart', loadChildren: () => import('./ohlcv-chart/ohlcv-chart.routes').then(m => m.routes) },
  { path: 'sparkline', loadChildren: () => import('./sparkline/sparkline.routes').then(m => m.routes) },
  { path: 'multiline', loadChildren: () => import('./multiline/multiline.routes').then(m => m.routes) },
  { path: 'stackline', loadChildren: () => import('./stackline/stackline.routes').then(m => m.routes) },
  { path: 'sunburst', loadChildren: () => import('./sunburst/sunburst.routes').then(m => m.routes) },
  { path: 'icicle', loadChildren: () => import('./icicle/icicle.routes').then(m => m.routes) },
  { path: 'treemap', loadChildren: () => import('./treemap/treemap.routes').then(m => m.routes) },
  { path: 'circlepack', loadChildren: () => import('./circlepack/circlepack.routes').then(m => m.routes) },
  { path: 'voronoi', loadChildren: () => import('./voronoi/voronoi.routes').then(m => m.routes) },
  { path: 'hilbert-curve', loadChildren: () => import('./hilbert-curve/hilbert-curve.routes').then(m => m.routes) },
  { path: '**', redirectTo: 'ohlcv-chart', pathMatch: 'full' }
];
