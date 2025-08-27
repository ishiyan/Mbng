import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 's1', loadComponent: () => import('./sample-1/sample-swatches-1.component').then(m => m.SampleSwatches1Component) },
  { path: 's2', loadComponent: () => import('./sample-2/sample-swatches-2.component').then(m => m.SampleSwatches2Component) },
  { path: 's3', loadComponent: () => import('./sample-3/sample-swatches-3.component').then(m => m.SampleSwatches3Component) },
  { path: 's4', loadComponent: () => import('./sample-4/sample-swatches-4.component').then(m => m.SampleSwatches4Component) },
  { path: 's5', loadComponent: () => import('./sample-5/sample-swatches-5.component').then(m => m.SampleSwatches5Component) },
  { path: 's6', loadComponent: () => import('./sample-6/sample-swatches-6.component').then(m => m.SampleSwatches6Component) },
  { path: 's7', loadComponent: () => import('./sample-7/sample-swatches-7.component').then(m => m.SampleSwatches7Component) },
  { path: 's8', loadComponent: () => import('./sample-8/sample-swatches-8.component').then(m => m.SampleSwatches8Component) },
  { path: 's9', loadComponent: () => import('./sample-9/sample-swatches-9.component').then(m => m.SampleSwatches9Component) },
  { path: 's10', loadComponent: () => import('./sample-10/sample-swatches-10.component').then(m => m.SampleSwatches10Component) },
  { path: 's11', loadComponent: () => import('./sample-11/sample-swatches-11.component').then(m => m.SampleSwatches11Component) },
  { path: 's12', loadComponent: () => import('./sample-12/sample-swatches-12.component').then(m => m.SampleSwatches12Component) } // ,
  // { path: '**', redirectTo: 's1' }
];
