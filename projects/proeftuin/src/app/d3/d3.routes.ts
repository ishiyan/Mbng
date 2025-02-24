import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '', loadComponent: () => import('./d3.component').then(m => m.D3Component), children: [
      { path: '', loadComponent: () => import('./d3-samples/sample-4/sample-4.component').then(m => m.Sample4Component) },
      { path: 'sample-1', loadComponent: () => import('./d3-samples/sample-1/sample-1.component').then(m => m.Sample1Component) },
      { path: 'sample-2', loadComponent: () => import('./d3-samples/sample-2/sample-2.component').then(m => m.Sample2Component) },
      { path: 'sample-3', loadComponent: () => import('./d3-samples/sample-3/sample-3.component').then(m => m.Sample3Component) },
      { path: 'sample-4', loadComponent: () => import('./d3-samples/sample-4/sample-4.component').then(m => m.Sample4Component) },
      { path: 'sample-5', loadComponent: () => import('./d3-samples/sample-5/sample-5.component').then(m => m.Sample5Component) },
      { path: 'sample-6', loadComponent: () => import('./d3-samples/sample-6/sample-6.component').then(m => m.Sample6Component) },
      { path: 'sample-7', loadComponent: () => import('./d3-samples/sample-7/sample-7.component').then(m => m.Sample7Component) },
      { path: 'sample-8', loadComponent: () => import('./d3-samples/sample-8/sample-8.component').then(m => m.Sample8Component) }
    ]
  },
  { path: '**', redirectTo: '' }
];
