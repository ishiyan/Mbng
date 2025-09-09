import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'htce-t', loadChildren: () => import('./hilbert-transformer-cycle-estimator-type/hilbert-transformer-cycle-estimator-type.routes')
    .then(m => m.routes) },
  { path: 'htce', loadChildren: () => import('./hilbert-transformer-cycle-estimator-params/hilbert-transformer-cycle-estimator-params.routes')
    .then(m => m.routes) },
  { path: 'mama', loadChildren: () => import('./mesa-adaptive-moving-average-params/mesa-adaptive-moving-average-params.routes')
    .then(m => m.routes) },
  { path: 'frama', loadChildren: () => import('./fractal-adaptive-moving-average-params/fractal-adaptive-moving-average-params.routes')
    .then(m => m.routes) },
  { path: '**', redirectTo: 'frama' }
];
