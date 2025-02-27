import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 's1', loadComponent: () => import('./sample-1/sample-hilbert-curve-1.component').then(m => m.SampleHilbertCurve1Component) },
  { path: '**', redirectTo: 's1' }
];
