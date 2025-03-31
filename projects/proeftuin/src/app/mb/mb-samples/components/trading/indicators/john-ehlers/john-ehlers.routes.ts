import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'htce-t', loadChildren: () => import('./hilbert-transformer-cycle-estimator-type/sample-hilbert-transformer-cycle-estimator-type.routes')
    .then(m => m.routes) },
  { path: 'htce', loadChildren: () => import('./hilbert-transformer-cycle-estimator-params/sample-hilbert-transformer-cycle-estimator-params.routes')
    .then(m => m.routes) }
];
