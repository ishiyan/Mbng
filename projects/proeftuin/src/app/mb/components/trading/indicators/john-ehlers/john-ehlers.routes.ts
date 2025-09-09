import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'htce-t', loadChildren: () => import('./hilbert-transformer-cycle-estimator-type/sample-hilbert-transformer-cycle-estimator-type.routes')
    .then(m => m.routes) },
  { path: 'htce', loadChildren: () => import('./hilbert-transformer-cycle-estimator-params/sample-hilbert-transformer-cycle-estimator-params.routes')
    .then(m => m.routes) },
  { path: 'mama', loadChildren: () => import('./mesa-adaptive-moving-average-params/sample-mesa-adaptive-moving-average-params.routes')
    .then(m => m.routes) },
  { path: 'frama', loadChildren: () => import('./fractal-adaptive-moving-average-params/sample-fractal-adaptive-moving-average-params.routes')
    .then(m => m.routes) }
];
