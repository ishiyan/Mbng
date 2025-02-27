import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 's1', loadComponent: () => import('./sample-1/sample-circlepack-1.component').then(m => m.SampleCirclepack1Component) },
  { path: 's2', loadComponent: () => import('./sample-2/sample-circlepack-2.component').then(m => m.SampleCirclepack2Component) },
  { path: 's3', loadComponent: () => import('./sample-3/sample-circlepack-3.component').then(m => m.SampleCirclepack3Component) },
  { path: 's4', loadComponent: () => import('./sample-4/sample-circlepack-4.component').then(m => m.SampleCirclepack4Component) },
  { path: 's5', loadComponent: () => import('./sample-5/sample-circlepack-5.component').then(m => m.SampleCirclepack5Component) },
  { path: '**', redirectTo: 's1' }
];
