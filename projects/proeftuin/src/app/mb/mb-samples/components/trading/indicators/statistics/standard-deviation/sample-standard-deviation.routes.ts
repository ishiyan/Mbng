import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 's1', loadComponent: () => import('./sample-1/sample-standard-deviation-1.component').then(m => m.SampleStandardDeviation1Component) },
  { path: 's2', loadComponent: () => import('./sample-2/sample-standard-deviation-2.component').then(m => m.SampleStandardDeviation2Component) } // ,
  // { path: '**', redirectTo: 's1' }
];
